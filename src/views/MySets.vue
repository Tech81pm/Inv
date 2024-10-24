<template>
  <!-- MODAL -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  <div>
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
        <tbody id="setTable">
          <!-- TABLE DATA WILL BE POPULATED HERE -->
          <tr v-for="set in sets" :key="set.set_id">
            <td>{{ set.set_id }}</td>
            <td>{{ set.set_type }}</td>
            <td>{{ set.assignment_id }}</td>
            <td>{{ new Date(set.date_added).toLocaleDateString() }}</td>
            <td>
              <div class="button-container">
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      sets: [] // Array to store fetched sets
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
      fetch(`http://192.168.100.216:3000/components/fetch${setId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        
      });
      
    },
    editSet(setId) {
      // Handle edit action for the set with the given setId
      console.log('Editing set:', setId);
    },
    removeSet(setId) {
      // Handle remove action for the set with the given setId
      console.log('Removing set:', setId);
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
