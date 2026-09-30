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
              >統計項查詢-縣市資料查詢</span
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
              class="dataselect"
              title="統計期_起"
              background-color="white"
              solo
              hide-details
              @change="styearchange"
            ></v-select>
            <label for="dataselect2" class="nospan">至</label>
            <v-select
              id="dataselect2"
              v-model="EndYear"
              :items="EndYearItems"
              class="dataselect"
              title="統計期_迄"
              background-color="white"
              solo
              hide-details
              @change="etyearchange"
            ></v-select>
            <label for="dataselect3" class="cyclespan1">週期</label>
            <v-select
              id="dataselect3"
              v-model="InfoType"
              :items="InfoItems"
              class="dataselect cycleselect1"
              style="margin-right: 10px;"
              title="週期"
              background-color="white"
              solo
              hide-details
              @change="states = []"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="forphonerow">
          <v-col style="display: flex; align-items: center;">
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
              @change="states = []"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span style="font-size: 1em; color: #292B3B;"
              >*失業率及勞動力參與率之資料屬性無性別結構比、較上期增減率及較上年同期增減率</span
            ><br />
            <span style="font-size: 1em; color: #292B3B;"
              >下方統計項、地區、性別、資料屬性皆為必選，請至少各選擇一項。</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="maintable AllCenter">
              <div class="mleftmenu">
                <v-container style="padding: 0px;" fluid>
                  <div class="tablemenu">
                    <fieldset>
                      <legend class="visually-hidden">統計項</legend>
                      <div class="tabletitle AllCenter">
                        <span>統計項</span>
                      </div>
                      <div class="tablebody" style="padding: 10px;">
                        <Checkboxbtn
                          :key="key"
                          value="FPS"
                          label="15歲以上民間人口"
                          @changedcheck="classestoggle($event, 'FPS')"
                        ></Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="PEP"
                          label="就業者"
                          @changedcheck="classestoggle($event, 'PEP')"
                        ></Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="PUP"
                          label="失業者"
                          @changedcheck="classestoggle($event, 'PUP')"
                        ></Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="LAF"
                          label="勞動力"
                          @changedcheck="classestoggle($event, 'LAF')"
                        ></Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="NLF"
                          label="非勞動力"
                          @changedcheck="classestoggle($event, 'NLF')"
                        ></Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="UPR"
                          label="失業率"
                          @changedcheck="classestoggle($event, 'UPR')"
                        ></Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="LFP"
                          label="勞動力參與率"
                          @changedcheck="classestoggle($event, 'LFP')"
                        ></Checkboxbtn>
                      </div>
                    </fieldset>
                  </div>
                </v-container>
              </div>
              <div class="midmenu">
                <v-container style="padding: 0px;" fluid>
                  <div class="tablemenu">
                    <fieldset>
                      <legend class="visually-hidden">地區</legend>
                      <div class="tabletitle AllCenter">
                        <span>地區</span>
                      </div>
                      <div class="tablebody" style="padding: 10px;">
                        <Checkboxbtn
                          :key="key"
                          value="1"
                          label="臺灣地區"
                          @changedcheck="zonetoggle($event, 1)"
                        ></Checkboxbtn>
                        <div style="padding-left: 40px;">
                          <Checkboxbtn
                            :key="key"
                            value="2"
                            label="北部區域"
                            @changedcheck="zonetoggle($event, 2)"
                          ></Checkboxbtn>
                          <div style="padding-left: 40px;">
                            <Checkboxbtn
                              :key="key"
                              value="3"
                              label="新北市"
                              @changedcheck="zonetoggle($event, 3)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="4"
                              label="臺北市"
                              @changedcheck="zonetoggle($event, 4)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="5"
                              label="桃園市"
                              @changedcheck="zonetoggle($event, 5)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="6"
                              label="基隆市"
                              @changedcheck="zonetoggle($event, 6)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="7"
                              label="新竹市"
                              @changedcheck="zonetoggle($event, 7)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="8"
                              label="宜蘭縣"
                              @changedcheck="zonetoggle($event, 8)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="9"
                              label="新竹縣"
                              @changedcheck="zonetoggle($event, 9)"
                            ></Checkboxbtn>
                          </div>
                        </div>
                        <div style="padding-left: 40px;">
                          <Checkboxbtn
                            :key="key"
                            value="10"
                            label="中部區域"
                            @changedcheck="zonetoggle($event, 10)"
                          ></Checkboxbtn>
                          <div style="padding-left: 40px;">
                            <Checkboxbtn
                              :key="key"
                              value="11"
                              label="臺中市"
                              @changedcheck="zonetoggle($event, 11)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="12"
                              label="苗栗縣"
                              @changedcheck="zonetoggle($event, 12)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="13"
                              label="彰化縣"
                              @changedcheck="zonetoggle($event, 13)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="14"
                              label="南投縣"
                              @changedcheck="zonetoggle($event, 14)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="15"
                              label="雲林縣"
                              @changedcheck="zonetoggle($event, 15)"
                            ></Checkboxbtn>
                          </div>
                        </div>
                        <div style="padding-left: 40px;">
                          <Checkboxbtn
                            :key="key"
                            value="19"
                            label="南部區域"
                            @changedcheck="zonetoggle($event, 19)"
                          ></Checkboxbtn>
                          <div style="padding-left: 40px;">
                            <Checkboxbtn
                              :key="key"
                              value="20"
                              label="臺南市"
                              @changedcheck="zonetoggle($event, 20)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="21"
                              label="高雄市"
                              @changedcheck="zonetoggle($event, 21)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="22"
                              label="嘉義市"
                              @changedcheck="zonetoggle($event, 22)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="23"
                              label="嘉義縣"
                              @changedcheck="zonetoggle($event, 23)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="24"
                              label="屏東縣"
                              @changedcheck="zonetoggle($event, 24)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="25"
                              label="澎湖縣"
                              @changedcheck="zonetoggle($event, 25)"
                            ></Checkboxbtn>
                          </div>
                        </div>
                        <div style="padding-left: 40px;">
                          <Checkboxbtn
                            :key="key"
                            value="16"
                            label="東部區域"
                            @changedcheck="zonetoggle($event, 16)"
                          ></Checkboxbtn>
                          <div style="padding-left: 40px;">
                            <Checkboxbtn
                              :key="key"
                              value="17"
                              label="臺東縣"
                              @changedcheck="zonetoggle($event, 17)"
                            ></Checkboxbtn>
                            <Checkboxbtn
                              :key="key"
                              value="18"
                              label="花蓮縣"
                              @changedcheck="zonetoggle($event, 18)"
                            ></Checkboxbtn>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </v-container>
              </div>
              <div class="mrightmenu AllTopCenter">
                <v-container class="tablecontainer ftablecontainer" fluid>
                  <div class="tablemenu2">
                    <fieldset>
                      <legend class="visually-hidden">性別</legend>
                      <div class="tabletitle AllCenter">
                        <span>性別</span>
                      </div>
                      <div class="tablebody2">
                        <Checkboxbtn
                          :key="key"
                          value="T"
                          label="總計"
                          @changedcheck="sextoggle($event, 'T')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="M"
                          label="男"
                          @changedcheck="sextoggle($event, 'M')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="F"
                          label="女"
                          @changedcheck="sextoggle($event, 'F')"
                        >
                        </Checkboxbtn>
                      </div>
                    </fieldset>
                  </div>
                </v-container>
                <v-container class="tablecontainer" fluid>
                  <div class="tablemenu3">
                    <fieldset>
                      <legend class="visually-hidden">資料屬性</legend>
                      <div class="tabletitle AllCenter">
                        <span>資料屬性</span>
                      </div>
                      <div class="tablebody3">
                        <Checkboxbtn
                          :key="key"
                          value="1"
                          label="統計值"
                          @changedcheck="statisticstoggle($event, '1')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="2"
                          :disabled="s2_show"
                          label="性別結構比"
                          @changedcheck="statisticstoggle($event, '2')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          value="3"
                          label="較上期增減值"
                          @changedcheck="statisticstoggle($event, '3')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          :key="key"
                          :disabled="s5_show"
                          value="5"
                          label="較上期增減率"
                          @changedcheck="statisticstoggle($event, '5')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          v-if="InfoType != 1"
                          :key="key"
                          :disabled="s4_show"
                          value="4"
                          label="較上年同期增減值"
                          @changedcheck="statisticstoggle($event, '4')"
                        >
                        </Checkboxbtn>
                        <Checkboxbtn
                          v-if="InfoType != 1"
                          :key="key"
                          :disabled="s6_show"
                          value="6"
                          label="較上年同期增減率"
                          @changedcheck="statisticstoggle($event, '6')"
                        >
                        </Checkboxbtn>
                      </div>
                    </fieldset>
                  </div>
                </v-container>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="AllCenter">
            <editbtn :name="'查詢'" @click.native="SendQuery"></editbtn>
            <crosscancel
              :name="'重設條件'"
              style="margin-left: 15px;"
              @click.native="Resetthis"
            ></crosscancel>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import Checkboxbtn from '~/components/button/checkboxbtn.vue'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
