<template>
  <div class="container">
    <h2>Assets List</h2>
    <table class="table table-bordered" id="assetsTable">
      <thead>
        <tr>
          <th>Asset ID</th>
          <th>Asset Name</th>
          <th>Asset Brand</th>
          <th>Asset Specification</th>
          <th>Purchase Date</th>
          <th>Created By</th>
          <th>Updated By</th>
          <th>Date Added</th>
          <th>Company ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="assetsTableBody">
        <tr v-for="asset in assets" :key="asset.asset_id">
          <td>{{ asset.asset_id }}</td>
          <td>{{ asset.asset_name }}</td>
          <td>{{ asset.asset_brand }}</td>
          <td>{{ asset.asset_specification }}</td>
          <td>{{ asset.purchase_date ? new Date(asset.purchase_date).toLocaleDateString() : 'N/A' }}</td>
          <td>{{ asset.created_by }}</td>
          <td>{{ asset.updated_by }}</td>
          <td>{{ new Date(asset.date_added).toLocaleDateString() }}</td>
          <td>{{ asset.company_id }}</td>
          <td>{{ asset.status }}</td>
        </tr>
      </tbody>
    </table>
    
    <div class="button-container">
      <button class="btn btn-primary" @click="prevPage" :disabled="page === 1">Prev</button>
      <button class="btn btn-primary" @click="nextPage" :disabled="disableNext">Next</button>
      <button class="btn btn-success" @click="openModal">Add Asset</button>
    </div>

    <!-- Custom Modal for Confirmation -->
    <div v-if="showConfirmationModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeConfirmationModal">&times;</span>
        <h2>Asset Added Successfully</h2>
        <p>Asset ID: {{ confirmationData.assetId }}</p>
        <p>Message: {{ confirmationData.message }}</p>
      </div>
    </div>

    <!-- Custom Modal for Adding Asset -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Add Asset</h2>
        <form @submit.prevent="addAsset">
          <div class="mb-3" v-for="(value, key) in newAsset" :key="key">
            <label :for="key" class="form-label">
              {{ key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }}:
            </label>
            <select 
              v-if="key === 'asset_name'" 
              class="form-select" 
              v-model="newAsset[key]" 
              @change="assignAssetType"
              required
            >
              <option value="" disabled>Select Asset Name</option>
              <option value="CPU">CPU</option>
              <option value="GPU">GPU</option>
              <option value="RAM">RAM</option>
              <option value="Motherboard">Motherboard</option>
              <option value="Storage">Storage</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Mouse">Mouse</option>
              <option value="Monitor">Monitor</option>
              <!-- Add more options as needed -->
            </select>
            <input 
              v-else-if="key !== 'asset_type' && key !== 'status' && key !== 'purchase_date' && key !== 'date_added' && key !== 'company_id'" 
              type="text" 
              class="form-control" 
              :id="key" 
              v-model="newAsset[key]" 
            />
            <select 
              v-else-if="key === 'asset_type'" 
              class="form-select" 
              v-model="newAsset[key]" 
              required
            >
              <option value="" disabled>Select Type</option>
              <option value="Peripheral">Peripheral</option>
              <option value="Component">Component</option>
              <option value="Consumable">Consumable</option>
            </select>
            <select v-else-if="key === 'company_id'" class="form-select" v-model="newAsset[key]" required>
              <option value="" disabled>Select Company</option>
              <option value="81PM">81PM</option>
              <option value="OSI">OSI</option>
              <option value="MHI">MHI</option>
            </select>
            <select 
              v-else-if="key === 'status'" 
              class="form-select" 
              v-model="newAsset[key]" 
              required
            >
              <option value="" disabled>Select Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pending">Pending</option>
            </select>
            
            <!-- Date Picker for Purchase Date -->
            <input 
              v-if="key === 'purchase_date'" 
              type="date" 
              class="form-control" 
              v-model="newAsset[key]" 
              required
            />
            <!-- Display Date Added as Non-Editable -->
            <p v-if="key === 'date_added'" class="date-added">
              {{ new Date(newAsset[key]).toLocaleDateString() }}
            </p>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      disableNext: false,
      limit: 8,
      showModal: false,
      showConfirmationModal: false,
      confirmationData: {},
      assets: [],
      newAsset: {
        asset_name: '',
        asset_brand: '',
        asset_type: '',
        asset_specification: '',
        set_id: null,
        assignment_id: null, // Allow to be nullable
        purchase_date: '', // Allow to be nullable
        created_by: 473,
        updated_by: 473,
        date_added: new Date().toISOString(),
        company_id: '',
        status: 'In Stock'
      }
    };
  },
  mounted() {
    this.fetchAssets();
  },
  methods: {
    fetchAssets() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDczLCJ1c2VybmFtZSI6Ik9zaHdhIiwiaWF0IjoxNzI5NzQwNTY4LCJleHAiOjE3Mjk3NjU3Njh9.vuNZ8fK-JHEjIwhkCbcdwv_4qg8oD6ZtiTnwQuEs-ec'; // Replace with your JWT token

      fetch(`http://192.168.100.216:3000/assets/fetch?page=${this.page}&limit=${this.limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {1
        this.assets = data.data;
        this.disableNext = data.data.length < this.limit;
      })
      .catch(error => {
        console.error('Error fetching assets:', error);
      });
    },
    async addAsset() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDczLCJ1c2VybmFtZSI6Ik9zaHdhIiwiaWF0IjoxNzI5NzQwNTY4LCJleHAiOjE3Mjk3NjU3Njh9.vuNZ8fK-JHEjIwhkCbcdwv_4qg8oD6ZtiTnwQuEs-ec'; // Replace with your JWT token
      const assetToAdd = { ...this.newAsset };

      console.log('Asset to add:', assetToAdd); // Debug log

      try {
        const response = await fetch(`http://192.168.100.216:3000/assets/add`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(assetToAdd)
        });

        if (!response.ok) {
          // Handle the error response
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add asset');
        }

        const data = await response.json();
        console.log('Asset added:', data);

       
        this.confirmationData = data;
        this.fetchAssets();
        this.closeModal();
        this.showConfirmationModal = true;
      } catch (error) {
        console.error('Error adding asset:', error);
      }
    },
    assignAssetType() {
      const assetName = this.newAsset.asset_name;
      if (['CPU', 'GPU', 'RAM', 'Motherboard', 'Storage'].includes(assetName)) {
        this.newAsset.asset_type = 'Component';
      } else if (['Keyboard', 'Mouse','Printer','Monitor'].includes(assetName)) {
        this.newAsset.asset_type = 'Peripheral';
      } else {
        this.newAsset.asset_type = ''; // Reset or set a default if needed
      }
    },
    openModal() {
      this.newAsset = {
        asset_name: '',
        asset_brand: '',
        asset_type: '',
        asset_specification: '',
        set_id: null,
        assignment_id: null,
        purchase_date: '',
        created_by: 473,
        updated_by: 473,
        date_added: new Date().toISOString(),
        company_id: '',
        status: 'In Stock'
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false;
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchAssets();
      }
    },
    nextPage() {
      this.page++;
      this.fetchAssets();
    }
  }
};
</script>

<style scoped>
.modal {
  display: block; /* Show the modal */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin-left: 35%; /* 15% from the top and centered */
  padding: 15px; /* Reduced padding */
  border: 1px solid #888;
  width: 40%; /* Set a smaller width */
  max-width: 500px; /* Optional: max width */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.date-added {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: gray;
}
.button-container {
  display: flex;
  justify-content: flex-end; /* Align contents to the right */
  gap: 10px; /* Add space between buttons if needed */
  margin-top: 1rem;
}


</style>
