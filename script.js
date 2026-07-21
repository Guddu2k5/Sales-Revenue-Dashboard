console.log("Dashboard Loaded 🚀");

// ==========================
// Chart Variables
// ==========================

let revenueChart;
let salesChart;
let categoryChart;
let regionChart;

// ==========================
// Load CSV Data
// ==========================

Papa.parse("data/sales.csv", {
    download: true,
    header: true,

    complete: function (results) {

        const data = results.data.filter(row => row.OrderID);

        console.log(data);

        // ==========================
        // KPI Cards
        // ==========================

        const totalRevenue = data.reduce(
            (sum, row) => sum + Number(row.Revenue),
            0
        );

        const totalSales = data.reduce(
            (sum, row) => sum + Number(row.Quantity),
            0
        );

        const totalOrders = data.length;

        const averageOrder = totalOrders
            ? Math.round(totalRevenue / totalOrders)
            : 0;

        document.getElementById("revenue").textContent =
            "₹" + totalRevenue.toLocaleString("en-IN");

        document.getElementById("sales").textContent =
            totalSales;

        document.getElementById("orders").textContent =
            totalOrders;

        document.getElementById("avgOrder").textContent =
            "₹" + averageOrder.toLocaleString("en-IN");

        // ==========================
        // Revenue By Month
        // ==========================

        const monthlyRevenue = {};

        data.forEach(row => {

            monthlyRevenue[row.Month] =
                (monthlyRevenue[row.Month] || 0) +
                Number(row.Revenue);

        });

        // ==========================
        // Product Sales
        // ==========================

        const productSales = {};

        data.forEach(row => {

            productSales[row.Product] =
                (productSales[row.Product] || 0) +
                Number(row.Quantity);

        });

        // ==========================
        // Category Count
        // ==========================

        const categoryCount = {};

        data.forEach(row => {

            categoryCount[row.Category] =
                (categoryCount[row.Category] || 0) + 1;

        });

        // ==========================
        // Region Revenue
        // ==========================

        const regionRevenue = {};

        data.forEach(row => {

            regionRevenue[row.Region] =
                (regionRevenue[row.Region] || 0) +
                Number(row.Revenue);

        });

        // ==========================
        // Destroy Existing Charts
        // ==========================

        if (revenueChart) revenueChart.destroy();
        if (salesChart) salesChart.destroy();
        if (categoryChart) categoryChart.destroy();
        if (regionChart) regionChart.destroy();

        // ==========================
        // Revenue Line Chart
        // ==========================

        revenueChart = new Chart(
            document.getElementById("revenueChart"),
            {
                type: "line",
                data: {
                    labels: Object.keys(monthlyRevenue),
                    datasets: [{
                        label: "Revenue",
                        data: Object.values(monthlyRevenue),
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    }]
                }
            }
        );

        // ==========================
        // Product Sales Chart
        // ==========================

        salesChart = new Chart(
            document.getElementById("salesChart"),
            {
                type: "bar",
                data: {
                    labels: Object.keys(productSales),
                    datasets: [{
                        label: "Units Sold",
                        data: Object.values(productSales)
                    }]
                }
            }
        );

        // ==========================
        // Category Pie Chart
        // ==========================

        categoryChart = new Chart(
            document.getElementById("categoryChart"),
            {
                type: "pie",
                data: {
                    labels: Object.keys(categoryCount),
                    datasets: [{
                        data: Object.values(categoryCount)
                    }]
                }
            }
        );

        // ==========================
        // Region Doughnut Chart
        // ==========================

        regionChart = new Chart(
            document.getElementById("regionChart"),
            {
                type: "doughnut",
                data: {
                    labels: Object.keys(regionRevenue),
                    datasets: [{
                        data: Object.values(regionRevenue)
                    }]
                }
            }
        );

        // ==========================
        // Recent Orders Table
        // ==========================

        const tableBody = document.getElementById("tableBody");

        tableBody.innerHTML = "";

        data.forEach(row => {

            tableBody.innerHTML += `
                <tr>
                    <td>${row.OrderID}</td>
                    <td>${row.Customer}</td>
                    <td>${row.Product}</td>
                    <td>${row.Category}</td>
                    <td>${row.Region}</td>
                    <td>₹${Number(row.Revenue).toLocaleString("en-IN")}</td>
                    <td>
                        <span class="status delivered">
                            Delivered
                        </span>
                    </td>
                </tr>
            `;

        });

    },

    error: function (err) {
        console.error("Error loading CSV:", err);
    }

});

// ==========================
// Theme Button
// ==========================

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        alert("Dark Mode Coming Soon 😎");

    });