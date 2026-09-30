<template>
  <div>
    <v-container>
      <v-row v-if="haslayout2">
        <v-col class="AllCenter" style="max-width: 150px;">
          <label for="drawsetselect1" class="titlelabel">選擇繪圖單元:</label>
        </v-col>
        <v-col>
          <v-select
            id="drawsetselect1"
            v-model="selectlevel"
            :items="levelitems"
            class="drawsetselect"
            title="選擇繪圖單元"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="AllCenter" style="max-width: 150px;">
          <span for="drawsetselect2" class="titlelabel">選擇資料屬性:</span>
        </v-col>
        <v-col>
          <v-select
            id="drawsetselect2"
            v-model="selectattrs"
            :items="attritems"
            :multiple="ismult"
            class="multselect drawsetselect"
            title="選擇資料屬性"
            background-color="white"
            solo
            hide-details
            @change="attrschange"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{
                  item.length >= 10 ? item.slice(0, 9) + '...' : item
                }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption"
                >(+{{ selectattrs.length - 1 }} others)</span
              >
            </template></v-select
          >
        </v-col>
      </v-row>
      <v-row v-if="showcity">
        <v-col class="AllCenter" style="max-width: 150px;">
          <label for="drawselect3" class="titlelabel">選擇縣市:</label>
        </v-col>
        <v-col>
          <v-select
            id="drawselect3"
            v-model="selectcity"
            :items="cityitems"
            class="drawsetselect"
            title="選擇縣市"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="showsex">
        <v-col class="AllCenter" style="max-width: 150px;">
          <label for="drawselect4" class="titlelabel">選擇性別:</label>
        </v-col>
        <v-col>
          <v-select
            id="drawselect4"
            v-model="selectsex"
            :items="sexitems"
            class="drawsetselect"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="showstat">
        <v-col class="AllCenter" style="max-width: 150px;">
          <label for="drawselect5" class="titlelabel">選擇統計項:</label>
        </v-col>
        <v-col>
          <v-select
            id="drawselect5"
            v-model="selectstat"
            :items="sitems"
            class="drawsetselect"
            title="選擇統計項"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="AllCenter" style="max-width: 150px;">
          <span for="drawselect6" class="titlelabel">選擇圖表類型:</span>
        </v-col>
        <v-col>
          <v-select
            id="drawselect6"
            v-model="selectchart"
            :items="chartitems"
            class="drawsetselect"
            title="選擇圖表類型"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="modal-footer AllCenter">
          <crosscancel @click.native="closethis"></crosscancel>
          <editbtn :name="'繪製圖表'" @click.native="drawthis"></editbtn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
