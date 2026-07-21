console.log("Dashboard Loaded 🚀");

// ==========================
// Sample Dashboard Data
// ==========================

Papa.parse("data/sales.csv", {

    download: true,

    header: true,

    complete: function (results) {

        console.log(results.data);

    }

});

const dashboardData = {

    revenue: 845000,

    sales: 327,

    orders: 214,

    avgOrder: 3948,

    monthlyRevenue: [
        65000,
        72000,
        81000,
        93000,
        87000,
        110000,
        125000
    ],

    products: [
        95,
        76,
        61,
        53,
        41
    ],

    categorySales: [
        45,
        25,
        18,
        12
    ],

    regionRevenue: [
        35,
        28,
        22,
        15
    ]

};

// ==========================
// Update KPI Cards
// ==========================

document.getElementById("revenue").innerText =
    "₹" + dashboardData.revenue.toLocaleString();

document.getElementById("sales").innerText =
    dashboardData.sales;

document.getElementById("orders").innerText =
    dashboardData.orders;

document.getElementById("avgOrder").innerText =
    "₹" + dashboardData.avgOrder.toLocaleString();


// ==========================
// Revenue Line Chart
// ==========================

new Chart(
    document.getElementById("revenueChart"),
    {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul"
            ],

            datasets: [{

                label: "Revenue",

                data: dashboardData.monthlyRevenue,

                borderWidth: 3,

                tension: .4,

                fill: true

            }]

        }

    });


// ==========================
// Sales Bar Chart
// ==========================

new Chart(
    document.getElementById("salesChart"),
    {

        type: "bar",

        data: {

            labels: [
                "Laptop",
                "Phone",
                "Monitor",
                "Keyboard",
                "Mouse"
            ],

            datasets: [{

                label: "Units Sold",

                data: dashboardData.products

            }]

        }

    });


// ==========================
// Category Pie Chart
// ==========================

new Chart(
    document.getElementById("categoryChart"),
    {

        type: "pie",

        data: {

            labels: [
                "Electronics",
                "Accessories",
                "Furniture",
                "Others"
            ],

            datasets: [{

                data: dashboardData.categorySales

            }]

        }

    });


// ==========================
// Region Doughnut Chart
// ==========================

new Chart(
    document.getElementById("regionChart"),
    {

        type: "doughnut",

        data: {

            labels: [
                "North",
                "South",
                "East",
                "West"
            ],

            datasets: [{

                data: dashboardData.regionRevenue

            }]

        }

    });


// ==========================
// Table Data
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

const tableBody =
    document.getElementById("tableBody");

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