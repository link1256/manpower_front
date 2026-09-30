<template>
  <v-app dark style="background: #D1E7EE;">
    <Header
      @showdef="DefinitionOpen = true"
      @showleftmenu="showleftmenu"
    ></Header>
    <rightMenu :show="leftmenu" @showdef="DefinitionOpen = true"></rightMenu>
    <div style="min-height: calc(100% - 80px); overflow: auto;">
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
          aria-label="close"
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
  </v-app>
</template>
<script>
import Header from '~/components/layouts/header_eng.vue'
import rightMenu from '~/components/layouts/rightMenu_eng.vue'
import Footer from '~/components/layouts/footer_eng.vue'
import definition from '~/components/dialog/definition_eng'
export default {
  components: {
    Header,
    rightMenu,
    Footer,
    definition
  },
  data() {
    return {
      MerginLeft: false,
      leftmenu: false,
      DefinitionOpen: false
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
    }
  }
}
</script>
