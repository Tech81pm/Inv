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
                <span class="input-group-text">Asset Name:</span>
                <select v-model="assetName" class="form-select">
                  <option value="None">Select Type Set</option>
                  <option value="Desktop">Desktop Set</option>
                  <option value="Laptop">Laptop Set</option>
                </select>
              </div>
            </div>

            <div class="row mb-2" v-if="assetName !== 'None'">
              <div class="input-group" v-if="assetName === 'Desktop'">
                <span class="input-group-text">CPU:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select class="form-select">
                  <option selected>Specification</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div v-for="(slot, index) in ramSlots" :key="`ram-${index}`" class="d-flex">
                <div class="input-group">
                  <span class="input-group-text">RAM:</span>
                  <select class="form-select">
                    <option selected>Brand Name</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select class="form-select">
                    <option selected>Specification</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <button class="btn btn-outline-secondary" type="button" @click="addRamSlot" :disabled="ramSlots.length >= 4">
                    <span class="material-icons">add_circle</span>
                  </button>
                  <button class="btn btn-outline-secondary ms-4" type="button">
                    Add Existing
                  </button>
                </div>
              </div>

              <div class="input-group" v-if="assetName === 'Desktop'">
                <span class="input-group-text">Motherboard:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select class="form-select">
                  <option selected>Specification</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div class="input-group" v-if="assetName === 'Desktop'">
                <span class="input-group-text">GPU:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select class="form-select">
                  <option selected>Specification</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div class="input-group">
                <span class="input-group-text">Storage:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select class="form-select">
                  <option selected>Specification</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div v-if="assetName === 'Desktop'" class="input-group">
                <span class="input-group-text">Power Supply:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select class="form-select">
                  <option selected>Specification</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div v-if="assetName === 'Desktop'" class="input-group">
                <span class="input-group-text">Case:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div v-for="(slot, index) in monitorSlots" :key="`monitor-${index}`">
                <div class="input-group">
                  <span class="input-group-text">Monitor:</span>
                  <select class="form-select">
                    <option selected>Brand Name</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select class="form-select">
                    <option selected>Specification</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <button class="btn btn-outline-secondary" type="button" @click="addMonitorSlot" :disabled="monitorSlots.length >= 4">
                    <span class="material-icons">add_circle</span>
                  </button>
                  <button class="btn btn-outline-secondary ms-4" type="button">
                    Add Existing
                  </button>
                </div>
              </div>

              <div class="input-group">
                <span class="input-group-text">Keyboard:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div class="input-group">
                <span class="input-group-text">Mouse:</span>
                <select class="form-select">
                  <option selected>Brand Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
                </button>
              </div>

              <div v-if="assetName === 'Desktop'" class="input-group">
                <span class="input-group-text">AVR:</span>
                <select class="form-select">
                  <option selected></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <button class="btn btn-outline-secondary ms-4" type="button">
                  Add Existing
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
  data() {
    return {
      assetName: 'None', // Initialize to "None" so no fields are shown initially
      ramSlots: [{ ramBrand: '', ramSpec: '' }],
      monitorSlots: [{ monitorBrand: '', monitorSpec: '' }],
      array: [
        {
          asset_name: "",
          asset_type: "",
          asset_brand: "",
          asset_specification: "",
          set_id: null,
          assignment_id: null,
          purchase_date: "",
          created_by: null,
          updated_by: null,
          date_added: "",
          company_id: "",
          status: ""
        }
      ]
    };
  },
  methods: {
    addAsset(){
      this.assets.push({
        asset_name: "",
        asset_type: "",
        asset_brand: "",
        asset_specification: "",
        set_id: null,
        assignment_id: null,
        purchase_date: "",
        created_by: null,
        updated_by: null,
        date_added: "",
        company_id: "",
        status: ""
      });
    },
    addRamSlot() {
      if (this.ramSlots.length < 4) {
        this.ramSlots.push({ ramBrand: '', ramSpec: '' });
      }
    },
    addMonitorSlot() {
      if (this.monitorSlots.length < 4) {
        this.monitorSlots.push({ monitorBrand: '', monitorSpec: '' });
      }
    },
    submitSpecifications() {
      // Handle form submission logic here
      console.log("Submitting specifications for:", this.assetName);
      console.log("RAM Slots:", this.ramSlots);
      console.log("Monitor Slots:", this.monitorSlots);
      // Add your API call or further processing logic here
    },
  },
};
</script>

<style scoped>


</style>
