<template>
  <div id="ScrollTop" class="PageDefault">
    <v-container>
      <v-row>
        <v-col>
          <span style="font-size: 1.75em; color: #292B3B; font-weight: bold;"
            >人力資源統計年報資料查詢</span
          >
        </v-col>
      </v-row>
      <v-row v-for="(item, i) in yearcategory" :key="i">
        <v-container>
          <v-row>
            <v-col :id="'Class_' + item.Sno">
              <span
                style="font-size: 1.25em; color: #292B3B; font-weight: bold;"
                >{{ item.Name }}</span
              >
            </v-col>
          </v-row>
          <v-row
            v-for="(litem, i) in items.filter((f) => item.Sno === f.CAT)"
            :key="i"
            class="listitemrow"
          >
            <v-col
              style="background: #ffffff; cursor: pointer; margin: 5px 0px;"
              @click="itemclick(litem.T_ID)"
            >
              <span style="font-size: 1em; color: #292B3B;">
                ◆ 表{{ litem.T_ID }} {{ litem.T_NAME }}
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
      <div class="slidefixmenu AllCenter">
        <commonbtn
          :name="'回頂部'"
          style="margin: 5px 0px;"
          @click.native="ScrollView('#ScrollTop')"
        ></commonbtn>
        <commonbtn
          v-for="(item, i) in yearcategory"
          :key="i"
          :name="item.Name"
          style="margin: 5px 0px;"
          @click.native="ScrollView('#Class_' + item.Sno)"
        ></commonbtn>
      </div>
    </v-container>
  </div>
</template>
<script>
import $ from 'jquery'
import qs from 'qs'
import axios from '../../plugins/axios'
import { _SAlert } from '../../utils/sweetAlert2'
import commonbtn from '~/components/button/commonbtn'
export default {
  components: {
    commonbtn
  },
  layout: 'BackStage',
  data() {
    return {
      items: [],
      yearcategory: [],
      lastscroll: 0
    }
  },
  mounted() {
    this.checkLogin()
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 3)
    this.getbasedata()
  },
  methods: {
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
    getbasedata() {
      const vm = this
      axios
        .post(vm.RequetURL.backurl, qs.stringify({ op: 'getLayoutData' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.items = data.table
            vm.yearcategory = data.yearcategory
          }
        })
    },
    itemclick(sno) {
      const vm = this
      vm.$router.push({
        path: '/YearReport/Search',
        query: {
          TID: sno
        }
      })
    },
    ScrollView(type) {
      const scroll = $('#outerPage').scrollTop()
      const offset = scroll + $(type).offset().top - 80
      $('#outerPage').animate(
        {
          scrollTop: offset
        },
        1000
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
.slidefixmenu {
  width: 250px;
  position: fixed;
  right: 15px;
  top: calc(50%);
  transform: translateY(-50%);
  background: #ffffff;
  flex-wrap: wrap;
  overflow: auto;
}
.listitemrow {
  @include pc-width {
    width: 90%;
  }
  @include pcss-width {
    width: 80%;
  }
  @include pad-width {
    width: 80%;
  }
  @include small-pad-width {
    width: 80%;
  }
  @include phone-width {
    width: 80%;
  }
}
</style>
