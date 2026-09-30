<template>
  <div class="PageDefault AllTopCenter">
    <div class="pageitem_2">
      <v-container v-if="citynew">
        <v-row>
          <v-col style="border-bottom:4px solid #344059;">
            <img src="@/assets/images/Intranet_Inquire/Magnifier.svg" alt="" />
            <span class="titile">縣市資料</span>
          </v-col>
          <v-col
            class="AllLeft"
            style="border-bottom:4px solid #344059; padding: 0px;"
          >
            <div
              :class="{ tagactive: ShowNew }"
              class="tablebtn tagbtn"
              @click="newshowclick"
            >
              改制後
            </div>
            <div
              :class="{ tagactive: ShowOld }"
              class="graphbtn tagbtn"
              @click="oldshowclick"
            >
              改制前
            </div>
          </v-col>
        </v-row>
        <v-row v-if="newshow == true" class="formitem">
          <v-col class="formtitle AllCenter">
            <span>地區</span>
          </v-col>
          <v-col>
            <v-container class="AllLeft cityzone" style="padding: 0px;" fluid>
              <v-row>
                <v-col style="padding: 0px;">
                  <v-checkbox v-model="AllCityClick" label="全選"></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="1"
                    label="臺灣地區"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllNorthClick"
                    label="北部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="2"
                    label="北部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="3"
                    label="新北市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="4"
                    label="臺北市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="5"
                    label="桃園市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="6"
                    label="基隆市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="7"
                    label="新竹市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="8"
                    label="宜蘭縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="9"
                    label="新竹縣"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllCenterClick"
                    label="中部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="10"
                    label="中部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="11"
                    label="臺中市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="12"
                    label="苗栗縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="13"
                    label="彰化縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="14"
                    label="南投縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="15"
                    label="雲林縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllSouthClick"
                    label="南部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="16"
                    label="南部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="17"
                    label="臺南市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="18"
                    label="高雄市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="19"
                    label="嘉義市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="20"
                    label="嘉義縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="21"
                    label="屏東縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="22"
                    label="澎湖縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllEastClick"
                    label="東部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="23"
                    label="東部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="24"
                    label="臺東縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys"
                    :value="25"
                    label="花蓮縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
        <v-row v-if="newshow == false" class="formitem">
          <v-col class="formtitle AllCenter">
            <span>地區</span>
          </v-col>
          <v-col>
            <v-container class="AllLeft cityzone" style="padding: 0px;" fluid>
              <v-row>
                <v-col style="padding: 0px;">
                  <v-checkbox v-model="AllCityClick2" label="全選"></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="1"
                    label="臺灣地區"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllNorthClick2"
                    label="北部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="2"
                    label="北部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="3"
                    label="臺北市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="4"
                    label="基隆市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="5"
                    label="新竹市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="6"
                    label="臺北縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="7"
                    label="宜蘭縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="8"
                    label="桃園縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="9"
                    label="新竹縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllCenterClick2"
                    label="中部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="10"
                    label="中部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="11"
                    label="臺中市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="12"
                    label="苗栗縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="13"
                    label="臺中縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="14"
                    label="彰化縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="15"
                    label="南投縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="16"
                    label="雲林縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllSouthClick2"
                    label="南部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="17"
                    label="南部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="18"
                    label="高雄市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="19"
                    label="嘉義市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="20"
                    label="臺南市"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="21"
                    label="嘉義縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="22"
                    label="臺南縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="23"
                    label="高雄縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="24"
                    label="屏東縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="25"
                    label="澎湖縣"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft fcol" style="padding: 0px;">
                  <v-checkbox
                    v-model="AllEastClick2"
                    label="東部區域(全選)"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft scol" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="26"
                    label="東部區域"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="27"
                    label="臺東縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-checkbox
                    v-model="citys2"
                    :value="28"
                    label="花蓮縣"
                  ></v-checkbox>
                </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
                <v-col class="AllLeft" style="padding: 0px;"> </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 150px;">
            <span>統計項</span>
          </v-col>
          <v-col>
            <v-radio-group
              v-model="states"
              class="statgroup"
              @change="statechange"
            >
              <v-row>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-col style="padding: 0px;">
                    <v-radio :value="1" label="總人口數"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="2" label="十五歲以上民間人口"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="3" label="勞動力"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="4" label="非勞動力"></v-radio>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-col style="padding: 0px;">
                    <v-radio :value="5" label="失業者"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="6" label="失業率"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="7" label="勞動力參與率"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;"></v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-col style="padding: 0px;">
                    <v-radio :value="8" label="就業者"></v-radio>
                  </v-col>
                  <v-col v-if="newshow == true" style="padding: 0px;">
                    <v-radio :value="9" label="4週失業者"></v-radio>
                  </v-col>
                  <v-col v-if="newshow == true" style="padding: 0px;">
                    <v-radio :value="10" label="工時不足就業者"></v-radio>
                  </v-col>
                  <v-col v-if="newshow == true" style="padding: 0px;">
                    <v-radio :value="11" label="潛在勞動力"></v-radio>
                  </v-col>
                </v-col>
              </v-row>
              <v-row v-if="newshow == true">
                <v-col class="AllLeft" style="padding: 0px;">
                  <v-col style="padding: 0px;">
                    <v-radio :value="12" label="LU1"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="13" label="LU2"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="14" label="LU3"></v-radio>
                  </v-col>
                  <v-col style="padding: 0px;">
                    <v-radio :value="15" label="LU4"></v-radio>
                  </v-col>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter">
            <span>分類</span>
          </v-col>
          <v-col v-if="states == 1" class="AllLeft">
            <v-row>
              <v-col style="padding: 0px;">
                <span style="font-size: 1.125em;">無</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="states != 1">
            <v-row>
              <v-col class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="1"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="總計"
                ></v-checkbox>
              </v-col>
              <v-col class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="2"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="教育程度"
                ></v-checkbox>
              </v-col>
              <v-col class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="3"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="年齡"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-if="states == 8 && newshow == true"
                class="rcol1 AllLeft"
              >
                <v-checkbox
                  v-model="classes"
                  :value="4"
                  :disabled="
                    classes.length === 0 || classes.includes(4) ? false : true
                  "
                  label="行業"
                  style="min-width: 70px; margin-top: 8px;"
                  @change="classesChange"
                ></v-checkbox>
                <v-select
                  v-model="pepind"
                  :items="pepinditems"
                  :disabled="classes.includes(4) ? false : true"
                  background-color="white"
                  solo
                  hide-details
                  style="max-width: 180px;"
                  @change="classesChange"
                ></v-select>
              </v-col>
              <v-col
                v-if="states == 8 && newshow == true"
                class="rcol1 AllLeft"
              >
                <v-checkbox
                  v-model="classes"
                  :value="5"
                  :disabled="
                    classes.length === 0 || classes.includes(5) ? false : true
                  "
                  label="職業"
                  style="min-width: 70px; margin-top: 8px;"
                  @change="classesChange"
                ></v-checkbox>
                <v-select
                  v-model="pepocc"
                  :items="pepoccitems"
                  :disabled="classes.includes(5) ? false : true"
                  background-color="white"
                  solo
                  hide-details
                  style="max-width: 180px;"
                  @change="classesChange"
                ></v-select>
              </v-col>
              <v-col
                v-if="states == 8 && newshow == false"
                class="rcol1 AllLeft"
              >
                <v-checkbox
                  v-model="classes"
                  :value="4"
                  :disabled="
                    classes.length === 0 || classes.includes(4) ? false : true
                  "
                  label="行業"
                  style="min-width: 70px; margin-top: 8px;"
                  @change="classesChange"
                ></v-checkbox>
                <v-select
                  v-model="opepind"
                  :items="opepinditems"
                  :disabled="classes.includes(4) ? false : true"
                  background-color="white"
                  solo
                  hide-details
                  style="max-width: 180px;"
                  @change="classesChange2"
                ></v-select>
              </v-col>
              <v-col
                v-if="states == 8 && newshow == false"
                class="rcol1 AllLeft"
              >
                <v-checkbox
                  v-model="classes"
                  :value="5"
                  :disabled="
                    classes.length === 0 || classes.includes(5) ? false : true
                  "
                  label="職業"
                  style="min-width: 70px; margin-top: 8px;"
                  @change="classesChange"
                ></v-checkbox>
                <v-select
                  v-model="opepocc"
                  :items="opepoccitems"
                  :disabled="classes.includes(5) ? false : true"
                  background-color="white"
                  solo
                  hide-details
                  style="max-width: 180px;"
                  @change="classesChange2"
                ></v-select>
              </v-col>
              <v-col v-if="states == 5" class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="6"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="失業原因"
                ></v-checkbox>
              </v-col>
              <v-col v-if="states == 8" class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="7"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="從業身分"
                ></v-checkbox>
              </v-col>
              <v-col v-if="states == 4" class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="8"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="未參與勞動原因"
                ></v-checkbox>
              </v-col>
            </v-row>
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
          <v-col class="formtitle AllCenter" style="min-height: 50px;">
            <span>週期</span>
          </v-col>
          <v-col class="AllLeft">
            <v-select
              v-model="InfoType"
              :items="InfoItems"
              class="dataselect rwdcycle1"
              style="margin-right: 10px;"
              background-color="white"
              solo
              hide-details
              @change="itypechange"
            ></v-select>
            <v-select
              v-if="InfoType == 1"
              v-model="SelectSecound"
              :items="MonthItems"
              class="dataselect rwdcycle1"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <v-select
              v-if="InfoType == 2"
              v-model="SelectSecound"
              :items="YearInfoItems"
              class="dataselect rwdcycle1"
              background-color="white"
              solo
              hide-details
            ></v-select>
            <v-select
              v-if="InfoType == 4"
              v-model="SelectSecound"
              :items="SumAverageItems"
              class="dataselect rwdcycle1"
              background-color="white"
              solo
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 60px;">
            <span>輸出類別</span>
          </v-col>
          <v-col class="AllLeft" style="max-width: 360px;">
            <v-container
              v-if="states != 6 && states != 7 && states <= 8"
              class="AllLeft"
              style="padding: 0px;"
              fluid
            >
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="output"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="T"
                  label="千人"
                ></v-checkbox>
              </v-col>
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="output"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="P"
                  label="人"
                ></v-checkbox>
              </v-col>
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="output"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="S"
                  label="結構比"
                ></v-checkbox>
              </v-col>
            </v-container>
            <v-container
              v-if="states == 6 || states == 7"
              class="AllLeft"
              style="padding: 0px;"
              fluid
            >
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="output2"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="D2"
                  label="小數2位"
                ></v-checkbox>
              </v-col>
              <v-col style="padding: 0px;">
                <v-checkbox
                  v-model="output2"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="D1"
                  label="小數1位"
                ></v-checkbox>
              </v-col>
            </v-container>
            <v-container
              v-if="states >= 9 && states <= 15"
              class="AllLeft"
              style="padding: 0px;"
              fluid
            >
              <v-col v-show="states >= 9 && states <= 11" style="padding: 0px;">
                <v-checkbox
                  v-model="output3"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="T"
                  label="千人"
                ></v-checkbox>
              </v-col>
              <v-col v-show="states >= 9 && states <= 11" style="padding: 0px;">
                <v-checkbox
                  v-model="output3"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="P"
                  label="人"
                ></v-checkbox>
              </v-col>
              <v-col
                v-show="states >= 12 && states <= 15"
                style="padding: 0px;"
              >
                <v-checkbox
                  v-model="output3"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="D2"
                  label="小數2位"
                ></v-checkbox>
              </v-col>
              <v-col
                v-show="states >= 12 && states <= 15"
                style="padding: 0px;"
              >
                <v-checkbox
                  v-model="output3"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="D1"
                  label="小數1位"
                ></v-checkbox>
              </v-col>
            </v-container>
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
            <editbtn :name="'查詢'" @click.native="SendQuery1"></editbtn>
            <crosscancel
              :name="'重設條件'"
              style="margin-left: 15px;"
              @click.native="Reset"
            ></crosscancel>
          </v-col>
        </v-row>
        <v-dialog v-model="showwarning" max-width="500">
          <div class="modal-content">
            <div class="modal-body">
              <label style="font-size: 1.25em;"
                >您選擇的範圍太大，有可能會造成您的瀏覽器無法正常渲染完整個表格，如果選擇的範圍太大建議將輸出形式改為檔案格式，您是否要繼續用網頁的形式渲染?</label
              >
            </div>
            <div class="modal-footer-non-border AllCenter">
              <editbtn
                :name="'確定'"
                style="margin-left: 15px;"
                @click.native="TempQuerySend"
              ></editbtn>
              <crosscancel
                :name="'取消'"
                @click.native="showwarning = false"
              ></crosscancel>
            </div>
          </div>
        </v-dialog>
        <div v-if="loader" class="fade_cust"></div>
        <div v-if="loader" class="loader"></div>
      </v-container>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import axios from '../../plugins/axios'
