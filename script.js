console.log("Dashboard Loaded 🚀");

// ==========================
// Chart Variables
// ==========================

let revenueChart;
let salesChart;
let categoryChart;
let regionChart;

// ==========================
// Load CSV
// ==========================

Papa.parse("data/sales.csv", {
    download: true,
    header: true,

    complete: function (results) {

        const data = results.data.filter(row => row.OrderID);

        console.log(data);

        // ==========================
        // KPI Calculations
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

        const averageOrder =
            totalOrders > 0
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
                (monthlyRevenue[row.Month] || 0)
                + Number(row.Revenue);

        });

        // ==========================
        // Product Sales
        // ==========================

        const productSales = {};

        data.forEach(row => {

            productSales[row.Product] =
                (productSales[row.Product] || 0)
                + Number(row.Quantity);

        });

        // ==========================
        // Category Count
        // ==========================

        const categoryCount = {};

        data.forEach(row => {

            categoryCount[row.Category] =
                (categoryCount[row.Category] || 0)
                + 1;

        });

        // ==========================
        // Region Revenue
        // ==========================

        const regionRevenue = {};

        data.forEach(row => {

            regionRevenue[row.Region] =
                (regionRevenue[row.Region] || 0)
                + Number(row.Revenue);

        });

        // ==========================
        // Revenue Line Chart
        // ==========================

        revenueChart = new Chart(
            document.getElementById("revenueChart"),
            {

                type: "line",

                data: {

                    labels: Object.keys(monthlyRevenue),

                    datasets: [

                        {

                            label: "Revenue",

                            data: Object.values(monthlyRevenue),

                            borderWidth: 3,

                            tension: 0.4,

                            fill: true

                        }

                    ]

                }

            }
        );

        // ==========================
        // Sales Bar Chart
        // ==========================

        salesChart = new Chart(
            document.getElementById("salesChart"),
            {

                type: "bar",

                data: {

                    labels: Object.keys(productSales),

                    datasets: [

                        {

                            label: "Units Sold",

                            data: Object.values(productSales)

                        }

                    ]

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

                    datasets: [

                        {

                            data: Object.values(categoryCount)

                        }

                    ]

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

                    datasets: [

                        {

                            data: Object.values(regionRevenue)

                        }

                    ]

                }

            }
        );

    }

});

// ==========================
// Sample Table Data
// (Will become CSV-driven in Sprint 7.3)
// ==========================

const orders = [

    {
        id: 1001,
        customer: "Rahul Sharma",
        product: "Laptop",
        category: "Electronics",
        region: "North",
        amount: "₹65,000",
        status: "Delivered"
    },

    {
        id: 1002,
        customer: "Ananya Roy",
        product: "Smartphone",
        category: "Electronics",
        region: "East",
        amount: "₹28,000",
        status: "Shipped"
    },

    {
        id: 1003,
        customer: "Rohan Singh",
        product: "Monitor",
        category: "Electronics",
        region: "South",
        amount: "₹18,500",
        status: "Pending"
    },

    {
        id: 1004,
        customer: "Priya Das",
        product: "Keyboard",
        category: "Accessories",
        region: "West",
        amount: "₹2,500",
        status: "Delivered"
    },

    {
        id: 1005,
        customer: "Neha Verma",
        product: "Mouse",
        category: "Accessories",
        region: "North",
        amount: "₹1,800",
        status: "Delivered"
    }

];

const tableBody = document.getElementById("tableBody");

tableBody.innerHTML = "";

orders.forEach(order => {

    tableBody.innerHTML += `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>${order.category}</td>
            <td>${order.region}</td>
            <td>${order.amount}</td>
            <td>${order.status}</td>
        </tr>
    `;

});

// ==========================
// Theme Button
// ==========================

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        alert("Dark Mode Coming Soon 😎");

    });