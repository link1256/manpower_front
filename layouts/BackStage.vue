<template>
  <v-app dark style="background: #D1E7EE;">
    <Header
      @showdef="DefinitionOpen = true"
      @showleftmenu="showleftmenu"
    ></Header>
    <rightMenu :show="leftmenu" @showdef="DefinitionOpen = true"></rightMenu>
    <div id="outerPage" style="min-height: calc(100% - 80px); overflow: auto;">
      <main>
        <div style="width: 100%;">
          <nuxt :keep-alive-props="{ include: ['CachePage'] }" keep-alive />
        </div>
      </main>
      <Footer v-if="$store.state.Utils.Menu.Menu.ShowFooter"></Footer>
    </div>
    <!-- 名詞定義 START -->
    <v-dialog v-model="DefinitionOpen" max-width="800">
      <div class="modal-content">
        <div
          class="dialogclose"
          tabindex="0"
          role="button"
          aria-label="關閉"
          @click="DefinitionOpen = false"
          @keyup.enter="DefinitionOpen = false"
        >
          X
        </div>
        <div class="modal-body fadewindow">
          <definition></definition>
        </div>
      </div>
    </v-dialog>
    <!-- 名詞定義 END -->
    <!-- 公告 START -->
    <v-dialog v-model="AnnOpen" max-width="600" persistent>
      <div class="modal-content">
        <div class="modal-body fadewindow">
          <announcement
            :tdata="AnnData"
            @closedialog="AnnOpen = false"
          ></announcement>
        </div>
      </div>
    </v-dialog>
    <!-- 公告 END -->
  </v-app>
</template>
<script>
import qs from 'qs'
import axios from '../plugins/axios'
import Header from '~/components/layouts/header.vue'
import rightMenu from '~/components/layouts/rightMenu.vue'
import Footer from '~/components/layouts/footer.vue'
import definition from '~/components/dialog/definition'
import announcement from '~/components/dialog/announcement'
export default {
  components: {
    Header,
    rightMenu,
    Footer,
    definition,
    announcement
  },
  data() {
    return {
      MerginLeft: false,
      leftmenu: false,
      DefinitionOpen: false,
      AnnOpen: false,
      AnnData: []
    }
  },
  computed: {
    Show: {
      get() {
        const vm = this
        if (vm.MerginLeft) {
          return false
        }
        return false
      }
    }
  },
  mounted() {
    this.getAnnouncement()
    window.addEventListener('keyup', this.handleEscape)
  },
  methods: {
    handleEscape(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        this.leftmenu = false
      }
    },
    showleftmenu(opt) {
      this.leftmenu = opt
    },
    getAnnouncement() {
      const vm = this
      axios
        .post(
          vm.RequetURL.backurl,
          qs.stringify({
            op: 'GetAnnouncementList'
          })
        )
        .then(function(Response) {
          if (typeof Response === 'object' && Response.status === 200) {
            const data = Response.data
            vm.AnnData = data

            const udate = new Date().getTime()
            let showcount = 0
            let hasnew = false
            for (let i = 0; i < data.length; i++) {
              if (data[i].IsForEver === 1) {
                showcount++
              } else {
                const d = new Date().getTime()
                const d1 = new Date(data[i].StartDate).getTime()
                const d2 = new Date(data[i].EndDate).getTime()
                if (d < d2 && d > d1) {
                  showcount++
                }
              }
              const ud = new Date(data[i].UpdateTime).getTime()
              if (vm.$cookie.get('sDate') && vm.$cookie.get('sDate') !== '') {
                const oDate = parseInt(vm.$cookie.get('sDate'))
                if (ud > oDate) hasnew = true
              }
            }
            if (showcount > 0) {
              if (
                vm.$cookie.get('notShow') === 'true' &&
                vm.$cookie.get('uDate') &&
                vm.$cookie.get('uDate') !== ''
              ) {
                const nDate = udate
                const oDate = parseInt(vm.$cookie.get('uDate'))

                if (nDate > oDate || hasnew === true) {
                  vm.AnnOpen = true
                  vm.$cookie.set('notShow', 'false')
                  vm.$cookie.set('uDate', '')
                }
              } else if (vm.$cookie.get('notShow') === 'true') {
              } else {
                vm.AnnOpen = true
              }
            }
          }
        })
    }
  }
}
</script>
