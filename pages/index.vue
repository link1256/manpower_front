<template>
  <div class="PageDefault">
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
    <div class="buttonzone">
      <div
        class="port_btn"
        tabindex="0"
        @click="CommonClick"
        @keyup.enter="CommonClick"
      >
        <div class="AllCenter indruct2">
          互動式統計圖表
        </div>
        <div class="btn_img AllCenter">
          <img alt="" src="@/assets/images/PlayData/常用查詢.svg" />
        </div>
        <div class="btn_span AllCenter">
          <label>就失業統計互動</label>
        </div>
      </div>
      <div
        class="port_btn"
        tabindex="0"
        @click="MoreClick"
        @keyup.enter="MoreClick"
      >
        <div class="AllCenter indruct2">
          就業及失業統計資料查詢系統
        </div>
        <div class="btn_img AllCenter">
          <img alt="" src="@/assets/images/PlayData/更多查詢.svg" />
        </div>
        <div class="btn_span AllCenter">
          <label>就失業統計探索</label>
        </div>
      </div>
    </div>
    <div class="chartzone">
      <v-row v-if="show">
        <v-col
          class="AllCenter"
          style="font-size: 2.25em; font-weight: bold; color: #485965;"
        >
          民國<label style="color: #35575a;">{{ yeartitle }}</label> 年
        </v-col>
      </v-row>
      <v-row v-if="show">
        <v-col tabindex="-1">
          <div class="showchart1" style="position: relative;">
            <img
              src="@/assets/images/PlayData/男.svg"
              alt=""
              class="maleimg"
              tabindex="-1"
            />
            <img
              src="@/assets/images/PlayData/女.svg"
              alt=""
              class="femaleimg"
              tabindex="-1"
            />
            <div id="barunit" class="AllCenter">
              <label>人數</label>
              <label>(千人)</label>
            </div>
            <highcharts
              :ref="'barchart'"
              :key="hkey"
              :options="chartOption"
              tabindex="-1"
              class="tablezone"
            ></highcharts>
          </div>
          <div class="showchart2">
            <label id="lineunit">(%)</label>
            <highcharts
              :ref="'linechart'"
              :key="hkey"
              :options="pchartOption"
              tabindex="-1"
              class="tablezone"
            ></highcharts>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import axios from '@/plugins/axios'
