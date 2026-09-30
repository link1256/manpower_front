<template>
  <v-container class="containerForTable">
    <span
      id="centercontent"
      class="topfocus"
      accesskey="C"
      tabindex="0"
      title="中間區塊，主要顯示內容"
      role="button"
      aria-label="中間區塊，主要顯示內容"
      >:::</span
    >
    <div v-if="ShowTable" class="pageitem">
      <v-container class="contanierNonMaxWidth">
        <v-row class="rowPadding">
          <div class="datezone">
            <label
              for="dataselect1"
              style="margin-right: 10px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >統計期</label
            >
            <v-select
              id="dataselect1"
              v-model="StartYear"
              :items="StartYearItems"
              background-color="white"
              class="dataselect"
              title="統計期_起"
              solo
              hide-details
              @change="styearchange"
            ></v-select>
            <label
              for="dataselect2"
              style="margin: 0px 5px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >至</label
            >
            <v-select
              id="dataselect2"
              v-model="EndYear"
              :items="EndYearItems"
              background-color="white"
              class="dataselect"
              title="統計期_迄"
              solo
              hide-details
              @change="etyearchange"
            ></v-select>
            <button
              class="showbtn"
              style="margin-left: 10px;"
              @click="sendyearQuery"
            >
              查詢
            </button>
          </div>
          <div class="showbtnzone">
            <button class="showbtn" @click="research">
              <img
                src="@/assets/images/Btn_Image/search.svg"
                style="margin-bottom: 4px;"
                alt=""
              />
              重新查詢
            </button>
            <downloadbtn2 @downloadclick2="downloadfile"></downloadbtn2>
          </div>
        </v-row>
        <div id="pdfref">
          <v-row class="rowPadding">
            <label style="font-size: 1.75em; font-weight: bold;">
              {{ Title }}
            </label>
          </v-row>
          <v-row v-if="hpdfshow">
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  class="ui button active"
                  role="tab"
                  :aria-selected="ShowTable"
                  @click="ShowTableClick"
                >
                  統計表
                </button>
                <div class="or"></div>
                <button
                  class="ui button"
                  role="tab"
                  :aria-selected="ShowGraph"
                  @click="ShowGraphClick"
                >
                  統計圖
                </button>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <div class="AllRight" style="width: 100%; padding-right: 15px;">
              <label
                style="font-size: 1.125em; font-weight: 400; margin-left: 10px;"
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
                <template v-slot:item.Jan="{ item }">
                  <label class="labelvalue">{{ item.Jan }}</label>
                </template>
                <template v-slot:item.Feb="{ item }">
                  <label class="labelvalue">{{ item.Feb }}</label>
                </template>
                <template v-slot:item.Mar="{ item }">
                  <label class="labelvalue">{{ item.Mar }}</label>
                </template>
                <template v-slot:item.Apr="{ item }">
                  <label class="labelvalue">{{ item.Apr }}</label>
                </template>
                <template v-slot:item.May="{ item }">
                  <label class="labelvalue">{{ item.May }}</label>
                </template>
                <template v-slot:item.Jun="{ item }">
                  <label class="labelvalue">{{ item.Jun }}</label>
                </template>
                <template v-slot:item.Jul="{ item }">
                  <label class="labelvalue">{{ item.Jul }}</label>
                </template>
                <template v-slot:item.Aug="{ item }">
                  <label class="labelvalue">{{ item.Aug }}</label>
                </template>
                <template v-slot:item.Sep="{ item }">
                  <label class="labelvalue">{{ item.Sep }}</label>
                </template>
                <template v-slot:item.Oct="{ item }">
                  <label class="labelvalue">{{ item.Oct }}</label>
                </template>
                <template v-slot:item.Nov="{ item }">
                  <label class="labelvalue">{{ item.Nov }}</label>
                </template>
                <template v-slot:item.Dec="{ item }">
                  <label class="labelvalue">{{ item.Dec }}</label>
                </template>
                <template v-slot:item.CumAvg="{ item }">
                  <label class="labelvalue">{{ item.CumAvg }}</label>
                </template>
                <template v-slot:item.YearAvg="{ item }">
                  <label class="labelvalue">
                    {{ item.YearAvg }}
                  </label>
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
          <div class="datezone">
            <label
              id="dataselect3"
              style="margin-right: 10px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >統計期</label
            >
            <v-select
              id="dataselect3"
              v-model="StartYear"
              :items="StartYearItems"
              class="dataselect"
              title="統計期_起"
              background-color="white"
              solo
              hide-details
              @change="styearchange"
            ></v-select>
            <label
              for="dataselect4"
              style="margin: 0px 5px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >至</label
            >
            <v-select
              id="dataselect4"
              v-model="EndYear"
              :items="EndYearItems"
              class="dataselect"
              title="統計期_迄"
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
              查詢
            </button>
          </div>
          <div class="showbtnzone">
            <button class="showbtn" @click="research">
              <img
                src="@/assets/images/Btn_Image/search.svg"
                style="margin-bottom: 4px;"
                alt=""
              />
              重新查詢
            </button>
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
          </div>
        </v-row>
        <v-row>
          <v-col>
            <div class="ui large buttons">
              <button
                class="ui button"
                role="tab"
                :aria-selected="ShowTable"
                @click="ShowTableClick"
              >
                統計表
              </button>
              <div class="or"></div>
              <button
                class="ui button active"
                role="tab"
                :aria-selected="ShowGraph"
                @click="ShowGraphClick"
              >
                統計圖
              </button>
            </div>
            <label for="dataselect5" style="display: none;">dataselect5</label>
            <v-select
              id="dataselect5"
              v-model="ChartType"
              :items="ChartTypeItems"
              style="float: right; max-width: 200px;"
              title="統計圖"
              background-color="white"
              solo
              hide-details
              @change="setDrawData"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <div class="AllRight" style="width: 100%; padding-right: 15px;">
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
              :ref="'chart'"
              :options="chartOption"
              tabindex="0"
              class="stock"
            ></highcharts>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="AllRight chartinfo">
            <div>
              <span>* 點擊圖例中項目可暫時關閉該項目</span>
              <br />
              <span>* 可用滑鼠拖曳產生區域放大搭配水平卷軸檢視</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="loader" class="fade_cust"></div>
    <div v-if="loader" class="loader"></div>
  </v-container>
