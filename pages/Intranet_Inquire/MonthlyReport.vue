<template>
  <div class="PageDefault AllTopCenter">
    <div class="pageitem_2">
      <v-container>
        <v-row>
          <v-col style="border-bottom:4px solid #344059;">
            <img src="@/assets/images/Intranet_Inquire/Magnifier.svg" alt="" />
            <span class="titile">縣市重要指標</span>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 325px;">
            <span>週期</span>
          </v-col>
          <v-col>
            <v-radio-group
              v-model="states"
              class="statgroup"
              @change="stateschange"
            >
              <v-row>
                <v-col class="AllLeft" style="max-width: 150px;">
                  <v-radio :value="1" label="月份"></v-radio>
                </v-col>
                <v-col>
                  <v-container style="padding: 0px;" fluid>
                    <v-row>
                      <v-col class="AllLeft" style="padding: 0px;">
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="amonths"
                            :disabled="mdis"
                            label="全選"
                            @change="AllMonthClick"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="1"
                            :disabled="mdis"
                            label="1月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="2"
                            :disabled="mdis"
                            label="2月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="3"
                            :disabled="mdis"
                            label="3月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="4"
                            :disabled="mdis"
                            label="4月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="5"
                            :disabled="mdis"
                            label="5月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="6"
                            :disabled="mdis"
                            label="6月"
                          ></v-checkbox>
                        </v-col>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="AllLeft" style="padding: 0px;">
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="7"
                            :disabled="mdis"
                            label="7月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="8"
                            :disabled="mdis"
                            label="8月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="9"
                            :disabled="mdis"
                            label="9月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="10"
                            :disabled="mdis"
                            label="10月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="11"
                            :disabled="mdis"
                            label="11月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;">
                          <v-checkbox
                            v-model="months"
                            :value="12"
                            :disabled="mdis"
                            label="12月"
                          ></v-checkbox>
                        </v-col>
                        <v-col style="padding: 0px;"> </v-col>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft" style="max-width: 150px;">
                  <v-radio :value="2" label="季"></v-radio>
                </v-col>
                <v-col>
                  <v-container style="padding: 0px;" class="AllLeft" fluid>
                    <v-col style="padding: 0px;">
                      <v-checkbox
                        v-model="allseason"
                        :disabled="sdis"
                        label="全選"
                        @change="AllSeasonClick"
                      ></v-checkbox>
                    </v-col>
                    <v-col style="padding: 0px;">
                      <v-checkbox
                        v-model="seasons"
                        :value="1"
                        :disabled="sdis"
                        label="第一季"
                      ></v-checkbox>
                    </v-col>
                    <v-col style="padding: 0px;">
                      <v-checkbox
                        v-model="seasons"
                        :value="2"
                        :disabled="sdis"
                        label="第二季"
                      ></v-checkbox>
                    </v-col>
                    <v-col style="padding: 0px;">
                      <v-checkbox
                        v-model="seasons"
                        :value="3"
                        :disabled="sdis"
                        label="第三季"
                      ></v-checkbox>
                    </v-col>
                    <v-col style="padding: 0px;">
                      <v-checkbox
                        v-model="seasons"
                        :value="4"
                        :disabled="sdis"
                        label="第四季"
                      ></v-checkbox>
                    </v-col>
                  </v-container>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-radio :value="3" label="上半年平均"></v-radio>
                </v-col>
                <v-col></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-radio :value="4" label="下半年平均"></v-radio>
                </v-col>
                <v-col></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-radio :value="5" label="全年平均"></v-radio>
                </v-col>
                <v-col></v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 60px;">
            <span>性別</span>
          </v-col>
          <v-col style="max-width: 360px;">
            <v-container class="AllLeft" style="padding: 0px;" fluid>
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="sexes"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="T"
                  label="總計"
                ></v-checkbox>
              </v-col>
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="sexes"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="M"
                  label="男"
                ></v-checkbox>
              </v-col>
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="sexes"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="F"
                  label="女"
                ></v-checkbox>
              </v-col>
            </v-container>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 60px;">
            <span>期間</span>
          </v-col>
          <v-col class="AllLeft">
            <span
              style="margin: 0px 10px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >起始年</span
            >
            <v-select
              v-model="StartYear"
              :items="StartYearItems"
              class="dataselect"
              background-color="white"
              solo
              hide-details
              @change="styearchange"
            ></v-select>
            <span
              style="margin: 0px 10px; font-size: 1.125em; color: #292B3B; font-weight: 400;"
              >結束年</span
            >
            <v-select
              v-model="EndYear"
              :items="EndYearItems"
              class="dataselect"
              background-color="white"
              solo
              hide-details
              @change="etyearchange"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 60px;">
            <span>輸出類別</span>
          </v-col>
          <v-col class="AllLeft">
            <v-radio-group v-model="output1" class="statgroup2">
              <v-radio :value="1" label="千人"></v-radio>
              <v-radio :value="2" label="人"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col class="AllLeft">
            <v-radio-group v-model="output2" class="statgroup2">
              <v-radio :value="1" label="小數2位"></v-radio>
              <v-radio :value="2" label="小數1位"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 60px;">
            <span>輸出形式</span>
          </v-col>
          <v-col class="AllLeft" style="max-width: 360px;">
            <v-radio-group v-model="showstate">
              <v-row>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-col style="padding: 0px;">
                    <v-radio :value="1" label="網頁"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="2" label="EXCEL"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="3" label="ODS"></v-radio>
                  </v-col>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="AllCenter">
            <editbtn :name="'查詢'" @click.native="SendQuery"></editbtn>
            <crosscancel
              :name="'重設條件'"
              style="margin-left: 15px;"
              @click.native="Reset"
            ></crosscancel>
          </v-col>
        </v-row>
        <div v-if="loader" class="fade_cust"></div>
        <div v-if="loader" class="loader"></div>
      </v-container>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
