<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card card-default rounded-0 shadow">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="card-title">Components</h3>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-end mb-2">
            <form class="d-flex" role="search" @submit.prevent="fetchAssets">
              <input
                v-model="searchTerm" 
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
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
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: page === 1 }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="previousPage">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item" :class="{ disabled: page * limit >= total || fetchedAssets.length < limit }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <small class="text-muted">Showing {{ (page - 1) * limit + 1 }}-{{ Math.min(page * limit, total) }} of {{ total }} items</small>
            </div>
          </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1, // Starting at page 1
      limit: 8, // Items per page
      total: 0, // Total items from API
      fetchedAssets: [] // Store fetched assets to check length for disabling next button
    };
  },
  mounted() {
    this.fetchAssets();
  },
  methods: {
    fetchAssets() {
      const token = 'YOUR_TOKEN_HERE'; // Replace with your actual token
      
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
          
          // Store fetched assets for checking length later
          this.fetchedAssets = data; 

          // Assuming data contains an object with the actual assets and total count
          this.total = data.total; // Set the total number of assets

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
      this.page++;
      this.fetchAssets();
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
