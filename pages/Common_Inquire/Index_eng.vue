<template>
  <v-container>
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
    <div class="indruct">
      <label>
        Welcome to Employment and Unemployment Exploration & Information System
      </label>
    </div>
    <div style="margin-top: 10px;">
      <button class="showindexbtn" @click="QuerySearchIdx">
        Important Indicators
      </button>
      <br />
      <br />
      <button class="showindexbtn" @click="QuerySearchSeasonIdx">
        Important Indicators(Seasonally Adjusted)
      </button>
    </div>
    <div class="imgbtnzone AllCenter">
      <div class="first" style="float: left;">
        <div
          v-b-tooltip.top="{ variant: 'warning' }"
          title="The population age 15 & above in Taiwan Area( Kinmen and Lienchiang Counties are excluded), with the exception of armed forces (current in-service soldiers), those incarcerated, and the missing population. The civilian population includes both the labor force and not in labor force."
          class="imgbtn"
        >
          <img
            class="bkimg"
            src="@/assets/images/Common_Inquire/15歲以上民間人口.svg"
            alt=""
          />
          <commonbtn
            :name="'Civilian Population Age 15 & Above'"
            @click.native="goSerarchPage('FPS')"
          ></commonbtn>
        </div>
      </div>
      <img
        class="first_include"
        src="@/assets/images/Common_Inquire/Include_first.svg"
        alt=""
      />
      <div class="second" style="float: left;">
        <div
          v-b-tooltip.top="{ variant: 'warning' }"
          title="Civilian population age 15 and above who do not belong to the labor force, and includes persons who are not working and not seeking a job because they are currently receiving an education or preparing to advance a higher education, managing households, elders, disabled, and etc."
          class="imgbtn"
        >
          <img
            class="bkimg"
            src="@/assets/images/Common_Inquire/非勞動力.svg"
            alt=""
          />
          <commonbtn
            :name="'Not in Labor Force'"
            @click.native="goSerarchPage('NLF')"
          ></commonbtn>
        </div>
        <div class="imgbtn" style="margin-top: 40px;">
          <img
            class="bkimg"
            alt=""
            src="@/assets/images/Common_Inquire/勞動力.svg"
          />
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'Labor Force'"
            title="Civilians age 15 & above who are able to work, and includes both employed and unemployed persons."
            @click.native="goSerarchPage('LAF')"
          ></commonbtn>
          <div class="btnbr"></div>
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'Labor Force Participation Rate'"
            title="(labor force / civilians age 15 & above) * 100%."
            @click.native="goSerarchPage('LFP')"
          ></commonbtn>
        </div>
      </div>
      <img
        class="second_include"
        src="@/assets/images/Common_Inquire/Include_second.svg"
        alt=""
      />
      <div class="thrid" style="float: left;">
        <div
          v-b-tooltip.top="{ variant: 'warning' }"
          title="Civilians age 15 & above who undertook a paid job, or worked as an unpaid family worker for at least 15 hours during the reference week."
          class="imgbtn"
        >
          <img
            class="bkimg"
            alt=""
            src="@/assets/images/Common_Inquire/就業者.svg"
          />
          <commonbtn
            :name="'Employed'"
            @click.native="goSerarchPage('PEP')"
          ></commonbtn>
        </div>
        <div class="imgbtn" style="margin-top: 80px;">
          <img
            class="bkimg"
            alt=""
            src="@/assets/images/Common_Inquire/失業者.svg"
          />
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'Unemployed'"
            title="Civilians age 15 & above who were： (i) jobless (ii) available for work (iii) seeking a job or waiting for results after job seeking during the reference week. Furthermore, those who wait for a recall after layoff or have a job offer but have not started to work are also classified into this category."
            @click.native="goSerarchPage('PUP')"
          ></commonbtn>
          <div class="btnbr"></div>
          <commonbtn
            v-b-tooltip.top="{ variant: 'warning' }"
            :name="'Unemployment Rate'"
            title="(unemployed / labor force) * 100%."
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
  layout: 'BackStage_eng',
  data() {
    return {
      deftitle: '勞動力分類'
    }
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 1)
    setTimeout(() => {
      document.title = 'Frequently Asked Options'
    }, 100)
  },
  methods: {
    goSerarchPage(type) {
      this.$router.push({
        path: '/Common_Inquire/SearchResult_eng?type=' + type
      })
    },
    QuerySearchIdx() {
      this.$router.push({
        path: '/Common_Inquire/IndexResult_eng'
      })
    },
    QuerySearchSeasonIdx() {
      this.$router.push({
        path: '/Common_Inquire/IndexSeasonResult_eng'
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
  width: 450px;
}
</style>
