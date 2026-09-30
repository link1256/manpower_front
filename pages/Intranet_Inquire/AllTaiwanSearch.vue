<template>
  <div class="PageDefault AllTopCenter">
    <div class="pageitem_2">
      <v-container>
        <v-row>
          <v-col style="border-bottom:4px solid #344059;">
            <img src="@/assets/images/Intranet_Inquire/Magnifier.svg" alt="" />
            <span class="titile">臺灣地區</span>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 290px;">
            <span>統計項</span>
          </v-col>
          <v-col>
            <v-radio-group
              v-model="states"
              class="statgroup"
              @change="statesChange"
            >
              <v-row>
                <v-col class="rcol1 AllLeft">
                  <v-radio :value="1" label="總人口數"></v-radio>
                </v-col>
                <v-col class="rcol2 AllLeft">
                  <v-col class="rrcol">
                    <v-radio :value="7" label="就業者(一)"></v-radio>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="rcol1 AllLeft">
                  <v-radio :value="2" label="勞動力"></v-radio>
                </v-col>
                <v-col class="rcol2 AllLeft">
                  <v-col class="rrcol">
                    <v-radio :value="8" label="就業者(二)"></v-radio>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="pep2"
                      :items="pepitems2"
                      :disabled="pep2dis"
                      background-color="white"
                      solo
                      hide-details
                      @change="pep2Change"
                    ></v-select>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="rcol1 AllLeft">
                  <v-radio :value="3" label="十五歲以上民間人口"></v-radio>
                </v-col>
                <v-col class="rcol2 AllLeft">
                  <v-col class="rrcol">
                    <v-radio :value="9" label="失業者"></v-radio>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="pup"
                      :items="pupitems2"
                      :disabled="pupdis"
                      background-color="white"
                      solo
                      hide-details
                      @change="pupChange"
                    ></v-select>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="rcol1 AllLeft">
                  <v-radio :value="4" label="失業週數"></v-radio>
                </v-col>
                <v-col class="rcol2 AllLeft">
                  <v-col class="rrcol">
                    <v-radio :value="10" label="非勞動力"></v-radio>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="nlf"
                      :items="nlfitems"
                      :disabled="nlfdis"
                      background-color="white"
                      solo
                      hide-details
                      @change="nlfChange"
                    ></v-select>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="rcol1 AllLeft">
                  <v-radio :value="5" label="失業率"></v-radio>
                </v-col>
                <v-col class="rcol2 AllLeft">
                  <v-col class="rrcol">
                    <v-radio :value="11" label="勞動力低度運用指標"></v-radio>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="nlf2"
                      :items="nlfitems2"
                      :disabled="nlfdis2"
                      background-color="white"
                      solo
                      hide-details
                      @change="nlf2Change"
                    ></v-select>
                  </v-col>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="rcol1 AllLeft">
                  <v-radio :value="6" label="勞動力參與率"></v-radio>
                </v-col>
                <v-col class="rcol2 AllLeft"></v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="formitem" style="min-height: 200px">
          <v-col class="formtitle AllCenter">
            <span>分類</span>
          </v-col>
          <v-col v-if="states == 1" class="AllLeft">
            <v-row>
              <v-col>
                <span style="font-size: 1.125em;">無</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            v-if="
              (states >= 2 && states <= 7) ||
                (states == 9 && pup == 5) ||
                (states == 10 && nlf == 1) ||
                states == 11
            "
          >
            <v-row class="AllLeft" style="margin-top: 10px;">
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
            <v-row class="AllLeft" style="margin-top: 10px;">
              <v-col v-if="states == 7" class="rcol1 AllLeft">
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
              <v-col v-if="states == 7" class="rcol1 AllLeft">
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
              <v-col v-if="states == 4 || states == 9" class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="6"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="失業原因"
                ></v-checkbox>
              </v-col>
              <v-col v-if="states == 7" class="rcol1 AllLeft">
                <v-checkbox
                  v-model="classes"
                  :value="7"
                  :disabled="
                    classes.includes(4) || classes.includes(5) ? true : false
                  "
                  label="從業身分"
                ></v-checkbox>
              </v-col>
              <v-col v-if="states == 10" class="rcol1 AllLeft">
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
          <v-col
            v-if="
              states == 8 ||
                (states == 9 && pup != 5) ||
                (states == 10 && nlf != 1)
            "
          >
            <v-row>
              <v-col style="padding: 0px;">
                <v-radio-group v-model="classes2" class="classgroup">
                  <v-row
                    v-if="states == 7 || states == 8"
                    style="margin: 10px 0;"
                  >
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio :value="1" label="行業"></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectind"
                          :items="inditems"
                          :disabled="classes2 === 1 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="toggleind">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectind.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconInd }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectind.length - 1 }} others)</span
                            >
                          </template>
                        </v-select>
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="states == 7 || states == 8"
                    style="margin: 10px 0;"
                  >
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio :value="2" label="職業"></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectocc"
                          :items="occitems"
                          :disabled="classes2 === 2 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="toggleocc">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectocc.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconOcc }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectocc.length - 1 }} others)</span
                            >
                          </template></v-select
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="states == 7 || states == 8"
                    style="margin: 10px 0;"
                  >
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio :value="3" label="從業身分"></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectcow"
                          :items="cowitems"
                          :disabled="classes2 === 3 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="togglecow">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectcow.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconCow }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectcow.length - 1 }} others)</span
                            >
                          </template></v-select
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row v-if="states == 9" style="margin-bottom: 10px;">
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio
                          v-b-tooltip.top="{ variant: 'dark' }"
                          :value="4"
                          label="失業原因"
                          title="112年1月起「女性結婚或生育」修改為「結婚或生育」。"
                        ></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectrou"
                          :items="rouitems"
                          :disabled="classes2 === 4 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="togglerou">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectrou.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconRou }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectrou.length - 1 }} others)</span
                            >
                          </template></v-select
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row v-if="states == 9" style="margin-bottom: 10px;">
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio :value="5" label="非初次尋職者原因"></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectfrou"
                          :items="frouitems"
                          :disabled="classes2 === 5 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="togglefrou">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectfrou.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconfRou }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectfrou.length - 1 }} others)</span
                            >
                          </template></v-select
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row v-if="states == 9" style="margin-bottom: 10px;">
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio :value="6" label="失業前從業身分"></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectpupcow"
                          :items="pupcowitems"
                          :disabled="classes2 === 6 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="togglepupcow">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectpupcow.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconPupcow }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectpupcow.length - 1 }} others)</span
                            >
                          </template></v-select
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                  <v-row v-if="states == 10" style="margin-bottom: 10px;">
                    <v-col class="rcol5 AllLeft">
                      <v-col class="rrcol">
                        <v-radio :value="7" label="未參與勞動原因"></v-radio>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectron"
                          :items="ronitems"
                          :disabled="classes2 === 7 ? false : true"
                          class="multselect"
                          multiple
                          background-color="white"
                          solo
                          hide-details
                        >
                          <template v-slot:prepend-item>
                            <v-list-item ripple @click="toggleron">
                              <v-list-item-action>
                                <v-icon
                                  :color="
                                    selectron.length > 0
                                      ? 'indigo darken-4'
                                      : ''
                                  "
                                  >{{ iconRon }}</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>全選</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                          </template>
                          <template v-slot:selection="{ item, index }">
                            <v-chip v-if="index === 0">
                              <span>{{
                                item.text.length >= 10
                                  ? item.text.slice(0, 9) + '...'
                                  : item.text
                              }}</span>
                            </v-chip>
                            <span v-if="index === 1" class="grey--text caption"
                              >(+{{ selectron.length - 1 }} others)</span
                            >
                          </template></v-select
                        >
                      </v-col>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col>
              <v-col class="AllCenter" style="max-width: 150px;">
                <span>之</span>
              </v-col>
              <v-col style="max-width: 300px;">
                <v-radio-group v-model="classes3" class="classgroup">
                  <v-row v-if="states <= 7">
                    <v-col>
                      <v-radio :value="1" label="總計"></v-radio>
                    </v-col>
                  </v-row>
                  <v-row v-if="classes2 !== 5 && classes2 !== 6">
                    <v-col>
                      <v-radio :value="2" label="教育程度"></v-radio>
                    </v-col>
                  </v-row>
                  <v-row v-if="classes2 !== 5 && classes2 !== 6">
                    <v-col>
                      <v-radio :value="3" label="年齡"></v-radio>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="states == 9 && (classes2 === 5 || classes2 === 6)"
                  >
                    <v-col>
                      <v-radio :value="4" label="失業前行業"></v-radio>
                    </v-col>
                  </v-row>
                  <v-row
                    v-if="states == 9 && (classes2 === 5 || classes2 === 6)"
                  >
                    <v-col>
                      <v-radio :value="5" label="失業前職業"></v-radio>
                    </v-col>
                  </v-row>
                  <v-row v-if="states == 9 && classes2 === 5">
                    <v-col>
                      <v-radio :value="6" label="失業前從業身分"></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="formitem">
          <v-col class="formtitle AllCenter" style="min-height: 60px;">
            <span>性別</span>
          </v-col>
          <v-col
            v-if="
              states == 8 ||
                (states == 9 && pup != 5) ||
                (states == 10 && nlf != 1)
            "
            class="AllLeft"
          >
            <v-row>
              <v-col style="padding: 0px;">
                <span style="font-size: 1.125em;">無</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            v-if="
              states < 8 ||
                (states == 9 && pup == 5) ||
                (states == 10 && nlf == 1) ||
                states == 11
            "
            class="AllLeft"
            style="max-width: 360px;"
          >
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
              v-if="states != 4 && states != 5 && states != 6 && states != 11"
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
              v-if="states == 4 || states == 5 || states == 6"
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
              v-if="states == 11"
              class="AllLeft"
              style="padding: 0px;"
              fluid
            >
              <v-col
                v-show="nlf2 == 1 || nlf2 == 2 || nlf2 == 3"
                style="padding: 0px;"
              >
                <v-checkbox
                  v-model="output3"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="T"
                  label="千人"
                ></v-checkbox>
              </v-col>
              <v-col
                v-show="nlf2 == 1 || nlf2 == 2 || nlf2 == 3"
                style="padding: 0px;"
              >
                <v-checkbox
                  v-model="output3"
                  style="margin-top: 5px; margin-bottom: 5px;"
                  value="P"
                  label="人"
                ></v-checkbox>
              </v-col>
              <v-col
                v-show="nlf2 == 4 || nlf2 == 5 || nlf2 == 6 || nlf2 == 7"
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
                v-show="nlf2 == 4 || nlf2 == 5 || nlf2 == 6 || nlf2 == 7"
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
            <editbtn :name="'查詢'" @click.native="SendQuery"></editbtn>
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
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
import crosscancel from '~/components/button/crosscancel'
import editbtn from '~/components/button/editbtn'

