<template>
  <v-container>
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
    <div class="indruct">
      <label>
        歡迎來到就業失業統計觀測站!若想要查詢更詳細的資料，請至更多資料查詢。
      </label>
    </div>
    <div style="margin-top: 10px;">
      <button class="showindexbtn" @click="QuerySearchIdx">
        重要指標
      </button>
      <br />
      <br />
      <button class="showindexbtn" @click="QuerySearchSeasonIdx">
        重要指標(季節調整)
      </button>
    </div>
    <div class="imgbtnzone AllCenter">
      <div class="first">
        <div
          v-b-tooltip.top="{ variant: 'warning' }"
          title="15 歲以上本國人口扣除武裝勞動力（現役軍人）、監管人口與 失蹤人口，包括勞動力與非勞動力。"
          class="imgbtn"
        >
          <img
            class="bkimg"
            src="@/assets/images/Common_Inquire/15歲以上民間人口.svg"
            alt=""
          />
          <commonbtn
            :name="'15歲以上民間人口'"
            @click.native="goSerarchPage('FPS')"
          ></commonbtn>
        </div>
      </div>
      <img
        class="first_include"
        src="@/assets/images/Common_Inquire/Include_first.svg"
        alt=""
      />
      <div class="second">
        <div
          v-b-tooltip.top="{ variant: 'warning' }"
          title="指在資料標準週內，年滿15歲不屬於勞動力之民間人口，包括因就學、料理家務、高齡、身心障礙及其他原因等而未工作亦未找工作者。"
          class="imgbtn"
        >
          <img
            class="bkimg"
            src="@/assets/images/Common_Inquire/非勞動力.svg"
            alt=""
          />
          <commonbtn
            :name="'非勞動力'"
            @click.native="goSerarchPage('NLF')"
          ></commonbtn>
        </div>
        <div class="imgbtn scimgbtn">
          <img
            class="bkimg"
            alt=""
            src="@/assets/images/Common_Inquire/勞動力.svg"
          />
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'勞動力'"
            title="指在資料標準週內年滿 15 歲可以工作之民間人口，包括就業者及失業者。"
            @click.native="goSerarchPage('LAF')"
          ></commonbtn>
          <div class="btnbr"></div>
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'勞動力參與率'"
            title="勞動力占 15 歲以上民間人口之比率。"
            @click.native="goSerarchPage('LFP')"
          ></commonbtn>
        </div>
      </div>
      <img
        class="second_include"
        src="@/assets/images/Common_Inquire/Include_second.svg"
        alt=""
      />
      <div class="thrid">
        <div
          v-b-tooltip.top="{ variant: 'warning' }"
          title="指在資料標準週內年滿 15 歲從事有酬工作者，或從事 15小時以上之無酬家屬工作者。"
          class="imgbtn"
        >
          <img
            class="bkimg"
            alt=""
            src="@/assets/images/Common_Inquire/就業者.svg"
          />
          <commonbtn
            :name="'就業者'"
            @click.native="goSerarchPage('PEP')"
          ></commonbtn>
        </div>
        <div class="imgbtn thimgbtn">
          <img
            class="bkimg"
            alt=""
            src="@/assets/images/Common_Inquire/失業者.svg"
          />
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'失業者'"
            title="指在資料標準週內年滿 15 歲同時具有下列條件者： 1.無工作；2.隨時可以工作；3.正在尋找工作或已找工作在等待結果。此外，尚包括等待恢復工作者及找到職業而未開始工作亦無報酬者。"
            @click.native="goSerarchPage('PUP')"
          ></commonbtn>
          <div class="btnbr"></div>
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'失業率'"
            title="失業者占勞動力人口之比率。"
            @click.native="goSerarchPage('UPR')"
          ></commonbtn>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