export default {
  components: {
    crosscancel,
    editbtn
  },
  props: {
    classtype: {
      default: 1,
      type: Number
    },
    statitems: {
      default: new Array(1),
      type: Array
    },
    vindex: {
      default: 1,
      type: Number
    },
    hassex: {
      default: false,
      type: Boolean
    },
    hasstat: {
      default: false,
      type: Boolean
    },
    hascity: {
      default: false,
      type: Boolean
    },
    sexitems: {
      default: new Array(1),
      type: Array
    }
  },
  data() {
    return {
      selectlevel: 1,
      levelitems: [
        { text: '該統計項總計', value: 3 },
        { text: '部分統計項群組合計', value: 2 },
        { text: '單一統計項', value: 1 }
      ],
      selectattrs: -1,
      attritems: [],
      selectchart: -1,
      chartitems: [],
      ismult: false,
      haslayout: false,
      haslayout2: false,
      unit: '',
      selectsex: '',
      selectstat: -1,
      showsex: false,
      showstat: false,
      sitems: [],
      showcity: false,
      selectcity: -1,
      cityitems: [],
      statvisper: false
    }
  },
  mounted() {
    this.attritems = this.statitems
    if (this.classtype !== 1) {
      this.haslayout = true
      this.selectattrs = this.statitems[0]
    } else {
      this.ismult = true
      this.selectattrs = [this.statitems[0]]
    }

    const type = this.$route.query.type
    if (type === 'LFP' || type === 'UPR') this.statvisper = true
    const classes = this.$route.query.classes
    if (classes && (classes.includes('LFP') || classes.includes('UPR')))
      this.statvisper = true

    if (this.hasstat) {
      const cs = classes.split(',')

      for (let i = 0; i < cs.length; i++) {
        const opt = {}
        if (cs[i] === 'FPS') {
          opt.text = '15歲以上民間人口'
          opt.value = '15歲以上民間人口'
        } else if (cs[i] === 'PEP') {
          opt.text = '就業者'
          opt.value = '就業者'
        } else if (cs[i] === 'PUP') {
          opt.text = '失業者'
          opt.value = '失業者'
        } else if (cs[i] === 'LAF') {
          opt.text = '勞動力'
          opt.value = '勞動力'
        } else if (cs[i] === 'NLF') {
          opt.text = '非勞動力'
          opt.value = '非勞動力'
        } else if (cs[i] === 'UPR') {
          opt.text = '失業率'
          opt.value = '失業率'
        } else if (cs[i] === 'LFP') {
          opt.text = '勞動力參與率'
          opt.value = '勞動力參與率'
        }
        this.sitems.push(opt)
      }
      this.selectstat = this.sitems[0].value
    }
    if (this.hascity) {
      const citys = this.$route.query.zone
      const cs = citys.split(',')

      for (let i = 0; i < cs.length; i++) {
        const opt = {}
        const s = this.getRocCity(cs[i].toString())
        opt.text = s
        opt.value = s

        this.cityitems.push(opt)
      }
      this.selectcity = this.cityitems[0].value
    }
    if (this.sexitems.length > 0) this.selectsex = this.sexitems[0]
    this.attrschange()
  },
  methods: {
    closethis() {
      this.selectlevel = 1

      if (this.classtype !== 1) {
        this.haslayout = true
        this.selectattrs = this.statitems[0]
      } else {
        this.ismult = true
        this.selectattrs = [this.statitems[0]]
      }

      if (this.chartitems.length > 0)
        this.selectchart = this.chartitems[0].value
      if (this.sexitems.length > 0) this.selectsex = this.sexitems[0]
      if (this.statitems.length > 0) this.selectstat = this.statitems[0].value
      if (this.cityitems.length > 0) this.selectcity = this.cityitems[0].value

      this.$emit('closeConditions')
    },
    drawthis() {
      const opt = {}

      opt.level = this.selectlevel
      opt.attrs = this.selectattrs
      opt.chart = this.selectchart
      opt.ismult = this.ismult
      opt.unit = this.unit
      opt.index = this.vindex
      opt.sex = this.selectsex
      opt.stat = this.selectstat
      opt.city = this.selectcity

      this.$emit('drawthis', opt)
    },
    checkismixed() {
      const ary = this.selectattrs
      let ismix = false
      let funit = ''

      if (
        ary[0] === '統計值' ||
        ary[0] === '較上期增減值' ||
        ary[0] === '較上年同期增減值'
      ) {
        if (!this.statvisper) funit = '千人'
        else funit = '%'
      } else funit = '%'

      for (let i = 1; i < ary.length; i++) {
        let tarunit = ''
        if (
          ary[i] === '統計值' ||
          ary[i] === '較上期增減值' ||
          ary[i] === '較上年同期增減值'
        ) {
          if (!this.statvisper) tarunit = '千人'
          else tarunit = '%'
        } else tarunit = '%'

        if (tarunit !== '' && tarunit !== funit) {
          ismix = true
        }
      }

      if (!ismix) this.unit = funit

      return ismix
    },
    checkismixed2() {
      const classes = this.$route.query.classes

      let tuni = false
      let puni = false
      if (
        classes.includes('FPS') ||
        classes.includes('PEP') ||
        classes.includes('PUP') ||
        classes.includes('LAF') ||
        classes.includes('NLF')
      ) {
        tuni = true
      }
      if (classes.includes('UPR') || classes.includes('LFP')) {
        puni = true
      }

      if (tuni === true && puni === true) return true

      return false
    },
    attrschange() {
      this.showsex = false
      this.showstat = false
      this.showcity = false

      const smix = this.checkismixed2()

      if (smix) {
        this.chartitems = [
          { text: '雙軸長條圖', value: 'sp_mixbar' },
          { text: '雙軸折線圖', value: 'sp_mixline' },
          { text: '雙軸混合圖', value: 'sp_mixchart' }
        ]
        this.unit = '千人,%'
      } else if (this.ismult) {
        if (this.selectattrs.length === 1) {
          if (this.selectattrs[0] === '統計值') {
            this.chartitems = [
              { text: '長條圖', value: 'column' },
              { text: '折線圖', value: 'line' }
            ]
            if (!this.statvisper) this.unit = '千人'
            else this.unit = '%'
          } else if (
            this.selectattrs[0] === '較上期增減值(百分點)' ||
            this.selectattrs[0] === '較上期增減值' ||
            this.selectattrs[0] === '較上期增減百分點'
          ) {
            this.chartitems = [
              { text: '長條圖', value: 'column' },
              { text: '折線圖', value: 'line' }
            ]
            if (!this.statvisper) this.unit = '千人'
            else this.unit = '%'
          } else if (
            this.selectattrs[0] === '較上年同期增減值(百分點)' ||
            this.selectattrs[0] === '較上年同期增減值' ||
            this.selectattrs[0] === '較上年同期增減百分點'
          ) {
            this.chartitems = [
              { text: '長條圖', value: 'column' },
              { text: '折線圖', value: 'line' }
            ]
            if (!this.statvisper) this.unit = '千人'
            else this.unit = '%'
          } else if (
            this.selectattrs[0] === '結構比' ||
            this.selectattrs[0] === '性別結構比'
          ) {
            this.chartitems = [
              { text: '百分比區域圖', value: 'percentzone' },
              { text: '百分比長條圖', value: 'percentbar' }
            ]
            if (this.hassex) this.showsex = true
            if (this.hasstat) this.showstat = true
            if (this.hascity) this.showcity = true
            this.unit = '%'
          } else if (this.selectattrs[0] === '較上期增減率') {
            this.chartitems = [
              { text: '長條圖', value: 'column' },
              { text: '折線圖', value: 'line' }
            ]
            this.unit = '%'
          } else if (this.selectattrs[0] === '較上年同期增減率') {
            this.chartitems = [
              { text: '長條圖', value: 'column' },
              { text: '折線圖', value: 'line' }
            ]
            this.unit = '%'
          }
        } else {
          const ismix = this.checkismixed()
          if (!ismix) {
            this.chartitems = [
              { text: '長條圖', value: 'column' },
              { text: '折線圖', value: 'line' }
            ]
          } else {
            this.chartitems = [
              { text: '雙軸長條圖', value: 'mixbar' },
              { text: '雙軸折線圖', value: 'mixline' },
              { text: '雙軸混合圖', value: 'mixchart' }
            ]
            this.unit = '千人,%'
          }
        }
      } else if (this.selectattrs === '統計值') {
        this.chartitems = [
          { text: '長條圖', value: 'column' },
          { text: '折線圖', value: 'line' }
        ]
        if (!this.statvisper) this.unit = '千人'
        else this.unit = '%'
      } else if (
        this.selectattrs === '較上期增減值' ||
        this.selectattrs === '較上期增減值(百分點)' ||
        this.selectattrs === '較上期增減百分點'
      ) {
        this.chartitems = [
          { text: '長條圖', value: 'column' },
          { text: '折線圖', value: 'line' }
        ]
        if (!this.statvisper) this.unit = '千人'
        else this.unit = '%'
      } else if (
        this.selectattrs === '較上年同期增減值' ||
        this.selectattrs === '較上年同期增減值(百分點)' ||
        this.selectattrs === '較上年同期增減百分點'
      ) {
        this.chartitems = [
          { text: '長條圖', value: 'column' },
          { text: '折線圖', value: 'line' }
        ]
        if (!this.statvisper) this.unit = '千人'
        else this.unit = '%'
      } else if (
        this.selectattrs === '結構比' ||
        this.selectattrs === '性別結構比'
      ) {
        this.chartitems = [
          { text: '百分比區域圖', value: 'percentzone' },
          { text: '百分比長條圖', value: 'percentbar' }
        ]
        if (this.hassex) this.showsex = true
        if (this.hasstat) this.showstat = true
        if (this.hascity) this.showcity = true
        this.unit = '%'
      } else if (this.selectattrs === '較上期增減率') {
        this.chartitems = [
          { text: '長條圖', value: 'column' },
          { text: '折線圖', value: 'line' }
        ]
        this.unit = '%'
      } else if (this.selectattrs === '較上年同期增減率') {
        this.chartitems = [
          { text: '長條圖', value: 'column' },
          { text: '折線圖', value: 'line' }
        ]
        this.unit = '%'
      }

      this.selectchart = this.chartitems[0].value
    },
    getRocCity(zone) {
      switch (zone) {
        case '1':
          return '臺灣地區'
        case '2':
          return '北部區域'
        case '3':
          return '新北市'
        case '4':
          return '臺北市'
        case '6':
          return '基隆市'
        case '5':
          return '桃園市'
        case '7':
          return '新竹市'
        case '8':
          return '宜蘭縣'
        case '9':
          return '新竹縣'
        case '10':
          return '中部區域'
        case '11':
          return '臺中市'
        case '12':
          return '苗栗縣'
        case '13':
          return '彰化縣'
        case '14':
          return '南投縣'
        case '15':
          return '雲林縣'
        case '16':
          return '東部區域'
        case '17':
          return '臺東縣'
        case '18':
          return '花蓮縣'
        case '19':
          return '南部區域'
        case '20':
          return '臺南市'
        case '21':
          return '高雄市'
        case '22':
          return '嘉義市'
        case '23':
          return '嘉義縣'
        case '24':
          return '屏東縣'
        case '25':
          return '澎湖縣'
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="scss" scope>
.titlelabel {
  font-weight: bold;
  font-size: 1.125em;
}
.drawsetselect {
  max-width: 296px !important;
}
</style>
