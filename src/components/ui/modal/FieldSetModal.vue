<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitSpecifications">
                <div class="row mb">
                    <div class="input-group">
                        <span class="input-group-text">Category:</span>
                        <select v-model="categoryName" class="form-select">
                            <option value="">Select category</option>
                            <option value="Set Asset">Set Asset</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Components">Components</option>
                            <option value="Consumables">Consumables</option>
                        </select>
                    </div>
                    
                    <div class="input-group">
                        <span class="input-group-text">Asset Name:</span>
                        <select v-model="assetName" class="form-select">
                            <option value="">Select Type Set</option>
                            <option value="Desktop">Desktop Set</option>
                            <option value="Laptop">Laptop Set</option>
                        </select>
                </div>
                    </div>
                    
  
                    <div v-if="categoryName === 'Set Asset'" class="row mb-2">
                    <div class="input-group">
                      <span class="input-group-text">Processor:</span>
                        <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option selected>Brand Name</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                            <option selected>Specification</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <button class="btn btn-outline-secondary ms-4" type="button">
                            Add New
                        </button>
                    </div>

                    <div v-for="(slot, index) in ramSlots" :key="`ram-${index}`" class="d-flex">
                    <div class="input-group">
                      <span class="input-group-text">RAM:</span>
                        <select class="form-select" aria-label="RAM Brand">
                          <option selected>Brand Name</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <select class="form-select" aria-label="RAM Specification">
                          <option selected>Specification</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button" 
                          @click="addRamSlot"
                          :disabled="ramSlots.length >= 2">
                          <span class="material-icons">
                            add_circle
                          </span>
                        </button>
                        <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                        </button>
                      </div>
                    </div>

                    <div class="input-group">
                      <span class="input-group-text">Mother Board:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Specification</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div class="input-group">
                      <span class="input-group-text">Graphics Card:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Specification</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div class="input-group">
                      <span class="input-group-text">Storage:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Specification</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div v-if="assetName === 'Desktop'" class="input-group">
                      <span class="input-group-text">Power Supply:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Specification</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div v-if="assetName === 'Desktop'" class="input-group">
                      <span class="input-group-text">Case:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div v-for="(slot, index) in monitorSlots" :key="`monitor-${index}`">
                      <div class="input-group">
                      <span class="input-group-text">Monitor:</span>
                        <select class="form-select" aria-label="Monitor Brand">
                          <option selected>Brand Name</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <select class="form-select" aria-label="Monitor Specification">
                          <option selected>Specification</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <button 
                          class="btn btn-outline-secondary" 
                          type="button" 
                          @click="addMonitorSlot"
                          :disabled="monitorSlots.length >= 2">
                          <span class="material-icons">
                          add_circle
                          </span>
                        </button>
                        <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                        </button>
                      </div>
                    </div>

                    <div class="input-group">
                      <span class="input-group-text">Keyboard:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div class="input-group">
                      <span class="input-group-text">Mouse:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected>Brand Name</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>

                    <div v-if="assetName === 'Desktop'" class="input-group">
                      <span class="input-group-text">AVR:</span>
                      <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option selected ></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <button class="btn btn-outline-secondary ms-4" type="button">
                          Add New
                      </button>
                    </div>
                    
                </div>
  
                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      // Define props to pass data from the parent component if needed
    },
    data() {
      return {
        categoryName: '',
        assetName: '',
        ramSlots: [{ ramBrand: '', ramSpec: '' }],
        monitorSlots: [{ monitorBrand: '', monitorSpec: '' }],
      };
    },
    methods: {
      addRamSlot() {
        if (this.ramSlots.length < 2) {
          this.ramSlots.push({ ramBrand: '', ramSpec: '' });
        }
      },
      addMonitorSlot() {
        if (this.monitorSlots.length < 2) {
          this.monitorSlots.push({ monitorBrand: '', monitorSpec: '' });
        }
      },
      submitSpecifications() {
        // Handle form submission
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add modal-specific styles if needed */
  </style>
  