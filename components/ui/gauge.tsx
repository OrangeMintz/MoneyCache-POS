
'use client'

import ReactApexChart from 'react-apexcharts';

const GaugeChart = () => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [255, 255, 255, 255]
      },
    },
    labels: ['Median Ratio'],
  };

  const series = [67]; // Example data

  return (
    <ReactApexChart options={options} series={series} type="radialBar" height={350} />
  );
};

export default GaugeChart;