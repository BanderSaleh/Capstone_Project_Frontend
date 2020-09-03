import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import mapInit from 'highcharts/modules/map'
import addWorldMap from './js/worldmap'

stockInit(Highcharts)
mapInit(Highcharts)
addWorldMap(Highcharts)

Vue.use(HighchartsVue)

new Vue({
  el: '#app',
  render: h => h(App)
})

  < script >
  new Vue({
    el: '#app',
    render: h => h(App),
    data() {
      return {
        info: null
      }
    },
    mounted() {
      //here do your request to get data from your API
      //e.i with axios => https://www.npmjs.com/package/axios
      axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(response => (this.info = response))
    }
  })
</script >