export default {
  name: 'CachePage',
  components: {
    crosscancel,
    editbtn
  },
  layout: 'BackStage',
  data() {
    return {
      states: 1,
      loader: false,
      amonths: false,
      months: [],
      allseason: false,
      seasons: [],
      sexes: [],
      StartYear: null,
      StartYearItems: [],
      YearItems: [],
      EndYear: null,
      EndYearItems: [],
      output1: 1,
      output2: 1,
      mdis: false,
      sdis: true,
      showstate: 1
    }
  },
  mounted() {
    this.checkLogin()
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 5)
    this.getbasedata()
  },
  updated() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      const vm = this
      axios
        .post(vm.RequetURL.backurl, qs.stringify({ op: 'FrontIsLogin' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            if (data !== 'Login') {
              _SAlert.Error('請先登入後臺才能使用內網功能.')
              setTimeout(function() {
                _SAlert.Close()
                vm.$router.push({
                  path: '/Common_Inquire/index'
                })
              }, 1000)
            }
          }
        })
    },
    AllMonthClick() {
      const b = this.amonths
      if (b) this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      else this.months = []
    },
    AllSeasonClick() {
      const b = this.allseason
      if (b) this.seasons = [1, 2, 3, 4]
      else this.seasons = []
    },
    getbasedata() {
      const vm = this
      axios
        .post(vm.RequetURL.monthlyurl, qs.stringify({ op: 'GetBaseInfo' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.setYearList(data.MNYear)
            vm.bdata = data
          }
        })
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
    arrayToString(ary) {
      let re = ''
      for (let i = 0; i < ary.length; i++) {
        if (i !== 0) re += ','
        re += ary[i]
      }
      return re
    },
    sortsex(ary) {
      const sexsort = ['T', 'M', 'F']
      const sort = []
      for (let i = 0; i < sexsort.length; i++) {
        for (let j = 0; j < ary.length; j++) {
          if (ary[j] === sexsort[i]) sort.push(ary[j])
        }
      }
      return sort
    },
    sortbyNumber(ary) {
      ary = ary.sort((a, b) => {
        return parseInt(a) - parseInt(b)
      })
      return ary
    },
    stateschange() {
      this.mdis = true
      this.sdis = true

      this.amonths = false
      this.months = []
      this.allseason = false
      this.seasons = []
      if (this.states === 1) {
        this.mdis = false
      } else if (this.states === 2) {
        this.sdis = false
      }
    },
    Reset() {
      this.states = 1
      this.amonths = false
      this.months = []
      this.allseason = false
      this.seasons = []
      this.sexes = []
      this.StartYear = this.YearItems[0].value
      this.EndYear = this.EndYearItems[this.EndYearItems.length - 1].value
      this.output1 = 1
      this.output2 = 1
    },
    SendQuery() {
      const vm = this
      const _query = {}

      _query.states = vm.states
      if (vm.states === 1)
        _query.months = vm.arrayToString(vm.sortbyNumber(vm.months))
      else if (vm.states === 2)
        _query.seasons = vm.arrayToString(vm.sortbyNumber(vm.seasons))

      _query.startyear = vm.StartYear
      _query.endyear = vm.EndYear
      _query.sex = vm.arrayToString(vm.sortsex(vm.sexes))
      _query.output1 = vm.output1
      _query.output2 = vm.output2

      if (vm.states === 1) {
        if (vm.months.length === 0) {
          _SAlert.Error('請至少選擇一個月份.')
          return
        }
      } else if (vm.states === 2) {
        if (vm.seasons.length === 0) {
          _SAlert.Error('請至少選擇一個季別.')
          return
        }
      }

      if (vm.sexes.length === 0) {
        _SAlert.Error('請至少選擇一個性別.')
        return
      }

      if (vm.showstate === 1) {
        vm.$router.push({
          path: '/Intranet_Inquire/MonthlyResult',
          query: _query
        })
      } else {
        const _post = {}
        _post.states = _query.states
        _post.months = _query.months
        _post.seasons = _query.seasons
        _post.startyear = _query.startyear
        _post.endyear = _query.endyear
        _post.sex = _query.sex
        _post.output1 = _query.output1
        _post.output2 = _query.output2
        _post.exporttype = vm.showstate
        _post.op = 'GetExcelForMonthlyIntranet'

        vm.loader = true

        axios
          .post(vm.RequetURL.monthlyurl, qs.stringify(_post))
          .catch(() => {
            _SAlert.Error('下載檔案時發生錯誤.')
          })
          .then(function(Response) {
            if (typeof Response === 'object' && Response.status === 200) {
              if (
                Response.data.includes('.xlsx') ||
                Response.data.includes('.ods')
              ) {
                const link = document.createElement('a')
                link.href =
                  vm.RequetURL.tabledownload + encodeURIComponent(Response.data)
                link.click()
                vm.loader = false
              } else {
                _SAlert.Error('下載檔案時發生錯誤.')
                vm.loader = false
              }
            } else {
              _SAlert.Error('下載檔案時發生錯誤.')
              vm.loader = false
            }
          })
          .finally(() => {
            vm.loader = false
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.titile {
  font-size: 1.375em;
  line-height: 40px;
  color: #292b3b;
  font-weight: bold;
  margin-left: 20px;
}
.formitem {
  background: #ffffff;
  border-radius: 5px;
  margin-top: 30px !important;
}
.formtitle {
  max-width: 150px;
  color: #292b3b;
  font-weight: bold;
  font-size: 1.375em;
  line-height: 40px;
}
.statgroup {
  min-height: 250px !important;
  height: 250px !important;
}
.statgroup2 {
  min-height: 50px !important;
  height: 50px !important;
}
.rcol1 {
  max-width: 30%;
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.rcol2 {
  max-width: 50%;
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.rcol3 {
  max-width: 15%;
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.rcol4 {
  max-width: 40%;
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.rcol5 {
  max-width: 40%;
  min-width: 350px;
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.classgroup {
  min-height: 130px !important;
  height: 130px !important;
}
.dataselect {
  max-width: 140px;
}
.timegroup {
  min-height: 50px !important;
  height: 50px !important;
}
.cityzone {
  flex-wrap: wrap;
}
.cityzone .row {
  width: 100%;
}
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
</style>
