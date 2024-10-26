<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Components</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Asset Name</th>
                  <th>Brand Name</th>
                  <th>Specifications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="component in components" :key="component.asset_id">
                  <td>{{ component.asset_id }}</td>
                  <td>{{ component.asset_name }}</td>
                  <td>{{ component.asset_brand }}</td>
                  <td>{{ component.asset_specification }}</td>
                  <td>
                    <div class="button-container">
                      <button class="btn btn-success btn-sm" @click="editAsset(component.asset_id)">Move</button>
                      <button class="btn btn-danger btn-sm" @click="removeAsset(component.asset_id)">Remove</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal -->
  
  <!-- Main Table -->
  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Set ID</th>
          <th>Set Type</th>
          <th>Assigned to</th>
          <th>Date Added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="set in sets" :key="set.set_id">
          <td>{{ set.set_id }}</td>
          <td>{{ set.set_type }}</td>
          <td>{{ set.assignment_id }}</td>
          <td>{{ new Date(set.date_added).toLocaleDateString() }}</td>
          <td>
            <div class="button-container">
              <!-- Trigger Modal Button -->
              <button type="button" class="btn btn-success" @click="viewSet(set.set_id)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                View parts
              </button>
              <button class="btn btn-primary" @click="editSet(set.set_id)">Assign set</button>
              <button class="btn btn-danger" @click="removeSet(set.set_id)">Remove</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
  <div class="button-container">
    <div class="pagination-controls">
      <button class="btn btn-primary" @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button class="btn btn-primary" @click="nextPage" :disabled="sets.length < limit">Next</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      sets: [], 
      components: [] 
    };
  },
  mounted() {
    this.fetchSet(); 
  },
  methods: {
    fetchSet() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDczLCJ1c2VybmFtZSI6Ik9zaHdhIiwiaWF0IjoxNzI5ODE1NjEyLCJleHAiOjE3MzA0MjA0MTJ9.OTBUvoiUaEEomDP6sco1FtD88tywVXeqRtqpIDy6iD8';

      fetch(`http://192.168.100.216:3000/sets/fetch?page=${this.page}&limit=${this.limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.sets = data.data; 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    viewSet(setId) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDczLCJ1c2VybmFtZSI6Ik9zaHdhIiwiaWF0IjoxNzI5ODE1NjEyLCJleHAiOjE3MzA0MjA0MTJ9.OTBUvoiUaEEomDP6sco1FtD88tywVXeqRtqpIDy6iD8';
      fetch(`http://192.168.100.216:3000/components/fetch/${setId}`, {
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
      .then(data => {
        this.components = data; // Bind fetched components to `components`
      })
      .catch(error => {
        console.error('Error fetching components:', error);
      });
    },
    nextPage() {
      this.page++;
      this.fetchSet();
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchSet();
      }
    },
    editSet(setId) {
      console.log('Editing set:', setId);
    },
    removeSet(setId) {
      console.log('Removing set:', setId);
    },
    editAsset(assetId) {
      console.log('Moving asset:', assetId);
    },
    removeAsset(assetId) {
      console.log('Removing asset:', assetId);
    }
  }
}
</script>

<style>
.button-container {  
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.btn{
  font-size: small;
}
.table{
  font-size: medium;
}
</style>
