<template>
  <div class="tablezone tablezonenone wrapper">
    <vue-pivottable
      :key="pkey"
      :data="items"
      :rows="tablerows"
      :cols="tablecols"
      :vals="values"
      :row-total="false"
      :col-total="false"
      :show-root-label="false"
      :default-number-format="defaultFormat"
      :except-format-list="formatList"
      :for-float-thead="true"
      :sorters="{
        s_e: sexsort,
        st_e: statisticssort,
        c_e: classessort,
        d_e: datesort
      }"
      aggregator-name="Sum"
      renderer-name="Table"
    >
    </vue-pivottable>
  </div>
</template>
<script>
import $ from 'jquery'
import VuePivottable from '~/pivottable/Pivottable'
export default {
  components: {
    VuePivottable
  },
  props: {
    items: {
      default: new Array(0),
      type: Array
    },
    pkey: {
      default: 0,
      type: Number
    },
    tablerows: {
      default: new Array(0),
      type: Array
    },
    tablecols: {
      default: new Array(0),
      type: Array
    },
    values: {
      default: new Array(0),
      type: Array
    },
    needref: {
      default: false,
      type: Boolean
    },
    sexSort: {
      default: new Array(0),
      type: Array
    },
    masterSort: {
      default: new Array(0),
      type: Array
    },
    statisticsSort: {
      default: new Array(0),
      type: Array
    },
    classesSort: {
      default: new Array(0),
      type: Array
    },
    dateSort: {
      default: new Array(0),
      type: Array
    },
    defaultFormat: {
      default: new Array(0),
      type: Array
    },
    formatList: {
      default: new Array(0),
      type: Array
    }
  },
  data() {
    return {}
  },
  updated() {
    if (this.needref) {
      this.headerfloat()
      this.needref = false
    }
    this.tablecolorset()
    this.setRowFrezze()
  },
  created() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('resize', this.floatheaderfixed)
  },
  destroyed() {
    window.removeEventListener('resize', this.floatheaderfixed)
  },
  methods: {
    headerfloat() {
      const $table = $('.pvtTable')
      $table.floatThead({
        scrollContainer($table) {
          return $table.closest('.wrapper')
        },
        zIndex: 2
      })

      const colt = $('.floatThead-table')
      const tart = $('.tablezone .pvtTable')

      for (let j = 0; j < tart.length; j++) {
        if (colt[j]) {
          $(colt[j]).css('table-layout', 'auto')
        }
      }
    },
    disheaderfloat() {
      const $table = $('.pvtTable')
      $table.floatThead('destroy')
    },
    floatheaderfixed() {
      setTimeout(function() {
        const colg = $('.floatThead-table colgroup col')
        const targ = $('.floatThead-col')

        for (let i = 0; i < targ.length; i++) {
          const width = $(targ[i]).width()
          if (targ[i]) {
            $(colg[i]).width(width)
          }
        }
      }, 100)
    },
    setRowFrezze() {
      const len = this.tablerows.length

      const tables = document.getElementsByClassName('pvtTable')
      if (tables.length === 0) return

      for (let c = 0; c < tables.length; c++) {
        const table = tables[c]
        if (table) {
          let body = table.getElementsByTagName('tbody')
          if (body.length > 0) body = body[0]
          else continue

          const trs = body.getElementsByTagName('tr')
          for (let k = 0; k < trs.length; k++) {
            const ths = trs[k].getElementsByTagName('th')
            if (ths.length !== len) {
              for (let n = 0; n < ths.length; n++) {
                ths[n].className += ' th_' + (len - ths.length + n + 1)
              }
            }
          }
        }
      }
    },
    getEngMonthNumber(m) {
      switch (m) {
        case 'Jan':
          return 1
        case 'Feb':
          return 2
        case 'Mar':
          return 3
        case 'Apr':
          return 4
        case 'May':
          return 5
        case 'June':
          return 6
        case 'July':
          return 7
        case 'Aug':
          return 8
        case 'Sept':
          return 9
        case 'Oct':
          return 10
        case 'Nov':
          return 11
        case 'Dec':
          return 12
        default:
          return ''
      }
    },
    datesort(a, b) {
      const aa = a.split(' ')
      const bb = b.split(' ')

      if (this.infotype === 1) {
        const ay = parseInt(aa[1])
        const by = parseInt(bb[1])

        if (ay > by || ay < by) return ay - by
        else if (ay === by) {
          const am = this.getEngMonthNumber(aa[0])
          const bm = this.getEngMonthNumber(bb[0])

          return am - bm
        }
      } else if (this.infotype === 2) {
        const ay = parseInt(aa[0])
        const by = parseInt(bb[0])

        return ay - by
      } else if (this.infotype === 3) {
        const ay = parseInt(aa[3])
        const by = parseInt(bb[3])

        if (ay > by || ay < by) return ay - by
        else if (ay === by) {
          const am = this.getEngMonthNumber(aa[2])
          const bm = this.getEngMonthNumber(bb[2])

          return am - bm
        }
      }
      return a - b
    },
    sexsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.sexSort.length; i++) {
        if (this.sexSort[i] === a) ia = i
        if (this.sexSort[i] === b) ib = i
      }
      return ia - ib
    },
    mastersort(a, b) {
      if (!this.masterSort) return
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.masterSort.length; i++) {
        if (this.masterSort[i].name === a) ia = i
        if (this.masterSort[i].name === b) ib = i
      }
      return ia - ib
    },
    statisticssort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.statisticsSort.length; i++) {
        if (this.statisticsSort[i].name === a) ia = i
        if (this.statisticsSort[i].name === b) ib = i
      }
      return ia - ib
    },
    classessort(a, b) {
      if (!this.classesSort) return
      let ia = -1
      let ib = -1

      for (let i = 0; i < this.classesSort.length; i++) {
        if (this.classesSort[i].name === a && ia === -1) ia = i
        if (this.classesSort[i].name === b && ib === -1) ib = i
      }
      return ia - ib
    },
    citysort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.citySort.length; i++) {
        if (this.citySort[i].name === a) ia = i
        if (this.citySort[i].name === b) ib = i
      }
      return ia - ib
    },
    tablecolorset() {
      const tables = document.getElementsByClassName('floatThead-table')
      if (tables.length === 0) return

      const table = tables[0]
      const layout = this.classesSort
      this.setstatisticscolor(table, layout)
    },
    getlayoutlevel(str, layouts) {
      for (let i = 0; i < layouts.length; i++) {
        if (str === layouts[i].name) return layouts[i].level
      }
      return '-1'
    },
    setstatisticscolor(table, layouts) {
      const row = this.tablerows
      const col = this.tablecols
      let i, j

      for (i = 0; i < row.length; i++) {
        if (row[i] === 'c') break
      }
      for (j = 0; j < col.length; j++) {
        if (col[j] === 'c') break
      }

      if (table && i !== row.length) {
        let body = table.getElementsByTagName('tbody')
        if (body.length > 0) body = body[0]
        else return
        const trs = body.getElementsByTagName('tr')

        for (let k = 0; k < trs.length; k++) {
          const ths = trs[k].getElementsByTagName('th')
          let th
          if (ths.length < row.length) th = ths[i - 1]
          else th = ths[i]

          if (th) {
            if (layouts.length === 0) th.className = 'pvtRowLabel slevel3'
            else {
              const thinner = th.innerHTML
              const lvl = this.getlayoutlevel(thinner, layouts)
              th.className = 'pvtRowLabel slevel' + lvl
            }
          }
        }
      }
      if (table && j !== col.length) {
        let head = table.getElementsByTagName('thead')
        if (head.length > 0) head = head[0]
        let tr = head.getElementsByTagName('tr')
        if (tr.length && tr.length > 0) tr = tr[j]
        else return
        const ths = tr.getElementsByTagName('th')

        if (layouts.length === 0) {
          for (let k = 0; k < ths.length; k++) {
            if (ths[k].className === 'pvtAxisLabel' || ths[k].className === '')
              continue
            ths[k].className = 'pvtColLabel slevel3'
          }
        } else {
          for (let k = 0; k < ths.length; k++) {
            if (ths[k].className === 'pvtAxisLabel' || ths[k].className === '')
              continue
            const thinner = ths[k].innerHTML
            const lvl = this.getlayoutlevel(thinner, layouts)
            ths[k].className = 'pvtColLabel slevel' + lvl
          }
        }
      }
    }
  }
}
</script>
