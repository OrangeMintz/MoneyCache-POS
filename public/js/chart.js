document.addEventListener("DOMContentLoaded", function () {
    fetch('/sales-data')
        .then(response => response.json())
        .then(data => {
            let options = {
                chart: {
                    height: "130%",
                    maxWidth: "20%",
                    type: "area",
                    fontFamily: "Inter, sans-serif",
                    dropShadow: {
                        enabled: false,
                    },
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            download: false,
                            selection: true,
                            zoom: false,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true, // Fixed this line
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                    x: {
                        show: false,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        opacityFrom: 0.55,
                        opacityTo: 0,
                        shade: "#1C64F2",
                        gradientToColors: ["#1C64F2"],
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 2,
                },
                grid: {
                    show: false,
                    strokeDashArray: 4,
                    padding: {
                        left: 2,
                        right: 2,
                        top: 0
                    },
                },
                series: [
                    {
                        name: "Sales",
                        data: data.sales, // Fetched sales data
                        color: "#1A56DB",
                    },
                ],
                xaxis: {
                    categories: data.dates, // Fetched dates
                    labels: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: true,
                    },
                },
                yaxis: {
                    show: false,
                },
            };

            if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
                const chart = new ApexCharts(document.getElementById("area-chart"), options);
                chart.render();
            }
        })
        .catch(error => console.error('Error fetching sales data:', error));
});
