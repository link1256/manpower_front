import vue from 'vue'
import { VBTooltipPlugin } from 'bootstrap-vue'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import stockInit from 'highcharts/modules/stock'
import ExportingHighcharts from 'highcharts/modules/exporting'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import VueCookie from 'vue-cookie'
import { Format } from '~/utils/Format.js'
import { PageStyle } from '~/utils/PageStyle'
import { RequetURL } from '~/utils/RequestUrl'
import 'semantic-ui-css/semantic.min.css'

vue.prototype.Format = Format
vue.prototype.PageStyle = PageStyle
vue.prototype.RequetURL = RequetURL

HighchartsAccessibility(Highcharts)
vue.use(VBTooltipPlugin)
vue.use(HighchartsVue)
vue.use(VueCookie)

Highcharts.setOptions({
  lang: {
    resetZoom: '重新設定範圍'
  }
})

ExportingHighcharts(Highcharts)
stockInit(Highcharts)
