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
  <div>
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
              <button type="button" class="btn btn-primary" @click="viewSet(set.set_id)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                View
              </button>
              <button class="btn btn-primary" @click="editSet(set.set_id)">Edit</button>
              <button class="btn btn-danger" @click="removeSet(set.set_id)">Remove</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      sets: [], // Array to store fetched sets
      components: [] // Array to store fetched components for a set
    };
  },
  mounted() {
    this.fetchSet(); // Call fetchSet when component mounts
  },
  methods: {
    fetchSet() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDczLCJ1c2VybmFtZSI6Ik9zaHdhIiwiaWF0IjoxNzI5NzQwNTY4LCJleHAiOjE3Mjk3NjU3Njh9.vuNZ8fK-JHEjIwhkCbcdwv_4qg8oD6ZtiTnwQuEs-ec';

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
        this.sets = data.data; // Store fetched data in the sets array
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    viewSet(setId) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDczLCJ1c2VybmFtZSI6Ik9zaHdhIiwiaWF0IjoxNzI5NzQwNTY4LCJleHAiOjE3Mjk3NjU3Njh9.vuNZ8fK-JHEjIwhkCbcdwv_4qg8oD6ZtiTnwQuEs-ec';
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
  justify-content: space-evenly;
}
</style>