import commonbtn from '~/components/button/commonbtn'
export default {
  components: {
    commonbtn
  },
  layout: 'BackStage',
  data() {
    return {
      deftitle: '勞動力分類'
    }
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 1)
    setTimeout(() => {
      document.title = '常用資料查詢'
    }, 100)

    this.PageStyle.SetLayoutStyle(
      this.$store,
      null,
      this.$store.state.Utils.SystemCode.LeftFunctionCode.Common_Inquire
    )
  },
  methods: {
    goSerarchPage(type) {
      this.$router.push({
        path: '/Common_Inquire/SearchResult?type=' + type
      })
    },
    QuerySearchIdx() {
      this.$router.push({
        path: '/Common_Inquire/IndexResult'
      })
    },
    QuerySearchSeasonIdx() {
      this.$router.push({
        path: '/Common_Inquire/IndexSeasonResult'
      })
    }
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
.indruct {
  @include pc-width {
    width: 1000px;
    font-size: 1.25em;
  }
  @include pcss-width {
    width: 100%;
    font-size: 1.25em;
  }
  @include pad-width {
    width: 100%;
    font-size: 1.125em;
  }
  @include small-pad-width {
    width: 100%;
    font-size: 1em;
  }
  @include phone-width {
    width: 100%;
    font-size: 1em;
  }
  color: #344059;
  font-weight: bold;
}
.imgbtnzone {
  @include pc-width {
    margin-top: 10px;
    width: 100%;
  }
  @include pcss-width {
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include pad-width {
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include small-pad-width {
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include phone-width {
    flex-wrap: wrap;
    @include AllCenter();
  }
}
.first_include,
.second_include {
  @include pcss-width {
    display: none;
  }
  @include pad-width {
    display: none;
  }
  @include small-pad-width {
    display: none;
  }
  @include phone-width {
    display: none;
  }
}
.first,
.second,
.thrid {
  @include pc-width {
    margin-right: 0px;
    float: left;
  }
  @include pcss-width {
    width: 100%;
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include pad-width {
    width: 100%;
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include small-pad-width {
    width: 100%;
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include phone-width {
    width: 100%;
    flex-wrap: wrap;
    @include AllCenter();
  }
}
.first {
  @include pc-width {
    width: 500px;
  }
}
.first {
  width: 500px;
}
.second,
.thrid {
  @include pc-width {
    width: 250px;
  }
  @include pcss-width {
    margin-top: 40px;
  }
  @include pad-width {
    margin-top: 40px;
  }
  @include small-pad-width {
    margin-top: 40px;
  }
  @include phone-width {
    margin-top: 40px;
  }
}
.imgbtn {
  @include pc-width {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  @include pcss-width {
    width: 500px;
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include pad-width {
    width: 500px;
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include small-pad-width {
    width: 500px;
    flex-wrap: wrap;
    @include AllCenter();
  }
  @include phone-width {
    width: 500px;
    flex-wrap: wrap;
    @include AllCenter();
  }
}
.bkimg {
  @include pcss-width {
    width: 450px;
    height: 250px;
  }
  @include pad-width {
    width: 450px;
    height: 250px;
  }
  @include small-pad-width {
    width: 450px;
    height: 250px;
  }
  @include phone-width {
    width: 450px;
    height: 250px;
  }
}
.btnbr {
  @include pc-width {
    display: none;
  }
  @include pcss-width {
    width: 100%;
  }
  @include pad-width {
    width: 100%;
  }
  @include small-pad-width {
    width: 100%;
  }
  @include phone-width {
    width: 100%;
  }
}
.scimgbtn {
  margin-top: 40px;
}
.thimgbtn {
  @include pc-width {
    margin-top: 80px;
  }
  @include pcss-width {
    margin-top: 40px;
  }
  @include pad-width {
    margin-top: 40px;
  }
  @include small-pad-width {
    margin-top: 40px;
  }
  @include phone-width {
    margin-top: 40px;
  }
}
.btn {
  margin-top: 10px;
}
.second_include {
  margin-top: 170px;
  margin-left: 5px;
  margin-right: 5px;
}
.showindexbtn {
  color: #ffffff;
  background: #35575a;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.25em;
  padding: 8px 20px;
  margin-right: 10px;
  width: 215px;
}
</style>
