<template>
    <div class="container mt-5">
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
                </tr>
            </thead>
            <tbody id="assetsTableBody">
                <!-- Data will be inserted here -->
            </tbody>
        </table>
    </div>
</template>

<script setup>
  function fetchAssets() {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDc0LCJ1c2VybmFtZSI6Imp1c3dhIiwiaWF0IjoxNzI5MTI4MzA3LCJleHAiOjE3Mjk3MzMxMDd9.9ezL-Rmp9IMLXtb_7n29YTxQeGvm7B1CFKGaxqFEhJY';
    
            fetch('http://192.168.100.216:3000/assets/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Bearer token to headers
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
                    const assetsTableBody = document.getElementById('assetsTableBody');
                    assetsTableBody.innerHTML = ''; // Clear previous data
    
                    // Loop through the data and create table rows
                    data.forEach(asset => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${asset.asset_id}</td>
                            <td>${asset.asset_name}</td>
                            <td>${asset.asset_brand}</td>
                            <td>${asset.asset_specification}</td>
                            <td>${new Date(asset.purchase_date).toLocaleDateString()}</td>
                            <td>${asset.created_by}</td>
                            <td>${asset.updated_by}</td>
                            <td>${new Date(asset.date_added).toLocaleDateString()}</td>
                            <td>${asset.company_id}</td>
                        `;
                        assetsTableBody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Error fetching assets:', error);
                });
        }
    
        // Fetch assets when the page loads
        window.onload = fetchAssets;
</script>

