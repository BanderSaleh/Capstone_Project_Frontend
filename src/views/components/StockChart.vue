<template>
  <highcharts
    class="stock"
    :constructor-type="'stockChart'"
    :options="stockOptions"
  ></highcharts>
</template>

<style scoped>
.stock {
  width: 70%;
  margin: 0 auto;
}
</style>

<script>
export default {
  data() {
    return {
      stockOptions: {
        chart: {
          type: "line",
          height: 800,
          zoomType: "xy",
        },
        rangeSelector: {
          selected: 1,
        },
        title: {
          text: "",
        },
        subtitle: {
          useHTML: true,
          text: "Line Graph",
          style: {
            paddingBottom: "20px",
            font: 'bold 32px "Trebuchet MS", Verdana, sans-serif',
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          y: 50,
          padding: 3,
          itemMarginTop: 5,
          itemMarginBottom: 5,
          itemStyle: {
            lineHeight: "14px",
          },
        },
        navigator: {
          enabled: false,
        },
        xAxis: {
          title: {
            text: "Date",
            style: {
              font: 'bold 32px "Trebuchet MS", Verdana, sans-serif',
            },
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            crosshair: true,
          },
        },
        series: [
          {
            data: [32, 24, 25, 35, 25],
            name: "User.Current",
          },
        ],
        yAxis: {
          title: {
            text: "Completed Quantity",
            style: {
              font: 'bold 32px "Trebuchet MS", Verdana, sans-serif',
            },
          },
          opposite: false,
        },
      },
    };
  },
};
</script>