export default {
  layout: 'BackStage_index',
  data() {
    return {
      yeartitle: '',
      male: [],
      female: [],
      maxyear: 108,
      minyear: 67,
      hkey: 0,
      chartOption: {},
      pchartOption: {},
      show: false
    }
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', -1)
    setTimeout(() => {
      document.title = '就業失業統計觀測站'
    }, 100)

    const vm = this
    axios
      .post(vm.RequetURL.ajaxurl, qs.stringify({ op: 'GetPlayData' }))
      .then(function(Response) {
        if (typeof Response === 'object' && Response.status === 200) {
          const data = Response.data
          vm.male = data.Male
          vm.female = data.Female
          vm.maxyear = data.mnyear.maxyear
          vm.minyear = data.mnyear.minyear
          vm.setDrawEvent()
        }
      })
  },
  methods: {
    CommonClick() {
      this.$router.push({
        path: '/Common_Inquire/Interaction'
      })
    },
    MoreClick() {
      this.$router.push({
        path: '/Common_Inquire/index'
      })
    },
    CityClick() {
      this.$router.push({
        path: '/Statics_Inquire/CityInquire'
      })
    },
    setDrawEvent() {
      const vm = this
      const categories = [
        '65歲及以上',
        '60-64歲',
        '55-59歲',
        '50-54歲',
        '45-49歲',
        '40-44歲',
        '35-39歲',
        '30-34歲',
        '25-29歲',
        '20-24歲',
        '15-19歲'
      ]
      const categories2 = [
        '15-19歲',
        '20-24歲',
        '25-29歲',
        '30-34歲',
        '35-39歲',
        '40-44歲',
        '45-49歲',
        '50-54歲',
        '55-59歲',
        '60-64歲',
        '65歲及以上'
      ]
      const barobj = {
        chart: {
          type: 'bar',
          backgroundColor: 'transparent'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: false
            }
          },
          series: {
            animation: {
              duration: 0
            },
            pointWidth: 30
          }
        },
        credits: {
          enabled: false
        },
        xAxis: {
          left: '50%',
          categories,
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            align: 'left',
            x: -18,
            style: {
              fontSize: '0.625em'
            }
          }
        },
        yAxis: [
          {
            left: '57%',
            width: '40%',
            title: {
              enabled: false
            },
            min: 0,
            max: 1500000,
            labels: {
              formatter() {
                if (this.value === 0) return 0
                return Math.abs(this.value) / 1000
              },
              style: {
                fontSize: '0.625em'
              }
            }
          },
          {
            reversed: true,
            left: '5%',
            width: '40%',
            offset: 0,
            title: {
              enabled: false
            },
            min: 0,
            max: 1500000,
            labels: {
              formatter() {
                if (this.value === 0) return 0
                return Math.abs(this.value) / 1000
              },
              style: {
                fontSize: '0.625em'
              }
            }
          }
        ]
      }
      const lineobj = {
        chart: {
          type: 'line',
          backgroundColor: 'transparent'
        },
        xAxis: {
          showEmpty: false,
          categories: categories2,
          labels: {
            rotation: 0,
            style: {
              textOverflow: 'none',
              fontSize: '0.625em'
            }
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            enabled: false
          },
          labels: {
            style: {
              fontSize: '0.75em'
            }
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: {
              duration: 0
            },
            lineWidth: 6,
            marker: {
              radius: 8
            }
          }
        }
      }

      let i = this.minyear
      setInterval(function() {
        vm.show = true
        const male = vm.male.filter((f) => f.Year === i)
        const female = vm.female.filter((f) => f.Year === i)
        const nyear = i
        const title = {
          text: nyear - 1911
        }

        vm.yeartitle = title.text
        barobj.title = { text: '勞動力' }
        barobj.title.style = {
          color: '#485965',
          fontWeight: 'bold',
          fontSize: '1.125em'
        }

        lineobj.title = { text: '勞動力參與率' }
        lineobj.title.style = {
          color: '#485965',
          fontWeight: 'bold',
          fontSize: '1.125em'
        }

        const m = {}
        m.name = '男'
        m.data = []
        m.yAxis = 1
        m.color = '#87B2B5'

        const f = {}
        f.name = '女'
        f.data = []
        f.color = '#EEB991'

        const mp = {}
        mp.name = '男'
        mp.data = []
        mp.color = '#87B2B5'

        const fp = {}
        fp.name = '女'
        fp.data = []
        fp.color = '#EEB991'

        for (let k = 0; k < male.length; k++) {
          mp.data.push(male[k].LFP)
          fp.data.push(female[k].LFP)
        }

        for (let k = male.length - 1; k >= 0; k--) {
          m.data.push(male[k].LAF)
          f.data.push(female[k].LAF)
        }

        barobj.series = []
        barobj.series.push(m)
        barobj.series.push(f)

        lineobj.series = []
        lineobj.series.push(mp)
        lineobj.series.push(fp)

        barobj.accessibility = {
          enabled: false
        }
        lineobj.accessibility = {
          enabled: false
        }

        vm.chartOption = barobj
        vm.pchartOption = lineobj
        vm.hkey = vm.hkey + 1
        i++
        if (i > vm.maxyear) i = vm.minyear
      }, 700)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
