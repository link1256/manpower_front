<template>
  <div>
    <div class="checklist">
      <div class="blockzone blockzone1">
        <fieldset>
          <legend class="visually-hidden">Category</legend>
          <div class="blocktitle">Category</div>
          <div class="blockbody" style="overflow: auto;">
            <v-container style="padding: 0px;" fluid>
              <Checkboxbtn
                v-if="checkListType != 3 && checkListType != 7"
                :key="key"
                value="總計"
                label="Total"
                @changedcheck="classestoggle($event, '總計')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 7"
                :key="key"
                value="失業率"
                label="Total"
                @changedcheck="classestoggle($event, '失業率')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 3"
                :key="key"
                value="勞動力參與率"
                label="Total"
                @changedcheck="classestoggle($event, '勞動力參與率')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                :key="key"
                value="年齡"
                label="Age"
                @changedcheck="classestoggle($event, '年齡')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                :key="key"
                value="教育程度"
                label="Educational Attainment"
                @changedcheck="classestoggle($event, '教育程度')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 4"
                :key="key"
                value="非勞動原因"
                label="Reason for Not in Labor Force"
                @changedcheck="classestoggle($event, '非勞動原因')"
              >
              </Checkboxbtn>
              <v-container v-if="checkListType == 5" style="padding: 0px;">
                <p>Industry</p>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="idusty"
                  title="can only be searched between 1978-2001."
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_6"
                    :disabled="startyear <= 90 && endyear >= 67 ? false : true"
                    label="The sixth revised edition of standard industrial classification system (1978-2001)"
                    @changedcheck="classestoggle($event, '行業_6')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="idusty"
                  title="can only be searched between 1999-2006."
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_7"
                    :disabled="startyear <= 95 && endyear >= 88 ? false : true"
                    label="The seventh revised edition of standard industrial classification system (1999-2006)"
                    @changedcheck="classestoggle($event, '行業_7')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="idusty"
                  title="can only be searched after 2001."
                >
                  <Checkboxbtn
                    :key="key"
                    value="行業_8"
                    :disabled="startyear >= 90 || endyear >= 90 ? false : true"
                    label="The eighth-tenth revised edition of standard industrial classification system (After 2001)"
                    @changedcheck="classestoggle($event, '行業_8')"
                  >
                  </Checkboxbtn>
                </div>
              </v-container>
              <v-container v-if="checkListType == 5" style="padding: 0px;">
                <p>Occupation</p>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="idusty"
                  title="can only be searched between 1978-2010."
                >
                  <Checkboxbtn
                    :key="key"
                    value="職業_5"
                    :disabled="startyear <= 99 && endyear >= 67 ? false : true"
                    label="The fifth revised edition of standard occupational classification system (1978-2010)"
                    @changedcheck="classestoggle($event, '職業_5')"
                  >
                  </Checkboxbtn>
                </div>
                <div
                  v-b-tooltip.hover="{ variant: 'primary' }"
                  class="idusty"
                  title="can only be searched after 2000."
                >
                  <Checkboxbtn
                    :key="key"
                    value="職業_6"
                    :disabled="startyear >= 90 || endyear >= 90 ? false : true"
                    label="The sixth revised edition of standard occupational classification system (After 2000)"
                    @changedcheck="classestoggle($event, '職業_6')"
                  >
                  </Checkboxbtn>
                </div>
              </v-container>
              <Checkboxbtn
                v-if="checkListType == 5"
                :key="key"
                value="從業身分"
                label="Class of Worker"
                @changedcheck="classestoggle($event, '從業身分')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType == 6"
                :key="key"
                value="失業原因"
                label="Reason for Unemployment"
                @changedcheck="classestoggle($event, '失業原因')"
              >
              </Checkboxbtn>
            </v-container>
          </div>
        </fieldset>
      </div>
      <div v-if="needsex" class="blockzone blockzone2">
        <fieldset>
          <legend class="visually-hidden">Sex</legend>
          <div class="blocktitle">Sex</div>
          <div class="blockbody">
            <v-container style="padding: 0px;" fluid>
              <Checkboxbtn
                :key="key"
                value="T"
                label="Total"
                @changedcheck="sextoggle($event, 'T')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                :key="key"
                value="M"
                label="Male"
                @changedcheck="sextoggle($event, 'M')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                :key="key"
                value="F"
                label="Female"
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
          <legend class="visually-hidden">View of The Data</legend>
          <div class="blocktitle">View of The Data</div>
          <div class="blockbody">
            <v-container style="padding: 0px;" fluid>
              <Checkboxbtn
                :key="key"
                value="1"
                label="Data value"
                @changedcheck="statisticstoggle($event, '1')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType != 3 && checkListType != 7"
                :key="key"
                value="4"
                label=" % of Total "
                @changedcheck="statisticstoggle($event, '4')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="infotype != 3"
                :key="key"
                value="2"
                label="Change from previous period (level, percentage point)"
                @changedcheck="statisticstoggle($event, '2')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="checkListType != 3 && checkListType != 7 && infotype != 3"
                :key="key"
                value="5"
                label="Change in percent from previous period"
                @changedcheck="statisticstoggle($event, '5')"
              >
              </Checkboxbtn>
              <Checkboxbtn
                v-if="infotype == 1 || infotype == 3"
                :key="key"
                value="3"
                label="Change from that of previous year (level, percentage point)"
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
                label="Change in percent from that of previous year"
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
        <searchbtn
          :name="'Retrieve Data'"
          @click.native="sendQuery"
        ></searchbtn>
      </div>
      <div class="AllCenter" style="width: 100%">
        <cancelbtn
          :name="'Close'"
          style="height: 45px;"
          @click.native="closethis"
        ></cancelbtn>
        <crossbtn :name="'Clean Setting'" @click.native="resetthis"></crossbtn>
      </div>
    </div>
  </div>
</template>
<script>
import Checkboxbtn from '../button/checkboxbtnen.vue'
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
      key: 0
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
        '年齡',
        '教育程度',
        '非勞動原因',
        '行業_6',
        '行業_7',
        '行業_8',
        '職業_5',
        '職業_6',
        '從業身分',
        '失業原因',
        '失業率',
        '勞動力參與率'
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
  height: 470px;
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
.optspan label {
  @include small-pad-width {
    font-size: 0.875em;
  }
  @include phone-width {
    font-size: 0.75em;
  }
}
.idusty {
  @include pc-width {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @include pcss-width {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @include pad-width {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @include small-pad-width {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @include phone-width {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
