<template>
  <div class="PageDefault AllTopCenter">
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
    <div class="pageitem_2">
      <v-container>
        <v-row>
          <v-col>
            <span style="font-size: 1.75em; color: #292B3B; font-weight: bold;"
              >就失業統計互動</span
            >
          </v-col>
        </v-row>
        <v-row class="gall_content">
          <div v-for="(item, index) in items" :key="index" class="gally">
            <a
              :href="item.URLLink"
              target="_blank"
              tabindex="0"
              title="會開啟新視窗"
              rel="noopener noreferrer"
            >
              <figure>
                <img
                  class="gally_img"
                  :src="RequetURL.imageupload + item.FileName"
                  alt=""
                />
              </figure>
              <div class="gally_span">
                <span>
                  {{ item.Name }}
                </span>
              </div>
            </a>
          </div>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import { _SAlert } from '../../utils/sweetAlert2'
import axios from '../../plugins/axios'
export default {
  layout: 'BackStage',
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.$store.commit('Utils/Menu/SET_TOPFUNCTIONID', 8)
    setTimeout(() => {
      document.title = '就失業統計互動'
    }, 100)

    this.PageStyle.SetLayoutStyle(
      this.$store,
      null,
      this.$store.state.Utils.SystemCode.LeftFunctionCode.Interaction
    )
    this.getStatList()
  },
  methods: {
    getStatList() {
      const vm = this
      axios
        .post(vm.RequetURL.backurl, qs.stringify({ op: 'GetStatFront' }))
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.items = data
          } else {
            _SAlert.Error('ERROR.')
          }
        })
    }
  }
}
</script>
<style lang="scss" scope>
@import '@/assets/Scss/_rwd.scss';
@import '@/assets/Scss/_mixins.scss';
.gall_content {
  display: flex !important;
  flex-wrap: wrap;
  justify-content: space-between;
}
figure {
  width: 360px;
  height: 240px;
  margin: 0;
  padding: 0;
  background: #fff;
  overflow: hidden;
}
.gally {
  margin-bottom: 30px;
}
.gally_img {
  width: 360px;
  height: 240px;
}
.gally_span {
  padding: 17px 18px;
  background-color: #fff;
}
.gally_span span {
  margin-bottom: 10px;
  color: #37474f;
  font-size: 1.25em;
  line-height: inherit;
}
</style>
