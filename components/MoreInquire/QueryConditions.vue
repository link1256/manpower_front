<template>
  <div>
    <div class="checklist">
      <div class="sublabel">{{ sublabel }}</div>
      <div class="blockzone blockzone1">
        <fieldset>
          <legend class="visually-hidden">分類</legend>
          <div class="blocktitle">分類</div>
          <div class="blockbody">
            <v-container style="padding: 0px;">
              <Checkboxbtn
                v-if="checkListType != 3 && checkListType != 7"
                :key="key"
                value="總計"
                label="總計"
                @changedcheck="classestoggle($event, '總計')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 7"
                :key="key"
                value="失業率"
                label="總計"
                @changedcheck="classestoggle($event, '失業率')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 3"
                :key="key"
                value="勞動力參與率"
                label="總計"
                @changedcheck="classestoggle($event, '勞動力參與率')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                :key="key"
                value="年齡"
                label="年齡"
                @changedcheck="classestoggle($event, '年齡')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                :key="key"
                value="教育程度"
                label="教育程度"
                @changedcheck="classestoggle($event, '教育程度')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 4"
                :key="key"
                value="非勞動原因"
                label="未參與勞動原因"
                @changedcheck="classestoggle($event, '非勞動原因')"
              >
              </Checkboxbtn>
              <v-container v-if="checkListType == 5" style="padding: 0px;">
                <p>行業</p>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="查詢年份僅限民國67年至民國90年，若無法查詢請更改統計期區間。"
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_6"
                    label="行業標準分類第6次修訂(67年-90年)"
                    :disabled="startyear <= 90 && endyear >= 67 ? false : true"
                    @changedcheck="classestoggle($event, '行業_6')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="查詢年份僅限民國88年至民國95年，若無法查詢請更改統計期區間。"
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_7"
                    label="行業標準分類第7次修訂(88年-95年)"
                    :disabled="startyear <= 95 && endyear >= 88 ? false : true"
                    @changedcheck="classestoggle($event, '行業_7')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="查詢年份僅限民國90年至民國115年，若無法查詢請更改統計期區間。"
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_8"
                    label="行業標準分類第8-11次修訂(90年-115年之後)"
                    :disabled="startyear <= 115 && endyear >= 90 ? false : true"
                    @changedcheck="classestoggle($event, '行業_8')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="查詢年份僅限民國105年以後，若無法查詢請更改統計期區間。"
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_12"
                    label="行業標準分類第12次修訂(105年之後)"
                    :disabled="
                      startyear >= 105 || endyear >= 105 ? false : true
                    "
                    @changedcheck="classestoggle($event, '行業_12')"
                  >
                  </Checkboxbtn>
                </div>
              </v-container>
              <v-container v-if="checkListType == 5" style="padding: 0px;">
                <p>職業</p>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="查詢年份僅限民國67年至民國99年，若無法查詢請更改統計期區間。"
                >
                  <Checkboxbtn
                    :key="key"
                    value="職業_5"
                    label="職業標準分類第5次修訂(67年-99年)"
                    :disabled="startyear <= 99 && endyear >= 67 ? false : true"
                    @changedcheck="classestoggle($event, '職業_5')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  title="查詢年份僅限民國90年以後，若無法查詢請更改統計期區間。"
                >
                  <Checkboxbtn
                    :key="key"
                    value="職業_6"
                    label="職業標準分類第6次修訂(90年之後)"
                    :disabled="startyear >= 90 || endyear >= 90 ? false : true"
                    @changedcheck="classestoggle($event, '職業_6')"
                  >
                  </Checkboxbtn>
                </div>
              </v-container>
              <Checkboxbtn
                v-if="checkListType == 5"
                :key="key"
                value="從業身分"
                label="從業身分"
                @changedcheck="classestoggle($event, '從業身分')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 6"
                :key="key"
                value="失業原因"
                label="失業原因"
                @changedcheck="classestoggle($event, '失業原因')"
              >
              </Checkboxbtn>
            </v-container>
          </div>
        </fieldset>
      </div>
      <div v-if="needsex" class="blockzone blockzone2">
        <fieldset>
          <legend class="visually-hidden">性別</legend>
          <div class="blocktitle">性別</div>
          <div class="blockbody">
            <v-container style="padding: 0px;" fluid>
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
            </v-container>
          </div>
        </fieldset>
      </div>
      <div
        :class="
          needsex == true ? 'blockzone blockzone3' : 'blockzone blockzone1'
        "
      >
        <fieldset>
          <legend class="visually-hidden">資料屬性</legend>
          <div class="blocktitle">資料屬性</div>
          <div class="blockbody">
            <v-container style="padding: 0px;" fluid>
              <Checkboxbtn
                :key="key"
                value="1"
                label="統計值"
                @changedcheck="statisticstoggle($event, '1')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType != 3 && checkListType != 7"
                :key="key"
                value="4"
                label="結構比"
                @changedcheck="statisticstoggle($event, '4')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="infotype != 3"
                :key="key"
                value="2"
                :label="lstatstr"
                @changedcheck="statisticstoggle($event, '2')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType != 3 && checkListType != 7 && infotype != 3"
                :key="key"
                value="5"
                label="較上期增減率"
                @changedcheck="statisticstoggle($event, '5')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="infotype == 1 || infotype == 3"
                :key="key"
                value="3"
                :label="lstatstr2"
                @changedcheck="statisticstoggle($event, '3')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="
                  (checkListType != 3 && checkListType != 7 && infotype == 1) ||
                    (checkListType != 3 && checkListType != 7 && infotype == 3)
                "
                :key="key"
                value="6"
                label="較上年同期增減率"
                @changedcheck="statisticstoggle($event, '6')"
              >
              </Checkboxbtn>
            </v-container>
          </div>
        </fieldset>
      </div>
    </div>
    <div
      class="modal-footer AllCenter"
      style="margin-top: 5px; width: 100%; padding: 0px; flex-wrap: wrap;"
    >
      <div class="AllCenter" style="width: 100%; margin: 5px 0px;">
        <searchbtn @click.native="sendQuery"></searchbtn>
      </div>
      <div class="AllCenter" style="width: 100%">
        <cancelbtn style="height: 45px;" @click.native="closethis"></cancelbtn>
        <crossbtn @click.native="resetthis"></crossbtn>
      </div>
    </div>
  </div>
