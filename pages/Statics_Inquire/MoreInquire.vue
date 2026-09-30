<template>
  <div class="PageDefault AllTopCenter">
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
    <div class="pageitem_2">
      <v-container>
        <v-row>
          <v-col>
            <span style="font-size: 1.75em; color: #292B3B; font-weight: bold;"
              >統計項查詢-更多資料查詢</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; align-items: center; min-width: 80%;">
            <label for="dataselect1" class="statspan">統計期</label>
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
            <label for="dataselect2" class="nospan">至</label>
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
            <label for="dataselect3" class="cyclespan rwdcycle1">週期</label>
            <v-select
              id="dataselect3"
              v-model="InfoType"
              :items="InfoItems"
              class="dataselect rwdcycle1"
              title="週期"
              style="margin-right: 10px;"
              background-color="white"
              solo
              hide-details
              @change="itypechange"
            ></v-select>
            <v-select
              v-if="InfoType == 1"
              id="dataselect3"
              v-model="SelectSecound"
              :items="MonthItems"
              class="dataselect rwdcycle1"
              title="週期1"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <v-select
              v-if="InfoType == 2"
              id="dataselect3"
              v-model="SelectSecound"
              :items="YearInfoItems"
              class="dataselect rwdcycle1"
              title="週期2"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <v-select
              v-if="InfoType == 3"
              id="dataselect3"
              v-model="SelectSecound"
              :items="SumAverageItems"
              class="dataselect rwdcycle1"
              title="週期3"
              background-color="white"
              solo
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="forphonerow">
          <v-col style="min-width: 60%; display: flex; align-items: center;">
            <label for="dataselect4" class="cyclespan" style="margin-left: 0px;"
              >週期</label
            >
            <v-select
              id="dataselect4"
              v-model="InfoType"
              :items="InfoItems"
              class="dataselect"
              title="週期"
              style="margin-right: 10px;"
              background-color="white"
              solo
              hide-details
              @change="itypechange"
            ></v-select>
            <v-select
              v-if="InfoType == 1"
              id="dataselect4"
              v-model="SelectSecound"
              :items="MonthItems"
              class="dataselect"
              title="週期1"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <v-select
              v-if="InfoType == 2"
              id="dataselect4"
              v-model="SelectSecound"
              :items="YearInfoItems"
              class="dataselect"
              title="週期2"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <v-select
              v-if="InfoType == 3"
              id="dataselect4"
              v-model="SelectSecound"
              :items="SumAverageItems"
              class="dataselect"
              title="週期3"
              background-color="white"
              solo
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="btnzone">
              <div class="zoneitem">
                <div class="imageitem">
                  <img
                    src="@/assets/images/MoreInquire/15歲以上民間人口.svg"
                    alt=""
                  />
                </div>
                <commonbtn
                  :name="'15歲以上民間人口'"
                  @click.native="openCheckList(1, '15歲以上民間人口', 'FPS')"
                ></commonbtn>
              </div>

              <div class="zoneitem">
                <div class="imageitem">
                  <img src="@/assets/images/MoreInquire/勞動力.svg" alt="" />
                </div>
                <commonbtn
                  :name="'勞動力'"
                  @click.native="openCheckList(2, '勞動力', 'LAF')"
                ></commonbtn>
                <commonbtn
                  :name="'勞動力參與率'"
                  @click.native="openCheckList(3, '勞動力參與率', 'LFP')"
                ></commonbtn>
              </div>

              <div class="zoneitem">
                <div class="imageitem">
                  <img src="@/assets/images/MoreInquire/非勞動力.svg" alt="" />
                </div>
                <commonbtn
                  :name="'非勞動力'"
                  @click.native="openCheckList(4, '非勞動力', 'NLF')"
                ></commonbtn>
              </div>

              <div class="zoneitem">
                <div class="imageitem">
                  <img src="@/assets/images/MoreInquire/就業者.svg" alt="" />
                </div>
                <commonbtn
                  :name="'就業者'"
                  @click.native="openCheckList(5, '就業者', 'PEP')"
                ></commonbtn>
              </div>

              <div class="zoneitem">
                <div class="imageitem">
                  <img src="@/assets/images/MoreInquire/失業者.svg" alt="" />
                </div>
                <commonbtn
                  :name="'失業者'"
                  @click.native="openCheckList(6, '失業者', 'PUP')"
                ></commonbtn>
                <commonbtn
                  :name="'失業率'"
                  @click.native="openCheckList(7, '失業率', 'UPR')"
                ></commonbtn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!--統計項查詢 START-->
      <v-dialog
        v-model="CheckListOpen"
        max-width="800"
        persistent
        scrollable
        retain-focus
      >
        <div
          ref="dialogContent"
          class="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div
            class="dialogclose"
            tabindex="0"
            role="button"
            aria-label="關閉"
            @click="CheckListOpen = false"
            @keyup.enter="CheckListOpen = false"
          >
            X
          </div>

          <div class="modal-header AllCenter">
            <label id="dialog-title">{{ deftitle }}</label>
          </div>

          <div class="modal-body">
            <v-container>
              <QueryConditions
                :key="idx"
                :check-list-type="checkListType"
                :startyear="StartYear"
                :endyear="EndYear"
                :infotype="InfoType"
                :cycletype="SelectSecound"
                :ispercent="IsPercent"
                :needsex="NeedSex"
                @closeConditions="CheckListOpen = false"
                @sendQuery="SendQuery"
              ></QueryConditions>
            </v-container>
          </div>
        </div>
      </v-dialog>
      <!--統計項查詢 END-->
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import commonbtn from '~/components/button/commonbtn'
import QueryConditions from '~/components/MoreInquire/QueryConditions'
export default {
  name: 'CachePage',
  components: {
    commonbtn,
    QueryConditions
  },
  layout: 'BackStage',
  data() {
    return {
      CheckListOpen: false,
      deftitle: '',
      StartYear: 107,
      EndYear: 108,
      InfoType: 1,
      SelectSecound: 0,
      checkListType: 1,
      YearItems: [],
      StartYearItems: [],
      EndYearItems: [],
      idx: 0,
      selectype: '',
      IsPercent: false,
      InfoItems: [
        {
          text: '月資料',
          value: 1
        },
        {
          text: '年資料',
          value: 2
        },
        {
          text: '累計平均',
          value: 3
        }
      ],
      MonthItems: [],
      MonthData: [
        {
          text: '所有月份',
          value: 0
        },
        {
          text: '1月',
          value: 1
        },
        {
          text: '2月',
          value: 2
        },
        {
          text: '3月',
          value: 3
        },
        {
          text: '4月',
          value: 4
        },
        {
          text: '5月',
          value: 5
        },
        {
          text: '6月',
          value: 6
        },
        {
          text: '7月',
          value: 7
        },
        {
          text: '8月',
          value: 8
        },
        {
          text: '9月',
          value: 9
        },
        {
          text: '10月',
          value: 10
        },
        {
          text: '11月',
          value: 11
        },
        {
          text: '12月',
          value: 12
        }
      ],
      YearInfoItems: [
        {
          text: '年平均',
          value: 0
        }
      ],
      SumAverageData: [
        {
          text: '1月至1月',
          value: 0
        },
        {
          text: '1月至2月',
          value: 1
        },
        {
          text: '1月至3月',
          value: 2
        },
        {
          text: '1月至4月',
          value: 3
        },
        {
          text: '1月至5月',
          value: 4
        },
        {
          text: '1月至6月',
          value: 5
        },
        {
          text: '1月至7月',
          value: 6
        },
        {
          text: '1月至8月',
          value: 7
        },
        {
          text: '1月至9月',
          value: 8
        },
        {
          text: '1月至10月',
          value: 9
        },
        {
          text: '1月至11月',
          value: 10
        },
        {
          text: '1月至12月',
          value: 11
        }
      ],
      SumAverageItems: [],
      maxyear: null,
      maxmonth: null,
      NeedSex: true
    }
  },
  watch: {
    CheckListOpen(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    }
  },
  mounted() {
    const vm = this
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 2)
    setTimeout(() => {
      document.title = '更多資料查詢'
    }, 100)
    axios
      .post(vm.RequetURL.majaxurl, qs.stringify({ op: 'GetBaseInfo' }))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          vm.setYearList(data.MNYear)
          vm.maxyear = data.MNYear.maxyear - 1911
          vm.maxmonth = parseInt(data.maxmonth)
          vm.styearchange()
        }
      })
  },
  methods: {
    trapFocus() {
      const dialog = this.$refs.dialogContent
      if (!dialog) return

      const focusable = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      first.focus()

      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault()
              last.focus()
            }
          } else if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      })
    },
    openCheckList(type, title, utype) {
      this.CheckListOpen = true
      this.deftitle = title
      this.checkListType = type

      if (utype === 'LFP' || utype === 'UPR') this.IsPercent = true
      else this.IsPercent = false

      if (utype === 'NLF') this.NeedSex = false
      else this.NeedSex = true

      this.idx += 1
      this.selectype = utype
    },
    setYearList(data) {
      const vm = this
      const minyear = data.minyear
      const maxyear = data.maxyear
      for (let i = minyear; i <= maxyear; i++) {
        const roc = i - 1911
        const opt = {}
        opt.text = roc + '年'
        opt.value = roc
        vm.YearItems.push(opt)
      }
      vm.StartYearItems = vm.YearItems
      vm.EndYearItems = vm.YearItems
      vm.StartYear = maxyear - 1911
      vm.EndYear = maxyear - 1911
    },
    styearchange() {
      const vm = this
      const items = vm.YearItems
      const styear = this.StartYear
      vm.EndYearItems = items.filter((n) => n.value >= styear)

      if (styear === this.maxyear && styear === this.EndYear) {
        this.MonthItems = []
        for (let i = 0; i <= this.maxmonth; i++) {
          const opt = {}
          opt.text = this.MonthData[i].text
          opt.value = this.MonthData[i].value

          this.MonthItems.push(opt)
        }
        this.SumAverageItems = []
        for (let i = 0; i < this.maxmonth; i++) {
          const opt = {}
          opt.text = this.SumAverageData[i].text
          opt.value = this.SumAverageData[i].value

          this.SumAverageItems.push(opt)
        }
      } else {
        this.MonthItems = this.MonthData
        this.SumAverageItems = this.SumAverageData
      }
    },
    etyearchange() {
      const vm = this
      const items = vm.YearItems
      const styear = this.EndYear
      vm.StartYearItems = items.filter((n) => n.value <= styear)

      if (this.StartYear === this.maxyear && this.StartYear === this.EndYear) {
        this.MonthItems = []
        for (let i = 0; i <= this.maxmonth; i++) {
          const opt = {}
          opt.text = this.MonthData[i].text
          opt.value = this.MonthData[i].value

          this.MonthItems.push(opt)
        }
        this.SumAverageItems = []
        for (let i = 0; i < this.maxmonth; i++) {
          const opt = {}
          opt.text = this.SumAverageData[i].text
          opt.value = this.SumAverageData[i].value

          this.SumAverageItems.push(opt)
        }
      } else {
        this.MonthItems = this.MonthData
        this.SumAverageItems = this.SumAverageData
      }
    },
    itypechange() {
      this.SelectSecound = 0
    },
    SendQuery(opt) {
      const vm = this

      if (opt.classes.length === 0) {
        _SAlert.Error('請至少勾選一個分類依據.')
        return
      }
      if (opt.sex.length === 0) {
        _SAlert.Error('請至少勾選一個性別.')
        return
      }
      if (opt.statistics.length === 0) {
        _SAlert.Error('請至少勾選一個資料屬性.')
        return
      }

      this.$router.push({
        path: '/Statics_Inquire/ResultInquire',
        query: {
          type: vm.selectype,
          startyear: vm.StartYear,
          endyear: vm.EndYear,
          infotype: vm.InfoType,
          cycle: vm.SelectSecound,
          classes: vm.arrayToString(opt.classes),
          sex: vm.arrayToString(opt.sex),
          statistics: vm.arrayToString(opt.statistics)
        }
      })
    },
    arrayToString(ary) {
      let re = ''
      for (let i = 0; i < ary.length; i++) {
        if (i !== 0) re += ','
        re += ary[i]
      }
      return re
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
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
.dataselect {
  @include pc-width {
    max-width: 140px;
  }
  @include pcss-width {
    max-width: 140px;
  }
  @include pad-width {
    max-width: 120px;
  }
  @include small-pad-width {
    max-width: 100px;
  }
  @include phone-width {
    max-width: 100px;
  }
}
.btnzone {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
}
.zoneitem {
  width: 280px;
  height: 320px;
  margin: 10px 10px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.imageitem {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.statspan {
  @include pc-width {
    font-size: 1.125em;
  }
  @include pcss-width {
    font-size: 1.125em;
  }
  @include pad-width {
    font-size: 1.125em;
  }
  @include small-pad-width {
    font-size: 1.125em;
  }
  @include phone-width {
    font-size: 0.75em;
  }
  margin-right: 10px;
  color: #292b3b;
  font-weight: 400;
}
.nospan {
  @include pc-width {
    font-size: 1.125em;
  }
  @include pcss-width {
    font-size: 1.125em;
  }
  @include pad-width {
    font-size: 1.125em;
  }
  @include small-pad-width {
    font-size: 1.125em;
  }
  @include phone-width {
    font-size: 0.75em;
  }
  margin: 0px 5px;
  color: #292b3b;
  font-weight: 400;
}
.cyclespan {
  @include pc-width {
    font-size: 1.125em;
  }
  @include pcss-width {
    font-size: 1.125em;
  }
  @include pad-width {
    font-size: 1.125em;
  }
  @include small-pad-width {
    font-size: 1.125em;
  }
  @include phone-width {
    font-size: 0.75em;
  }
  color: #292b3b;
  font-weight: 400;
  margin: 0px 10px;
  color: #292b3b;
  font-weight: 400;
}
.rwdcycle1 {
  @include small-pad-width {
    display: none !important;
  }
  @include phone-width {
    display: none !important;
  }
}
.forphonerow {
  @include pc-width {
    display: none !important;
  }
  @include pcss-width {
    display: none !important;
  }
  @include pad-width {
    display: none !important;
  }
}
.smalldefbtn {
  @include pc-width {
    display: none !important;
  }
  @include small-pad-width {
    display: none !important;
  }
  @include phone-width {
    display: none !important;
  }
}
.normaldefbtn {
  @include pcss-width {
    display: none !important;
  }
  @include pad-width {
    display: none !important;
  }
  @include small-pad-width {
    display: none !important;
  }
  @include phone-width {
    display: none !important;
  }
}
</style>