</template>
<script>
import html2pdf from 'html2pdf.js'
import qs from 'qs'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import downloadbtn from '~/components/button/downloadbtn'
import downloadbtn2 from '~/components/button/downloadbtn2'
export default {
  components: {
    downloadbtn,
    downloadbtn2
  },
  layout: 'BackStage',
  data() {
    return {
      loader: false,
      SearchType: '',
      ShowTable: true,
      ShowGraph: false,
      Title: '臺灣地區就業者',
      YearInterval: '',
      Unit: '單位: 千人',
      headers: [
        { text: '年月', value: 'Year', align: 'center', width: '8%' },
        { text: '1月', value: 'Jan', align: 'center', width: '6%' },
        { text: '2月', value: 'Feb', align: 'center', width: '6%' },
        { text: '3月', value: 'Mar', align: 'center', width: '6%' },
        { text: '4月', value: 'Apr', align: 'center', width: '6%' },
        { text: '5月', value: 'May', align: 'center', width: '6%' },
        { text: '6月', value: 'Jun', align: 'center', width: '6%' },
        { text: '7月', value: 'Jul', align: 'center', width: '6%' },
        { text: '8月', value: 'Aug', align: 'center', width: '6%' },
        { text: '9月', value: 'Sep', align: 'center', width: '6%' },
        { text: '10月', value: 'Oct', align: 'center', width: '7%' },
        { text: '11月', value: 'Nov', align: 'center', width: '7%' },
        { text: '12月', value: 'Dec', align: 'center', width: '7%' },
        {
          text: '累計平均',
          value: 'CumAvg',
          align: 'center',
          width: '9%'
        },
        { text: '年平均', value: 'YearAvg', align: 'center', width: '8%' }
      ],
      ChartType: 1,
      ChartTypeItems: [
        {
          text: '折線圖(Line chart)',
          value: 1
        },
        {
          text: '柱狀圖(Column chart)',
          value: 2
        }
      ],
      CumAvgLabel: '累計平均',
      items: [],
      drawitems: [],
      chartOption: {},
      StartYear: 107,
      EndYear: 108,
      YearItems: [],
      StartYearItems: [],
      EndYearItems: [],
      hpdfshow: true
    }
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 1)
    const type = this.$route.query.type
    if (!type) {
      _SAlert.Error('參數錯誤!')
      this.$router.push({
        path: '/Common_Inquire/Index'
      })
    }
    this.SearchType = type
    switch (type) {
      case 'PEP':
        this.Title = '臺灣地區就業者'
        break
      case 'PUP':
        this.Title = '臺灣地區失業者'
        break
      case 'NLF':
        this.Title = '臺灣地區非勞動力'
        break
      case 'LAF':
        this.Title = '臺灣地區勞動力'
        break
      case 'FPS':
        this.Title = '臺灣地區15歲以上民間人口'
        break
      case 'LFP':
        this.Title = '臺灣地區勞動力參與率'
        this.Unit = '單位:%'
        break
      case 'UPR':
        this.Title = '臺灣地區失業率'
        this.Unit = '單位:%'
        break
    }
    this.getdata(type)
  },
  methods: {
    research() {
      this.$router.push({
        path: '/Common_Inquire/Index'
      })
    },
    setYearList(data) {
      const vm = this
      const minyear = data.minyear
      const maxyear = data.maxyear
      for (let i = minyear; i <= maxyear; i++) {
        const roc = i - 1911
        const opt = {}
        opt.text = roc + '年'
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
    getdata(searchtype, req) {
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
            op: 'GetIndexData',
            type: searchtype,
            startyear: sy,
            endyear: ey
          })
        )
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data

            if (!req) vm.setYearList(data.MNYear)

            vm.setSingleTable(data.data, searchtype, data.lastmonth)

            /* if (searchtype === 'PEP') vm.setSingleTable(data.PEP, 0)
            else if (searchtype === 'PUP') vm.setSingleTable(data.PUP, 0)
            else if (searchtype === 'NLF') vm.setSingleTable(data.NLF, 0)
            else if (searchtype === 'LAF') vm.setLAFTable(data)
            else if (searchtype === 'FPS') vm.setFPSTable(data)
            else if (searchtype === 'LFP') vm.setLFPTable(data)
            else if (searchtype === 'UPR') vm.setUPRTable(data) */

            vm.setDrawData()
          }
        })
    },
    setLAFTable(data) {
      const newary = []
      const pep = data.PEP
      const pup = data.PUP
      for (let i = 0; i < pep.length; i++) {
        const opt = {}
        opt.YEAR = pep[i].YEAR
        opt.MONTH = pep[i].MONTH
        opt.STAT_VAL = pep[i].STAT_VAL + pup[i].STAT_VAL

        newary.push(opt)
      }
      this.setSingleTable(newary, 0)
    },
    setFPSTable(data) {
      const newary = []
      const pep = data.PEP
      const pup = data.PUP
      const nfl = data.NLF
      for (let i = 0; i < pep.length; i++) {
        const opt = {}
        opt.YEAR = pep[i].YEAR
        opt.MONTH = pep[i].MONTH
        opt.STAT_VAL = pep[i].STAT_VAL + pup[i].STAT_VAL + nfl[i].STAT_VAL

        newary.push(opt)
      }
      this.setSingleTable(newary, 0)
    },
    setLFPTable(data) {
      const newary = []
      const pep = data.PEP
      const pup = data.PUP
      const nfl = data.NLF

      for (let i = 0; i < pep.length; i++) {
        const opt = {}
        opt.YEAR = pep[i].YEAR
        opt.MONTH = pep[i].MONTH
        opt.PEP = pep[i].STAT_VAL
        opt.PUP = pup[i].STAT_VAL
        opt.NLF = nfl[i].STAT_VAL
        opt.STAT_VAL =
          ((pep[i].STAT_VAL + pup[i].STAT_VAL) /
            (pep[i].STAT_VAL + pup[i].STAT_VAL + nfl[i].STAT_VAL)) *
          100

        newary.push(opt)
      }
      this.setPercentTable(newary, 2, 'LFP')
    },
    setUPRTable(data) {
      const newary = []
      const pep = data.PEP
      const pup = data.PUP
      for (let i = 0; i < pep.length; i++) {
        const opt = {}
        opt.YEAR = pep[i].YEAR
        opt.MONTH = pep[i].MONTH
        opt.PEP = pep[i].STAT_VAL
        opt.PUP = pup[i].STAT_VAL
        opt.STAT_VAL =
          (pup[i].STAT_VAL / (pep[i].STAT_VAL + pup[i].STAT_VAL)) * 100

        newary.push(opt)
      }
      this.setPercentTable(newary, 2, 'UPR')
    },
    toCurrency(num) {
      const type = this.$route.query.type

      if (type === 'LFP' || type === 'UPR') {
        const parts = num.toString().split('.')
        if (parts.length === 1) {
          parts[0] = parts[0] + '.00'
          return parts[0]
        } else {
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          if (parts[1].length < 2) parts[1] += '0'
          return parts.join('.')
        }
      } else {
        return num
      }
    },
    setSingleTable(data, type, lastmonth) {
      const vm = this
      const lyear = parseInt(vm.EndYear)
      const fyear = parseInt(vm.StartYear)
      const lmonth = lastmonth
      vm.headers[13].text = '1-' + lmonth + '月累計平均'

      vm.items = []

      for (let i = fyear; i <= lyear; i++) {
        const obj = {
          Year: i - 1911 + '年',
          NYear: i,
          Jan: '-',
          Feb: '-',
          Mar: '-',
          Apr: '-',
          May: '-',
          Jun: '-',
          Jul: '-',
          Aug: '-',
          Sep: '-',
          Oct: '-',
          Nov: '-',
          Dec: '-',
          CumAvg: '-',
          YearAvg: '-'
        }

        for (let j = 1; j <= 12; j++) {
          const sstr = i - 1911 + '年' + ' ' + j + '月'
          const target = data.filter((l) => l.date === sstr)

          if (target.length === 0) continue

          switch (j) {
            case 1:
              if (type === 'PEP') obj.Jan = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Jan = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Jan = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Jan = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Jan = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Jan = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Jan = vm.toCurrency(target[0].UPR)
              break
            case 2:
              if (type === 'PEP') obj.Feb = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Feb = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Feb = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Feb = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Feb = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Feb = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Feb = vm.toCurrency(target[0].UPR)
              break
            case 3:
              if (type === 'PEP') obj.Mar = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Mar = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Mar = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Mar = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Mar = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Mar = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Mar = vm.toCurrency(target[0].UPR)
              break
            case 4:
              if (type === 'PEP') obj.Apr = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Apr = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Apr = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Apr = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Apr = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Apr = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Apr = vm.toCurrency(target[0].UPR)
              break
            case 5:
              if (type === 'PEP') obj.May = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.May = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.May = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.May = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.May = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.May = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.May = vm.toCurrency(target[0].UPR)
              break
            case 6:
              if (type === 'PEP') obj.Jun = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Jun = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Jun = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Jun = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Jun = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Jun = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Jun = vm.toCurrency(target[0].UPR)
              break
            case 7:
              if (type === 'PEP') obj.Jul = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Jul = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Jul = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Jul = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Jul = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Jul = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Jul = vm.toCurrency(target[0].UPR)
              break
            case 8:
              if (type === 'PEP') obj.Aug = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Aug = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Aug = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Aug = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Aug = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Aug = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Aug = vm.toCurrency(target[0].UPR)
              break
            case 9:
              if (type === 'PEP') obj.Sep = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Sep = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Sep = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Sep = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Sep = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Sep = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Sep = vm.toCurrency(target[0].UPR)
              break
            case 10:
              if (type === 'PEP') obj.Oct = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Oct = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Oct = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Oct = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Oct = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Oct = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Oct = vm.toCurrency(target[0].UPR)
              break
            case 11:
              if (type === 'PEP') obj.Nov = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Nov = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Nov = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Nov = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Nov = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Nov = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Nov = vm.toCurrency(target[0].UPR)
              break
            case 12:
              if (type === 'PEP') obj.Dec = vm.toCurrency(target[0].PEP)
              else if (type === 'PUP') obj.Dec = vm.toCurrency(target[0].PUP)
              else if (type === 'NLF') obj.Dec = vm.toCurrency(target[0].NLF)
              else if (type === 'LAF') obj.Dec = vm.toCurrency(target[0].LAF)
              else if (type === 'FPS') obj.Dec = vm.toCurrency(target[0].FPS)
              else if (type === 'LFP') obj.Dec = vm.toCurrency(target[0].LFP)
              else if (type === 'UPR') obj.Dec = vm.toCurrency(target[0].UPR)
              break
          }
        }

        const istr = i - 1911 + ' ' + '年平均'
        const target = data.filter((l) => l.date === istr)
        if (target.length > 0 && target[0].PEP !== 'NaN') {
          if (type === 'PEP') obj.YearAvg = vm.toCurrency(target[0].PEP)
          else if (type === 'PUP') obj.YearAvg = vm.toCurrency(target[0].PUP)
          else if (type === 'NLF') obj.YearAvg = vm.toCurrency(target[0].NLF)
          else if (type === 'LAF') obj.YearAvg = vm.toCurrency(target[0].LAF)
          else if (type === 'FPS') obj.YearAvg = vm.toCurrency(target[0].FPS)
          else if (type === 'LFP') obj.YearAvg = vm.toCurrency(target[0].LFP)
          else if (type === 'UPR') obj.YearAvg = vm.toCurrency(target[0].UPR)
        }

        const cstr = i - 1911 + '年' + ' ' + '1-' + lmonth + '月'
        const target2 = data.filter((l) => l.date === cstr)
        if (target2.length > 0 && target2[0].PEP !== 'NaN') {
          if (type === 'PEP') obj.CumAvg = vm.toCurrency(target2[0].PEP)
          else if (type === 'PUP') obj.CumAvg = vm.toCurrency(target2[0].PUP)
          else if (type === 'NLF') obj.CumAvg = vm.toCurrency(target2[0].NLF)
          else if (type === 'LAF') obj.CumAvg = vm.toCurrency(target2[0].LAF)
          else if (type === 'FPS') obj.CumAvg = vm.toCurrency(target2[0].FPS)
          else if (type === 'LFP') obj.CumAvg = vm.toCurrency(target2[0].LFP)
          else if (type === 'UPR') obj.CumAvg = vm.toCurrency(target2[0].UPR)
        }

        vm.items.push(obj)
      }
    },
    setPercentTable(data, fix, type) {
      const vm = this
      const lyear = parseInt(vm.EndYear)
      const fyear = parseInt(vm.StartYear)
      let cummonth = -1

      vm.items = []

      const tary2 = data.filter((l) => l.YEAR === lyear.toString())
      if (lyear) {
        const count = tary2[tary2.length - 1].MONTH
        vm.headers[13].text = '1-' + count + '月累計平均'
        cummonth = count
      }

      for (let i = fyear; i <= lyear; i++) {
        const tary = data.filter((l) => l.YEAR === i.toString())

        const obj = {
          Year: i - 1911 + '年',
          NYear: i,
          Jan: '-',
          Feb: '-',
          Mar: '-',
          Apr: '-',
          May: '-',
          Jun: '-',
          Jul: '-',
          Aug: '-',
          Sep: '-',
          Oct: '-',
          Nov: '-',
          Dec: '-',
          CumAvg: '-',
          YearAvg: '-'
        }

        vm.items.push(obj)

        let tsum = 0
        let usum = 0
        for (let j = 0; j < tary.length; j++) {
          const month = tary[j].MONTH

          if (type === 'LFP') {
            tsum += tary[j].PEP + tary[j].PUP
            usum += tary[j].PEP + tary[j].PUP + tary[j].NLF
          } else if (type === 'UPR') {
            tsum += tary[j].PUP
            usum += tary[j].PEP + tary[j].PUP
          }

          if (month === cummonth) {
            obj.CumAvg = ((tsum / usum) * 100).toFixed(fix)
            obj.CumAvg = vm.toCurrency(obj.CumAvg)
          }

          if (tary.length === 12) {
            if (j === tary.length - 1) {
              obj.YearAvg = ((tsum / usum) * 100).toFixed(fix)
              obj.YearAvg = vm.toCurrency(obj.YearAvg)
            }
          }

          switch (month) {
            case 1:
              obj.Jan = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 2:
              obj.Feb = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 3:
              obj.Mar = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 4:
              obj.Apr = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 5:
              obj.May = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 6:
              obj.Jun = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 7:
              obj.Jul = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 8:
              obj.Aug = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 9:
              obj.Sep = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 10:
              obj.Oct = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 11:
              obj.Nov = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
            case 12:
              obj.Dec = vm.toCurrency(tary[j].STAT_VAL.toFixed(fix))
              break
          }
        }
      }
    },
    setDrawData() {
      const data = this.items
      let charttype = ''
      if (this.ChartType === 1) charttype = 'line'
      else if (this.ChartType === 2) charttype = 'column'

      const type = this.$route.query.type
      let unit = '千人'
      if (type === 'LFP' || type === 'UPR') unit = '%'

      const obj = {
        chart: {
          type: charttype,
          zoomType: 'xy',
          marginTop: 40
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -10,
            text: unit
          }
        },
        series: []
      }
      if (unit === '千人') {
        obj.yAxis.labels = {}
        obj.yAxis.labels.format = '{value}'
      }
      if (this.ChartType === 1) {
        obj.plotOptions = {}
        const plotobj = {}
        plotobj.line = {}
        plotobj.line.marker = {}
        plotobj.line.marker.enabled = false
        obj.plotOptions = plotobj
      }

      const ser = {}
      ser.name = this.Title
      ser.data = []
      obj.series.push(ser)
      for (let i = 0; i < data.length; i++) {
        for (let j = 1; j <= 12; j++) {
          obj.xAxis.categories.push(data[i].Year + j + '月')
        }
        ser.data.push(parseFloat(data[i].Jan.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Feb.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Mar.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Apr.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].May.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Jun.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Jul.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Aug.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Sep.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Oct.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Nov.toString().replace(/,/gi, '')))
        ser.data.push(parseFloat(data[i].Dec.toString().replace(/,/gi, '')))
      }
      this.chartOption = obj
    },
    ShowTableClick() {
      this.ShowTable = true
      this.ShowGraph = false
    },
    ShowGraphClick() {
      this.ShowTable = false
      this.ShowGraph = true
    },
    downloadImage(type) {
      const vm = this
      const searchtype = this.$route.query.type
      axios.post(
        vm.RequetURL.ajaxurl,
        qs.stringify({ op: 'SetChartCount', type: searchtype })
      )
      this.$refs.chart.chart.exportChart({ type })
    },
    getExcelJString() {
      const vm = this
      const tary = []
      const items = vm.items
      for (let i = 0; i < items.length; i++) {
        const obj = {
          Year: items[i].Year,
          Jan: items[i].Jan,
          Feb: items[i].Feb,
          Mar: items[i].Mar,
          Apr: items[i].Apr,
          May: items[i].May,
          Jun: items[i].Jun,
          Jul: items[i].Jul,
          Aug: items[i].Aug,
          Sep: items[i].Sep,
          Oct: items[i].Oct,
          Nov: items[i].Nov,
          Dec: items[i].Dec,
          CumAvg: items[i].CumAvg,
          TotalAvg: items[i].YearAvg
        }
        tary.push(obj)
      }
      let jstring = JSON.stringify(tary)
      jstring = jstring
        .replace(/Year/g, '年月')
        .replace(/Jan/g, '1月')
        .replace(/Feb/g, '2月')
        .replace(/Mar/g, '3月')
        .replace(/Apr/g, '4月')
        .replace(/May/g, '5月')
        .replace(/Jun/g, '6月')
        .replace(/Jul/g, '7月')
        .replace(/Aug/g, '8月')
        .replace(/Sep/g, '9月')
        .replace(/Oct/g, '10月')
        .replace(/Nov/g, '11月')
        .replace(/Dec/g, '12月')
        .replace(/CumAvg/g, vm.headers[13].text)
        .replace(/TotalAvg/g, '年平均')

      return jstring
    },
    sendyearQuery() {
      const vm = this
      vm.getdata(vm.$route.query.type, true)
    },
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
    },
    downloadfile(type) {
      const vm = this
      const name = vm.Title
      const searchtype = this.$route.query.type
      vm.loader = true
      axios.post(
        vm.RequetURL.ajaxurl,
        qs.stringify({ op: 'SetTableCount', type: searchtype })
      )

      if (type === 'pdf') {
        vm.hpdfshow = false
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
          vm.hpdfshow = true
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
            _SAlert.Error('下載檔案時發生錯誤.')
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
.labelvalue {
  width: 100%;
  text-align: right;
}
</style>
