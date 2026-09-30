<template>
  <v-container class="containerForTable">
    <span
      id="centercontent"
      class="topfocus"
      accesskey="C"
      tabindex="0"
      title="Central content area"
      role="button"
      aria-label="Central content area"
      >:::</span
    >
    <div v-if="ShowTable" class="pageitem">
      <v-container class="contanierNonMaxWidth">
        <v-row class="rowPadding">
          <div class="datezone">
            <label
              for="dataselect1"
              style="margin-right: 10px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >Data Range</label
            >
            <v-select
              id="dataselect1"
              v-model="StartYear"
              :items="StartYearItems"
              class="dataselect"
              title="StartYear"
              background-color="white"
              solo
              hide-details
              @change="styearchange"
            ></v-select>
            <label
              for="dataselect2"
              style="margin: 0px 5px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >to</label
            >
            <v-select
              id="dataselect2"
              v-model="EndYear"
              :items="EndYearItems"
              class="dataselect"
              title="EndYear"
              background-color="white"
              solo
              hide-details
              @change="etyearchange"
            ></v-select>
            <button
              class="showbtn"
              style="margin-left: 10px;"
              @click="sendyearQuery"
            >
              Retrieve Data
            </button>
          </div>
          <div class="showbtnzone">
            <button class="showbtn" @click="research">
              <img
                src="@/assets/images/Btn_Image/search.svg"
                style="margin-bottom: 4px;"
                alt=""
              />
              Reset
            </button>
            <downloadbtn2
              :name="'Download'"
              :items="[
                { title: 'Download XLSX' },
                { title: 'Download ODS' },
                { title: 'Download PDF' }
              ]"
              @downloadclick2="downloadfile"
            ></downloadbtn2>
          </div>
        </v-row>
        <div id="pdfref">
          <v-row class="rowPadding">
            <label style="font-size: 1.75em; font-weight: bold;">
              {{ Title }}
            </label>
          </v-row>
          <v-row class="rowPadding">
            <div style="width: 100%;">
              <label style="font-size: 1.125em; font-weight: 400;">
                {{ YearInterval }}
              </label>
              <label
                style="font-size: 1.125em; font-weight: 400; float: right; margin-right: 10px;"
              >
                {{ Unit }}
              </label>
            </div>
          </v-row>
          <v-row>
            <v-col>
              <v-data-table
                id="reftable"
                :headers="headers"
                :items="items"
                :disable-sort="true"
                :items-per-page="1000"
                hide-default-footer
                class="TableStyle elevation-3"
              >
                <template #[`item.FPS`]="{ item }">
                  <label class="labelvalue">{{ item.FPS }}</label>
                </template>
                <template #[`item.PEP`]="{ item }">
                  <label class="labelvalue">{{ item.PEP }}</label>
                </template>
                <template #[`item.PUP`]="{ item }">
                  <label class="labelvalue">{{ item.PUP }}</label>
                </template>
                <template #[`item.LAF`]="{ item }">
                  <label class="labelvalue">{{ item.LAF }}</label>
                </template>
                <template #[`item.NLF`]="{ item }">
                  <label class="labelvalue">{{ item.NLF }}</label>
                </template>
                <template #[`item.UPR`]="{ item }">
                  <label class="labelvalue">{{ item.UPR }}</label>
                </template>
                <template #[`item.LFP`]="{ item }">
                  <label class="labelvalue">{{ item.LFP }}</label>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
    <div v-if="ShowGraph" class="pageitem">
      <v-container class="contanierNonMaxWidth">
        <v-row class="rowPadding">
          <div class="showbtnzone">
            <button class="showbtn">Reset</button>
            <downloadbtn @downloadclick="downloadImage"></downloadbtn>
          </div>
        </v-row>
        <v-row class="rowPadding">
          <label style="font-size: 1.75em; font-weight: bold;">
            {{ Title }}
          </label>
        </v-row>
        <v-row class="rowPadding">
          <div style="width: 100%;">
            <label style="font-size: 1.125em; font-weight: 400;">
              {{ YearInterval }}
            </label>
            <label
              style="font-size: 1.125em; font-weight: 400; margin-left: 10px;"
            >
              {{ Unit }}
            </label>
          </div>
        </v-row>
        <v-row class="rowPadding">
          <v-col>
            <highcharts
              ref="chart"
              :options="stockOptions"
              :constructor-type="'stockChart'"
              :update-args="[true, false]"
              class="stock"
            ></highcharts>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="loader" class="fade_cust"></div>
    <div v-if="loader" class="loader"></div>
  </v-container>