const LOW_LABOR_UTILIZATION_STATE = 11
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
      bdata: null,
      loader: false,
      showwarning: false,
      tmpQuery: null,
      showstate: 1,
      smonth: 1,
      classes: [],
      classes2: 1,
      classes3: 1,
      states: 1,
      pepind: 1,
      pepinditems: [
        { text: '舊行業(6th)(67~90年)', value: 1 },
        { text: '舊行業(7th)(88~95年)', value: 2 },
        { text: '新行業(8th-11th)(96年以後)', value: 4 }
      ],
      pepocc: 1,
      pepoccitems: [
        { text: '舊職業(5th)(67~90年)', value: 1 },
        { text: '新職業(6th)(90年以後)', value: 2 }
      ],
      pep2: 1,
      pepitems2: [
        { text: '就業者(二)舊行業(6th)舊職業(5th)(67~90年)', value: 1 },
        { text: '就業者(二)舊行業(7th)舊職業(5th)(88~95年)', value: 2 },
        { text: '就業者(二)新行業(8th)舊職業(5th)(96~99年)', value: 3 },
        { text: '就業者(二)新行業(8th-11th)新職業(6th)(100年以後)', value: 4 }
      ],
      pup: 5,
      pupitems2: [
        { text: '失業者(一)', value: 5 },
        { text: '失業者(二)舊行業(6th)舊職業(5th)(67~90年)', value: 1 },
        { text: '失業者(二)舊行業(7th)舊職業(5th)(88~95年)', value: 2 },
        { text: '失業者(二)新行業(8th)舊職業(5th)(96~99年)', value: 3 },
        { text: '失業者(二)新行業(8th-11th)新職業(6th)(100年以後)', value: 4 }
      ],
      nlf: 1,
      nlfitems: [
        { text: '非勞動力(一)', value: 1 },
        { text: '非勞動力(二)', value: 2 }
      ],
      nlf2: 1,
      nlfitems2: [
        { text: '4週失業者', value: 1 },
        { text: '工時不足就業者', value: 2 },
        { text: '潛在勞動力', value: 3 },
        { text: 'LU1', value: 4 },
        { text: 'LU2', value: 5 },
        { text: 'LU3', value: 6 },
        { text: 'LU4', value: 7 }
      ],
      StartYear: null,
      StartYearItems: [],
      YearItems: [],
      EndYear: null,
      EndYearItems: [],
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
      sexes: [],
      output: [],
      output2: [],
      output3: [],
      selectind: [],
      inditems: [],
      selectocc: [],
      occitems: [],
      selectcow: [],
      cowitems: [],
      selectrou: [],
      rouitems: [],
      selectfrou: [],
      frouitems: [],
      selectpupcow: [],
      pupcowitems: [],
      selectron: [],
      ronitems: [],
      pep2dis: true,
      pupdis: true,
      nlfdis: true,
      nlfdis2: true,
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
    likesAllInd() {
      return this.selectind.length === this.inditems.length
    },
    likesSomeInd() {
      return this.selectind.length > 0 && !this.likesAllInd
    },
    iconInd() {
      if (this.likesAllInd) return 'mdi-checkbox-marked'
      if (this.likesSomeInd) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllOcc() {
      return this.selectocc.length === this.occitems.length
    },
    likesSomeOcc() {
      return this.selectocc.length > 0 && !this.likesAllOcc
    },
    iconOcc() {
      if (this.likesAllOcc) return 'mdi-checkbox-marked'
      if (this.likesSomeOcc) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllCow() {
      return this.selectcow.length === this.cowitems.length
    },
    likesSomeCow() {
      return this.selectcow.length > 0 && !this.likesAllCow
    },
    iconCow() {
      if (this.likesAllCow) return 'mdi-checkbox-marked'
      if (this.likesSomeCow) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllRou() {
      return this.selectrou.length === this.rouitems.length
    },
    likesSomeRou() {
      return this.selectrou.length > 0 && !this.likesAllRou
    },
    iconRou() {
      if (this.likesAllRou) return 'mdi-checkbox-marked'
      if (this.likesSomeRou) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllfRou() {
      return this.selectfrou.length === this.frouitems.length
    },
    likesSomefRou() {
      return this.selectfrou.length > 0 && !this.likesAllfRou
    },
    iconfRou() {
      if (this.likesAllfRou) return 'mdi-checkbox-marked'
      if (this.likesSomefRou) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllPupcow() {
      return this.selectpupcow.length === this.pupcowitems.length
    },
    likesSomePupcow() {
      return this.selectpupcow.length > 0 && !this.likesAllPupcow
    },
    iconPupcow() {
      if (this.likesAllPupcow) return 'mdi-checkbox-marked'
      if (this.likesSomePupcow) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    likesAllRon() {
      return this.selectron.length === this.ronitems.length
    },
    likesSomeRon() {
      return this.selectron.length > 0 && !this.likesAllRon
    },
    iconRon() {
      if (this.likesAllRon) return 'mdi-checkbox-marked'
      if (this.likesSomeRon) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
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
    getStartYearMin() {
      if (this.states === LOW_LABOR_UTILIZATION_STATE)
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
    },
    toggleind() {
      this.$nextTick(() => {
        if (this.likesAllInd) {
          this.selectind = []
        } else {
          const a = this.inditems.slice()
          this.selectind = []
          for (let i = 0; i < a.length; i++) {
            this.selectind.push(a[i].value)
          }
        }
      })
    },
    toggleocc() {
      this.$nextTick(() => {
        if (this.likesAllOcc) {
          this.selectocc = []
        } else {
          const a = this.occitems.slice()
          this.selectocc = []
          for (let i = 0; i < a.length; i++) {
            this.selectocc.push(a[i].value)
          }
        }
      })
    },
    togglecow() {
      this.$nextTick(() => {
        if (this.likesAllCow) {
          this.selectcow = []
        } else {
          const a = this.cowitems.slice()
          this.selectcow = []
          for (let i = 0; i < a.length; i++) {
            this.selectcow.push(a[i].value)
          }
        }
      })
    },
    togglerou() {
      this.$nextTick(() => {
        if (this.likesAllRou) {
          this.selectrou = []
        } else {
          const a = this.rouitems.slice()
          this.selectrou = []
          for (let i = 0; i < a.length; i++) {
            this.selectrou.push(a[i].value)
          }
        }
      })
    },
    togglefrou() {
      this.$nextTick(() => {
        if (this.likesAllfRou) {
          this.selectfrou = []
        } else {
          const a = this.frouitems.slice()
          this.selectfrou = []
          for (let i = 0; i < a.length; i++) {
            this.selectfrou.push(a[i].value)
          }
        }
      })
    },
    togglepupcow() {
      this.$nextTick(() => {
        if (this.likesAllPupcow) {
          this.selectpupcow = []
        } else {
          const a = this.pupcowitems.slice()
          this.selectpupcow = []
          for (let i = 0; i < a.length; i++) {
            this.selectpupcow.push(a[i].value)
          }
        }
      })
    },
    toggleron() {
      this.$nextTick(() => {
        if (this.likesAllRon) {
          this.selectron = []
        } else {
          const a = this.ronitems.slice()
          this.selectron = []
          for (let i = 0; i < a.length; i++) {
            this.selectron.push(a[i].value)
          }
        }
      })
    },
    pep2Change() {
      const s = this.pep2
      let cow = 0
      let ind = 0
      let occ = 0
      this.statesChange()

      cow = this.bdata.cow
      if (s === 1) {
        ind = this.bdata.ind6
        occ = this.bdata.occ5
      } else if (s === 2) {
        ind = this.bdata.ind7
        occ = this.bdata.occ5
      } else if (s === 3) {
        ind = this.bdata.ind8
        occ = this.bdata.occ5
      } else if (s === 4) {
        ind = this.bdata.ind8
        occ = this.bdata.occ6
      }

      this.occitems = []
      this.cowitems = []
      this.inditems = []

      for (let i = 0; i < cow.length; i++) {
        // if (cow[i].name === '總計') continue
        const opt = {}
        opt.value = cow[i].code
        opt.text = cow[i].name
        this.cowitems.push(opt)
      }
      for (let i = 0; i < ind.length; i++) {
        // if (ind[i].name === '總計') continue
        const opt = {}
        opt.value = ind[i].code
        opt.text = ind[i].name
        this.inditems.push(opt)
      }
      for (let i = 0; i < occ.length; i++) {
        // if (occ[i].name === '總計' || occ[i].name === '軍人') continue
        if (occ[i].name === '軍人') continue
        const opt = {}
        opt.value = occ[i].code
        opt.text = occ[i].name
        this.occitems.push(opt)
      }
    },
    pupChange() {
      const s = this.pup
      this.statesChange()
      if (s === 1) return

      let cow = null
      let rou = null

      cow = this.bdata.cow
      rou = this.bdata.rou

      this.rouitems = []
      this.frouitems = []
      this.pupcowitems = []

      for (let i = 0; i < cow.length; i++) {
        // if (cow[i].name === '總計') continue
        const opt = {}
        opt.value = cow[i].code
        opt.text = cow[i].name
        this.pupcowitems.push(opt)
      }
      for (let i = 0; i < rou.length; i++) {
        // if (rou[i].name === '總計') continue
        const opt = {}
        opt.value = rou[i].code
        opt.text = rou[i].name
        this.rouitems.push(opt)
      }
      for (let i = 0; i < rou.length; i++) {
        if (rou[i].name === '初次尋職' || rou[i].name === '非初次尋職') continue
        const opt = {}
        opt.value = rou[i].code
        opt.text = rou[i].name
        this.frouitems.push(opt)
      }
    },
    nlfChange() {
      const s = this.nlf
      this.statesChange()
      if (s === 1) return

      const ron = this.bdata.ron
      for (let i = 0; i < ron.length; i++) {
        if (
          // ron[i].name === '總計' ||
          ron[i].name === '初次尋職' ||
          ron[i].name === '計'
        )
          continue
        const opt = {}
        opt.value = ron[i].code
        opt.text = ron[i].name
        this.ronitems.push(opt)
      }
    },
    nlf2Change() {
      this.statesChange()
      this.output3 = []
    },
    statesChange() {
      const s = this.states
      const pep2 = this.pep2
      const pup = this.pup
      this.pep2dis = true
      this.pupdis = true
      this.nlfdis = true
      this.nlfdis2 = true

      let ismin = false
      const date = {}
      if (s === 8) {
        this.pep2dis = false
        this.classes2 = 1
        if (pep2 === 1) {
          date.minyear = 1978
          date.maxyear = 2001
        } else if (pep2 === 2) {
          date.minyear = 1999
          date.maxyear = 2006
        } else if (pep2 === 3) {
          date.minyear = 2007
          date.maxyear = 2010
        } else if (pep2 === 4) {
          date.minyear = 2011
          date.maxyear = this.bdata.MNYear.maxyear
        }
        ismin = true
      } else if (s === 9 && pup !== 5) {
        this.classes2 = 4
        if (pup === 1) {
          date.minyear = 1978
          date.maxyear = 2001
        } else if (pup === 2) {
          date.minyear = 1999
          date.maxyear = 2006
        } else if (pup === 3) {
          date.minyear = 2007
          date.maxyear = 2010
        } else if (pup === 4) {
          date.minyear = 2011
          date.maxyear = this.bdata.MNYear.maxyear
        }
        ismin = true
      } else {
        date.minyear = this.bdata.MNYear.minyear
        date.maxyear = this.bdata.MNYear.maxyear
      }
      if (s === 9) {
        this.pupdis = false
      } else if (s === 10) {
        this.nlfdis = false
        this.classes2 = 7
      } else if (s === 11) {
        this.nlfdis2 = false
      }
      this.setYearList(date, ismin)
      this.classes = []
    },
    classesChange() {
      const s = this.classes

      const date = {}
      let ismin = false
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
          date.maxyear = this.bdata.MNYear.maxyear
        }
        ismin = true
      } else if (s.includes(5)) {
        const d = this.pepocc
        if (d === 1) {
          date.minyear = 1978
          date.maxyear = 2001
        } else if (d === 2) {
          date.minyear = 2001
          date.maxyear = this.bdata.MNYear.maxyear
        }
        ismin = true
      } else {
        date.minyear = this.bdata.MNYear.minyear
        date.maxyear = this.bdata.MNYear.maxyear
      }
      this.setYearList(date, ismin)
    },
    getbasedata() {
      const vm = this
      axios
        .post(vm.RequetURL.taiwanaxurl, qs.stringify({ op: 'GetBaseInfo' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.setYearList(data.MNYear)
            vm.bdata = data
            vm.pep2Change()
            vm.pupChange()
            vm.nlfChange()
            vm.nlf2Change()
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
    itypechange() {
      if (this.InfoType !== 4) this.SelectSecound = 0
      else this.SelectSecound = 1
    },
    Reset() {
      this.smonth = 1
      this.classes = 1
      this.classes2 = 1
      this.classes3 = 1
      this.states = 1
      this.pep2 = 1
      this.pup = 5
      this.nlf = 1
      this.nlf2 = 1
      this.cycle = 1
      this.sexes = []
      this.output = []
      this.output2 = []
      this.output3 = []
      this.selectind = []
      this.selectocc = []
      this.selectcow = []
      this.selectrou = []
      this.selectfrou = []
      this.selectpupcow = []
      this.selectron = []
    },
    sort_ind(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.inditems.length; i++) {
        if (this.inditems[i].value === a) ia = i
        if (this.inditems[i].value === b) ib = i
      }
      return ia - ib
    },
    sort_occ(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.occitems.length; i++) {
        if (this.occitems[i].value === a) ia = i
        if (this.occitems[i].value === b) ib = i
      }
      return ia - ib
    },
    sort_cow(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.cowitems.length; i++) {
        if (this.cowitems[i].value === a) ia = i
        if (this.cowitems[i].value === b) ib = i
      }
      return ia - ib
    },
    sort_rou(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.rouitems.length; i++) {
        if (this.rouitems[i].value === a) ia = i
        if (this.rouitems[i].value === b) ib = i
      }
      return ia - ib
    },
    sort_ron(a, b) {
      let ia = 0
      let ib = 0

      for (let i = 0; i < this.ronitems.length; i++) {
        if (this.ronitems[i].value === a) ia = i
        if (this.ronitems[i].value === b) ib = i
      }
      return ia - ib
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
    ComputeSearch(opt) {
      const vm = this
      let n = 1
      n = n * (vm.EndYear - vm.StartYear)
      if (vm.sexes.length > 0) n = n * vm.sexes.length

      if (opt.cycle === 4) n = n * 12
      else if (opt.cycle === 2) n = n * 2
      else if (opt.cycle === 3) n = n * 4
      else n = n * 1

      if (vm.states === 4 || vm.states === 5 || vm.states === 6)
        n = n * vm.output2.length
      else if (vm.states === 11) n = n * vm.output3.length
      else n = n * vm.output.length

      if (opt.subtype2.length > 0) n = n * opt.subtype2.length

      if (n >= 3000) return 999999
      else return n
    },
    TempQuerySend() {
      const vm = this
      vm.$router.push({
        path: '/Intranet_Inquire/CityResultInquire',
        query: vm.tmpQuery
      })
    },
    SendQuery() {
      const vm = this
      const _query = {}

      _query.classes = vm.states
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

      if (vm.states === 4 || vm.states === 5 || vm.states === 6)
        _query.output = vm.arrayToString(vm.sortoutput(vm.output2))
      else if (vm.states === 11)
        _query.output = vm.arrayToString(vm.sortoutput(vm.output3))
      else _query.output = vm.arrayToString(vm.sortoutput(vm.output))

      if (vm.states === 7) {
        if (vm.classes.includes(4)) {
          _query.subtype = vm.pepind
        } else if (vm.classes.includes(5)) {
          if (vm.pepocc === 1) _query.subtype = 1
          else if (vm.pepocc === 2) _query.subtype = 4
        }
      } else if (vm.states === 8) _query.subtype = vm.pep2
      else if (vm.states === 9) _query.subtype = vm.pup
      else if (vm.states === 10) _query.subtype = vm.nlf
      else if (vm.states === 11) _query.subtype = vm.nlf2

      vm.classes.sort()
      let classes = ''
      for (let i = 0; i < vm.classes.length; i++) {
        if (i !== 0) classes += ','
        classes += vm.classes[i]
      }
      _query.classes1 = classes
      _query.classes2 = vm.classes2
      if (vm.classes2 === 1)
        _query.subtype2 = vm.arrayToString(vm.selectind.sort(vm.sort_ind))
      else if (vm.classes2 === 2)
        _query.subtype2 = vm.arrayToString(vm.selectocc.sort(vm.sort_occ))
      else if (vm.classes2 === 3)
        _query.subtype2 = vm.arrayToString(vm.selectcow.sort(vm.sort_cow))
      else if (vm.classes2 === 4)
        _query.subtype2 = vm.arrayToString(vm.selectrou.sort(vm.sort_rou))
      else if (vm.classes2 === 5)
        _query.subtype2 = vm.arrayToString(vm.selectfrou.sort(vm.sort_rou))
      else if (vm.classes2 === 6)
        _query.subtype2 = vm.arrayToString(vm.selectpupcow.sort(vm.sort_cow))
      else if (vm.classes2 === 7)
        _query.subtype2 = vm.arrayToString(vm.selectron.sort(vm.sort_ron))

      _query.classes3 = vm.classes3

      if (vm.states >= 1 && vm.states <= 7) {
        if (vm.states >= 2 && vm.states <= 7 && vm.classes.length === 0) {
          _SAlert.Error('請至少選擇一個分類')
          return
        }
        if (vm.sexes.length === 0) {
          _SAlert.Error('請至少選擇一個性別.')
          return
        }
      } else if (
        (vm.states === 9 && vm.pup === 5) ||
        (vm.states === 10 && vm.nlf === 1)
      ) {
        if (vm.classes.length === 0) {
          _SAlert.Error('請至少選擇一個分類')
          return
        }
      } else if (vm.states === 8) {
        if (vm.classes2 !== 1 && vm.classes2 !== 2 && vm.classes2 !== 3) {
          _SAlert.Error('請至少選擇一個主分類.')
          return
        }
        if (vm.classes2 === 1) {
          if (vm.selectind.length === 0) {
            _SAlert.Error('請至少選擇一個行業.')
            return
          }
          if (vm.classes3 !== 2 && vm.classes3 !== 3) {
            _SAlert.Error('請至少選擇一個子類別.')
            return
          }
        }
        if (vm.classes2 === 2) {
          if (vm.selectocc.length === 0) {
            _SAlert.Error('請至少選擇一個職業.')
            return
          }
          if (vm.classes3 !== 2 && vm.classes3 !== 3) {
            _SAlert.Error('請至少選擇一個子類別.')
            return
          }
        }
        if (vm.classes2 === 3) {
          if (vm.selectcow.length === 0) {
            _SAlert.Error('請至少選擇一個從業身分.')
            return
          }
          if (vm.classes3 !== 2 && vm.classes3 !== 3) {
            _SAlert.Error('請至少選擇一個子類別.')
            return
          }
        }
      } else if (vm.states === 9) {
        if (vm.pup === 5) {
          if (vm.sexes.length === 0) {
            _SAlert.Error('請至少選擇一個性別.')
            return
          }
        } else {
          if (vm.classes2 !== 4 && vm.classes2 !== 5 && vm.classes2 !== 6) {
            _SAlert.Error('請至少選擇一個主分類.')
            return
          }
          if (vm.classes2 === 4) {
            if (vm.selectrou.length === 0) {
              _SAlert.Error('請至少選擇一個失業原因.')
              return
            }
            if (vm.classes3 !== 2 && vm.classes3 !== 3) {
              _SAlert.Error('請至少選擇一個子類別.')
              return
            }
          }
          if (vm.classes2 === 5) {
            if (vm.selectfrou.length === 0) {
              _SAlert.Error('請至少選擇一個非初次尋職者原因.')
              return
            }
            if (vm.classes3 !== 4 && vm.classes3 !== 5 && vm.classes3 !== 6) {
              _SAlert.Error('請至少選擇一個子類別.')
              return
            }
          }
          if (vm.classes2 === 6) {
            if (vm.selectpupcow.length === 0) {
              _SAlert.Error('請至少選擇一個失業前從業身分.')
              return
            }
            if (vm.classes3 !== 4 && vm.classes3 !== 5) {
              _SAlert.Error('請至少選擇一個子類別.')
              return
            }
          }
        }
      } else if (vm.states === 10) {
        if (vm.nlf === 1) {
          if (vm.sexes.length === 0) {
            _SAlert.Error('請至少選擇一個性別.')
            return
          }
        } else if (vm.nlf === 2) {
          if (vm.classes2 !== 7) {
            _SAlert.Error('請至少選擇一個主分類.')
            return
          }
          if (vm.selectron.length === 0) {
            _SAlert.Error('請至少選擇一個未參與勞動原因.')
            return
          }
          if (vm.classes3 !== 2 && vm.classes3 !== 3) {
            _SAlert.Error('請至少選擇一個子類別.')
            return
          }
        }
      } else if (vm.states === 11) {
        if (vm.classes.length === 0) {
          _SAlert.Error('請至少選擇一個分類')
          return
        }
        if (vm.sexes.length === 0) {
          _SAlert.Error('請至少選擇一個性別.')
          return
        }
      }

      if (
        (vm.states !== 4 &&
          vm.states !== 5 &&
          vm.states !== 6 &&
          vm.states !== 11 &&
          vm.output.length === 0) ||
        ((vm.states === 4 || vm.states === 5 || vm.states === 6) &&
          vm.output2.length === 0) ||
        (vm.states === 11 && vm.output3.length === 0)
      ) {
        _SAlert.Error('請至少選擇一個輸出項目.')
        return
      }

      if (vm.showstate === 1) {
        const n = vm.ComputeSearch(_query)
        if (n >= 100000) {
          vm.tmpQuery = _query
          vm.showwarning = true
        } else {
          vm.$router.push({
            path: '/Intranet_Inquire/AllTaiwanResult',
            query: _query
          })
        }
      } else {
        const _post = {}
        _post.startyear = _query.startyear
        _post.endyear = _query.endyear
        _post.classes = _query.classes
        _post.sex = _query.sex
        _post.cycle = _query.cycle
        _post.output = _query.output
        _post.smonth = _query.smonth
        _post.subtype = _query.subtype
        _post.classes1 = _query.classes1
        _post.classes2 = _query.classes2
        _post.classes3 = _query.classes3
        _post.subtype2 = _query.subtype2
        _post.exporttype = vm.showstate
        _post.op = 'GetExcelForTaiwanIntranet'

        vm.loader = true

        axios
          .post(vm.RequetURL.taiwanaxurl, qs.stringify(_post))
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
.rcol1 {
  max-width: 30%;
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.rcol2 {
  max-width: 70%;
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
  padding: 0px;
  max-height: 45px;
  height: 45px;
}
.classgroup {
  min-height: 120px !important;
}
.dataselect {
  max-width: 140px;
}
.timegroup {
  min-height: 50px !important;
  height: 50px !important;
}
.rrcol {
  max-width: 180px;
}
</style>
