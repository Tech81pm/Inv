<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card card-default rounded-0 shadow">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="card-title">Componentss</h3>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Create New
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-end mb-2">
            <form class="d-flex" role="search">
              <input
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
                  <th>Category Name</th>
                  <th>Asset Name</th>
                  <th>Brand Name</th>
                  <th>Specifications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="componentsAssetsTable">
              </tbody>
            </table>
            <div>

              </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div>
              <nav aria-label="Page navigation">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <small class="text-muted">Showing 1-10 of 50 items</small>
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
  mounted() {
    this.fetchAssets();
  },
  methods: {
    fetchAssets() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDc0LCJ1c2VybmFtZSI6Imp1c3dhIiwiaWF0IjoxNzI5MTI4MzA3LCJleHAiOjE3Mjk3MzMxMDd9.9ezL-Rmp9IMLXtb_7n29YTxQeGvm7B1CFKGaxqFEhJY';
      
      fetch('http://192.168.100.216:3000/assets/search/component', {
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

          data.forEach(asset => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${asset.asset_id}</td>
              <td>${asset.asset_type}</td>
              <td>${asset.asset_name}</td>
              <td>${asset.asset_brand}</td>
              <td>${asset.asset_specification}</td>
            `;
            componentsAssetsTable.appendChild(row);
          });
        })
        .catch(error => {
          console.error('Error fetching assets:', error);
        });
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
