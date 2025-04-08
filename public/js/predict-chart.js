document.addEventListener("DOMContentLoaded", function () {
  let predictedOptions = {
      chart: {
          height: "150%",
          maxWidth: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
              enabled: false,
          },
          toolbar: {
              show: true,
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
              shade: "#3B82F6",
              gradientToColors: ["#3B82F6"],
          },
      },
      dataLabels: {
          enabled: false,
      },
      stroke: {
          width: 2,
          curve: 'smooth',
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
              name: "Predicted Sales",
              data: [1200, 1500, 1800, 2000, 2400, 2200, 2500],
              color: "#3B82F6",
          },
      ],
      xaxis: {
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

  if (document.getElementById("predicted-chart") && typeof ApexCharts !== 'undefined') {
      const predictedChart = new ApexCharts(document.getElementById("predicted-chart"), predictedOptions);
      predictedChart.render();
  }
});
