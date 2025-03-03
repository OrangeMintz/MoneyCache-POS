'use client'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaLineChart = () => {
  const options = {
    chart: {
      id: 'visitor-chart',
      toolbar: {
        show: false, // Hide the toolbar (zoom, pan, etc.)
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // X-axis labels
    },
    stroke: {
      curve: 'smooth', // Smooth line
      width: 2,
    },
    colors: ['#3b82f6'], // Line color (blue)
    markers: {
      size: 5, // Marker size
      colors: ['#3b82f6'], // Marker color
    },
    tooltip: {
      enabled: true, // Enable tooltips on hover
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.9,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
  };

  const series = [
    {
      name: 'Visitors',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 120], // Sample data
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area" // Changed from "line" to "area"
      height={250} // Height of the chart
    />
  );
};

export default AreaLineChart;
