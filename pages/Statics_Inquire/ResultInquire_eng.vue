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
          <span class="breadtitle">Category:</span
          ><span class="breadinner">{{ classstring }}</span>
          <br />
          <span class="breadtitle">Sex:</span
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
      <div v-if="base_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="base_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ base_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="base_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="base_table"
                  @click="base_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="base_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="base_drawset"
                  @click="base_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="base_table == false"
                class="showbtn"
                @click="base_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="base_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile1"
              ></downloadbtn2>
              <downloadbtn
                v-if="base_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage1"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="base_table === true && base_items.length > 0">
            <v-col :id="'table1'">
              <VuePivottable
                :items="base_items"
                :pkey="base_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :date-sort="date_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="base_table === true && base_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="base_table === false">
            <v-col>
              <highcharts
                ref="chart1"
                :key="hkey1"
                :options="baseChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="base_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- Base設定畫圖Start -->
          <v-dialog
            v-model="base_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="base_drawset = false"
                @keyup.enter="base_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="base_idx"
                  :show="base_drawset"
                  :classtype="1"
                  :statitems="editstat"
                  @closeConditions="base_drawset = false"
                  @drawthis="drawbase"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- Base設定畫圖End -->
        </v-container>
      </div>
      <div v-if="age_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="age_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ age_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="age_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="age_table"
                  @click="age_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="age_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="age_drawset"
                  @click="age_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="age_table == false"
                class="showbtn"
                @click="age_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="age_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile2"
              ></downloadbtn2>
              <downloadbtn
                v-if="age_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage2"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="age_table === true && age_items.length > 0">
            <v-col :id="'table2'">
              <VuePivottable
                :items="age_items"
                :pkey="age_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="age_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="age_table === true && age_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="age_table === false">
            <v-col>
              <highcharts
                ref="chart2"
                :key="hkey2"
                :options="ageChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="age_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- Age設定畫圖Start -->
          <v-dialog
            v-model="age_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="age_drawset = false"
                @keyup.enter="age_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="age_idx"
                  :show="age_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="age_drawset = false"
                  @drawthis="drawage"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- Age設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="edtion_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="edtion_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ edtion_title }}</span>
            </v-col>
          </v-row>
          <v-row style="padding-left: 10px;">
            <span style="font-size: 1em; color: #292B3B;"
              >*Data before year 2010 only displays to "University &
              above".</span
            >
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="edtion_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="edtion_table"
                  @click="edtion_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="edtion_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="edtion_drawset"
                  @click="edtion_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="edtion_table == false"
                class="showbtn"
                @click="edtion_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="edtion_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile3"
              ></downloadbtn2>
              <downloadbtn
                v-if="edtion_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage3"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="edtion_table === true && edtion_items.length > 0">
            <v-col :id="'table3'">
              <VuePivottable
                :items="edtion_items"
                :pkey="edtion_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="edtion_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="edtion_table === true && edtion_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="edtion_table === false">
            <v-col>
              <highcharts
                ref="chart3"
                :key="hkey3"
                :options="edtionChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="edtion_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- Edtion設定畫圖Start -->
          <v-dialog
            v-model="edtion_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="edtion_drawset = false"
                @keyup.enter="edtion_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="edtion_idx"
                  :show="edtion_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="edtion_drawset = false"
                  @drawthis="drawedtion"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- Edtion設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="ind6_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="ind6_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ ind6_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="ind6_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="ind6_table"
                  @click="ind6_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="ind6_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="ind6_drawset"
                  @click="ind6_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="ind6_table == false"
                class="showbtn"
                @click="ind6_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="ind6_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile4"
              ></downloadbtn2>
              <downloadbtn
                v-if="ind6_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage4"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="ind6_table === true && ind6_items.length > 0">
            <v-col :id="'table4'">
              <VuePivottable
                :items="ind6_items"
                :pkey="ind6_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="ind6_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="ind6_table === true && ind6_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="ind6_table === false">
            <v-col>
              <highcharts
                ref="chart4"
                :key="hkey4"
                :options="ind6ChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="ind6_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- ind6設定畫圖Start -->
          <v-dialog
            v-model="ind6_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="ind6_drawset = false"
                @keyup.enter="ind6_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="ind6_idx"
                  :show="ind6_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="ind6_drawset = false"
                  @drawthis="drawind6"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- ind6設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="ind7_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="ind7_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ ind7_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="ind7_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="ind7_table"
                  @click="ind7_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="ind7_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="ind7_drawset"
                  @click="ind7_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="ind7_table == false"
                class="showbtn"
                @click="ind7_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="ind7_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile5"
              ></downloadbtn2>
              <downloadbtn
                v-if="ind7_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage5"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="ind7_table === true && ind7_items.length > 0">
            <v-col :id="'table5'">
              <VuePivottable
                :items="ind7_items"
                :pkey="ind7_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="ind7_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="ind7_table === true && ind7_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="ind7_table === false">
            <v-col>
              <highcharts
                ref="chart5"
                :key="hkey5"
                :options="ind7ChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="ind7_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- ind7設定畫圖Start -->
          <v-dialog
            v-model="ind7_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="ind7_drawset = false"
                @keyup.enter="ind7_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="ind7_idx"
                  :show="ind7_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="ind7_drawset = false"
                  @drawthis="drawind7"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- ind7設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="ind8_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="ind8_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ ind8_title }}</span>
            </v-col>
          </v-row>
          <span style="font-size: 1em; color: #292B3B;"
            >*8th: Year 2001-2011, 9th: Year 2012-2016, 10th: After Year
            2017</span
          >
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="ind8_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="ind8_table"
                  @click="ind8_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="ind8_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="ind8_drawset"
                  @click="ind8_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="ind8_table == false"
                class="showbtn"
                @click="ind8_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="ind8_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile6"
              ></downloadbtn2>
              <downloadbtn
                v-if="ind8_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage6"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="ind8_table === true && ind8_items.length > 0">
            <v-col :id="'table6'">
              <VuePivottable
                :items="ind8_items"
                :pkey="ind8_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="ind8_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="ind8_table === true && ind8_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="ind8_table === false">
            <v-col>
              <highcharts
                ref="chart6"
                :key="hkey6"
                :options="ind8ChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="ind8_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- ind8設定畫圖Start -->
          <v-dialog
            v-model="ind8_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="ind8_drawset = false"
                @keyup.enter="ind8_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="ind8_idx"
                  :show="ind8_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="ind8_drawset = false"
                  @drawthis="drawind8"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- ind8設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="ind12_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="ind12_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ ind12_title }}</span>
            </v-col>
          </v-row>
          <span style="font-size: 1em; color: #292B3B;"
            >*8th: Year 2001-2011, 9th: Year 2012-2016, 10th: After Year
            2017</span
          >
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="ind12_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="ind12_table"
                  @click="ind12_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="ind12_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="ind12_drawset"
                  @click="ind12_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="ind12_table == false"
                class="showbtn"
                @click="ind12_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="ind12_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile12"
              ></downloadbtn2>
              <downloadbtn
                v-if="ind12_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage12"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="ind12_table === true && ind12_items.length > 0">
            <v-col :id="'table12'">
              <VuePivottable
                :items="ind12_items"
                :pkey="ind12_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="ind12_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="ind12_table === true && ind12_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="ind12_table === false">
            <v-col>
              <highcharts
                ref="chart12"
                :key="hkey12"
                :options="ind12ChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="ind12_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- ind12設定畫圖Start -->
          <v-dialog
            v-model="ind12_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="ind12_drawset = false"
                @keyup.enter="ind12_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="ind12_idx"
                  :show="ind12_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="ind12_drawset = false"
                  @drawthis="drawind12"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- ind12設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="occ5_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="occ5_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ occ5_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="occ5_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="occ5_table"
                  @click="occ5_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="occ5_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="occ5_drawset"
                  @click="occ5_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="occ5_table == false"
                class="showbtn"
                @click="occ5_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="occ5_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile7"
              ></downloadbtn2>
              <downloadbtn
                v-if="occ5_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage7"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="occ5_table === true && occ5_items.length > 0">
            <v-col :id="'table7'">
              <VuePivottable
                :items="occ5_items"
                :pkey="occ5_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="occ5_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="occ5_table === true && occ5_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="occ5_table === false">
            <v-col>
              <highcharts
                ref="chart7"
                :key="hkey7"
                :options="occ5ChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="occ5_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- occ5設定畫圖Start -->
          <v-dialog
            v-model="occ5_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="occ5_drawset = false"
                @keyup.enter="occ5_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="occ5_idx"
                  :show="occ5_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="occ5_drawset = false"
                  @drawthis="drawocc5"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- occ5設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="occ6_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="occ6_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ occ6_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="occ6_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="occ6_table"
                  @click="occ6_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="occ6_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="occ6_drawset"
                  @click="occ6_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="occ6_table == false"
                class="showbtn"
                @click="occ6_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="occ6_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile8"
              ></downloadbtn2>
              <downloadbtn
                v-if="occ6_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage8"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="occ6_table === true && occ6_items.length > 0">
            <v-col :id="'table8'">
              <VuePivottable
                :items="occ6_items"
                :pkey="occ6_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="occ6_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="occ6_table === false">
            <v-col>
              <highcharts
                ref="chart8"
                :key="hkey8"
                :options="occ6ChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="occ6_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- occ6設定畫圖Start -->
          <v-dialog
            v-model="occ6_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="occ6_drawset = false"
                @keyup.enter="occ6_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="occ6_idx"
                  :show="occ6_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="occ6_drawset = false"
                  @drawthis="drawocc6"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- occ6設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="cow_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="cow_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ cow_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="cow_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="cow_table"
                  @click="cow_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="cow_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="cow_drawset"
                  @click="cow_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="cow_table == false"
                class="showbtn"
                @click="cow_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="cow_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile9"
              ></downloadbtn2>
              <downloadbtn
                v-if="cow_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage9"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="cow_table === true && cow_items.length > 0">
            <v-col :id="'table9'">
              <VuePivottable
                :items="cow_items"
                :pkey="cow_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="cow_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="cow_table === true && cow_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="cow_table === false">
            <v-col>
              <highcharts
                ref="chart9"
                :key="hkey9"
                :options="cowChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="cow_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <!-- cow設定畫圖Start -->
          <v-dialog
            v-model="cow_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="cow_drawset = false"
                @keyup.enter="cow_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="cow_idx"
                  :show="cow_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="cow_drawset = false"
                  @drawthis="drawcow"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- cow設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="ron_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="ron_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ ron_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="ron_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="ron_table"
                  @click="ron_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="ron_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="ron_drawset"
                  @click="ron_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="ron_table == false"
                class="showbtn"
                @click="ron_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="ron_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile10"
              ></downloadbtn2>
              <downloadbtn
                v-if="ron_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage10"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="ron_table === true && ron_items.length > 0">
            <v-col :id="'table10'">
              <VuePivottable
                :items="ron_items"
                :pkey="ron_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="ron_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="ron_table === true && ron_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="ron_table === false">
            <v-col>
              <highcharts
                ref="chart10"
                :key="hkey10"
                :options="ronChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="ron_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <v-row style="padding-left: 10px;">
            <span style="font-size: 1.25em; color: #292B3B;"
              >Note: Starting from January 2025, those who are not in the labor
              force for the reason “Intend & be available to work but not
              seeking” are classified into four categories: "Attend school or
              rebrush to take entrance exams", "Housekeeping", "Old age or
              disable", and "Others" according to their actual conditions, and
              are no longer listed separately.</span
            >
          </v-row>
          <!-- ron設定畫圖Start -->
          <v-dialog
            v-model="ron_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="ron_drawset = false"
                @keyup.enter="ron_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="ron_idx"
                  :show="ron_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="ron_drawset = false"
                  @drawthis="drawron"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- ron設定畫圖Start -->
        </v-container>
      </div>
      <div v-if="rou_show" class="tableitem">
        <v-container class="contanierNonMaxWidth">
          <div v-if="rou_items.length === 0" class="tableitemfade">
            <img src="@/assets/images/Spin_GIF.gif" class="fadespin" alt="" />
          </div>
          <v-row>
            <v-col>
              <span class="titlespan">{{ rou_title }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="AllLeft">
              <div class="ui large buttons">
                <button
                  :class="rou_table ? 'ui button active' : 'ui button'"
                  role="tab"
                  :aria-selected="rou_table"
                  @click="rou_table = true"
                >
                  Statistical Table
                </button>
                <div class="or"></div>
                <button
                  :class="rou_table ? 'ui button' : 'ui button active'"
                  role="tab"
                  :aria-selected="rou_drawset"
                  @click="rou_drawset = true"
                >
                  Statistical Graph
                </button>
              </div>
            </v-col>
            <v-col class="AllRight">
              <button
                v-if="rou_table == false"
                class="showbtn"
                @click="rou_drawset = true"
              >
                <img
                  src="@/assets/images/Btn_Image/edit.svg"
                  style="margin-bottom: 4px;"
                  alt=""
                />
                Content settings
              </button>
              <downloadbtn2
                v-if="rou_table == true"
                :name="'Download'"
                :items="[{ title: 'Download XLSX' }, { title: 'Download ODS' }]"
                @downloadclick2="downloadfile11"
              ></downloadbtn2>
              <downloadbtn
                v-if="rou_table == false"
                :name="'Download'"
                :items="[{ title: 'Download PNG' }, { title: 'Download JPEG' }]"
                @downloadclick="downloadImage11"
              ></downloadbtn>
            </v-col>
          </v-row>
          <v-row v-if="rou_table === true && rou_items.length > 0">
            <v-col :id="'table11'">
              <VuePivottable
                :items="rou_items"
                :pkey="rou_idx"
                :tablerows="tablerows"
                :tablecols="tablecols"
                :values="values"
                :needref="needref"
                :sex-sort="sex_sort"
                :statistics-sort="statistics_sort"
                :classes-sort="rou_sort"
                :default-format="defaultFormat"
                :format-list="formatList"
              ></VuePivottable>
            </v-col>
          </v-row>
          <v-row v-if="rou_table === true && rou_items.length === 0">
            <v-col>
              <div class="tablezone2"></div>
            </v-col>
          </v-row>
          <v-row v-if="rou_table === false">
            <v-col>
              <highcharts
                ref="chart11"
                :key="hkey11"
                :options="rouChartOption"
                class="tablezone"
              ></highcharts>
            </v-col>
          </v-row>
          <v-row v-if="rou_table === false">
            <v-col class="AllRight chartinfo">
              <div>
                <span
                  >* Drawing Project Functions:Click the item in the legend to
                  close the item temporarily</span
                >
                <br />
                <span
                  >* Drawing area function:You can use the mouse to drag the
                  area after the drag with the horizontal scroll magnification
                  view</span
                >
              </div>
            </v-col>
          </v-row>
          <v-row style="padding-left: 10px;">
            <span style="font-size: 1.25em; color: #292B3B;">
              Note: Until 2022, “Marriage or childbirth” referred only to women.
            </span>
          </v-row>
          <!-- rou設定畫圖Start -->
          <v-dialog
            v-model="rou_drawset"
            persistent
            scrollable
            retain-focus
            max-width="500"
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
                aria-label="close"
                @click="rou_drawset = false"
                @keyup.enter="rou_drawset = false"
              >
                X
              </div>
              <div class="modal-header AllCenter">
                <label>Statistical Graph-Setting</label>
              </div>
              <div class="modal-body">
                <drawset
                  :key="rou_idx"
                  :show="rou_drawset"
                  :classtype="2"
                  :statitems="editstat"
                  :hassex="true"
                  :sexitems="editsex"
                  @closeConditions="rou_drawset = false"
                  @drawthis="drawrou"
                ></drawset>
              </div>
            </div>
          </v-dialog>
          <!-- rou設定畫圖Start -->
        </v-container>
      </div>
      <!--表格轉置 START-->
      <v-dialog
        v-model="tabletrans"
        persistent
        scrollable
        retain-focus
        max-width="800"
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
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="right move"
                    @click="rowmovecol"
                  >
                    &gt;
                  </button>
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="left move"
                    @click="colmoverow"
                  >
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
              <v-row v-if="false" class="transpre">
                <span>Preview</span>
              </v-row>
              <v-row v-if="false" class="transpre">
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
              :name="'Close'"
              @click.native="tabletrans = false"
            ></crosscancel>
            <editbtn
              :name="'Transport'"
              @click.native="transtabletrigger"
            ></editbtn>
          </div>
        </div>
      </v-dialog>
      <!--表格轉置 END-->
      <!--表格編輯 START-->
      <v-dialog
        v-model="tableedit"
        persistent
        scrollable
        retain-focus
        max-width="800"
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
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="right move"
                    @click="classesremove"
                  >
                    &gt;
                  </button>
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="left move"
                    @click="classesadd"
                  >
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
                <span>Sex</span>
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
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="right move"
                    @click="sexesremove"
                  >
                    &gt;
                  </button>
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="left move"
                    @click="sexesadd"
                  >
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
                <span>View of The Data</span>
              </v-row>
              <v-row>
                <v-col class="transcol">
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
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="right move"
                    @click="statremove"
                  >
                    &gt;
                  </button>
                  <button
                    class="rcbtn"
                    role="button"
                    aria-label="left move"
                    @click="statadd"
                  >
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
              :name="'Close'"
              @click.native="tableedit = false"
            ></crosscancel>
            <editbtn :name="'Edit'" @click.native="edittabletrigger"></editbtn>
          </div>
        </div>
      </v-dialog>
      <!--表格編輯 END-->
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <div v-if="loader" class="fade_cust"></div>
      <div v-if="loader" class="loader"></div>
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
import VuePivottable from '~/components/table/Taiwan_Intranet_EN'
import downloadbtn2 from '~/components/button/downloadbtn2'
import downloadbtn from '~/components/button/downloadbtn'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'
import drawset from '~/components/MoreInquire/DrawSet_eng'
export default {
  components: {
    VuePivottable,
    downloadbtn,
    downloadbtn2,
    crosscancel,
    editbtn,
    drawset
  },
  layout: 'BackStage_eng',
  data() {
    return {
      loader: false,
      axiosidx: 0,
      axiosary: [],
      statstring: '',
      classstring: '',
      sexstring: '',
      datastring: '',
      tablerows: ['d_e'],
      tablecols: ['c_e', 's_e', 'st_e'],
      values: ['v'],
      sex_sort: [],
      date_sort: [],
      statistics_sort: [
        { name: 'Data value (Thousand Persons)', value: 1 },
        { name: 'Data value (%)', value: 2 },
        { name: '% of Total', value: 3 },
        {
          name:
            'Change from previous period (level, percentage point) (Thousand Persons)',
          value: 4
        },
        {
          name: 'Change from previous period (level, percentage point) (%)',
          value: 5
        },
        { name: 'Change in percent from previous period (%)', value: 6 },
        {
          name:
            'Change from that of previous year (level, percentage point) (Thousand Persons)',
          value: 7
        },
        {
          name:
            'Change from that of previous year (level, percentage point) (%)',
          value: 8
        },
        { name: 'Change in percent from that of previous year (%)', value: 9 },
        {
          name: 'Change from previous period (level, percentage point)',
          value: 10
        },
        {
          name: 'Change from that of previous year (level, percentage point)',
          value: 11
        }
      ],
      datastat_sort: [
        { name: 'Data value', value: 1 },
        { name: '% of Total', value: 2 },
        {
          name: 'Change from previous period (level, percentage point)',
          value: 3
        },
        { name: 'Change in percent from previous period', value: 4 },
        {
          name: 'Change from that of previous year (level, percentage point)',
          value: 5
        },
        { name: 'Change in percent from that of previous year', value: 6 },
        {
          name: 'Change from previous period (level, percentage point)',
          value: 7
        },
        {
          name: 'Change from that of previous year (level, percentage point)',
          value: 8
        }
      ],
      defaultFormat: {
        digitsAfterDecimal: 0,
        defaultValue: '-',
        replaceToDefault: [-999999]
      },
      formatList: {
        'Data value (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        '% of Total': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change in percent from previous period (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change from previous period (level, percentage point) (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change from that of previous year (level, percentage point) (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change in percent from that of previous year (%)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change from that of previous year (level, percentage point)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        },
        'Change from previous period (level, percentage point)': {
          digitsAfterDecimal: 2,
          scaler: 1,
          defaultValue: '-',
          replaceToDefault: [-999999]
        }
      },
      base_show: false,
      age_show: false,
      edtion_show: false,
      ind6_show: false,
      ind7_show: false,
      ind8_show: false,
      ind12_show: false,
      occ5_show: false,
      occ6_show: false,
      cow_show: false,
      ron_show: false,
      rou_show: false,
      base_idx: 0,
      age_idx: 0,
      edtion_idx: 0,
      ind6_idx: 0,
      ind7_idx: 0,
      ind8_idx: 0,
      ind12_idx: 0,
      occ5_idx: 0,
      occ6_idx: 0,
      cow_idx: 0,
      ron_idx: 0,
      rou_idx: 0,
      base_title: '',
      base_items: [],
      base_data: [],
      age_title: '',
      age_items: [],
      age_data: [],
      age_sort: [],
      edtion_title: '',
      edtion_items: [],
      edtion_data: [],
      edtion_sort: [],
      ind6_title: '',
      ind6_items: [],
      ind6_data: [],
      ind6_sort: [],
      ind7_title: '',
      ind7_items: [],
      ind7_data: [],
      ind7_sort: [],
      ind8_title: '',
      ind8_items: [],
      ind8_data: [],
      ind8_sort: [],
      ind12_title: '',
      ind12_items: [],
      ind12_data: [],
      ind12_sort: [],
      occ5_title: '',
      occ5_items: [],
      occ5_data: [],
      occ5_sort: [],
      occ6_title: '',
      occ6_items: [],
      occ6_data: [],
      occ6_sort: [],
      cow_title: '',
      cow_items: [],
      cow_data: [],
      cow_sort: [],
      ron_title: '',
      ron_items: [],
      ron_data: [],
      ron_sort: [],
      rou_title: '',
      rou_items: [],
      rou_data: [],
      rou_sort: [],
      TableExplanOpen: false,
      tabletrans: false,
      tableedit: false,
      strow: -1,
      stcol: -1,
      trowitems: [],
      tcolitems: [],
      seclasses: -1,
      sesex: -1,
      sesattistics: -1,
      srclasses: -1,
      srsex: -1,
      srsattistics: -1,
      editclasses: [],
      editsex: [],
      editstat: [],
      removeclasses: [],
      removesex: [],
      removestat: [],
      tecls: [],
      tesex: [],
      testa: [],
      trcls: [],
      trsex: [],
      trsta: [],
      xAxisarray: [],
      baseChartOption: {},
      ageChartOption: {},
      edtionChartOption: {},
      ind6ChartOption: {},
      ind7ChartOption: {},
      ind8ChartOption: {},
      ind12ChartOption: {},
      occ5ChartOption: {},
      occ6ChartOption: {},
      cowChartOption: {},
      ronChartOption: {},
      rouChartOption: {},
      base_table: true,
      age_table: true,
      edtion_table: true,
      ind6_table: true,
      ind7_table: true,
      ind8_table: true,
      ind12_table: true,
      occ5_table: true,
      occ6_table: true,
      cow_table: true,
      ron_table: true,
      rou_table: true,
      base_drawset: false,
      age_drawset: false,
      edtion_drawset: false,
      ind6_drawset: false,
      ind7_drawset: false,
      ind8_drawset: false,
      ind12_drawset: false,
      occ5_drawset: false,
      occ6_drawset: false,
      cow_drawset: false,
      ron_drawset: false,
      rou_drawset: false,
      betransport: false,
      base_obj: null,
      age_obj: null,
      edtion_obj: null,
      ind6_obj: null,
      ind7_obj: null,
      ind8_obj: null,
      ind12_obj: null,
      occ5_obj: null,
      occ6_obj: null,
      cow_obj: null,
      ron_obj: null,
      rou_obj: null,
      needref: false,
      hkey1: 0,
      hkey2: 0,
      hkey3: 0,
      hkey4: 0,
      hkey5: 0,
      hkey6: 0,
      hkey7: 0,
      hkey8: 0,
      hkey9: 0,
      hkey10: 0,
      hkey11: 0,
      hkey12: 0,
      overlay: false,
      infotype: -1
    }
  },
  watch: {
    base_table(val) {
      if (val === true) this.needref = true
    },
    age_table(val) {
      if (val === true) this.needref = true
    },
    edtion_table(val) {
      if (val === true) this.needref = true
    },
    ind6_table(val) {
      if (val === true) this.needref = true
    },
    ind7_table(val) {
      if (val === true) this.needref = true
    },
    ind8_table(val) {
      if (val === true) this.needref = true
    },
    ind12_table(val) {
      if (val === true) this.needref = true
    },
    occ5_table(val) {
      if (val === true) this.needref = true
    },
    occ6_table(val) {
      if (val === true) this.needref = true
    },
    cow_table(val) {
      if (val === true) this.needref = true
    },
    ron_table(val) {
      if (val === true) this.needref = true
    },
    rou_table(val) {
      if (val === true) this.needref = true
    },
    base_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    age_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    edtion_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    ind6_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    ind7_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    ind8_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    ind12_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    occ5_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    occ6_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    cow_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    ron_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    rou_drawset(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    tabletrans(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    },
    tableedit(val) {
      if (val) {
        this.$nextTick(() => {
          this.trapFocus()
        })
      }
    }
  },
  updated() {
    if (this.needref) {
      this.headerfloat()
      this.needref = false
    }
    this.tablecolorset()
    this.setRowFrezze()
    this.floatheaderfixed()
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 2)
    this.statstring = this.getROCType(this.$route.query.type)
    this.classstring = this.$route.query.classes
      .replace('總計', 'Total')
      .replace('失業率', 'Total')
      .replace('勞動力參與率', 'Total')
      .replace('年齡', 'Age')
      .replace('教育程度', 'Educational Attainment')
      .replace('行業_6', 'Industry 6th')
      .replace('行業_7', 'Industry 7th')
      .replace('行業_8', 'Industry 8th-11th')
      .replace('行業_12', 'Industry 12th')
      .replace('職業_5', 'Occupation 5th')
      .replace('職業_6', 'Occupation 6th')
      .replace('從業身分', 'Class of Worker')
      .replace('失業原因', 'Reason for Unemployment')
      .replace('非勞動原因', 'Reason for Not in Labor Force')

    this.sexstring = this.$route.query.sex
      .replace('T', 'Total')
      .replace('M', 'Male')
      .replace('F', 'Female')

    this.datastring = this.$route.query.statistics
      .replace(/,/g, ';')
      .replace('1', 'Data value')
      .replace('2', 'Change from previous period (level, percentage point)')
      .replace(
        '3',
        'Change from that of previous year (level, percentage point)'
      )
      .replace('4', '% of Total')
      .replace('5', 'Change in percent from previous period')
      .replace('6', 'Change in percent from that of previous year')

    let dstr = this.datastring.split(',')
    dstr = dstr.sort(this.datastatsort)
    let edstr = ''
    for (let i = 0; i < dstr.length; i++) {
      if (i !== 0) edstr += ','
      edstr += dstr[i]
    }
    this.datastring = edstr

    this.editclasses = this.classstring.split(',')
    this.editsex = this.sexstring.split(',')
    this.editstat = this.datastring.split(';')
    this.sex_sort = this.sexstring.split(',')

    this.setbcount()
    this.getdatearry()

    let classes = this.$route.query.classes
    classes = classes.split(',')
    this.showthezone(classes)
    const ary = []
    for (let i = 0; i < classes.length; i++) {
      ary.push({ name: classes[i], idx: i })
    }
    this.axiosary = ary
    this.postaxios()
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
        const width = tart[j].clientWidth
        if (colt[j]) {
          $(colt[j]).css('maxWidth', width + 'px')
          $(colt[j]).css('table-layout', 'auto')
          $(colt[j]).width(width)
          $(tart[j]).css('table-layout', 'auto')
        }
      }

      // head
      const colg = $('.floatThead-table colgroup col')
      // body
      const targ = $('.tablezone .pvtTable colgroup col')

      for (let i = 0; i < targ.length; i++) {
        const width2 = $(targ[i])
          .width()
          .toFixed(2)
        if (colg[i]) {
          $(colg[i]).width(width2)
          $(colg[i]).css('maxWidth', width2)
          $(targ[i]).width(width2)
          $(targ[i]).css('maxWidth', width2)
        }
      }
    },
    disheaderfloat() {
      const $table = $('.pvtTable')
      $table.floatThead('destroy')
    },
    floatheaderfixed() {
      setTimeout(function() {
        const targ = $('.floatThead-col')

        for (let i = 0; i < targ.length; i++) {
          $(targ[i]).attr('scope', 'col')
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
    research() {
      this.$router.push({
        path: '/Statics_Inquire/MoreInquire_eng'
      })
    },
    setbcount() {
      const vm = this
      const searchtype = this.$route.query.type
      axios.post(
        vm.RequetURL.majaxurl,
        qs.stringify({ op: 'SetBrowserCount', type: searchtype })
      )
    },
    showthezone(classes) {
      const vm = this
      for (let i = 0; i < classes.length; i++) {
        switch (classes[i]) {
          case '總計':
          case '失業率':
          case '勞動力參與率':
            vm.base_title = vm.getROCTitle('BASE')
            vm.base_show = true
            break
          case '年齡':
            vm.age_title = vm.getROCTitle('AGE')
            vm.age_show = true
            break
          case '教育程度':
            vm.edtion_title = vm.getROCTitle('EDTION')
            vm.edtion_show = true
            break
          case '行業_6':
            vm.ind6_title = vm.getROCTitle('IND6')
            vm.ind6_show = true
            break
          case '行業_7':
            vm.ind7_title = vm.getROCTitle('IND7')
            vm.ind7_show = true
            break
          case '行業_8':
            vm.ind8_title = vm.getROCTitle('IND8')
            vm.ind8_show = true
            break
          case '行業_12':
            vm.ind12_title = vm.getROCTitle('IND12')
            vm.ind12_show = true
            break
          case '職業_5':
            vm.occ5_title = vm.getROCTitle('OCC5')
            vm.occ5_show = true
            break
          case '職業_6':
            vm.occ6_title = vm.getROCTitle('OCC6')
            vm.occ6_show = true
            break
          case '從業身分':
            vm.cow_title = vm.getROCTitle('COW')
            vm.cow_show = true
            break
          case '非勞動原因':
            vm.ron_title = vm.getROCTitle('RON')
            vm.ron_show = true
            break
          case '失業原因':
            vm.rou_title = vm.getROCTitle('ROU')
            vm.rou_show = true
            break
        }
      }
    },
    postaxios() {
      const vm = this
      const ary = this.axiosary
      const idx = this.axiosidx

      if (idx === ary.length) return

      setTimeout(function() {
        vm.getaxios(ary[idx].name, idx)
      }, 100)

      this.axiosidx = idx + 1
    },
    getaxios(classes, i) {
      const vm = this
      const _post = {}

      _post.type = this.$route.query.type
      _post.startyear = this.$route.query.startyear
      _post.endyear = this.$route.query.endyear
      _post.infotype = this.$route.query.infotype
      _post.cycle = this.$route.query.cycle

      if (this.$route.query.type === 'NLF') _post.sex = 'T'
      else _post.sex = this.$route.query.sex

      _post.statistics = this.$route.query.statistics
      _post.op = 'GetRequestTables'
      _post.classes = classes

      return axios
        .post(vm.RequetURL.majaxurl + '?v=' + i, qs.stringify(_post))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            if (data.BASE) {
              vm.base_items = data.BASE
              vm.base_data = data.BASE
            }
            if (data.AGE) {
              vm.age_items = data.AGE
              vm.age_data = data.AGE
              for (let i = 0; i < data.AGE_SORT.length; i++)
                vm.age_sort.push({
                  name: data.AGE_SORT[i].name_eng,
                  level: data.AGE_SORT[i].level,
                  show: data.AGE_SORT[i].show
                })
            }
            if (data.EDTION) {
              vm.edtion_items = data.EDTION
              vm.edtion_data = data.EDTION
              for (let i = 0; i < data.EDTION_SORT.length; i++)
                vm.edtion_sort.push({
                  name: data.EDTION_SORT[i].name_eng,
                  level: data.EDTION_SORT[i].level,
                  show: data.EDTION_SORT[i].show
                })
            }
            if (data.IND6) {
              vm.ind6_items = data.IND6
              vm.ind6_data = data.IND6
              for (let i = 0; i < data.IND6_SORT.length; i++)
                vm.ind6_sort.push({
                  name: data.IND6_SORT[i].name_eng,
                  level: data.IND6_SORT[i].level,
                  show: data.IND6_SORT[i].show
                })
            }
            if (data.IND7) {
              vm.ind7_items = data.IND7
              vm.ind7_data = data.IND7
              for (let i = 0; i < data.IND7_SORT.length; i++)
                vm.ind7_sort.push({
                  name: data.IND7_SORT[i].name_eng,
                  level: data.IND7_SORT[i].level,
                  show: data.IND7_SORT[i].show
                })
            }
            if (data.IND8) {
              vm.ind8_items = data.IND8
              vm.ind8_data = data.IND8
              for (let i = 0; i < data.IND8_SORT.length; i++)
                vm.ind8_sort.push({
                  name: data.IND8_SORT[i].name_eng,
                  level: data.IND8_SORT[i].level,
                  show: data.IND8_SORT[i].show
                })
            }
            if (data.IND12) {
              vm.ind12_items = data.IND12
              vm.ind12_data = data.IND12
              for (let i = 0; i < data.IND12_SORT.length; i++)
                vm.ind12_sort.push({
                  name: data.IND12_SORT[i].name_eng,
                  level: data.IND12_SORT[i].level,
                  show: data.IND12_SORT[i].show
                })
            }
            if (data.OCC5) {
              vm.occ5_items = data.OCC5
              vm.occ5_data = data.OCC5
              for (let i = 0; i < data.OCC5_SORT.length; i++)
                vm.occ5_sort.push({
                  name: data.OCC5_SORT[i].name_eng,
                  level: data.OCC5_SORT[i].level,
                  show: data.OCC5_SORT[i].show
                })
            }
            if (data.OCC6) {
              vm.occ6_items = data.OCC6
              vm.occ6_data = data.OCC6
              for (let i = 0; i < data.OCC6_SORT.length; i++)
                vm.occ6_sort.push({
                  name: data.OCC6_SORT[i].name_eng,
                  level: data.OCC6_SORT[i].level,
                  show: data.OCC6_SORT[i].show
                })
            }
            if (data.COW) {
              vm.cow_items = data.COW
              vm.cow_data = data.COW
              for (let i = 0; i < data.COW_SORT.length; i++)
                vm.cow_sort.push({
                  name: data.COW_SORT[i].name_eng,
                  level: data.COW_SORT[i].level,
                  show: data.COW_SORT[i].show
                })
            }
            if (data.RON) {
              vm.ron_items = data.RON
              vm.ron_data = data.RON
              for (let i = 0; i < data.RON_SORT.length; i++)
                vm.ron_sort.push({
                  name: data.RON_SORT[i].name_eng,
                  level: data.RON_SORT[i].level,
                  show: data.RON_SORT[i].show
                })
            }
            if (data.ROU) {
              vm.rou_items = data.ROU
              vm.rou_data = data.ROU
              for (let i = 0; i < data.ROU_SORT.length; i++)
                vm.rou_sort.push({
                  name: data.ROU_SORT[i].name_eng,
                  level: data.ROU_SORT[i].level,
                  show: data.ROU_SORT[i].show
                })
            }
            vm.needref = true
            vm.postaxios()
          }
        })
    },
    tablecolorset() {
      const tables = document.getElementsByClassName('floatThead-table')
      if (tables.length === 0) return
      let i = 0
      if (this.base_items.length > 0) {
        const table = tables[i]
        const layout = []
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.age_items.length > 0) {
        const table = tables[i]
        const layout = this.age_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.edtion_items.length > 0) {
        const table = tables[i]
        const layout = this.edtion_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.ind6_items.length > 0) {
        const table = tables[i]
        const layout = this.ind6_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.ind7_items.length > 0) {
        const table = tables[i]
        const layout = this.ind7_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.ind8_items.length > 0) {
        const table = tables[i]
        const layout = this.ind8_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.ind12_items.length > 0) {
        const table = tables[i]
        const layout = this.ind12_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.occ5_items.length > 0) {
        const table = tables[i]
        const layout = this.occ5_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.occ6_items.length > 0) {
        const table = tables[i]
        const layout = this.occ6_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.cow_items.length > 0) {
        const table = tables[i]
        const layout = this.cow_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.ron_items.length > 0) {
        const table = tables[i]
        const layout = this.ron_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
      if (this.rou_items.length > 0) {
        const table = tables[i]
        const layout = this.rou_sort
        this.setstatisticscolor(table, layout)
        this.setdateformat(table)
        i++
      }
    },
    setdateformat(table) {
      const row = this.tablerows
      const col = this.tablecols

      let i, j
      for (i = 0; i < row.length; i++) {
        if (row[i] === 'date_eng') break
      }
      for (j = 0; j < col.length; j++) {
        if (col[j] === 'date_eng') break
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
            const n = $(th).html()
            const ns = n.split('-')
            if (ns.length > 1) {
              const nsr = ns[1].split('_')
              if (nsr.length > 1) {
                $(th).text(ns[0] + '-' + nsr[1])
              } else {
                $(th).text(n)
              }
            } else {
              $(th).text(n)
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

        for (let k = 0; k < ths.length; k++) {
          if (ths[k].className === 'pvtAxisLabel' || ths[k].className === '')
            continue
          const th = ths[k]

          if (th) {
            const n = $(th).html()
            const ns = n.split('-')
            if (ns.length > 1) {
              const nsr = ns[1].split('_')
              if (nsr.length > 1) {
                $(th).text(ns[0] + '-' + nsr[1])
              } else {
                $(th).text(n)
              }
            } else {
              $(th).text(n)
            }
          }
        }
      }
    },
    setstatisticscolor(table, layouts) {
      const row = this.tablerows
      const col = this.tablecols
      let i, j
      for (i = 0; i < row.length; i++) {
        if (row[i] === 'c_e') break
      }
      for (j = 0; j < col.length; j++) {
        if (col[j] === 'c_e') break
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
    },
    getlayoutlevel(str, layouts) {
      const str2 = str.replace(/&amp;/g, '&')
      for (let i = 0; i < layouts.length; i++) {
        if (str2 === layouts[i].name) return layouts[i].level
      }
      return '-1'
    },
    getROCTitle(str) {
      let sttr = ''
      switch (str) {
        case 'BASE':
          sttr = 'Total'
          break
        case 'AGE':
          sttr = 'Age'
          break
        case 'EDTION':
          sttr = 'Educational Attainment'
          break
        case 'IND6':
          sttr = 'Industry 6th'
          break
        case 'IND7':
          sttr = 'Industry 7th'
          break
        case 'IND8':
          sttr = 'Industry 8th-11th'
          break
        case 'IND12':
          sttr = 'Industry 12th'
          break
        case 'OCC5':
          sttr = 'Occupation 5th'
          break
        case 'OCC6':
          sttr = 'Occupation 6th'
          break
        case 'COW':
          sttr = 'Class of Worker'
          break
        case 'RON':
          sttr = 'Reason for Not in Labor Force'
          break
        case 'ROU':
          sttr = 'Reason for Unemployment'
          break
      }
      const ttype = this.$route.query.type
      if (ttype === 'PEP') return 'Employed-' + sttr
      if (ttype === 'PUP') return 'Unemployed-' + sttr
      if (ttype === 'NLF') return 'Not in Labor Force-' + sttr
      if (ttype === 'LAF') return 'Labor Force-' + sttr
      if (ttype === 'FPS') return 'Civilian Population Age 15 & Above-' + sttr
      if (ttype === 'LFP') return 'Labor Force Participation Rate-' + sttr
      if (ttype === 'UPR') return 'Unemployment Rate-' + sttr
    },
    getROCType(ttype) {
      if (ttype === 'PEP') return 'Employed'
      if (ttype === 'PUP') return 'Unemployed'
      if (ttype === 'NLF') return 'Not in Labor Force'
      if (ttype === 'LAF') return 'Labor Force'
      if (ttype === 'FPS') return 'Civilian Population Age 15 & Above'
      if (ttype === 'LFP') return 'Labor Force Participation Rate'
      if (ttype === 'UPR') return 'Unemployment Rate'
    },
    datastatsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.datastat_sort.length; i++) {
        if (this.datastat_sort[i].name === a) ia = i
        if (this.datastat_sort[i].name === b) ib = i
      }
      return ia - ib
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
      for (let i = 0; i < this.sex_sort.length; i++) {
        if (this.sex_sort[i] === a) ia = i
        if (this.sex_sort[i] === b) ib = i
      }
      return ia - ib
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
    agesort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.age_sort.length; i++) {
        if (this.age_sort[i].name === a) ia = i
        if (this.age_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    edtionsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.edtion_sort.length; i++) {
        if (this.edtion_sort[i].name === a) ia = i
        if (this.edtion_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    ind6sort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.ind6_sort.length; i++) {
        if (this.ind6_sort[i].name === a) ia = i
        if (this.ind6_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    ind7sort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.ind7_sort.length; i++) {
        if (this.ind7_sort[i].name === a) ia = i
        if (this.ind7_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    ind8sort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.ind8_sort.length; i++) {
        if (this.ind8_sort[i].name === a) ia = i
        if (this.ind8_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    ind12sort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.ind12_sort.length; i++) {
        if (this.ind12_sort[i].name === a) ia = i
        if (this.ind12_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    occ5sort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.occ5_sort.length; i++) {
        if (this.occ5_sort[i].name === a) ia = i
        if (this.occ5_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    occ6sort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.occ6_sort.length; i++) {
        if (this.occ6_sort[i].name === a) ia = i
        if (this.occ6_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    cowsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.cow_sort.length; i++) {
        if (this.cow_sort[i].name === a) ia = i
        if (this.cow_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    ronsort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.ron_sort.length; i++) {
        if (this.ron_sort[i].name === a) ia = i
        if (this.ron_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    rousort(a, b) {
      let ia = 0
      let ib = 0
      for (let i = 0; i < this.rou_sort.length; i++) {
        if (this.rou_sort[i].name === a) ia = i
        if (this.rou_sort[i].name === b) ib = i
      }
      return ia - ib
    },
    getROCRowType(type) {
      switch (type) {
        case 'd_e':
          return 'Data Range'
        case 'c_e':
          return 'Category'
        case 's_e':
          return 'Sex'
        case 'st_e':
          return 'View of The Data'
      }
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
    transtabletrigger() {
      const vm = this
      this.tabletrans = false
      this.overlay = true

      setTimeout(function() {
        vm.transporttables()
        vm.overlay = false
      }, 500)
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

      this.base_idx = this.base_idx + 1
      this.age_idx = this.age_idx + 1
      this.edtion_idx = this.edtion_idx + 1
      this.ron_idx = this.ron_idx + 1
      this.ind6_idx = this.ind6_idx + 1
      this.ind7_idx = this.ind7_idx + 1
      this.ind8_idxs = this.ind8_idxs + 1
      this.ind12_idx = this.ind12_idx + 1
      this.occ5_idx = this.occ5_idx + 1
      this.occ6_idx = this.occ6_idx + 1
      this.cow_idx = this.cow_idx + 1
      this.rou_idx = this.rou_idx + 1

      this.disheaderfloat()
      this.tablerows = trs
      this.tablecols = tcs
      this.needref = true
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
        _SAlert.Error('Please keep one sex.')
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
    edittabletrigger() {
      const vm = this
      this.tableedit = false
      this.overlay = true

      setTimeout(function() {
        vm.edittable()
        vm.overlay = false
      }, 500)
    },
    edittable() {
      this.editclasses = this.tecls
      this.editsex = this.tesex
      this.editstat = this.testa

      this.removeclasses = this.trcls
      this.removesex = this.trsex
      this.removestat = this.trsta

      const classes = this.editclasses
      const sexes = this.removesex
      const stats = this.removestat

      this.base_show = false
      this.age_show = false
      this.edtion_show = false
      this.ron_show = false
      this.ind6_show = false
      this.ind7_show = false
      this.ind8_show = false
      this.ind12_show = false
      this.occ5_show = false
      this.occ6_show = false
      this.cow_show = false
      this.rou_show = false

      for (let i = 0; i < classes.length; i++) {
        switch (classes[i]) {
          case 'Total':
          case 'Unemployment Rate':
          case 'Labor Force Participation Rate':
            this.base_show = true
            break
          case 'Age':
            this.age_show = true
            break
          case 'Educational Attainment':
            this.edtion_show = true
            break
          case 'Not in Labor Force':
            this.ron_show = true
            break
          case 'Industry_6':
            this.ind6_show = true
            break
          case 'Industry_7':
            this.ind7_show = true
            break
          case 'Industry_8':
            this.ind8_show = true
            break
          case 'Industry_12':
            this.ind12_show = true
            break
          case 'Occupation_5':
            this.occ5_show = true
            break
          case 'Occupation_6':
            this.occ6_show = true
            break
          case 'Class of Worker':
            this.cow_show = true
            break
          case 'Reason for Unemployment':
            this.rou_show = true
            break
        }
      }
      let basedata = this.base_data
      let agedata = this.age_data
      let edtiondata = this.edtion_data
      let rondata = this.ron_data
      let ind6data = this.ind6_data
      let ind7data = this.ind7_data
      let ind8data = this.ind8_data
      let ind12data = this.ind12_data
      let occ5data = this.occ5_data
      let occ6data = this.occ6_data
      let cowdata = this.cow_data
      let roudata = this.rou_data

      for (let i = 0; i < sexes.length; i++) {
        basedata = basedata.filter((n) => n.s_e !== sexes[i])
        agedata = agedata.filter((n) => n.s_e !== sexes[i])
        edtiondata = edtiondata.filter((n) => n.s_e !== sexes[i])
        rondata = rondata.filter((n) => n.s_e !== sexes[i])
        ind6data = ind6data.filter((n) => n.s_e !== sexes[i])
        ind7data = ind7data.filter((n) => n.s_e !== sexes[i])
        ind8data = ind8data.filter((n) => n.s_e !== sexes[i])
        ind12data = ind12data.filter((n) => n.s_e !== sexes[i])
        occ5data = occ5data.filter((n) => n.s_e !== sexes[i])
        occ6data = occ6data.filter((n) => n.s_e !== sexes[i])
        cowdata = cowdata.filter((n) => n.s_e !== sexes[i])
        roudata = roudata.filter((n) => n.s_e !== sexes[i])
      }
      for (let i = 0; i < stats.length; i++) {
        basedata = basedata.filter((n) => !n.st_e.includes(stats[i]))
        agedata = agedata.filter((n) => !n.st_e.includes(stats[i]))
        edtiondata = edtiondata.filter((n) => !n.st_e.includes(stats[i]))
        rondata = rondata.filter((n) => !n.st_e.includes(stats[i]))
        ind6data = ind6data.filter((n) => !n.st_e.includes(stats[i]))
        ind7data = ind7data.filter((n) => !n.st_e.includes(stats[i]))
        ind8data = ind8data.filter((n) => !n.st_e.includes(stats[i]))
        ind12data = ind12data.filter((n) => !n.st_e.includes(stats[i]))
        occ5data = occ5data.filter((n) => !n.st_e.includes(stats[i]))
        occ6data = occ6data.filter((n) => !n.st_e.includes(stats[i]))
        cowdata = cowdata.filter((n) => !n.st_e.includes(stats[i]))
        roudata = roudata.filter((n) => !n.st_e.includes(stats[i]))
      }

      this.sex_sort = this.editsex

      const e = this.editstat
      const c = []
      let q = 1

      for (let n = 0; n < e.length; n++) {
        if (e[n] === 'Data value') {
          const opt = {}
          opt.name = 'Data value (Thousand Persons)'
          opt.value = q++
          c.push(opt)
          const opt2 = {}
          opt2.name = 'Data value (%)'
          opt2.value = q++
          c.push(opt2)
        } else if (e[n] === '% of Total') {
          const opt = {}
          opt.name = '% of Total'
          opt.value = q++
          c.push(opt)
        } else if (
          e[n] === 'Change from previous period (level, percentage point)'
        ) {
          const opt = {}
          opt.name =
            'Change from previous period (level, percentage point) (Thousand Persons)'
          opt.value = q++
          c.push(opt)
          const opt2 = {}
          opt2.name =
            'Change from previous period (level, percentage point) (%)'
          opt2.value = q++
          c.push(opt2)
          const opt3 = {}
          opt3.name = 'Change from previous period (level, percentage point)'
          opt3.value = q++
          c.push(opt3)
        } else if (e[n] === 'Change in percent from previous period') {
          const opt = {}
          opt.name = 'Change in percent from previous period (%)'
          opt.value = q++
          c.push(opt)
        } else if (
          e[n] === 'Change from that of previous year (level, percentage point)'
        ) {
          const opt = {}
          opt.name =
            'Change from that of previous year (level, percentage point) (Thousand Persons)'
          opt.value = q++
          c.push(opt)
          const opt2 = {}
          opt2.name =
            'Change from that of previous year (level, percentage point) (%)'
          opt2.value = q++
          c.push(opt2)
          const opt3 = {}
          opt3.name =
            'Change from that of previous year (level, percentage point)'
          opt.value = q++
          c.push(opt3)
        } else if (e[n] === 'Change in percent from that of previous year') {
          const opt = {}
          opt.name = 'Change in percent from that of previous year'
          opt.value = q++
          c.push(opt)
        }
      }
      this.statistics_sort = c

      this.base_items = basedata
      this.age_items = agedata
      this.edtion_items = edtiondata
      this.ron_items = rondata
      this.ind6_items = ind6data
      this.ind7_items = ind7data
      this.ind8_items = ind8data
      this.ind12_items = ind12data
      this.occ5_items = occ5data
      this.occ6_items = occ6data
      this.cow_items = cowdata
      this.rou_items = roudata

      this.disheaderfloat()
      this.base_idx = this.base_idx + 1
      this.age_idx = this.age_idx + 1
      this.edtion_idx = this.edtion_idx + 1
      this.ron_idx = this.ron_idx + 1
      this.ind6_idx = this.ind6_idx + 1
      this.ind7_idx = this.ind7_idx + 1
      this.ind8_idxs = this.ind8_idxs + 1
      this.ind12_idx = this.ind12_idx + 1
      this.occ5_idx = this.occ5_idx + 1
      this.occ6_idx = this.occ6_idx + 1
      this.cow_idx = this.cow_idx + 1
      this.rou_idx = this.rou_idx + 1
      this.betransport = true

      this.needref = true
      this.redraw()
    },
    getdatearry() {
      const vm = this
      const startyear = parseInt(this.$route.query.startyear) + 1911
      const endyear = parseInt(this.$route.query.endyear) + 1911
      const infotype = parseInt(this.$route.query.infotype)
      const cycle = parseInt(this.$route.query.cycle)

      vm.infotype = infotype

      const arry = []
      if (infotype === 1) {
        if (cycle === 0) {
          for (let i = startyear; i <= endyear; i++) {
            for (let j = 1; j <= 12; j++)
              arry.push(vm.getEngMonth(j) + ' ' + i.toString())
          }
        } else {
          for (let i = startyear; i <= endyear; i++) {
            arry.push('  ' + vm.getEngMonth(cycle) + ' ' + i.toString())
          }
        }
      } else if (infotype === 2) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i.toString())
        }
      } else if (infotype === 3) {
        const j = 1 + cycle
        for (let i = startyear; i <= endyear; i++) {
          arry.push('Jan to ' + vm.getEngMonth(j) + ' ' + i.toString())
        }
      }
      this.xAxisarray = arry
    },
    getdatearry2(cls) {
      const vm = this
      let startyear = parseInt(this.$route.query.startyear)
      let endyear = parseInt(this.$route.query.endyear)
      const infotype = parseInt(this.$route.query.infotype)
      const cycle = parseInt(this.$route.query.cycle)

      if (cls === 'ind6') {
        if (endyear > 90) endyear = 90
      } else if (cls === 'ind7') {
        if (startyear < 88) startyear = 88
        if (endyear > 95) endyear = 95
      } else if (cls === 'ind8') {
        if (startyear < 90) startyear = 90
        if (endyear > 115) endyear = 115
      } else if (cls === 'ind12') {
        if (startyear < 105) startyear = 105
      } else if (cls === 'occ5') {
        if (endyear > 99) endyear = 99
      } else if (cls === 'occ6') {
        if (startyear < 90) startyear = 90
      }

      startyear = startyear + 1911
      endyear = endyear + 1911

      const arry = []
      if (infotype === 1) {
        if (cycle === 0) {
          for (let i = startyear; i <= endyear; i++) {
            for (let j = 1; j <= 12; j++)
              arry.push(vm.getEngMonth(j) + ' ' + i.toString())
          }
        } else {
          for (let i = startyear; i <= endyear; i++) {
            arry.push('  ' + vm.getEngMonth(cycle) + ' ' + i.toString())
          }
        }
      } else if (infotype === 2) {
        for (let i = startyear; i <= endyear; i++) {
          arry.push(i.toString())
        }
      } else if (infotype === 3) {
        const j = 1 + cycle
        for (let i = startyear; i <= endyear; i++) {
          arry.push('Jan to ' + vm.getEngMonth(j) + ' ' + i.toString())
        }
      }
      return arry
    },
    getEngMonth(m) {
      switch (m) {
        case 1:
          return 'Jan'
        case 2:
          return 'Feb'
        case 3:
          return 'Mar'
        case 4:
          return 'Apr'
        case 5:
          return 'May'
        case 6:
          return 'June'
        case 7:
          return 'July'
        case 8:
          return 'Aug'
        case 9:
          return 'Sept'
        case 10:
          return 'Oct'
        case 11:
          return 'Nov'
        case 12:
          return 'Dec'
        default:
          return ''
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
    drawbase(opt, redraw) {
      const vm = this
      this.base_obj = opt
      this.disheaderfloat()
      const attrs = vm.editstat
      const sexs = vm.editsex

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
            labels: {
              overflow: 'allow'
            },
            categories: vm.xAxisarray
          },
          yAxis: {
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
          obj.yAxis.max = 100
        }
        if (opt.unit === 'Thousand Persons') {
          obj.yAxis.labels = {}
          obj.yAxis.labels.format = '{value}'
        }

        if (opt.ismult) {
          for (let i = 0; i < opt.attrs.length; i++) {
            if (!attrs.includes(opt.attrs[i])) continue
            for (let k = 0; k < sexs.length; k++) {
              if (opt.chart === 'percentbar' && sexs[k] === 'Total') continue
              const ser = {}
              ser.name = sexs[k] + '-' + opt.attrs[i]
              ser.data = []
              const tardata = vm.base_data.filter(
                (n) => n.st_e.includes(opt.attrs[i]) && n.s_e === sexs[k]
              )
              for (let j = 0; j < tardata.length; j++) {
                if (tardata[j].v === -999999) continue
                else ser.data.push(tardata[j].v)
              }
              obj.series.push(ser)
            }
          }
        } else {
          for (let k = 0; k < sexs.length; k++) {
            if (opt.chart === 'percentbar' && sexs[k] === 'Total') continue
            const ser = {}
            ser.name = sexs[k] + '-' + opt.attrs
            ser.data = []
            const tardata = vm.base_data.filter(
              (n) => n.st_e.includes(opt.attrs) && n.s_e === sexs[k]
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) continue
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        this.baseChartOption = obj
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
            labels: {
              overflow: 'allow'
            },
            categories: vm.xAxisarray
          },
          yAxis: {
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            },
            max: 100
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
        if (opt.ismult) {
          for (let i = 0; i < opt.attrs.length; i++) {
            if (!attrs.includes(opt.attrs[i])) continue
            for (let k = 0; k < sexs.length; k++) {
              if (sexs[k] === 'Total') continue
              const ser = {}
              ser.name = sexs[k] + '-' + opt.attrs[i]
              ser.data = []
              const tardata = vm.base_data.filter(
                (n) => n.st_e.includes(opt.attrs[i]) && n.s_e === sexs[k]
              )
              for (let j = 0; j < tardata.length; j++) {
                if (tardata[j].v === -999999) continue
                else ser.data.push(tardata[j].v)
              }
              obj.series.push(ser)
            }
          }
        } else {
          for (let k = 0; k < sexs.length; k++) {
            const ser = {}
            ser.name = sexs[k] + '-' + opt.attrs
            ser.data = []
            const tardata = vm.base_data.filter(
              (n) => n.st_e.includes(opt.attrs) && n.s_e === sexs[k]
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) continue
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        this.baseChartOption = obj
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
          title: {
            text: ''
          },
          credits: {
            enabled: false
          },
          xAxis: [
            {
              showEmpty: false,
              labels: {
                overflow: 'allow'
              },
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
        for (let i = 0; i < opt.attrs.length; i++) {
          if (!attrs.includes(opt.attrs[i])) continue
          let unit = -1
          let ctype = ''
          if (
            opt.attrs[i] === 'Data value' ||
            opt.attrs[i] ===
              'Change from previous period (level, percentage point)' ||
            opt.attrs[i] ===
              'Change from that of previous year (level, percentage point)'
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
          for (let k = 0; k < sexs.length; k++) {
            const ser = {}
            ser.name = sexs[k] + '-' + opt.attrs[i]
            ser.data = []
            ser.yAxis = unit
            ser.type = ctype
            const tardata = vm.base_data.filter(
              (n) => n.st_e.includes(opt.attrs[i]) && n.s_e === sexs[k]
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) continue
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        this.baseChartOption = obj
      }
      if (!redraw) {
        this.base_drawset = false
        this.base_table = false
        this.hkey1 = this.hkey1 + 1
      }
    },
    getdrawdata(type, sex, attrs, level, classes) {
      let data = {}
      if (type === 'age') data = this.age_data
      else if (type === 'edtion') data = this.edtion_data
      else if (type === 'ind6') data = this.ind6_data
      else if (type === 'ind7') data = this.ind7_data
      else if (type === 'ind8') data = this.ind8_data
      else if (type === 'ind12') data = this.ind12_data
      else if (type === 'occ5') data = this.occ5_data
      else if (type === 'occ6') data = this.occ6_data
      else if (type === 'cow') data = this.cow_data
      else if (type === 'ron') data = this.ron_data
      else if (type === 'rou') data = this.rou_data

      data = data.filter(
        (n) => n.st_e.includes(attrs) && n.s_e === sex && n.c_e === classes
      )

      return data
    },
    getsortdata(type) {
      let data = {}
      if (type === 'age') data = this.age_sort
      else if (type === 'edtion') data = this.edtion_sort
      else if (type === 'ind6') data = this.ind6_sort
      else if (type === 'ind7') data = this.ind7_sort
      else if (type === 'ind8') data = this.ind8_sort
      else if (type === 'ind12') data = this.ind12_sort
      else if (type === 'occ5') data = this.occ5_sort
      else if (type === 'occ6') data = this.occ6_sort
      else if (type === 'cow') data = this.cow_sort
      else if (type === 'ron') data = this.ron_sort
      else if (type === 'rou') data = this.rou_sort

      return data
    },
    setdrawobj(type, obj, redraw) {
      this.disheaderfloat()
      if (type === 'age') {
        this.ageChartOption = obj
        if (!redraw) {
          this.age_drawset = false
          this.age_table = false
          this.hkey2 = this.hkey2 + 1
        }
      } else if (type === 'edtion') {
        this.edtionChartOption = obj
        if (!redraw) {
          this.edtion_drawset = false
          this.edtion_table = false
          this.hkey3 = this.hkey3 + 1
        }
      } else if (type === 'ind6') {
        this.ind6ChartOption = obj
        if (!redraw) {
          this.ind6_drawset = false
          this.ind6_table = false
          this.hkey4 = this.hkey4 + 1
        }
      } else if (type === 'ind7') {
        this.ind7ChartOption = obj
        if (!redraw) {
          this.ind7_drawset = false
          this.ind7_table = false
          this.hkey5 = this.hkey5 + 1
        }
      } else if (type === 'ind8') {
        this.ind8ChartOption = obj
        if (!redraw) {
          this.ind8_drawset = false
          this.ind8_table = false
          this.hkey6 = this.hkey6 + 1
        }
      } else if (type === 'ind12') {
        this.ind12ChartOption = obj
        if (!redraw) {
          this.ind12_drawset = false
          this.ind12_table = false
          this.hkey12 = this.hkey12 + 1
        }
      } else if (type === 'occ5') {
        this.occ5ChartOption = obj
        if (!redraw) {
          this.occ5_drawset = false
          this.occ5_table = false
          this.hkey7 = this.hkey7 + 1
        }
      } else if (type === 'occ6') {
        this.occ6ChartOption = obj
        if (!redraw) {
          this.occ6_drawset = false
          this.occ6_table = false
          this.hkey8 = this.hkey8 + 1
        }
      } else if (type === 'cow') {
        this.cowChartOption = obj
        if (!redraw) {
          this.cow_drawset = false
          this.cow_table = false
          this.hkey9 = this.hkey9 + 1
        }
      } else if (type === 'ron') {
        this.ronChartOption = obj
        if (!redraw) {
          this.ron_drawset = false
          this.ron_table = false
          this.hkey10 = this.hkey10 + 1
        }
      } else if (type === 'rou') {
        this.rouChartOption = obj
        if (!redraw) {
          this.rou_drawset = false
          this.rou_table = false
          this.hkey11 = this.hkey11 + 1
        }
      }
    },
    drawlayout(type, opt, redraw) {
      const vm = this
      const sexs = vm.editsex

      let xAxisAry = vm.xAxisarray

      if (
        type === 'ind6' ||
        type === 'ind7' ||
        type === 'ind8' ||
        type === 'ind12' ||
        type === 'occ5' ||
        type === 'occ6'
      )
        xAxisAry = vm.getdatearry2(type)

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
            labels: {
              overflow: 'allow'
            },
            categories: xAxisAry
          },
          yAxis: {
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
          obj.yAxis.max = 100
        }
        if (opt.unit === 'Thousand Persons') {
          obj.yAxis.labels = {}
          obj.yAxis.labels.format = '{value}'
        }

        const sort = vm.getsortdata(type)

        for (let i = 0; i < sort.length; i++) {
          if (opt.chart === 'percentbar' && sort[i].show === '') continue
          for (let k = 0; k < sexs.length; k++) {
            if (opt.chart === 'percentbar' && sexs[k] !== opt.sex) continue
            const ser = {}
            ser.name = sexs[k] + '-' + sort[i].name + '-' + opt.attrs
            ser.data = []

            let tardata = vm.getdrawdata(
              type,
              sexs[k],
              opt.attrs,
              null,
              sort[i].name
            )

            if (opt.chart === 'percentbar') {
              tardata = vm.getdrawdata(
                type,
                sexs[k],
                opt.attrs,
                opt.level,
                sort[i].name
              )
            }
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) continue
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        vm.setdrawobj(type, obj, redraw)
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
            labels: {
              overflow: 'allow'
            },
            categories: xAxisAry
          },
          yAxis: {
            title: {
              align: 'high',
              offset: 0,
              rotation: 0,
              y: -10,
              text: opt.unit
            },
            max: 100
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
        const sort = vm.getsortdata(type)
        for (let i = 0; i < sort.length; i++) {
          if (sort[i].show === '') continue
          for (let k = 0; k < sexs.length; k++) {
            if (sexs[k] !== opt.sex) continue
            const ser = {}
            ser.name = sexs[k] + '-' + sort[i].name + '-' + opt.attrs
            ser.data = []
            const tardata = vm.getdrawdata(
              type,
              sexs[k],
              opt.attrs,
              opt.level,
              sort[i].name
            )
            for (let j = 0; j < tardata.length; j++) {
              if (tardata[j].v === -999999) continue
              else ser.data.push(tardata[j].v)
            }
            obj.series.push(ser)
          }
        }
        vm.setdrawobj(type, obj, redraw)
      }
    },
    drawage(opt) {
      this.drawlayout('age', opt)
      this.age_obj = opt
    },
    drawedtion(opt) {
      this.drawlayout('edtion', opt)
      this.edtion_obj = opt
    },
    drawind6(opt) {
      this.drawlayout('ind6', opt)
      this.ind6_obj = opt
    },
    drawind7(opt) {
      this.drawlayout('ind7', opt)
      this.ind7_obj = opt
    },
    drawind8(opt) {
      this.drawlayout('ind8', opt)
      this.ind8_obj = opt
    },
    drawind12(opt) {
      this.drawlayout('ind12', opt)
      this.ind12_obj = opt
    },
    drawocc5(opt) {
      this.drawlayout('occ5', opt)
      this.occ5_obj = opt
    },
    drawocc6(opt) {
      this.drawlayout('occ6', opt)
      this.occ6_obj = opt
    },
    drawcow(opt) {
      this.drawlayout('cow', opt)
      this.cow_obj = opt
    },
    drawron(opt) {
      this.drawlayout('ron', opt)
      this.ron_obj = opt
    },
    drawrou(opt) {
      this.drawlayout('rou', opt)
      this.rou_obj = opt
    },
    redraw() {
      if (this.base_obj) this.drawbase(this.base_obj, true)
      if (this.age_obj) this.drawlayout('age', this.age_obj, true)
      if (this.edtion_obj) this.drawlayout('edtion', this.edtion_obj, true)
      if (this.ind6_obj) this.drawlayout('ind6', this.ind6_obj, true)
      if (this.ind7_obj) this.drawlayout('ind7', this.ind7_obj, true)
      if (this.ind8_obj) this.drawlayout('ind8', this.ind8_obj, true)
      if (this.ind12_obj) this.drawlayout('ind12', this.ind12_obj, true)
      if (this.occ5_obj) this.drawlayout('occ5', this.occ5_obj, true)
      if (this.occ6_obj) this.drawlayout('occ6', this.occ6_obj, true)
      if (this.cow_obj) this.drawlayout('cow', this.cow_obj, true)
      if (this.ron_obj) this.drawlayout('ron', this.ron_obj, true)
      if (this.rou_obj) this.drawlayout('rou', this.rou_obj, true)
    },
    htmlEncode(str) {
      const ele = document.createElement('span')
      ele.appendChild(document.createTextNode(str))
      return ele.innerHTML
    },
    setImageCount() {
      const vm = this
      const searchtype = this.$route.query.type
      axios.post(
        vm.RequetURL.majaxurl,
        qs.stringify({ op: 'SetChartCount', type: searchtype })
      )
    },
    setTableCount() {
      const vm = this
      const searchtype = this.$route.query.type
      axios.post(
        vm.RequetURL.majaxurl,
        qs.stringify({ op: 'SetTableCount', type: searchtype })
      )
    },
    downloadImage1(type) {
      this.setImageCount()
      this.$refs.chart1.chart.exportChart({ type })
    },
    downloadImage2(type) {
      this.setImageCount()
      this.$refs.chart2.chart.exportChart({ type })
    },
    downloadImage3(type) {
      this.setImageCount()
      this.$refs.chart3.chart.exportChart({ type })
    },
    downloadImage4(type) {
      this.setImageCount()
      this.$refs.chart4.chart.exportChart({ type })
    },
    downloadImage5(type) {
      this.setImageCount()
      this.$refs.chart5.chart.exportChart({ type })
    },
    downloadImage6(type) {
      this.setImageCount()
      this.$refs.chart6.chart.exportChart({ type })
    },
    downloadImage12(type) {
      this.setImageCount()
      this.$refs.chart12.chart.exportChart({ type })
    },
    downloadImage7(type) {
      this.setImageCount()
      this.$refs.chart7.chart.exportChart({ type })
    },
    downloadImage8(type) {
      this.setImageCount()
      this.$refs.chart8.chart.exportChart({ type })
    },
    downloadImage9(type) {
      this.setImageCount()
      this.$refs.chart9.chart.exportChart({ type })
    },
    downloadImage10(type) {
      this.setImageCount()
      this.$refs.chart10.chart.exportChart({ type })
    },
    downloadImage11(type) {
      this.setImageCount()
      this.$refs.chart11.chart.exportChart({ type })
    },
    downloadtable(type, tartable, name) {
      const vm = this
      vm.loader = true

      const form = new FormData()
      const tar = document.getElementById(tartable)
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
      form.set('title', name)
      form.set('type', type)

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
            _SAlert.Error('Download Error.')
          }
        }
      })
    },
    downloadfile1(type) {
      this.setTableCount()
      this.downloadtable(type, 'table1', this.base_title)
    },
    downloadfile2(type) {
      this.setTableCount()
      this.downloadtable(type, 'table2', this.age_title)
    },
    downloadfile3(type) {
      this.setTableCount()
      this.downloadtable(type, 'table3', this.edtion_title)
    },
    downloadfile4(type) {
      this.setTableCount()
      this.downloadtable(type, 'table4', this.ind6_title)
    },
    downloadfile5(type) {
      this.setTableCount()
      this.downloadtable(type, 'table5', this.ind7_title)
    },
    downloadfile6(type) {
      this.setTableCount()
      this.downloadtable(type, 'table6', this.ind8_title)
    },
    downloadfile12(type) {
      this.setTableCount()
      this.downloadtable(type, 'table12', this.ind12_title)
    },
    downloadfile7(type) {
      this.setTableCount()
      this.downloadtable(type, 'table7', this.occ5_title)
    },
    downloadfile8(type) {
      this.setTableCount()
      this.downloadtable(type, 'table8', this.occ6_title)
    },
    downloadfile9(type) {
      this.setTableCount()
      this.downloadtable(type, 'table9', this.cow_title)
    },
    downloadfile10(type) {
      this.setTableCount()
      this.downloadtable(type, 'table10', this.ron_title)
    },
    downloadfile11(type) {
      this.setTableCount()
      this.downloadtable(type, 'table11', this.rou_title)
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
  position: relative;
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
.fadespin {
  position: absolute;
  left: calc(50% - 60px);
  top: calc(50% - 60px);
  width: 120px;
  height: 120px;
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
.tablezone2 {
  width: 100%;
  height: 550px;
  overflow: auto;
  position: relative;
}
.slevel3 {
  background: #fcd76e !important;
  color: #000000 !important;
}
.slevel2 {
  background: #485b68 !important;
  color: #ffffff !important;
}
.slevel1 {
  background: #466a6d !important;
  color: #ffffff !important;
}
.ui.large.buttons .button:focus {
  border: 1px solid #000000;
}
</style>