import { _SAlert } from '../../utils/sweetAlert2'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'

const LOW_LABOR_UTILIZATION_START_STATE = 9
const LOW_LABOR_UTILIZATION_END_STATE = 15
const LOW_LABOR_UTILIZATION_START_YEAR = 112

export default {
  name: 'CachePage',
  components: {
    crosscancel,
    editbtn
  },
  layout: 'BackStage',
  data() {
    return {
      allcitys: false,
      allcitys2: false,
      citys: [],
      citys2: [],
      citynew: true,
      newshow: true,
      ShowNew: true,
      ShowOld: false,
      tmpQuery: null,
      showwarning: false,
      loader: false,
      states: 1,
      showstate: 1,
      pepind: 1,
      pepinditems: [
        { text: '舊行業(6th)(67~90年)', value: 1 },
        { text: '舊行業(7th)(88~95年)', value: 2 },
        { text: '新行業(8th-11th)(96年以後)', value: 4 }
      ],
      pepocc: 1,
      pepoccitems: [
        { text: '舊職業(5th)(67~99年)', value: 1 },
        { text: '新職業(6th)(100年以後)', value: 2 }
      ],
      opepind: 1,
      opepinditems: [
        { text: '舊行業(6th)(67~90年)', value: 1 },
        { text: '舊行業(7th)(88~95年)', value: 2 },
        { text: '新行業(8th)(96~99年)', value: 3 }
      ],
      opepocc: 1,
      opepoccitems: [{ text: '舊職業(5th)(67~99年)', value: 1 }],
      sexes: [],
      StartYear: null,
      StartYearItems: [],
      YearItems: [],
      EndYear: null,
      EndYearItems: [],
      output: [],
      output2: [],
      output3: [],
      smonth: 1,
      monthitems: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9', value: 9 },
        { text: '10', value: 10 },
        { text: '11', value: 11 },
        { text: '12', value: 12 }
      ],
      cycle: 1,
      classes: [],
      InfoType: 1,
      SelectSecound: 0,
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
          text: '季資料',
          value: 3
        },
        {
          text: '累計平均',
          value: 4
        }
      ],
      MonthItems: [
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
        },
        {
          text: '半年平均',
          value: 1
        }
      ],
      SumAverageItems: [
        {
          text: '1月至1月',
          value: 1
        },
        {
          text: '1月至2月',
          value: 2
        },
        {
          text: '1月至3月',
          value: 3
        },
        {
          text: '1月至4月',
          value: 4
        },
        {
          text: '1月至5月',
          value: 5
        },
        {
          text: '1月至6月',
          value: 6
        },
        {
          text: '1月至7月',
          value: 7
        },
        {
          text: '1月至8月',
          value: 8
        },
        {
          text: '1月至9月',
          value: 9
        },
        {
          text: '1月至10月',
          value: 10
        },
        {
          text: '1月至11月',
          value: 11
        },
        {
          text: '1月至12月',
          value: 12
        }
      ]
    }
  },
  computed: {
    AllCityClick: {
      set(val) {
        this.citys = []
        if (val) {
          for (let i = 1; i <= 25; i++) {
            this.citys.push(i)
          }
        }
      },
      get() {
        return this.citys.length === 25
      }
    },
    AllNorthClick: {
      set(val) {
        for (let i = 2; i <= 9; i++) {
          const idx = this.citys.indexOf(i)
          if (idx !== -1) this.citys.splice(idx, 1)
        }
        if (val) {
          for (let i = 2; i <= 9; i++) {
            this.citys.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys.length; i++) {
          if (this.citys[i] >= 2 && this.citys[i] <= 9) c++
        }
        return c === 8
      }
    },
    AllCenterClick: {
      set(val) {
        for (let i = 10; i <= 15; i++) {
          const idx = this.citys.indexOf(i)
          if (idx !== -1) this.citys.splice(idx, 1)
        }
        if (val) {
          for (let i = 10; i <= 15; i++) {
            this.citys.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys.length; i++) {
          if (this.citys[i] >= 10 && this.citys[i] <= 15) c++
        }
        return c === 6
      }
    },
    AllSouthClick: {
      set(val) {
        for (let i = 16; i <= 22; i++) {
          const idx = this.citys.indexOf(i)
          if (idx !== -1) this.citys.splice(idx, 1)
        }
        if (val) {
          for (let i = 16; i <= 22; i++) {
            this.citys.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys.length; i++) {
          if (this.citys[i] >= 16 && this.citys[i] <= 22) c++
        }
        return c === 7
      }
    },
    AllEastClick: {
      set(val) {
        for (let i = 23; i <= 25; i++) {
          const idx = this.citys.indexOf(i)
          if (idx !== -1) this.citys.splice(idx, 1)
        }
        if (val) {
          for (let i = 23; i <= 25; i++) {
            this.citys.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys.length; i++) {
          if (this.citys[i] >= 23 && this.citys[i] <= 25) c++
        }
        return c === 3
      }
    },
    AllCityClick2: {
      set(val) {
        this.citys2 = []
        if (val) {
          for (let i = 1; i <= 28; i++) {
            this.citys2.push(i)
          }
        }
      },
      get() {
        return this.citys2.length === 28
      }
    },
    AllNorthClick2: {
      set(val) {
        for (let i = 2; i <= 9; i++) {
          const idx = this.citys2.indexOf(i)
          if (idx !== -1) this.citys2.splice(idx, 1)
        }
        if (val) {
          for (let i = 2; i <= 9; i++) {
            this.citys2.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys2.length; i++) {
          if (this.citys2[i] >= 2 && this.citys2[i] <= 9) c++
        }
        return c === 8
      }
    },
    AllCenterClick2: {
      set(val) {
        for (let i = 10; i <= 16; i++) {
          const idx = this.citys2.indexOf(i)
          if (idx !== -1) this.citys2.splice(idx, 1)
        }
        if (val) {
          for (let i = 10; i <= 16; i++) {
            this.citys2.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys2.length; i++) {
          if (this.citys2[i] >= 10 && this.citys2[i] <= 16) c++
        }
        return c === 7
      }
    },
    AllSouthClick2: {
      set(val) {
        for (let i = 17; i <= 25; i++) {
          const idx = this.citys2.indexOf(i)
          if (idx !== -1) this.citys2.splice(idx, 1)
        }
        if (val) {
          for (let i = 17; i <= 25; i++) {
            this.citys2.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys2.length; i++) {
          if (this.citys2[i] >= 17 && this.citys2[i] <= 25) c++
        }
        return c === 9
      }
    },
    AllEastClick2: {
      set(val) {
        for (let i = 26; i <= 28; i++) {
          const idx = this.citys2.indexOf(i)
          if (idx !== -1) this.citys2.splice(idx, 1)
        }
        if (val) {
          for (let i = 26; i <= 28; i++) {
            this.citys2.push(i)
          }
        }
      },
      get() {
        let c = 0
        for (let i = 0; i < this.citys2.length; i++) {
          if (this.citys2[i] >= 26 && this.citys2[i] <= 28) c++
        }
        return c === 3
      }
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
    isLowLaborUtilizationState() {
      return (
        this.states >= LOW_LABOR_UTILIZATION_START_STATE &&
        this.states <= LOW_LABOR_UTILIZATION_END_STATE
      )
    },
    getStartYearMin() {
      if (this.isLowLaborUtilizationState())
        return LOW_LABOR_UTILIZATION_START_YEAR
      return null
    },
    getStartYearItems(items, endyear) {
      const minyear = this.getStartYearMin()
      return items.filter((n) => {
        if (minyear !== null && n.value < minyear) return false
        if (endyear !== undefined && endyear !== null && n.value > endyear)
          return false
        return true
      })
    },
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
    itypechange() {
      if (this.InfoType !== 4) this.SelectSecound = 0
      else this.SelectSecound = 1
    },
    statechange() {
      if (this.newshow === true) this.classesChange()
      else this.classesChange2()

      this.classes = []
      this.output = []
      this.output2 = []
      this.output3 = []
    },
    classesChange() {
      const s = this.classes

      let ismin = false
      const date = {}
      if (s.includes(4)) {
        const d = this.pepind
        if (d === 1) {
          date.minyear = 1978
          date.maxyear = 2001
        } else if (d === 2) {
          date.minyear = 1999
          date.maxyear = 2006
        } else if (d === 3) {
          date.minyear = 2001
          date.maxyear = 2010
        } else if (d === 4) {
          date.minyear = 2007
          if (this.newshow === true) date.maxyear = this.bdata.MNYear1.maxyear
          else date.maxyear = this.bdata.MNYear2.maxyear
        }
        ismin = true
      } else if (s.includes(5)) {
        const d = this.pepocc
        if (d === 1) {
          date.minyear = 1978
          date.maxyear = 2010
        } else if (d === 2) {
          date.minyear = 2011
          if (this.newshow === true) date.maxyear = this.bdata.MNYear1.maxyear
          else date.maxyear = this.bdata.MNYear2.maxyear
        }
        ismin = true
      } else if (this.newshow === true) {
        date.minyear = this.bdata.MNYear1.minyear
        date.maxyear = this.bdata.MNYear1.maxyear
      } else {
        date.minyear = this.bdata.MNYear2.minyear
        date.maxyear = this.bdata.MNYear2.maxyear
      }
      this.setYearList(date, ismin)
    },
    classesChange2() {
      const s = this.classes

      let ismin = false
      const date = {}
      if (s.includes(4)) {
        const d = this.opepind
        if (d === 1) {
          date.minyear = 1978
          date.maxyear = 2001
        } else if (d === 2) {
          date.minyear = 1999
          date.maxyear = 2006
        } else if (d === 3) {
          date.minyear = 2007
          if (this.newshow === true) date.maxyear = this.bdata.MNYear1.maxyear
          else date.maxyear = this.bdata.MNYear2.maxyear
        }
        ismin = true
      } else if (s.includes(5)) {
        const d = this.opepocc
        if (d === 1) {
          date.minyear = 1978
          date.maxyear = 2010
        } else if (d === 2) {
          date.minyear = 2001
          if (this.newshow === true) date.maxyear = this.bdata.MNYear1.maxyear
          else date.maxyear = this.bdata.MNYear2.maxyear
        }
        ismin = true
      } else if (this.newshow === true) {
        date.minyear = this.bdata.MNYear1.minyear
        date.maxyear = this.bdata.MNYear1.maxyear
      } else {
        date.minyear = this.bdata.MNYear2.minyear
        date.maxyear = this.bdata.MNYear2.maxyear
      }
      this.setYearList(date, ismin)
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
    sortoutput(ary) {
      const osort = ['T', 'P', 'S', 'D2', 'D1']
      const sort = []
      for (let i = 0; i < osort.length; i++) {
        for (let j = 0; j < ary.length; j++) {
          if (ary[j] === osort[i]) sort.push(ary[j])
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
    SendQuery1() {
      const vm = this
      const _query = {}

      if (vm.newshow === true) {
        _query.zone = vm.arrayToString(vm.sortbyNumber(vm.citys))
        _query.isnew = 'Y'
      } else {
        _query.zone = vm.arrayToString(vm.sortbyNumber(vm.citys2))
        _query.isnew = 'N'
      }

      _query.states = vm.states
      _query.startyear = vm.StartYear
      _query.endyear = vm.EndYear
      _query.sex = vm.arrayToString(vm.sortsex(vm.sexes))

      const infotype = vm.InfoType
      const second = vm.SelectSecound
      // 月資料
      if (infotype === 1) {
        if (second === 0) {
          _query.cycle = 4
        } else {
          _query.cycle = 5
          _query.smonth = second
        }
      } else if (infotype === 2) {
        if (second === 0) {
          _query.cycle = 1
        } else {
          _query.cycle = 2
        }
      } else if (infotype === 3) {
        _query.cycle = 3
      } else if (infotype === 4) {
        _query.cycle = 6
        _query.smonth = second
      }

      if (vm.states === 6 || vm.states === 7)
        _query.output = vm.arrayToString(vm.sortoutput(vm.output2))
      else if (vm.states >= 9 && vm.states <= 15)
        _query.output = vm.arrayToString(vm.sortoutput(vm.output3))
      else _query.output = vm.arrayToString(vm.sortoutput(vm.output))

      if (vm.states === 8) {
        if (vm.newshow === true) {
          if (vm.classes.includes(4)) {
            _query.subtype = vm.pepind
          } else if (vm.classes.includes(5)) {
            if (vm.pepocc === 1) _query.subtype = 1
            else if (vm.pepocc === 2) _query.subtype = 4
          }
        } else if (vm.newshow === false) {
          if (vm.classes.includes(4)) {
            _query.subtype = vm.opepind
          } else if (vm.classes.includes(5)) {
            if (vm.opepocc === 1) _query.subtype = 3
            else if (vm.opepocc === 2) _query.subtype = 4
          }
        }
      }

      _query.classes = vm.arrayToString(vm.sortbyNumber(vm.classes))
      if (vm.states === 1) {
        _query.classes = '1'
      }

      if (vm.newshow === true) {
        if (vm.citys.length === 0) {
          _SAlert.Error('請至少選擇一個縣市.')
          return
        }
      } else if (vm.citys2.length === 0) {
        _SAlert.Error('請至少選擇一個縣市.')
        return
      }
      if (vm.sexes.length === 0) {
        _SAlert.Error('請至少選擇一個性別.')
        return
      }
      if (
        (vm.states !== 6 &&
          vm.states !== 7 &&
          vm.states <= 8 &&
          vm.output.length === 0) ||
        ((vm.states === 6 || vm.states === 7) && vm.output2.length === 0) ||
        (vm.states >= 9 && vm.states <= 15 && vm.output3.length === 0)
      ) {
        _SAlert.Error('請至少選擇一個輸出類別.')
        return
      }
      if (vm.states !== 1 && vm.classes.length === 0) {
        _SAlert.Error('請至少選擇一個分類.')
        return
      }

      if (vm.showstate === 1) {
        const n = vm.ComputeSearch(_query)
        if (n >= 100000) {
          vm.tmpQuery = _query
          vm.showwarning = true
        } else {
          vm.$router.push({
            path: '/Intranet_Inquire/CityResultInquire',
            query: _query
          })
        }
      } else {
        const _post = {}
        _post.op = 'GetExcelForCityIntranet'
        _post.startyear = _query.startyear
        _post.endyear = _query.endyear
        _post.zone = _query.zone
        _post.state = _query.states
        _post.classes = _query.classes
        _post.sex = _query.sex
        _post.cycle = _query.cycle
        _post.output = _query.output
        _post.smonth = _query.smonth
        _post.subtype = _query.subtype
        _post.isnew = _query.isnew
        _post.exporttype = this.showstate

        vm.loader = true
        axios
          .post(vm.RequetURL.cityinurl, qs.stringify(_post))
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
              } else {
                _SAlert.Error('下載檔案時發生錯誤.')
              }
            } else {
              _SAlert.Error('下載檔案時發生錯誤.')
            }
          })
          .finally(() => {
            vm.loader = false
          })
      }
    },
    TempQuerySend() {
      const vm = this
      vm.$router.push({
        path: '/Intranet_Inquire/CityResultInquire',
        query: vm.tmpQuery
      })
    },
    ComputeSearch(opt) {
      const vm = this
      let n = 1
      n = n * (vm.EndYear - vm.StartYear)
      n = n * vm.sexes.length

      if (opt.cycle === 4) n = n * 12
      else if (opt.cycle === 2) n = n * 2
      else if (opt.cycle === 3) n = n * 4
      else n = n * 1

      if (vm.states === 6 || vm.states === 7) n = n * vm.output2.length
      if (vm.states >= 9 && vm.states <= 15) n = n * vm.output3.length
      else n = n * vm.output.length

      if (vm.newshow === true) {
        n = n * vm.citys.length
      } else {
        n = n * vm.citys2.length
      }

      const classes = vm.classes
      for (let i = 0; i < classes.length; i++) {
        if (classes === 1) n = n * 3
        else n = n * 20
      }

      return n
    },
    Reset() {
      this.citys = []
      this.citys2 = []
      this.allcitys = false
      this.allcitys2 = false
      this.states = 1
      this.smonth = 1
      this.sexes = []
      this.output = []
      this.output2 = []
      this.output3 = []
      this.classes = []
      this.cycle = 1
      this.StartYear = this.YearItems[0].value
      this.EndYear = this.YearItems[this.YearItems.length - 1].value
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
      vm.StartYearItems = vm.getStartYearItems(items, styear)
    },
    getbasedata() {
      const vm = this
      axios
        .post(vm.RequetURL.cityinurl, qs.stringify({ op: 'GetBaseInfo' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.setYearList(data.MNYear1)
            vm.bdata = data
          }
        })
    },
    newshowclick() {
      this.classes = []
      this.ShowNew = true
      this.ShowOld = false
      this.newshow = true
      this.setYearList(this.bdata.MNYear1, true)
      this.pepitems1 = [
        { text: '就業者(一)舊行業(6th)舊職業(5th)(67~90年)', value: 1 },
        { text: '就業者(一)舊行業(7th)舊職業(5th)(88~95年)', value: 2 },
        { text: '就業者(一)新行業(8th)舊職業(5th)(96~99年)', value: 3 },
        { text: '就業者(一)新行業(8th-11th)新職業(6th)(100年以後)', value: 4 }
      ]
    },
    oldshowclick() {
      this.classes = []
      if (this.isLowLaborUtilizationState()) this.states = 1
      this.ShowNew = false
      this.ShowOld = true
      this.newshow = false
      this.setYearList(this.bdata.MNYear2, true)
      this.pepitems1 = [
        { text: '就業者(一)舊行業(6th)舊職業(5th)(67~90年)', value: 1 },
        { text: '就業者(一)舊行業(7th)舊職業(5th)(88~95年)', value: 2 },
        { text: '就業者(一)新行業(8th)舊職業(5th)(96~99年)', value: 3 }
      ]
    },
    setYearList(data, ismin) {
      const vm = this
      const minyear = data.minyear
      const maxyear = data.maxyear
      vm.YearItems = []
      for (let i = minyear; i <= maxyear; i++) {
        const roc = i - 1911
        const opt = {}
        opt.text = roc + '年'
        opt.value = roc
        vm.YearItems.push(opt)
      }
      vm.StartYearItems = vm.getStartYearItems(vm.YearItems)
      vm.EndYearItems = vm.YearItems
      if (ismin === true) vm.StartYear = minyear - 1911
      else vm.StartYear = maxyear - 1911
      if (
        vm.StartYearItems.length > 0 &&
        !vm.StartYearItems.some((n) => n.value === vm.StartYear)
      )
        vm.StartYear = vm.StartYearItems[0].value

      vm.EndYear = maxyear - 1911
      vm.EndYearItems = vm.YearItems.filter((n) => n.value >= vm.StartYear)
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
  min-height: 150px !important;
  height: 150px !important;
}
.rcol1 {
  max-width: 40%;
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
.fcol {
  min-width: 140px;
}
.scol {
  min-width: 96px;
}
</style>
