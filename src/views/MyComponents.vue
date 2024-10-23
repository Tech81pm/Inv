<template>
    <div class="col">
        <div class="card-body">
          <div class="div_components">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Asset Name</th>
                  <th>Brand Name</th>
                  <th>Specifications</th>
                  <th>Set ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="componentsAssetsTable">
              </tbody>
            </table>
          </div>
            <div class ="button-container">
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: page === 1 }">
                    <a class="btn btn-primary" href="#" aria-label="Previous" @click.prevent="previousPage">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item" :class="{ disabled: disableNext }">
                    <a class="btn btn-primary" href="#" aria-label="Next" @click.prevent="nextPage">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
            </div>
        </div>
    </div>

    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Create</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitSpecifications">
                <!-- Your form elements here -->
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
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
      total: 0,
      disableNext: false,
    };
  },
  mounted() {
    this.fetchAssets();
  },
  methods: {
    fetchAssets() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDc0LCJ1c2VybmFtZSI6Imp1c3dhIiwiaWF0IjoxNzI5MTI4MzA3LCJleHAiOjE3Mjk3MzMxMDd9.9ezL-Rmp9IMLXtb_7n29YTxQeGvm7B1CFKGaxqFEhJY';
      
      // Fetch assets with pagination and search term
      fetch(`http://192.168.100.216:3000/assets/search/component?page=${this.page}&limit=${this.limit}`, {
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
          const componentsAssetsTable = document.getElementById('componentsAssetsTable');
          componentsAssetsTable.innerHTML = '';

          // Assuming data contains an object with the actual assets and total count
          this.total = data.total; // Set the total number of assets

          // Check if next button should be disabled
          this.disableNext = data.length < this.limit;

          data.forEach(asset => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${asset.asset_id}</td>
              <td>${asset.asset_name}</td>
              <td>${asset.asset_brand}</td>
              <td>${asset.asset_specification}</td>
              <td>${asset.set_id}</td>
              <td>
                <button class="btn btn-success btn-sm" onclick="editAsset(${asset.asset_id})">Move</button>
                <button class="btn btn-danger btn-sm" onclick="removeAsset(${asset.asset_id})">Remove</button>
              </td>
            `;
            componentsAssetsTable.appendChild(row);
          });
        })
        .catch(error => {
          console.error('Error fetching assets:', error);
        });
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchAssets();
      }
    },
    nextPage() {
      if (!this.disableNext) {
        this.page++;
        this.fetchAssets();
      }
    }
  }
};
</script>

<style scoped>
  .button-container {
  display: flex;
  justify-content: flex-end; /* Align contents to the right */
  gap: 10px; /* Add space between buttons if needed */
  margin-top: 1rem;
  }
  .btn{
    margin-left: .5rem;
  }
</style>
