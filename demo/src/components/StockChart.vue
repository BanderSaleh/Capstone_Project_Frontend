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
        rangeSelector: {
          enabled: false,
        },
        title: {
          text: "Line Graph",
        },
        series: [
          {
            name: "Line Graph",
            data: [10, 20, 10, 23, 65, 121, 44, 66, 98, 30, 32, 56, 25, 12, 53],
            pointStart: Date.PST(2020, 1, 1),
            pointInterval: 1000 * 3600 * 24,
            tooltip: {
              valueDecimals: 2,
            },
          },
        ],
      },
    };
  },
};
</script>