</template>
<script>
import qs from 'qs'
import html2pdf from 'html2pdf.js'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import downloadbtn from '~/components/button/downloadbtn'
import downloadbtn2 from '~/components/button/downloadbtn2'
export default {
  components: {
    downloadbtn,
    downloadbtn2
  },
  layout: 'BackStage_eng',
  data() {
    return {
      SearchType: '',
      loader: false,
      ShowTable: true,
      ShowGraph: false,
      Title: 'Important Indicators of Manpower Survey (Seasonally Adjusted)',
      YearInterval: '',
      Unit: 'Unit: Thousand Persons, %',
      headers: [
        { text: 'Year/Month', value: 'date', align: 'center', width: '15%' },
        { text: 'Employed', value: 'PEP', align: 'center', width: '13.75%' },
        { text: 'Unemployed', value: 'PUP', align: 'center', width: '13.75%' },
        { text: 'Labor Force', value: 'LAF', align: 'center', width: '13.75%' },
        {
          text: 'Not in Labor Force',
          value: 'NLF',
          align: 'center',
          width: '15%'
        },
        {
          text: 'Unemployment Rate',
          value: 'UPR',
          align: 'center',
          width: '13.75%'
        },
        {
          text: 'Labor Force Participation Rate',
          value: 'LFP',
          align: 'center',
          width: '15%'
        }
      ],
      items: [],
      StartYear: 107,
      EndYear: 108,
      YearItems: [],
      StartYearItems: [],
      EndYearItems: []
    }
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 1)
    this.getdata()
  },
  methods: {
    research() {
      this.$router.push({
        path: '/Common_Inquire/Index_eng'
      })
    },
    getdata(req) {
      const vm = this

      let sy
      let ey
      if (!req) {
        sy = vm.$route.query.startyear
        ey = vm.$route.query.endyear
      } else {
        sy = vm.StartYear
        ey = vm.EndYear
      }

      axios
        .post(
          vm.RequetURL.ajaxurl,
          qs.stringify({
            op: 'GetSeasonIndexData',
            startyear: sy,
            endyear: ey
          })
        )
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data

            if (!req) vm.setYearList(data.MNYear)
            vm.items = []
            const d = data.data
            for (let i = 0; i < d.length; i++) {
              const opt = {}
              opt.FPS = vm.toCurrency(d[i].FPS.toString().replace('NaN', '-'))
              opt.LAF = vm.toCurrency(d[i].LAF.toString().replace('NaN', '-'))
              opt.LFP = vm.toCurrency(
                d[i].LFP.toString().replace('NaN', '-'),
                true
              )
              opt.NLF = vm.toCurrency(d[i].NLF.toString().replace('NaN', '-'))
              opt.PEP = vm.toCurrency(d[i].PEP.toString().replace('NaN', '-'))
              opt.PUP = vm.toCurrency(d[i].PUP.toString().replace('NaN', '-'))
              opt.UPR = vm.toCurrency(
                d[i].UPR.toString().replace('NaN', '-'),
                true
              )
              opt.date = d[i].date_eng

              vm.items.push(opt)
            }
          }
        })
    },
    setYearList(data) {
      const vm = this
      const minyear = data.minyear
      const maxyear = data.maxyear
      for (let i = minyear; i <= maxyear; i++) {
        const roc = i
        const opt = {}
        opt.text = roc
        opt.value = i
        vm.YearItems.push(opt)
      }
      vm.StartYearItems = vm.YearItems
      vm.EndYearItems = vm.YearItems
      const startyear = vm.$route.query.startyear
      const endyear = vm.$route.query.endyear

      if (!startyear && !endyear) {
        if (maxyear - 10 >= 1978) vm.StartYear = maxyear - 10
        else vm.StartYear = 1978

        if (vm.StartYear < minyear) vm.StartYear = minyear

        vm.EndYear = maxyear
        this.styearchange()
        this.etyearchange()
      } else {
        vm.StartYear = parseInt(vm.$route.query.startyear)
        vm.EndYear = parseInt(vm.$route.query.endyear)
      }
    },
    styearchange() {
      const vm = this
      const items = vm.YearItems
      const styear = this.StartYear
      vm.EndYearItems = items.filter((n) => n.value >= styear)
    },
    etyearchange() {
      const vm = this
      const items = vm.YearItems
      const styear = this.EndYear
      vm.StartYearItems = items.filter((n) => n.value <= styear)
    },
    toCurrency(num, ispercent) {
      const parts = num.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      if (ispercent) {
        if (parts[1] && parts[1].length < 2) {
          parts[1] += '0'
        } else if (!parts[1] && num !== '-') {
          parts[0] += '.00'
        }
      }
      return parts.join('.')
    },
    sendyearQuery() {
      const vm = this
      vm.getdata(true)
    },
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
    },
    downloadfile(type) {
      const vm = this
      const name = vm.Title
      vm.loader = true
      axios.post(
        vm.RequetURL.ajaxurl,
        qs.stringify({ op: 'SetTableCount', type: 'ALL' })
      )

      if (type === 'pdf') {
        const opt = {
          pagebreak: { mode: 'avoid-all' },
          margin: [10, 1, 10, 1],
          jsPDF: { orientation: 'l', unit: 'mm', format: [210, 297] }
        }
        const target = document.getElementById('pdfref')
        html2pdf()
          .set(opt)
          .from(target)
          .save('download.pdf')

        setTimeout(function() {
          vm.loader = false
        }, 200)

        return
      }

      const form = new FormData()
      const tar = document.getElementById('reftable')
      const thead = tar.getElementsByTagName('thead')[0]
      const tbody = tar.getElementsByTagName('tbody')[0]

      const trs = thead.getElementsByTagName('tr')
      const result = []
      for (let i = 0; i < trs.length; i++) {
        const ths = trs[i].getElementsByTagName('th')
        const ppt = {}
        ppt.ths = []
        for (let j = 0; j < ths.length; j++) {
          const ts = ths[j]
          const opt = {}
          opt.rowspan = 1
          opt.colspan = 1
          opt.className = ts.className
          opt.value = ts.innerHTML.replace('<span>', '').replace('</span>', '')
          ppt.ths.push(opt)
        }
        result.push(ppt)
      }

      const trs2 = tbody.getElementsByTagName('tr')
      const result2 = []
      for (let i = 0; i < trs2.length; i++) {
        const ths = trs2[i].getElementsByTagName('th')
        const ppt = {}
        ppt.ths = []
        for (let j = 0; j < ths.length; j++) {
          const ts = ths[j]
          const opt = {}
          opt.isth = true
          opt.rowspan = 1
          opt.colspan = 1
          opt.className = ts.className
          opt.value = ts.innerHTML
          ppt.ths.push(opt)
        }
        const tds = trs2[i].getElementsByTagName('td')
        for (let j = 0; j < tds.length; j++) {
          const ts = tds[j]
          const label = ts.getElementsByClassName('labelvalue')
          const opt = {}
          opt.isth = false
          opt.rowspan = 1
          opt.colspan = 1
          opt.className = ts.className

          if (label.length === 0) opt.value = ts.innerHTML
          else opt.value = label[0].innerHTML.trim().replace(/&nbsp;/g, '')

          ppt.ths.push(opt)
        }
        result2.push(ppt)
      }

      const otb = {}
      otb.thead = result
      otb.tbody = result2

      const target = JSON.stringify(otb)
      form.set('html', target)
      form.set('title', name)
      form.set('type', type)
      form.set('unit', vm.Unit)

      axios({
        method: 'post',
        url: vm.RequetURL.exporturl2,
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((Response) => {
        vm.loader = false
        if (typeof Response === 'object' && Response.status === 200) {
          if (
            Response.data.includes('.xlsx') ||
            Response.data.includes('.ods')
          ) {
            const link = document.createElement('a')
            link.href =
              vm.RequetURL.tabledownload + encodeURIComponent(Response.data)
            link.click()
          } else {
            _SAlert.Error('Download is error.')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tagbtn {
  background: #e3e3e3;
  color: #000000;
  border-radius: 5px 5px 0px 0px;
  font-size: 1.375em;
  padding: 15px 50px;
  width: 180px;
  height: 60px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
.tagactive {
  background: #344059;
  color: #ffffff;
}
.graphbtn {
  margin-left: 20px;
}
.showbtnzone {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
}
.showbtn {
  color: #344059;
  background: #ffffff;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.125em;
  padding: 5px 15px;
  margin-right: 10px;
}
.ChartZone {
  width: 100%;
  height: 400px;
  background: #aeaeae;
}
.LegendZone {
  width: 100%;
  height: 90px;
  background: #aeaeae;
}
.stock {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
.datezone {
  display: flex;
  align-items: center;
  min-width: 80%;
}
.dataselect {
  max-width: 140px;
}
.v-data-table-header th {
  text-align: center !important;
}
.labelvalue {
  width: 100%;
  text-align: right;
}
</style>
