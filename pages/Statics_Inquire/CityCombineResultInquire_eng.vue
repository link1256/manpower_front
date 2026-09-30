<template>
  <div style="width: 100%;">
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
      <div class="headbread AllTopCenter">
        <div class="breadzone">
          <span class="breadtitle">Statistical:</span
          ><span class="breadinner">{{ statstring }}</span> <br />
          <span class="breadtitle">Zone:</span
          ><span class="breadinner">{{ classstring }}</span>
          <br />
          <span class="breadtitle">Gender:</span
          ><span class="breadinner">{{ sexstring }}</span>
          <br />
          <span class="breadtitle">View of The Data:</span
          ><span class="breadinner">{{ datastring }}</span> <br />
        </div>
        <div class="showbtnzone AllTopRight">
          <button class="showbtn" @click="research">
            <img
              src="@/assets/images/Btn_Image/search.svg"
              style="margin-bottom: 4px;"
              alt=""
            />
            Reset
          </button>
          <button class="showbtn" @click="tabletransport">
            <img
              src="@/assets/images/Btn_Image/transport.svg"
              style="margin-bottom: 4px;"
              alt=""
            />
            Transpose
          </button>
          <button class="showbtn" @click="tableeditset">
            <img
              src="@/assets/images/Btn_Image/edit.svg"
              style="margin-bottom: 4px;"
              alt=""
            />
            Edit
          </button>
        </div>
      </div>
      <div v-for="(item, index) in items" :key="index" class="tableitem">
        <v-container v-if="item.show === true" class="contanierNonMaxWidth">
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="item.tshow ? 'ui button active' : 'ui button'"
                  @click="item.tshow = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="item.tshow ? 'ui button' : 'ui button active'"
                  @click="item.drawSet = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="item.tshow == false"
                class="showbtn"
                @click="item.drawSet = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn4
                v-if="item.tshow == true"
                :itemidx="index"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile"
              ></downloadbtn4>
              <downloadbtn3
                v-if="item.tshow == false"
                :itemidx="index"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage"
              ></downloadbtn3>
            </v-col>
          </v-row>
          <v-row v-if="item.tshow === true">
            <v-col :id="'table' + index">
              <div class="wrapper tablezone">
                <vue-pivottable
                  id="pivtable"
                  :key="pkey"
                  :data="item.data"
                  :rows="tablerows"
                  :cols="tablecols"
                  :vals="values"
                  :row-total="false"
                  :col-total="false"
                  :show-root-label="false"
                  :default-number-format="defaultFormat"
                  :except-format-list="formatList"
                  :sorters="{
                    s_eng: sexsort,
                    st_eng: statisticssort,
                    c_eng: classessort,
                    ct_eng: citysort
                  }"
                  aggregator-name="Sum"
                  renderer-name="Table"
                >
                </vue-pivottable>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="item.tshow === false">
            <v-col>
              <highcharts
                :ref="'chart' + index"
                :key="hkey"
                :options="item.chartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="item.tshow === false">
            <v-col class="AllRight chartinfo">
              <span
                >* Drawing Project Functions:Click the item in the legend to
                close the item temporarily</span
              >
              <br />
              <span
                >* Drawing area function:You can use the mouse to drag the area
                after the drag with the horizontal scroll magnification
                view</span
              >
            </v-col>
          </v-row>
          <v-dialog v-model="item.drawSet" max-width="500">
            <div class="modal-content">
              <div
                class="dialogclose"
                tabindex="0"
                role="button"
                aria-label="close"
                @click="item.drawSet = false"
                @keyup.enter="item.drawSet = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="pkey"
                  :show="item.drawSet"
                  :classtype="1"
                  :statitems="editstat"
                  :vindex="index"
                  :hasstat="true"
                  :hascity="true"
                  @closeConditions="item.drawSet = false"
                  @drawthis="drawthis"
                ></drawset>
              </div>
            </div>
          </v-dialog>
        </v-container>
      </div>
      <!--表格轉置 START-->
      <v-dialog v-model="tabletrans" max-width="800">
        <div class="modal-content">
          <div
            class="dialogclose"
            tabindex="0"
            role="button"
            aria-label="close"
            @click="tabletrans = false"
            @keyup.enter="tabletrans = false"
          >
            X
          </div>
          <div class="modal-header AllCenter">
            <label>Transpose</label>
          </div>
          <div class="modal-body">
            <v-container>
              <v-row>
                <span>Set</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>Side</span>
                          <button class="headbtn_top" @click="rowmovetop">
                            Up
                          </button>
                          <button class="headbtn_down" @click="rowmovedown">
                            Down
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="strow" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in trowitems"
                              :key="idx"
                              :value="item.value"
                              >{{ item.text }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="rowmovecol">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="colmoverow">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="colmoverow"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="rowmovecol">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>Header</span>
                          <button class="headbtn_top" @click="colmovetop">
                            Up
                          </button>
                          <button class="headbtn_down" @click="colmovedown">
                            Down
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="stcol" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in tcolitems"
                              :key="idx"
                              :value="item.value"
                              >{{ item.text }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
              <v-row class="transpre">
                <span>Preview</span>
              </v-row>
              <v-row class="transpre">
                <v-col class="AllCenter">
                  <div class="pretable">
                    <div class="grayaxis"></div>
                    <div class="colblue">
                      <div
                        v-for="(item, idx) in tcolitems"
                        :key="idx"
                        :value="item.value"
                        class="colblueitem"
                      >
                        <span>{{ item.text }}</span>
                      </div>
                    </div>
                    <div class="rowblue">
                      <div
                        v-for="(item, idx) in trowitems"
                        :key="idx"
                        :value="item.value"
                        class="rowblueitem"
                      >
                        <span>{{ item.text }}</span>
                      </div>
                    </div>
                    <div class="valyallow"></div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="modal-footer AllCenter">
            <crosscancel
              :name="'Cancel'"
              @click.native="tabletrans = false"
            ></crosscancel>
            <editbtn
              :name="'Transport'"
              @click.native="transporttables"
            ></editbtn>
          </div>
        </div>
      </v-dialog>
      <!--表格轉置 END-->
      <!--表格編輯 START-->
      <v-dialog v-model="tableedit" max-width="800">
        <div class="modal-content">
          <div
            class="dialogclose"
            tabindex="0"
            role="button"
            aria-label="close"
            @click="tableedit = false"
            @keyup.enter="tableedit = false"
          >
            X
          </div>
          <div class="modal-header AllCenter">
            <label>Edit</label>
          </div>
          <div class="modal-body" style="height: 600px; overflow: auto;">
            <v-container>
              <v-row>
                <span>Category</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>Selected</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="seclasses"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in tecls"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="classesremove">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="classesadd">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="classesadd"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="classesremove">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="rtranstable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>Removed</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="srclasses"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in trcls"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
              <v-row>
                <span>Gender</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>Selected</span>
                          <button class="headbtn_top" @click="editsexmovetop">
                            Up
                          </button>
                          <button class="headbtn_down" @click="editsexmovedown">
                            Down
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="sesex" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in tesex"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="sexesremove">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="sexesadd">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="sexesadd"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="sexesremove">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="rtranstable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>Removed</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select v-model="srsex" :size="5" class="translist">
                            <option
                              v-for="(item, idx) in trsex"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
              <v-row>
                <span>Option</span>
              </v-row>
              <v-row class="transcol">
                <v-col>
                  <table class="transtable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th :colsapn="2" scope="col" class="AllLeft">
                          <span>Selected</span>
                          <button class="headbtn_top" @click="editstatmovetop">
                            Up
                          </button>
                          <button
                            class="headbtn_down"
                            @click="editstatmovedown"
                          >
                            Down
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="sesattistics"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in testa"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col class="rcbtnzone">
                  <button class="rcbtn" @click="statremove">
                    &gt;
                  </button>
                  <button class="rcbtn" @click="statadd">
                    &lt;
                  </button>
                </v-col>
                <v-col class="rwdbtnzone transcol">
                  <button
                    class="rcbtn"
                    style="margin-right: 10px;"
                    @click="statadd"
                  >
                    <img src="@/assets/images/UpArrow.svg" alt="" />
                  </button>
                  <button class="rcbtn" @click="statremove">
                    <img src="@/assets/images/DownArrow.svg" alt="" />
                  </button>
                </v-col>
                <v-col class="transcol">
                  <table class="rtranstable">
                    <caption style="display: none;"></caption>
                    <thead>
                      <tr>
                        <th scope="col" class="AllLeft">
                          <span>Removed</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td :colspan="2">
                          <select
                            v-model="srsattistics"
                            :size="5"
                            class="translist"
                          >
                            <option
                              v-for="(item, idx) in trsta"
                              :key="idx"
                              :value="item"
                              >{{ item }}</option
                            >
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="modal-footer AllCenter">
            <crosscancel
              :name="'Cancel'"
              @click.native="tableedit = false"
            ></crosscancel>
            <editbtn :name="'Edit'" @click.native="edittable"></editbtn>
          </div>
        </div>
      </v-dialog>
      <!-- 表格編輯 END-->
    </v-container>
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
// eslint-disable-next-line no-unused-vars
import floatThead from 'floatthead'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import VuePivottable from '~/pivottable/Pivottable'
import downloadbtn3 from '~/components/button/downloadbtn3'
import downloadbtn4 from '~/components/button/downloadbtn4'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
import drawset from '~/components/MoreInquire/DrawSet_eng'
export default {
  components: {
    VuePivottable,
    downloadbtn3,
    downloadbtn4,
    drawset,
    crosscancel,
    editbtn
  },
  layout: 'BackStage_eng',
  data() {
    return {
      items: [],
      tablerows: ['date_eng', 'county_eng'],
      tablecols: ['classes_eng', 'sex_eng', 'statistics_eng'],
      values: ['value'],
      sex_sort: ['Total', 'Male', 'Female'],
      statistics_sort: [
        { name: 'Statistical value', value: 1 },
        { name: '% of total', value: 2 },
        {
          name: 'Change from Previous Period (level, percentage point)',
          value: 3
        },
        {
          name: 'Change from That of Previous Year (level, percentage point)',
          value: 4
        },
        { name: 'Change in Percent from Previous Period', value: 5 },
        { name: 'Change in Percent from That of Previous Year', value: 6 }
      ],
      classes_sort: [
        { name: 'Civilians age 15 & above', value: 1 },
        { name: 'Employed', value: 2 },
        { name: 'Unemployed', value: 3 },
        { name: 'Labor Force', value: 4 },
        { name: 'Not in Labor Force', value: 5 },
        { name: 'Unemployment Rate', value: 6 },
        { name: 'Labor Force Participation Rate', value: 7 }
      ],
      city_sort: [
        { name: 'Taiwan Area', value: 1 },
        { name: 'Northern region', value: 2 },
        { name: 'New Taipei City', value: 3 },
        { name: 'Taipei City', value: 4 },
        { name: 'Taoyuan City', value: 5 },
        { name: 'Keelung City', value: 6 },
        { name: 'Hsinchu City', value: 7 },
        { name: 'Yilan County', value: 8 },
        { name: 'Hsinchu County', value: 9 },
        { name: 'Central region', value: 10 },
        { name: 'Taichung City', value: 11 },
        { name: 'Miaoli County', value: 12 },
        { name: 'Changhua County', value: 13 },
        { name: 'Nantou County', value: 14 },
        { name: 'Yunlin County', value: 15 },
        { name: 'Southern region', value: 16 },
        { name: 'Tainan City', value: 17 },
        { name: 'Kaohsiung City', value: 18 },
        { name: 'Chiayi City', value: 19 },
        { name: 'Chiayi County', value: 20 },
        { name: 'Pingtung County', value: 21 },
        { name: 'Penghu County', value: 22 },
        { name: 'Eastern region', value: 23 },
        { name: 'Taitung County', value: 24 },
        { name: 'Hualien County', value: 25 }
      ],
      defaultFormat: {
        digitsAfterDecimal: 0,
        defaultValue: '-',
        replaceToDefault: [-999999]
      },
      formatList: {
        'Statistical value (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '% of total': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change in Percent from Previous Period (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change in Percent from That of Previous Year (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change from Previous Period (level, percentage point) (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change from That of Previous Year (level, percentage point) (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Unemployment Rate': {
          digitsAfterDecimal: 1,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Labor Force Participation Rate': {
          digitsAfterDecimal: 1,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        }
      },
      TableExplanOpen: false,
      statstring: '',
      classstring: '',
      sexstring: '',
      datastring: '',
      pkey: 0,
      hkey: 0,
      editstat: [],
      xAxisarray: [],
      tabletrans: false,
      trowitems: [],
      tcolitems: [],
      tableedit: false,
      seclasses: -1,
      tecls: [],
      srclasses: -1,
      trcls: [],
      sesex: -1,
      tesex: [],
      srsex: -1,
      trsex: [],
      sesattistics: -1,
      testa: [],
      srsattistics: -1,
      trsta: [],
      editclasses: [],
      editsex: [],
      removeclasses: [],
      removesex: [],
      removestat: [],
      strow: -1,
      stcol: -1
    }
  },
  mounted() {
    const vm = this
    const _post = {}

    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 6)
    _post.startyear = this.$route.query.startyear
    _post.endyear = this.$route.query.endyear
    _post.infotype = this.$route.query.infotype
    _post.classes = this.$route.query.classes
    _post.zone = this.$route.query.zone
    _post.sex = this.$route.query.sex
    _post.statistics = this.$route.query.statistics
    _post.op = 'GetRequestCombineTables'

    axios
      .post(vm.RequetURL.cityaxurl, qs.stringify(_post))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          vm.items = data

          const classstring = vm.getROCClases(vm.$route.query.classes)
          vm.statstring = classstring
          const zonestring = vm.getROCZone()
          vm.classstring = zonestring

          vm.sexstring = vm.$route.query.sex
            .replace('T', 'Total')
            .replace('M', 'Male')
            .replace('F', 'Female')

          vm.datastring = vm.$route.query.statistics
            .replace(/,/g, ';')
            .replace('1', 'Statistical value')
            .replace('2', '% of total')
            .replace(
              '3',
              'Change from Previous Period (level, percentage point)'
            )
            .replace(
              '4',
              'Change from That of Previous Year (level, percentage point)'
            )
            .replace('5', 'Change in Percent from Previous Period')
            .replace('6', 'Change in Percent from That of Previous Year')

          vm.editclasses = classstring.split(',')
          vm.editsex = vm.sexstring.split(',')
          vm.editstat = vm.datastring.split(';')

          vm.getdatearry()
        }
      })
  },
  updated() {
    this.setCountyPadding()
    this.setRowFrezze()
    this.headerfloat()
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
    research() {
      this.$router.push({
        path: '/Statics_Inquire/CityInquire_eng'
      })
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
    getdatearry() {
      const startyear = parseInt(this.$route.query.startyear) + 1911
      const endyear = parseInt(this.$route.query.endyear) + 1911
      const infotype = parseInt(this.$route.query.infotype)

      const arry = []
      if (infotype === 1) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i)
        }
      } else if (infotype === 2) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i + '-First half')
          arry.push(i + '-Second half')
        }
      }
      this.xAxisarray = arry
    },
    getROCClases(str) {
      const s = str.split(',')
      let sc = ''
      for (let i = 0; i < s.length; i++) {
        if (i !== 0) sc += ','

        switch (s[i]) {
          case 'PEP':
            sc += 'Employed'
            break
          case 'PUP':
            sc += 'Unemployed'
            break
          case 'NLF':
            sc += 'Not in Labor Force'
            break
          case 'LAF':
            sc += 'Labor Force'
            break
          case 'FPS':
            sc += 'Civilians age 15 & above'
            break
          case 'LFP':
            sc += 'Labor Force Participation Rate'
            break
          case 'UPR':
            sc += 'Unemployment Rate'
            break
        }
      }
      return sc
    },
    arraymove(arr, oidx, nidx) {
      if (nidx >= arr.length) {
        let k = nidx - arr.length + 1
        while (k--) {
          arr.push(undefined)
        }
      }
      arr.splice(nidx, 0, arr.splice(oidx, 1)[0])
      return arr
    },
    rowmovecol() {
      const idx = this.getslistidx(this.trowitems, this.strow)
      if (idx === -1) return
      if (this.trowitems.length === 1) {
        _SAlert.Error('Please keep one slide.')
        return
      }
      const tar = this.trowitems[idx]

      this.tcolitems.push(tar)
      this.trowitems.splice(idx, 1)
    },
    colmoverow() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      if (idx === -1) return
      if (this.tcolitems.length === 1) {
        _SAlert.Error('Please keep one header.')
        return
      }
      const tar = this.tcolitems[idx]

      this.trowitems.push(tar)
      this.tcolitems.splice(idx, 1)
    },
    rowmovetop() {
      const idx = this.getslistidx(this.trowitems, this.strow)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.trowitems, idx, nidx)
    },
    rowmovedown() {
      const idx = this.getslistidx(this.trowitems, this.strow)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.trowitems.length - 1)
        this.arraymove(this.trowitems, idx, nidx)
    },
    colmovetop() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.tcolitems, idx, nidx)
    },
    colmovedown() {
      const idx = this.getslistidx(this.tcolitems, this.stcol)
      const nidx = idx + 1

      if (nidx <= this.tcolitems.length - 1)
        this.arraymove(this.tcolitems, idx, nidx)
    },
    getslistidx(arry, str) {
      let j = -1
      for (let i = 0; i < arry.length; i++) {
        if (arry[i].value === str) {
          j = i
          break
        }
      }
      return j
    },
    getROCZone() {
      const data = this.items
      let sc = ''
      for (let i = 0; i < data.length; i++) {
        if (i !== 0) sc += ','
        sc += data[i].name_eng
      }
      return sc
    },
    sexsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.sex_sort.length; i++) {
        if (this.sex_sort[i] === a) ia = i
        if (this.sex_sort[i] === b) ib = i
      }
      return ia - ib
    },
    citysort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.city_sort.length; i++) {
        if (this.city_sort[i].name === a) ia = i
        if (this.city_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    classessort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.classes_sort.length; i++) {
        if (this.classes_sort[i].name === a) ia = i
        if (this.classes_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    getROCRowType(type) {
      switch (type) {
        case 'date_eng':
          return 'Time series'
        case 'classes_eng':
          return 'Category'
        case 'sex_eng':
          return 'Gender'
        case 'statistics_eng':
          return 'Option'
        case 'county_eng':
          return 'Zone'
      }
    },
    tabletransport() {
      this.tabletrans = true
      const row = this.tablerows
      const col = this.tablecols
      const trow = []
      const tcol = []
      for (let i = 0; i < row.length; i++) {
        const opt = {}
        opt.text = this.getROCRowType(row[i])
        opt.value = row[i]
        trow.push(opt)
      }

      for (let j = 0; j < col.length; j++) {
        const opt = {}
        opt.text = this.getROCRowType(col[j])
        opt.value = col[j]
        tcol.push(opt)
      }

      this.trowitems = trow
      this.tcolitems = tcol
    },
    transporttables() {
      const trows = this.trowitems
      const tcols = this.tcolitems

      const trs = []
      for (let i = 0; i < trows.length; i++) {
        trs.push(trows[i].value)
      }
      const tcs = []
      for (let i = 0; i < tcols.length; i++) {
        tcs.push(tcols[i].value)
      }

      this.tablerows = trs
      this.tablecols = tcs
      this.pkey = this.pkey + 1
      this.tabletrans = false
    },
    tableeditset() {
      this.tableedit = true
      this.tecls = this.editclasses.slice()
      this.tesex = this.editsex.slice()
      this.testa = this.editstat.slice()
      this.trcls = this.removeclasses.slice()
      this.trsex = this.removesex.slice()
      this.trsta = this.removestat.slice()
    },
    editsexmovetop() {
      const idx = this.tesex.indexOf(this.sesex)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.tesex, idx, nidx)
    },
    editsexmovedown() {
      const idx = this.tesex.indexOf(this.sesex)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.tesex.length - 1) this.arraymove(this.tesex, idx, nidx)
    },
    editstatmovetop() {
      const idx = this.testa.indexOf(this.sesattistics)
      if (idx === -1) return
      const nidx = idx - 1

      if (nidx >= 0) this.arraymove(this.testa, idx, nidx)
    },
    editstatmovedown() {
      const idx = this.testa.indexOf(this.sesattistics)
      if (idx === -1) return
      const nidx = idx + 1

      if (nidx <= this.testa.length - 1) this.arraymove(this.testa, idx, nidx)
    },
    classesremove() {
      const idx = this.tecls.indexOf(this.seclasses)
      if (this.tecls.length === 1) {
        _SAlert.Error('Please keep one category.')
        return
      }
      if (idx === -1) return
      const tar = this.tecls[idx]

      this.trcls.push(tar)
      this.tecls.splice(idx, 1)
    },
    classesadd() {
      const idx = this.trcls.indexOf(this.srclasses)
      if (idx === -1) return
      const tar = this.trcls[idx]

      this.tecls.push(tar)
      this.trcls.splice(idx, 1)
    },
    sexesremove() {
      const idx = this.tesex.indexOf(this.sesex)
      if (this.tesex.length === 1) {
        _SAlert.Error('Please keep one gender.')
        return
      }
      if (idx === -1) return
      const tar = this.tesex[idx]

      this.trsex.push(tar)
      this.tesex.splice(idx, 1)
    },
    sexesadd() {
      const idx = this.trsex.indexOf(this.srsex)
      if (idx === -1) return
      const tar = this.trsex[idx]

      this.tesex.push(tar)
      this.trsex.splice(idx, 1)
    },
    statremove() {
      const idx = this.testa.indexOf(this.sesattistics)
      if (this.testa.length === 1) {
        _SAlert.Error('Please keep one option.')
        return
      }
      if (idx === -1) return
      const tar = this.testa[idx]

      this.trsta.push(tar)
      this.testa.splice(idx, 1)
    },
    statadd() {
      const idx = this.trsta.indexOf(this.srsattistics)
      if (idx === -1) return
      const tar = this.trsta[idx]

      this.testa.push(tar)
      this.trsta.splice(idx, 1)
    },
    edittable() {
      const vm = this
      const items = vm.items
      this.editclasses = this.tecls
      this.editsex = this.tesex
      this.editstat = this.testa

      this.removeclasses = this.trcls
      this.removesex = this.trsex
      this.removestat = this.trsta

      const classes = this.removeclasses
      const sexes = this.removesex
      const stats = this.removestat

      for (let i = 0; i < items.length; i++) {
        if (!items[i].odata) items[i].odata = items[i].data
        else items[i].data = items[i].odata

        for (let j = 0; j < classes.length; j++) {
          items[i].data = items[i].data.filter(
            (n) => n.classes_eng !== classes[j]
          )
        }
        for (let j = 0; j < sexes.length; j++) {
          items[i].data = items[i].data.filter((n) => n.sex_eng !== sexes[j])
        }
        for (let j = 0; j < stats.length; j++) {
          items[i].data = items[i].data.filter(
            (n) => !n.statistics_eng.includes(stats[j])
          )
        }
      }

      this.sex_sort = this.editsex

      const e = this.editstat
      const c = []
      for (let n = 0; n < e.length; n++) {
        const ost = {}
        ost.name = e[n]
        ost.value = n
        c.push(ost)
      }
      this.statistics_sort = c
      this.pkey = this.pkey + 1

      this.tableedit = false

      this.redraw()
    },
    statisticssort(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.statistics_sort.length; i++) {
        if (a && a.includes(this.statistics_sort[i].name)) ia = i
        if (b && b.includes(this.statistics_sort[i].name)) ib = i
      }
      return ia - ib
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
    },
    getcitysArray() {
      const a = []
      const zones = this.$route.query.zone.split(',')

      for (let i = 0; i < zones.length; i++) {
        a.push(this.getRocCity(zones[i].toString()))
      }

      return a
    },
    drawthis(opt, redraw) {
      if (!opt) return

      const vm = this
      const index = opt.index
      const target = this.items[index]
      this.items[index].obj = opt
      const sexs = this.editsex
      const citys = this.getcitysArray()

      if (
        opt.chart === 'column' ||
        opt.chart === 'line' ||
        opt.chart === 'percentbar'
      ) {
        const obj = {
          chart: {
            type: opt.chart,
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
            showEmpty: false,
            categories: vm.xAxisarray
          },
          yAxis: {
            min: 0,
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            }
          },
          series: []
        }
        if (opt.chart === 'percentbar') {
          const plotOptions = {}
          plotOptions.column = {
            stacking: 'normal',
            dataLabels: {
              enabled: false
            }
          }
          obj.plotOptions = plotOptions
          obj.chart.type = 'column'
        }
        if (opt.unit === 'Thousand Persons') {
          obj.yAxis.labels = {}
          obj.yAxis.labels.format = '{value}'
        }

        const clas = vm.editclasses
        for (let i = 0; i < clas.length; i++) {
          if (opt.chart === 'percentbar' && clas[i] !== opt.stat) continue
          for (let v = 0; v < citys.length; v++) {
            if (opt.chart === 'percentbar' && citys[v] !== opt.city) continue
            for (let k = 0; k < sexs.length; k++) {
              if (opt.chart === 'percentbar' && sexs[k] === 'Total') continue
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].value === -999999) continue
                  else ser.data.push(tardata[j].value)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
      } else if (opt.chart === 'percentzone') {
        const obj = {
          chart: {
            type: 'area',
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
            showEmpty: false,
            categories: vm.xAxisarray
          },
          yAxis: {
            min: 0,
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            }
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#666666'
              }
            }
          },
          series: []
        }
        const sexs = vm.editsex
        const clas = vm.editclasses
        for (let i = 0; i < clas.length; i++) {
          if (clas[i] !== opt.stat) continue
          for (let v = 0; v < citys.length; v++) {
            if (citys[v] !== opt.city) continue
            for (let k = 0; k < sexs.length; k++) {
              if (sexs[k] === 'Total') continue
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].value === -999999) continue
                  else ser.data.push(tardata[j].value)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
      } else if (
        opt.chart === 'mixbar' ||
        opt.chart === 'mixline' ||
        opt.chart === 'mixchart'
      ) {
        const obj = {
          chart: {
            zoomType: 'xy',
            marginTop: 40
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: [
            {
              showEmpty: false,
              categories: vm.xAxisarray
            }
          ],
          yAxis: [
            {
              gridLineWidth: 0,
              labels: {
                format: '{value}'
              },
              title: {
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
                text: 'Thousand Persons'
              }
            },
            {
              gridLineWidth: 0,
              labels: {
                format: '{value} %'
              },
              title: {
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
                text: '%'
              },
              opposite: true
            }
          ],
          series: []
        }
        const sexs = vm.editsex
        const clas = vm.editclasses

        for (let i = 0; i < clas.length; i++) {
          for (let v = 0; v < citys.length; v++) {
            for (let k = 0; k < sexs.length; k++) {
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                let unit = -1
                let ctype = ''
                if (
                  opt.attrs[f] === 'Statistical value' ||
                  opt.attrs[f] ===
                    'Change from Previous Period (level, percentage point)' ||
                  opt.attrs[f] ===
                    'Change from That of Previous Year (level, percentage point)'
                ) {
                  unit = 0
                  if (opt.chart === 'mixbar' || opt.chart === 'mixchart')
                    ctype = 'column'
                  else ctype = 'line'
                } else {
                  unit = 1
                  if (opt.chart === 'mixline' || opt.chart === 'mixchart')
                    ctype = 'line'
                  else ctype = 'column'
                }
                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []
                ser.yAxis = unit
                ser.type = ctype

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].value === -999999) continue
                  else ser.data.push(tardata[j].value)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
      } else if (
        opt.chart === 'sp_mixbar' ||
        opt.chart === 'sp_mixline' ||
        opt.chart === 'sp_mixchart'
      ) {
        const obj = {
          chart: {
            zoomType: 'xy',
            marginTop: 40
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: [
            {
              showEmpty: false,
              categories: vm.xAxisarray
            }
          ],
          yAxis: [
            {
              gridLineWidth: 0,
              labels: {
                format: '{value}'
              },
              title: {
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
                text: 'Thousand Persons'
              }
            },
            {
              gridLineWidth: 0,
              labels: {
                format: '{value} %'
              },
              title: {
                align: 'high',
                offset: 0,
                rotation: 0,
                y: -10,
                text: '%'
              },
              opposite: true
            }
          ],
          series: []
        }
        const sexs = vm.editsex
        const clas = vm.editclasses

        for (let i = 0; i < clas.length; i++) {
          for (let v = 0; v < citys.length; v++) {
            for (let k = 0; k < sexs.length; k++) {
              for (let f = 0; f < opt.attrs.length; f++) {
                if (!this.editstat.includes(opt.attrs[f])) continue
                let unit = -1
                let ctype = ''
                if (
                  clas[i] === 'Civilians age 15 & above' ||
                  clas[i] === 'Employed' ||
                  clas[i] === 'Unemployed' ||
                  clas[i] === 'Labor Force' ||
                  clas[i] === 'Not in Labor Force'
                ) {
                  unit = 0
                  if (opt.chart === 'sp_mixbar' || opt.chart === 'sp_mixchart')
                    ctype = 'column'
                  else ctype = 'line'
                } else if (
                  clas[i] === 'Unemployment Rate' ||
                  clas[i] === 'Labor Force Participation Rate'
                ) {
                  unit = 1
                  if (opt.chart === 'sp_mixline' || opt.chart === 'sp_mixchart')
                    ctype = 'line'
                  else ctype = 'column'
                }

                const ser = {}
                ser.name =
                  citys[v] + '-' + sexs[k] + '-' + clas[i] + '-' + opt.attrs[f]
                ser.data = []
                ser.yAxis = unit
                ser.type = ctype

                const tardata = vm.getdrawdata(
                  target,
                  sexs[k],
                  opt.attrs[f],
                  clas[i],
                  citys[v]
                )
                for (let j = 0; j < tardata.length; j++) {
                  if (tardata[j].value === -999999) continue
                  else ser.data.push(tardata[j].value)
                }
                obj.series.push(ser)
              }
            }
          }
        }
        target.chartOption = obj
        vm.hkey = vm.hkey + 1
        if (!redraw) {
          target.drawSet = false
          target.tshow = false
        }
      }
    },
    redraw() {
      const items = this.items
      for (let i = 0; i < items.length; i++) {
        this.drawthis(items[i].obj, true)
      }
    },
    getdrawdata(item, sex, attrs, classes, county) {
      let data = item.data
      data = data.filter(
        (n) =>
          n.statistics_eng.includes(attrs) &&
          n.sex_eng === sex &&
          n.classes_eng === classes &&
          n.county_eng === county
      )

      return data
    },
    setCountyPadding() {
      const row = this.tablerows
      let i
      for (i = 0; i < row.length; i++) {
        if (row[i] === 'county_eng') break
      }

      const table = document.getElementsByClassName('pvtTable')[0]
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
            const tspan = th.innerHTML
            if (tspan === 'Taiwan Area') {
              th.className = 'pvtRowLabel clevel0'
            } else if (
              tspan === 'Northern region' ||
              tspan === 'Central region' ||
              tspan === 'Eastern region' ||
              tspan === 'Southern region'
            ) {
              th.className = 'pvtRowLabel clevel1'
            } else {
              th.className = 'pvtRowLabel clevel2'
            }
          }
        }
      }
    },
    setTableCount() {
      const vm = this
      const searchtype = this.$route.query.classes
      axios.post(
        vm.RequetURL.cityaxurl,
        qs.stringify({ op: 'SetTableCount', classes: searchtype })
      )
    },
    setImageCount() {
      const vm = this
      const searchtype = this.$route.query.classes
      axios.post(
        vm.RequetURL.cityaxurl,
        qs.stringify({ op: 'SetChartCount', classes: searchtype })
      )
    },
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
    },
    downloadfile(opt) {
      const type = opt.type
      const idx = opt.idx
      const vm = this

      const form = new FormData()

      const tar = document.getElementById('table' + idx)
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
          opt.rowspan = ts.getAttribute('rowspan')
          opt.colspan = ts.getAttribute('colspan')
          opt.className = ts.className
          opt.value = ts.innerHTML
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
          opt.rowspan = ts.getAttribute('rowspan')
          opt.colspan = ts.getAttribute('colspan')
          opt.isth = true
          opt.className = ts.className
          opt.value = ts.innerHTML
          ppt.ths.push(opt)
        }
        const tds = trs2[i].getElementsByTagName('td')
        for (let j = 0; j < tds.length; j++) {
          const ts = tds[j]
          const opt = {}
          opt.rowspan = 1
          opt.colspan = 1
          opt.isth = false
          opt.className = ts.className
          opt.value = ts.innerHTML
          ppt.ths.push(opt)
        }
        result2.push(ppt)
      }

      const otb = {}
      otb.thead = result
      otb.tbody = result2

      const target = JSON.stringify(otb)
      form.set('html', target)
      form.set('title', 'CombineCity')
      form.set('type', type)

      axios({
        method: 'post',
        url: vm.RequetURL.exporturl2,
        data: form,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((Response) => {
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
    },
    downloadImage(opt) {
      const type = opt.type
      const idx = opt.idx

      this.setImageCount()
      this.$refs['chart' + idx][0].chart.exportChart({ type })
    }
  }
}
</script>
<style lang="scss" scope>
.titlespan {
  font-weight: bold;
  font-size: 1.75em;
  line-height: 40px;
  color: #000000;
}
.tablezone {
  width: 100%;
  max-height: 550px;
  overflow: auto;
}
table.pvtTable thead tr:nth-child(1) th:nth-child(n + 2) {
  background: #466a6d !important;
}
.showbtn {
  color: #344059;
  background: #ffffff;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.0625em;
  padding: 5px 15px;
  margin-right: 10px;
}
.breadzone {
  width: 50%;
  background: #ffffff;
  border-radius: 7px;
  height: 150px;
  padding: 10px;
  margin-top: 20px;
}
.showbtnzone {
  width: 50%;
  height: 150px;
  margin-top: 20px;
}
.breadtitle {
  font-weight: bold;
  font-size: 1em;
  line-height: 30px;
  color: #000000;
}
.breadinner {
  font-size: 1em;
  line-height: 30px;
  color: #000000;
}
.transtable {
  width: 100%;
  border-collapse: collapse;
}
.transtable thead {
  background: #485965;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.125em;

  text-align: center;
}
.transtable thead tr th {
  border: 1px solid #485965;
  height: 50px;
  padding-left: 10px;
}
.transtable tbody {
  background: #dfedf1;
  font-size: 1em;
}
.transtable tbody tr td {
  border: 1px solid #dfedf1;
}
.translist {
  width: 100%;
  height: 150px;
  overflow: auto;
}
.translist option {
  padding: 4px 10px;
}
.tableitem {
  margin-top: 5px;
  position: relative;
}
.tableitemfade {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 700px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.headbtn_top {
  height: 49px;
  background: #40678a;
  position: absolute;
  right: 120px;
  padding: 0px 10px;
}
.headbtn_down {
  height: 50px;
  background: #40678a;
  position: absolute;
  right: 55px;
  padding: 0px 10px;
}
.rcbtn {
  width: 50px;
  height: 50px;
  border: 1px solid #777777;
  box-sizing: border-box;
  border-radius: 3px;
}
.rcbtnzone {
  max-width: 90px !important;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.pretable {
  width: 450px;
  height: 350px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.grayaxis {
  width: 180px;
  height: 150px;
  background: #d8d8d8;
}
.colblue {
  width: 250px;
  height: 150px;
  background: #dfedf1;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.rowblue {
  width: 180px;
  height: 180px;
  background: #dfedf1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.valyallow {
  width: 250px;
  height: 180px;
  background: #ffe394;
  margin-left: 10px;
}
.colblueitem {
  width: 150px;
  text-align: center;
}
.rowblueitem {
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
.rtranstable {
  width: 100%;
  border-collapse: collapse;
}
.rtranstable thead {
  background: #df6573;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.125em;

  text-align: center;
}
.rtranstable thead tr th {
  border: 1px solid #df6573;
  padding: 10px;
}
.rtranstable tbody {
  background: #ffd2d7;
  font-size: 1em;
}
.rtranstable tbody tr td {
  border: 1px solid #ffd2d7;
}
.clevel0 {
  padding-left: 2px;
}
.clevel1 {
  padding-left: 18px;
}
.clevel2 {
  padding-left: 34px;
}
</style>
