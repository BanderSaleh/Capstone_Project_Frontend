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
          marginLeft: 150,
          zoomType: "xy",
        },
        rangeSelector: {
          selected: 1,
        },
        title: {
          text: "Completed Shopping Quantity vs Date Completed!",
        },
        subtitle: {
          text: "Area Graph",
        },
        navigator: {
          enabled: false,
        },
        xAxis: {
          accessibility: {
            rangeDescription: "Range: 2010 to 2017",
          },
          scrollbar: {
            enabled: false,
          },
        },
        yAxis: {
          title: {
            text: "Completed Shopping Quantity",
          },
          opposite: false,
        },
        legend: {
          layout: "verticle",
          align: "right",
          verticleAlign: "middle",
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
            name: "Installation",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
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