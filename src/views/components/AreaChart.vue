<template>
  <highcharts class="stock" :constructor-type="'stockChart'" :options="stockOptions"></highcharts>
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
          type: "area",
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
          text: "Area Graph",
          style: {
            paddingBottom: "20px",
            font: 'bold 32px "Trebuchet MS", Verdana, sans-serif',
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
        },
        yAxis: {
          title: {
            text: "Completed Quantity",
            style: {
              font: 'bold 32px "Trebuchet MS", Verdana, sans-serif',
            },
          },
          opposite: false,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 2010,
          },
        },
        series: [
          {
            name: "User",
            data: [32, 24, 25, 35, 25],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 750,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticleAlign: "bottom",
                },
              },
            },
          ],
        },
      },
    };
  },
};
</script>