.buttonzone {
  width: 100%;
  @include pc-width {
    height: 250px;
    @include AllCenter();
  }
  @include pcss-width {
    height: 250px;
    @include AllCenter();
  }
  @include pad-width {
    height: 700px;
    @include FlexCoulmnCenter();
  }
  @include small-pad-width {
    height: 700px;
    @include FlexCoulmnCenter();
  }
  @include phone-width {
    height: 700px;
    @include FlexCoulmnCenter();
  }
  margin-top: 20px;
  margin-bottom: 20px;
}
.buttonzone2 {
  @include pc-width {
    @include AllLeft();
  }
  @include pcss-width {
    @include AllLeft();
  }
  @include pad-width {
    @include AllCenter();
  }
  @include small-pad-width {
    @include AllCenter();
  }
  @include phone-width {
    @include AllCenter();
  }
  width: 100%;
  height: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.chartzone {
  @include pc-width {
    width: 100%;
    margin-top: 35px;
  }
  @include pcss-width {
    width: 90%;
    margin-left: 5%;
  }
  @include pad-width {
    width: 90%;
    margin-left: 5%;
  }
  @include small-pad-width {
    width: 90%;
    margin-left: 5%;
  }
  @include phone-width {
    width: 90%;
    margin-left: 5%;
  }
  margin-bottom: 120px;
}
.tablezone {
  width: 100%;
  @include pc-width {
    height: 550px;
  }
  @include pcss-width {
    height: 550px;
  }
  overflow: auto;
}
.maleimg {
  @include pc-width {
    left: 100px;
    top: 50px;
  }
  @include pcss-width {
    left: 100px;
    top: 50px;
  }
  @include pad-width {
    left: 100px;
    top: 50px;
  }
  @include small-pad-width {
    left: 20px;
    top: 50px;
  }
  @include phone-width {
    left: 20px;
    top: 50px;
  }

  position: absolute;
  z-index: 3;
}
.femaleimg {
  @include pc-width {
    right: 100px;
    top: 50px;
  }
  @include pcss-width {
    right: 100px;
    top: 50px;
  }
  @include pad-width {
    right: 100px;
    top: 50px;
  }
  @include small-pad-width {
    right: 20px;
    top: 50px;
  }
  @include phone-width {
    right: 20px;
    top: 50px;
  }

  position: absolute;
  z-index: 3;
}
.showchart1 {
  @include pc-width {
    width: 50%;
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
  margin-right: 5%;
  float: left;
  position: relative;
}
.showchart2 {
  @include pc-width {
    width: 40%;
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
  float: left;
  position: relative;
}
#barunit {
  left: calc(51% - 25px);
  bottom: 40px;
  font-size: 0.75em;
  position: absolute;
  width: 50px;
  flex-wrap: wrap;
}
#lineunit {
  left: 15px;
  top: 20px;
  font-size: 0.75em;
  position: absolute;
}
.title_btn {
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
  width: 325px;
  height: 250px;
  margin-left: 20px;
  float: left;
  .btn_img {
    height: 100%;
  }
}
.port_btn {
  @include pc-width {
    width: 350px;
    height: 225px;
    margin-left: 50px;
  }
  @include pcss-width {
    width: 350px;
    height: 225px;
    margin-left: 50px;
  }
  @include pad-width {
    width: 350px;
    height: 225px;
    margin-bottom: 40px;
  }
  @include small-pad-width {
    width: 300px;
    margin-bottom: 40px;
  }
  @include phone-width {
    width: 300px;
    margin-bottom: 40px;
  }
  float: left;
  cursor: pointer;
  .btn_img {
    background: #d5ecee;
    border-radius: 10px;
    height: 100%;
  }
  .btn_span {
    width: 200px;
    left: calc(50% - 100px);
    bottom: -45px;
    font-weight: bold;
    font-size: 1.125em;
    color: #ffffff;
    background: #35575a;
    border-radius: 10px;
    position: absolute;
    padding: 10px 0px;
    cursor: pointer;
  }
  position: relative;
}
.buttonzone_rwd {
  @include pc-width {
    display: none;
  }
  .title_btn {
    display: inherit;
  }
}
.indruct2 {
  font-size: 1.125em;
  color: #344059;
  font-weight: bold;
}
</style>
