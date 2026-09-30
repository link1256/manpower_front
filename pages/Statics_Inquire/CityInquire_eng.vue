<template>
  <div class="PageDefault AllTopCenter">
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
    <div class="pageitem_2">
      <v-container>
        <v-row>
          <v-col>
            <span style="font-size: 1.75em; color: #292B3B; font-weight: bold;"
              >Local Areas Options(Hsien, City)</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col style="display: flex; align-items: center; min-width: 80%;">
            <label for="dataselect1" class="statspan">Time series</label>
            <v-select
              id="dataselect1"
              v-model="StartYear"
              :items="YearItems"
              class="dataselect"
              title="StartYear"
              background-color="white"
              solo
              hide-details
              @change="styearchange"
            ></v-select>
            <label for="dataselect2" class="nospan">To</label>
            <v-select
              id="dataselect2"
              v-model="EndYear"
              :items="EndYearItems"
              class="dataselect"
              title="EndYear"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <label for="dataselect3" class="cyclespan1">Cycle</label>
            <v-select
              id="dataselect3"
              v-model="InfoType"
              :items="InfoItems"
              class="dataselect cycleselect1"
              title="Cycle"
              style="margin-right: 10px;"
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
              >Cycle</label
            >
            <v-select
              id="dataselect4"
              v-model="InfoType"
              :items="InfoItems"
              class="dataselect"
              style="margin-right: 10px;"
              title="Cycle"
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
              >Labor Force Participation Rate and Unemployment Rate can't search
              % of total/Change in percent from previous period./Change in
              percent from that of previous year.</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="maintable AllCenter">
              <div class="mleftmenu">
                <v-container style="padding: 0px;" fluid>
                  <div class="tablemenu">
                    <div class="tabletitle AllCenter">
                      <span>Statistics</span>
                    </div>
                    <div class="tablebody" style="padding: 10px;">
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="FPS"
                        label="Civilians age 15 & above"
                        @change="clachange"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="PEP"
                        label="Employed"
                        @change="clachange"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="PUP"
                        label="Unemployed"
                        @change="clachange"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="LAF"
                        label="Labor Force"
                        @change="clachange"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="NLF"
                        label="Not in Labor Force"
                        @change="clachange"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="UPR"
                        label="Unemployment Rate"
                        @change="clachange"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="classes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="LFP"
                        label="Labor Force Participation Rate"
                        @change="clachange"
                      ></v-checkbox>
                    </div>
                  </div>
                </v-container>
              </div>
              <div class="midmenu">
                <v-container style="padding: 0px;" fluid>
                  <div class="tablemenu">
                    <div class="tabletitle AllCenter">
                      <span>Area</span>
                    </div>
                    <div class="tablebody">
                      <v-treeview
                        v-model="zoneselect"
                        :open.sync="open"
                        :items="cityitems"
                        selectable
                      ></v-treeview>
                    </div>
                  </div>
                </v-container>
              </div>
              <div class="mrightmenu AllTopCenter">
                <v-container class="tablecontainer ftablecontainer" fluid>
                  <div class="tablemenu2">
                    <div class="tabletitle AllCenter">
                      <span>Gender</span>
                    </div>
                    <div class="tablebody2">
                      <v-checkbox
                        v-model="sexes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="T"
                        label="Total"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="sexes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="M"
                        label="Male"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="sexes"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="F"
                        label="Female"
                      ></v-checkbox>
                    </div>
                  </div>
                </v-container>
                <v-container class="tablecontainer" fluid>
                  <div class="tablemenu3">
                    <div class="tabletitle AllCenter">
                      <span>Option</span>
                    </div>
                    <div class="tablebody3">
                      <v-checkbox
                        v-model="states"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="1"
                        label="Statistical value"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="states"
                        :disabled="s2_show"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="2"
                        label="% of total"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="states"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="3"
                        label="Change from Previous Period (level, percentage point)"
                      ></v-checkbox>
                      <v-checkbox
                        v-if="InfoType != 1"
                        v-model="states"
                        :disabled="s4_show"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="4"
                        label="Change from That of Previous Year (level, percentage point)"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="states"
                        :disabled="s5_show"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="5"
                        label="Change in Percent from Previous Period"
                      ></v-checkbox>
                      <v-checkbox
                        v-if="InfoType != 1"
                        v-model="states"
                        :disabled="s6_show"
                        style="margin-top: 5px; margin-bottom: 5px;"
                        value="6"
                        label="Change in Percent from That of Previous Year"
                      ></v-checkbox>
                    </div>
                  </div>
                </v-container>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="AllCenter">
            <editbtn :name="'Search'" @click.native="SendQuery"></editbtn>
            <crosscancel
              :name="'Clean Setting'"
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
  layout: 'BackStage_eng',
  data() {
    return {
      s2_show: false,
      s4_show: false,
      s5_show: false,
      s6_show: false,
      combinecity: false,
      StartYear: 100,
      EndYear: 101,
      InfoType: 1,
      YearItems: [],
      EndYearItems: [],
      InfoItems: [
        {
          text: 'Annual',
          value: 1
        },
        {
          text: 'Half Year',
          value: 2
        }
      ],
      sexes: [],
      classes: [],
      zoneselect: [],
      states: [],
      open: [100],
      cityitems: [
        {
          id: 100,
          name: 'Taiwan All',
          children: [
            {
              id: 1,
              name: 'Taiwan Area'
            },
            {
              id: 101,
              name: 'Northern region(All)',
              children: [
                {
                  id: 2,
                  name: 'Northern region'
                },
                {
                  id: 3,
                  name: 'New Taipei City'
                },
                {
                  id: 4,
                  name: 'Taipei City'
                },
                {
                  id: 5,
                  name: 'Taoyuan City'
                },
                {
                  id: 6,
                  name: 'Keelung City'
                },
                {
                  id: 7,
                  name: 'Hsinchu City'
                },
                {
                  id: 8,
                  name: 'Yilan County'
                },
                {
                  id: 9,
                  name: 'Hsinchu County'
                }
              ]
            },
            {
              id: 102,
              name: 'Central region(All)',
              children: [
                {
                  id: 10,
                  name: 'Central region'
                },
                {
                  id: 11,
                  name: 'Taichung City'
                },
                {
                  id: 12,
                  name: 'Miaoli County'
                },
                {
                  id: 13,
                  name: 'Changhua County'
                },
                {
                  id: 14,
                  name: 'Nantou County'
                },
                {
                  id: 15,
                  name: 'Yunlin County'
                }
              ]
            },
            {
              id: 104,
              name: 'Southern region(All)',
              children: [
                {
                  id: 19,
                  name: 'Southern region'
                },
                {
                  id: 20,
                  name: 'Tainan City'
                },
                {
                  id: 21,
                  name: 'Kaohsiung City'
                },
                {
                  id: 22,
                  name: 'Chiayi City'
                },
                {
                  id: 23,
                  name: 'Chiayi County'
                },
                {
                  id: 24,
                  name: 'Pingtung County'
                },
                {
                  id: 25,
                  name: 'Penghu County'
                }
              ]
            },
            {
              id: 103,
              name: 'Eastern region(All)',
              children: [
                {
                  id: 16,
                  name: 'Eastern region'
                },
                {
                  id: 17,
                  name: 'Taitung County'
                },
                {
                  id: 18,
                  name: 'Hualien County'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    const vm = this
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 6)
    axios
      .post(vm.RequetURL.cityaxurl, qs.stringify({ op: 'GetBaseInfo' }))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          vm.setYearList(data.MNYear)
        }
      })
  },
  methods: {
    Resetthis() {
      this.sexes = []
      this.classes = []
      this.zoneselect = []
      this.states = []
    },
    setYearList(data) {
      const vm = this
      const minyear = data.minyear
      const maxyear = data.maxyear
      for (let i = minyear; i <= maxyear; i++) {
        const roc = i
        const opt = {}
        opt.text = roc
        opt.value = roc - 1911
        vm.YearItems.push(opt)
      }
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
        _SAlert.Error('Please select category.')
        return
      }
      if (vm.zoneselect.length === 0) {
        _SAlert.Error('Please select zone.')
        return
      }
      if (vm.sexes.length === 0) {
        _SAlert.Error('Please select gender.')
        return
      }
      if (vm.states.length === 0) {
        _SAlert.Error('Please select option.')
        return
      }

      this.$router.push({
        path: '/Statics_Inquire/CityCombineResultInquire_eng',
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
.theme--light.v-label {
  color: rgba(0, 0, 0, 1);
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
</style>
