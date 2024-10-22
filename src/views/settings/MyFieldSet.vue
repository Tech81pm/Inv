<template>
    <div class="row">
      <div class="col-lg-12">
        <div class="card card-default rounded-0 shadow">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="card-title">FieldSet</h3>
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
            <div class="div_FieldSet">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Item Code</th>
                    <th>Category Name</th>
                    <th>Asset Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>

              </table>
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
      <FieldSetModal/>
    </div>
  </template>
  
  <script setup>
  import FieldSetModal from '@/components/ui/modal/FieldSetModal.vue'; 

  </script>


  <style>
  .modal-body {
    padding: 2rem; 
  }
  
  .input-group {
    margin-bottom: 1rem; 
  }
  
  .input-group-text {
    min-width: 150px; 
  }
  
  .btn-outline-secondary {
    margin-left: 0.5rem; 
  }
  
  .btn-primary {
    margin-top: 1rem; 
  }
  </style>
  
  