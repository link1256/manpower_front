<template>
  <div>
    <v-container>
      <v-row v-if="haslayout2">
        <v-col class="AllCenter" style="max-width: 150px;">
          <span class="titlelabel">Select Draw Unit:</span>
        </v-col>
        <v-col>
          <v-select
            v-model="selectlevel"
            :items="levelitems"
            class="drawsetselect"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="AllCenter" style="max-width: 150px;">
          <span class="titlelabel">Select View of The Data:</span>
        </v-col>
        <v-col>
          <v-select
            v-model="selectattrs"
            :items="attritems"
            :multiple="ismult"
            class="multselect drawsetselect"
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
          <span class="titlelabel">Select City:</span>
        </v-col>
        <v-col>
          <v-select
            v-model="selectcity"
            :items="cityitems"
            class="drawsetselect"
            title="drawselect"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="showsex">
        <v-col class="AllCenter" style="max-width: 150px;">
          <span class="titlelabel">Select Sex:</span>
        </v-col>
        <v-col>
          <v-select
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
          <span class="titlelabel">Select Statistics:</span>
        </v-col>
        <v-col>
          <v-select
            v-model="selectstat"
            :items="sitems"
            class="drawsetselect"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="AllCenter" style="max-width: 150px;">
          <span class="titlelabel">Select Graph Type:</span>
        </v-col>
        <v-col>
          <v-select
            v-model="selectchart"
            :items="chartitems"
            class="drawsetselect"
            background-color="white"
            solo
            hide-details
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="modal-footer AllCenter">
          <crosscancel :name="'Close'" @click.native="closethis"></crosscancel>
          <editbtn :name="'GO'" @click.native="drawthis"></editbtn>
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
      selectsex: 1,
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
    if (classes.includes('LFP') || classes.includes('UPR'))
      this.statvisper = true

    if (this.hasstat) {
      const classes = this.$route.query.classes
      const cs = classes.split(',')

      for (let i = 0; i < cs.length; i++) {
        const opt = {}
        if (cs[i] === 'FPS') {
          opt.text = 'Civilian Population Age 15 & Above'
          opt.value = 'Civilian Population Age 15 & Above'
        } else if (cs[i] === 'PEP') {
          opt.text = 'Employed'
          opt.value = 'Employed'
        } else if (cs[i] === 'PUP') {
          opt.text = 'Unemployed'
          opt.value = 'Unemployed'
        } else if (cs[i] === 'LAF') {
          opt.text = 'Labor Force'
          opt.value = 'Labor Force'
        } else if (cs[i] === 'NLF') {
          opt.text = 'Not in Labor Force'
          opt.value = 'Not in Labor Force'
        } else if (cs[i] === 'UPR') {
          opt.text = 'Unemployment Rate'
          opt.value = 'Unemployment Rate'
        } else if (cs[i] === 'LFP') {
          opt.text = 'Labor Force Participation Rate'
          opt.value = 'Labor Force Participation Rate'
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
        ary[0] === 'Data value' ||
        ary[0] === 'Change from previous period (level, percentage point)' ||
        ary[0] === 'Change from that of previous year (level, percentage point)'
      ) {
        if (!this.statvisper) funit = 'Thousand Persons'
        else funit = '%'
      } else funit = '%'

      for (let i = 1; i < ary.length; i++) {
        let tarunit = ''
        if (
          ary[i] === 'Data value' ||
          ary[i] === 'Change from previous period (level, percentage point)' ||
          ary[i] ===
            'Change from that of previous year (level, percentage point)'
        ) {
          if (!this.statvisper) tarunit = 'Thousand Persons'
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
          { text: 'Multiple Axes(Bar Chart)', value: 'sp_mixbar' },
          { text: 'Multiple Axes(Line Chart)', value: 'sp_mixline' },
          { text: 'Multiple Axes(Bar&Line)', value: 'sp_mixchart' }
        ]
        this.unit = 'Thousand Persons,%'
      } else if (this.ismult) {
        if (this.selectattrs.length === 1) {
          if (this.selectattrs[0] === 'Data value') {
            this.chartitems = [
              { text: 'Bar Chart', value: 'column' },
              { text: 'Line Chart', value: 'line' }
            ]
            if (!this.statvisper) this.unit = 'Thousand Persons'
            else this.unit = '%'
          } else if (
            this.selectattrs[0] ===
            'Change from previous period (level, percentage point)'
          ) {
            this.chartitems = [
              { text: 'Bar Chart', value: 'column' },
              { text: 'Line Chart', value: 'line' }
            ]
            if (!this.statvisper) this.unit = 'Thousand Persons'
            else this.unit = '%'
          } else if (
            this.selectattrs[0] ===
            'Change from that of previous year (level, percentage point)'
          ) {
            this.chartitems = [
              { text: 'Bar Chart', value: 'column' },
              { text: 'Line Chart', value: 'line' }
            ]
            if (!this.statvisper) this.unit = 'Thousand Persons'
            else this.unit = '%'
          } else if (this.selectattrs[0] === '% of Total') {
            this.chartitems = [
              { text: 'Area Chart', value: 'percentzone' },
              { text: 'Stacked Column Chart', value: 'percentbar' }
            ]
            if (this.hassex) this.showsex = true
            if (this.hasstat) this.showstat = true
            if (this.hascity) this.showcity = true
            this.unit = '%'
          } else if (
            this.selectattrs[0] === 'Change in percent from previous period'
          ) {
            this.chartitems = [
              { text: 'Bar Chart', value: 'column' },
              { text: 'Line Chart', value: 'line' }
            ]
            this.unit = '%'
          } else if (
            this.selectattrs[0] ===
            'Change in percent from that of previous year'
          ) {
            this.chartitems = [
              { text: 'Bar Chart', value: 'column' },
              { text: 'Line Chart', value: 'line' }
            ]
            this.unit = '%'
          }
        } else {
          const ismix = this.checkismixed()
          if (!ismix) {
            this.chartitems = [
              { text: 'Bar Chart', value: 'column' },
              { text: 'Line Chart', value: 'line' }
            ]
            if (!this.statvisper) this.unit = 'Thousand Persons'
            else this.unit = '%'
          } else {
            this.chartitems = [
              { text: 'Multiple Axes(Bar Chart)', value: 'mixbar' },
              { text: 'Multiple Axes(Line Chart)', value: 'mixline' },
              { text: 'Multiple Axes(Bar&Line)', value: 'mixchart' }
            ]
            this.unit = 'Thousand Persons,%'
          }
        }
      } else if (this.selectattrs === 'Data value') {
        this.chartitems = [
          { text: 'Bar Chart', value: 'column' },
          { text: 'Line Chart', value: 'line' }
        ]
        if (!this.statvisper) this.unit = 'Thousand Persons'
        else this.unit = '%'
      } else if (
        this.selectattrs ===
        'Change from previous period (level, percentage point)'
      ) {
        this.chartitems = [
          { text: 'Bar Chart', value: 'column' },
          { text: 'Line Chart', value: 'line' }
        ]
        if (!this.statvisper) this.unit = 'Thousand Persons'
        else this.unit = '%'
      } else if (
        this.selectattrs ===
        'Change from that of previous year (level, percentage point)'
      ) {
        this.chartitems = [
          { text: 'Bar Chart', value: 'column' },
          { text: 'Line Chart', value: 'line' }
        ]
        if (!this.statvisper) this.unit = 'Thousand Persons'
        else this.unit = '%'
      } else if (this.selectattrs === '% of Total') {
        this.chartitems = [
          { text: 'Area Chart', value: 'percentzone' },
          { text: 'Stacked Column Chart', value: 'percentbar' }
        ]
        if (this.hassex) this.showsex = true
        if (this.hasstat) this.showstat = true
        if (this.hascity) this.showcity = true
        this.unit = '%'
      } else if (
        this.selectattrs === 'Change in percent from previous period'
      ) {
        this.chartitems = [
          { text: 'Bar Chart', value: 'column' },
          { text: 'Line Chart', value: 'line' }
        ]
        this.unit = '%'
      } else if (
        this.selectattrs === 'Change in percent from that of previous year'
      ) {
        this.chartitems = [
          { text: 'Bar Chart', value: 'column' },
          { text: 'Line Chart', value: 'line' }
        ]
        this.unit = '%'
      }

      this.selectchart = this.chartitems[0].value
    },
    getRocCity(zone) {
      switch (zone) {
        case '1':
          return 'Taiwan Area'
        case '2':
          return 'Northern region'
        case '3':
          return 'New Taipei City'
        case '4':
          return 'Taipei City'
        case '6':
          return 'Keelung City'
        case '5':
          return 'Taoyuan City'
        case '7':
          return 'Hsinchu City'
        case '8':
          return 'Yilan County'
        case '9':
          return 'Hsinchu County'
        case '10':
          return 'Central region'
        case '11':
          return 'Taichung City'
        case '12':
          return 'Miaoli County'
        case '13':
          return 'Changhua County'
        case '14':
          return 'Nantou County'
        case '15':
          return 'Yunlin County'
        case '16':
          return 'Eastern region'
        case '17':
          return 'Taitung County'
        case '18':
          return 'Hualien County'
        case '19':
          return 'Southern region'
        case '20':
          return 'Tainan City'
        case '21':
          return 'Kaohsiung City'
        case '22':
          return 'Chiayi City'
        case '23':
          return 'Chiayi County'
        case '24':
          return 'Pingtung County'
        case '25':
          return 'Penghu County'
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