export default {
  name: 'CachePage',
  components: {
    crosscancel,
    editbtn,
    Checkboxbtn
  },
  layout: 'BackStage',
  data() {
    return {
      key: 0,
      s2_show: false,
      s4_show: false,
      s5_show: false,
      s6_show: false,
      combinecity: false,
      StartYear: 100,
      EndYear: 101,
      InfoType: 1,
      YearItems: [],
      StartYearItems: [],
      EndYearItems: [],
      InfoItems: [
        {
          text: '年平均',
          value: 1
        },
        {
          text: '半年平均',
          value: 2
        }
      ],
      sexes: [],
      classes: [],
      zoneselect: [],
      states: [],
      statusMessage: ''
    }
  },
  mounted() {
    const vm = this
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 6)
    setTimeout(() => {
      document.title = '縣市資料查詢'
    }, 100)

    axios
      .post(vm.RequetURL.cityaxurl, qs.stringify({ op: 'GetBaseInfo' }))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          vm.setYearList(data.MNYear)
        }
      })
  },
  updated() {
    this.buttonfixed()
  },
  methods: {
    classestoggle(e, val) {
      const idx = this.classes.indexOf(val)
      if (idx === -1) this.classes.push(val)
      else this.classes.splice(idx, 1)

      this.clachange()
    },
    sextoggle(e, val) {
      const idx = this.sexes.indexOf(val)
      if (idx === -1) this.sexes.push(val)
      else this.sexes.splice(idx, 1)
    },
    statisticstoggle(e, val) {
      const idx = this.states.indexOf(val)
      if (idx === -1) this.states.push(val)
      else this.states.splice(idx, 1)
    },
    zonetoggle(e, val) {
      const idx = this.zoneselect.indexOf(val)
      if (idx === -1) this.zoneselect.push(val)
      else this.zoneselect.splice(idx, 1)
    },
    Resetthis() {
      this.sexes = []
      this.classes = []
      this.zoneselect = []
      this.states = []
      this.s2_show = false
      this.s4_show = false
      this.s5_show = false
      this.s6_show = false
      this.key++
    },
    buttonfixed() {
      setTimeout(function() {
        const targ = $('button.v-icon')

        for (let i = 0; i < targ.length; i++) {
          const newdiv2 = document.createElement('span')
          $(newdiv2).append('>')
          $(newdiv2).css('display', 'none')
          $(targ[i]).attr('id', 'icon_btn' + i)
          $(targ[i]).append(newdiv2)
        }
      }, 100)
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
    },
    etyearchange() {
      const vm = this
      const items = vm.YearItems
      const styear = this.EndYear
      vm.StartYearItems = items.filter((n) => n.value <= styear)
    },
    arrayToString(ary) {
      let re = ''
      for (let i = 0; i < ary.length; i++) {
        if (i !== 0) re += ','
        re += ary[i]
      }
      return re
    },
    clachange() {
      const arry = this.classes
      if (arry.includes('UPR') || arry.includes('LFP')) {
        this.s2_show = true
        this.s5_show = true
        this.s6_show = true
        this.states = []
      } else {
        this.s2_show = false
        this.s5_show = false
        this.s6_show = false
      }
    },
    sortcla(ary) {
      const stasort = ['FPS', 'PEP', 'PUP', 'LAF', 'NLF', 'UPR', 'LFP']
      const sort = []
      for (let i = 0; i < stasort.length; i++) {
        for (let j = 0; j < ary.length; j++) {
          if (ary[j] === stasort[i]) sort.push(ary[j])
        }
      }
      return sort
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
    sortzone(ary) {
      const zonesort = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        16,
        17,
        18
      ]
      const sort = []
      for (let i = 0; i < zonesort.length; i++) {
        for (let j = 0; j < ary.length; j++) {
          if (ary[j] === zonesort[i]) sort.push(ary[j])
        }
      }
      return sort
    },
    SendQuery() {
      const vm = this
      if (vm.classes.length === 0) {
        _SAlert.Error('請至少勾選一個統計項.')
        return
      }
      if (vm.zoneselect.length === 0) {
        _SAlert.Error('請至少勾選一個地區.')
        return
      }
      if (vm.sexes.length === 0) {
        _SAlert.Error('請至少勾選一個性別.')
        return
      }
      if (vm.states.length === 0) {
        _SAlert.Error('請至少勾選一個資料屬性.')
        return
      }

      this.$router.push({
        path: '/Statics_Inquire/CityCombineResultInquire',
        query: {
          startyear: vm.StartYear,
          endyear: vm.EndYear,
          infotype: vm.InfoType,
          classes: vm.arrayToString(vm.sortcla(vm.classes)),
          zone: vm.arrayToString(vm.sortzone(vm.zoneselect)),
          sex: vm.arrayToString(vm.sortsex(vm.sexes)),
          statistics: vm.arrayToString(vm.states.sort())
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
.dataselect {
  @include pc-width {
    max-width: 140px !important;
  }
  @include pcss-width {
    max-width: 140px !important;
  }
  @include pad-width {
    max-width: 140px !important;
  }
  @include small-pad-width {
    max-width: 110px !important;
  }
  @include phone-width {
    max-width: 110px !important;
  }
}
.maintable {
  width: 100%;
  @include pc-width {
    justify-content: space-between !important;
  }
  @include pcss-width {
    flex-wrap: wrap;
  }
  @include pad-width {
    flex-wrap: wrap;
  }
  @include small-pad-width {
    flex-wrap: wrap;
  }
  @include phone-width {
    flex-wrap: wrap;
  }
}
.tablemenu {
  @include pc-width {
    width: 350px;
  }
  @include pcss-width {
    width: 350px;
  }
  @include pad-width {
    width: 300px;
  }
  @include small-pad-width {
    width: 350px;
  }
  @include phone-width {
    width: 300px;
  }
  height: 500px;
}
.tabletitle {
  width: 100%;
  height: 40px;
  background: #485965;
  font-weight: bold;
  font-size: 1.125em;
  color: #ffffff;
}
.tablebody {
  width: 100%;
  height: 460px;
  overflow: auto;
  background: #ffffff;
}
.tablemenu2 {
  @include pc-width {
    width: 350px;
  }
  @include pcss-width {
    width: 350px;
  }
  @include pad-width {
    width: 300px;
  }
  @include small-pad-width {
    width: 350px;
  }
  @include phone-width {
    width: 300px;
  }
  height: 180px;
}
.tablebody2 {
  width: 100%;
  height: 140px;
  overflow: hidden;
  background: #ffffff;
  padding: 5px 10px;
}
.tablemenu3 {
  @include pc-width {
    width: 350px;
  }
  @include pcss-width {
    width: 350px;
  }
  @include pad-width {
    width: 300px;
  }
  @include small-pad-width {
    width: 350px;
  }
  @include phone-width {
    width: 300px;
  }
  height: 300px;
}
.tablebody3 {
  width: 100%;
  height: 260px;
  overflow: hidden;
  background: #ffffff;
  padding: 5px 10px;
}
.maintable .mleftmenu {
  @include pcss-width {
    margin-right: 10px;
  }
  @include pad-width {
    margin-right: 10px;
  }
  @include small-pad-width {
    margin-right: 10px;
  }
  @include phone-width {
    margin-right: 10px;
  }
}
.maintable .mrightmenu {
  @include pc-width {
    width: 350px;
    height: 500px;
  }
  @include pcss-width {
    width: 100%;
    height: 330px;
    margin-top: 10px;
  }
  @include pad-width {
    width: 100%;
    height: 330px;
    margin-top: 10px;
  }
  @include small-pad-width {
    width: 100%;
    height: 500px;
    margin-top: 10px;
  }
  @include phone-width {
    width: 100%;
    height: 500px;
    margin-top: 10px;
  }
  @include AllTopCenter();
  flex-wrap: wrap;
}
.tablecontainer {
  @include pc-width {
    width: 350px;
  }
  @include pcss-width {
    width: 350px;
  }
  @include pad-width {
    width: 300px;
  }
  @include small-pad-width {
    width: 350px;
  }
  @include phone-width {
    width: 300px;
  }
  padding: 0px;
  margin: 0px;
}
.ftablecontainer {
  @include pcss-width {
    margin-right: 10px;
  }
  @include pad-width {
    margin-right: 10px;
  }
  @include small-pad-width {
    margin-right: 10px;
  }
  @include phone-width {
    margin-right: 10px;
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
.cyclespan1,
.cycleselect1 {
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
.cyclespan {
  @include pc-width {
    margin-right: 27px;
    font-size: 1.125em;
  }
  @include pcss-width {
    margin-right: 27px;
    font-size: 1.125em;
  }
  @include pad-width {
    margin-right: 27px;
    font-size: 1.125em;
  }
  @include small-pad-width {
    margin-right: 27px;
    font-size: 1.125em;
  }
  @include phone-width {
    margin-right: 10px;
  }
  color: #292b3b;
  font-weight: 400;
}
.cyclespan1 {
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
  margin: 0px 10px;
  color: #292b3b;
  font-weight: 400;
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
  margin: 0px 5px;
  color: #292b3b;
  font-weight: 400;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.v-treeview-node__toggle--open {
  display: none !important;
}
.v-icon.mdi-checkbox-marked {
  color: #1976d2 !important;
  caret-color: #1976d2 !important;
}
.midmenu {
  overflow: hidden;
}
</style>