</template>
<script>
import Checkboxbtn from '../button/checkboxbtn.vue'
import searchbtn from '~/components/button/searchbtn'
import cancelbtn from '~/components/button/cancelbtn'
import crossbtn from '~/components/button/crossbtn'
export default {
  components: {
    searchbtn,
    cancelbtn,
    crossbtn,
    Checkboxbtn
  },
  props: {
    checkListType: {
      default: 1,
      type: Number
    },
    startyear: {
      default: null,
      type: Number
    },
    endyear: {
      default: null,
      type: Number
    },
    infotype: {
      default: 1,
      type: Number
    },
    cycletype: {
      default: 0,
      type: Number
    },
    ispercent: {
      default: false,
      type: Boolean
    },
    needsex: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      classes: [],
      sex: [],
      statistics: [],
      lstatstr: '較上期增減值',
      lstatstr2: '較上年同期增減值',
      sublabel: 'TEST',
      key: 0
    }
  },
  mounted() {
    if (this.ispercent === true) {
      this.lstatstr = '較上期增減百分點'
      this.lstatstr2 = '較上年同期增減百分點'
    }
    if (this.checkListType === 1) {
      this.sublabel = '下方分類、性別、資料屬性皆為必選，請至少各選擇一項。'
    } else if (this.checkListType === 2) {
      this.sublabel = '下方分類、性別、資料屬性皆為必選，請至少各選擇一項。'
    } else if (this.checkListType === 3) {
      this.sublabel = '下方分類、性別、資料屬性皆為必選，請至少各選擇一項。'
    } else if (this.checkListType === 4) {
      this.sublabel = '下方分類、資料屬性皆為必選，請至少各選擇一項。'
    } else if (this.checkListType === 5) {
      this.sublabel = '下方分類、性別、資料屬性皆為必選，請至少各選擇一項。'
    } else if (this.checkListType === 6) {
      this.sublabel = '下方分類、性別、資料屬性皆為必選，請至少各選擇一項。'
    } else if (this.checkListType === 7) {
      this.sublabel = '下方分類、性別、資料屬性皆為必選，請至少各選擇一項。'
    }
  },
  methods: {
    classestoggle(e, val) {
      const idx = this.classes.indexOf(val)
      if (idx === -1) this.classes.push(val)
      else this.classes.splice(idx, 1)
    },
    sextoggle(e, val) {
      const idx = this.sex.indexOf(val)
      if (idx === -1) this.sex.push(val)
      else this.sex.splice(idx, 1)
    },
    statisticstoggle(e, val) {
      const idx = this.statistics.indexOf(val)
      if (idx === -1) this.statistics.push(val)
      else this.statistics.splice(idx, 1)
    },
    sendQuery() {
      const opt = {}

      opt.classes = this.sortclasses(this.classes)

      if (this.needsex === true) opt.sex = this.sortsex(this.sex)
      else opt.sex = 'T'

      opt.statistics = this.statistics.sort()

      if (this.infotype === 3) {
        opt.statistics = []
        for (let i = 0; i < this.statistics.length; i++) {
          if (this.statistics[i] === '3') {
            opt.statistics.push('2')
          } else if (this.statistics[i] === '6') {
            opt.statistics.push('5')
          } else {
            opt.statistics.push(this.statistics[i])
          }
        }
      }

      this.$emit('sendQuery', opt)
    },
    sortclasses(ary) {
      const stasort = [
        '總計',
        '失業率',
        '勞動力參與率',
        '年齡',
        '教育程度',
        '非勞動原因',
        '行業_6',
        '行業_7',
        '行業_8',
        '行業_12',
        '職業_5',
        '職業_6',
        '從業身分',
        '失業原因'
      ]
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
    closethis() {
      this.$emit('closeConditions')
    },
    resetthis() {
      this.classes = []
      this.sex = []
      this.statistics = []
      this.key++
    }
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
.checklist {
  width: 100%;
  min-height: 500px;
}
.blockzone {
  background: #e0edf0;
  margin-left: 2.5%;
  @include small-pad-width {
    margin-left: 5%;
  }
  @include phone-width {
    margin-left: 5%;
  }
  float: left;
}
.blocktitle {
  height: 30px;
  font-weight: bold;
  font-size: 1.125em;
  color: #ffffff;
  background: #35575a;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blockbody {
  height: calc(100% - 30px);
}
.blockbody {
  padding: 5px 10px;
}
.blockzone1 {
  @include pc-width {
    width: 45%;
    height: 500px;
  }
  @include pcss-width {
    width: 45%;
    height: 500px;
  }
  @include pad-width {
    width: 45%;
    height: 500px;
  }
  @include small-pad-width {
    width: 90%;
    height: 300px;
    margin-bottom: 20px;
    overflow: auto;
  }
  @include phone-width {
    width: 90%;
    height: 300px;
    margin-bottom: 20px;
    overflow: auto;
  }
}
.blockzone2 {
  @include pc-width {
    width: 45%;
  }
  @include pcss-width {
    width: 45%;
  }
  @include pad-width {
    width: 45%;
  }
  @include small-pad-width {
    width: 90%;
  }
  @include phone-width {
    width: 90%;
  }
  height: 180px;
  margin-bottom: 20px;
}
.blockzone3 {
  @include pc-width {
    width: 45%;
  }
  @include pcss-width {
    width: 45%;
  }
  @include pad-width {
    width: 45%;
  }
  @include small-pad-width {
    width: 90%;
    margin-bottom: 20px;
  }
  @include phone-width {
    width: 90%;
    margin-bottom: 20px;
  }
  height: 300px;
}
.sublabel {
  padding-left: 20px;
  padding-bottom: 10px;
}
</style>
