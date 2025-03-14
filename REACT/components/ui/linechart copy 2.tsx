'use client'
import { Transaction } from '@/utils/interface';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

interface LineChartProps {
  transactions: Transaction[];
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaLineChart: React.FC<LineChartProps> = ({ transactions }) => {

  const formattedData = transactions.reduce<Record<string, number>>((acc, transaction) => {
    const date = dayjs(transaction.created_at).format('DD MMM'); // Format x axis
    acc[date] = (acc[date] || 0) + Math.round(transaction.grand_total); // Sum grand_total 
    return acc;
  }, {});

  const categories = Object.keys(formattedData).sort((a, b) => dayjs(a, 'DD MMM').valueOf() - dayjs(b, 'DD MMM').valueOf());
  const data = categories.map((date) => formattedData[date]);

  const options = {
    chart: {
      id: 'visitor-chart',
      toolbar: {
        show: false, // Hide the toolbar (zoom, pan, etc.)
      },
    },
    xaxis: {
      categories: categories, // X-axis labels
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
      name: 'Grand Total',
      data: data, // Sample data
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area" // Changed from "line" to "area"
      height={300} // Height of the chart
    />
  );
};

export default AreaLineChart;
