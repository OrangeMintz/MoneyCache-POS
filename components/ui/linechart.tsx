'use client'
import { formatNumber } from '@/utils/formatter';
import { Transaction } from '@/utils/interface';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface LineChartProps {
  transactions: Transaction[];
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaLineChart: React.FC<LineChartProps> = ({ transactions }) => {
  const [chartKey, setChartKey] = useState(0);

  // Process transaction data
  const formattedData = transactions.reduce<Record<string, number>>((acc, transaction) => {
    const date = dayjs(transaction.created_at).format('DD MMM');
    acc[date] = (acc[date] || 0) + Math.round(transaction.grand_total);
    return acc;
  }, {});

  // Sort dates chronologically
  const categories = Object.keys(formattedData).sort((a, b) =>
    dayjs(a, 'DD MMM').valueOf() - dayjs(b, 'DD MMM').valueOf()
  );
  const data = categories.map((date) => formattedData[date]);

  // Generate color per point (green for increase, red for decrease)
  const pointColors = data.map((value, index) => {
    if (index === 0) return '#3b82f6'; // Default color for first point (blue)
    return value >= data[index - 1] ? '#16a34a' : '#ef4444'; // Green (increase) or Red (decrease)
  });

  // Force chart to re-render when transactions change
  useEffect(() => {
    setChartKey(prev => prev + 1);
  }, [transactions]);

  const options = {
    chart: {
      id: 'visitor-chart',
      toolbar: { show: false },
      animations: {
        enabled: false,
        easing: 'easeinout',
        speed: 800,
      }
    },
    xaxis: { categories },
    yaxis: {
      labels: { formatter: (value) => formatNumber(value) }
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#3b82f6'], // Default blue (not used directly, we set per-point colors)
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        const date = categories[dataPointIndex];

        let trendColor = pointColors[dataPointIndex];
        let trendText = dataPointIndex > 0
          ? value >= data[dataPointIndex - 1] ? '(Increasing)' : '(Decreasing)'
          : '';

        return `<div class="apexcharts-tooltip-title" style="font-weight: bold; margin-bottom: 5px; color: ${trendColor}">
                  ${date}
                </div>
                <div class="apexcharts-tooltip-series-group">
                  <span style="color: ${trendColor}">Grand Total: ${formatNumber(value)}</span>
                  <br><span style="color: ${trendColor}">${trendText}</span>
                </div>`;
      }
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
    markers: {
      size: 5,
      colors: pointColors,
    },
    dataLabels: { enabled: false },
  };

  const series = [{ name: 'Grand Total', data }];

  return (
    <Chart
      key={chartKey}
      options={options}
      series={series}
      type="area"
      height={300}
    />
  );
};

export default AreaLineChart;
