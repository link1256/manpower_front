<template>
  <div class="PageDefault">
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
    <br />
    This website is designed according to accessibility principles. The main
    content is divided into three sections: <br />
    1. Top functional area, 2. Central content area, and 3. Bottom functional
    area. <br />
    This website provides accesskey and locator (:::) (formerly known as a
    tactile paving stone) to help users quickly move between sections using the
    keyboard. <br />
    The website's accesskey settings are as follows:<br />
    <br />
    Alt+U: The top functional area, including returning to the homepage, website
    navigation, definition, etc.
    <br />
    Alt+C: The central content area, which is the main content area of this
    page. <br />
    Alt+H: The bottom functional area. <br />
    If your browser is Firefox, the shortcut is Shift+Alt+(shortcut letter), for
    example, Shift+Alt+C will jump to the central content area, and so on.<br /><br />
    *When the tabs on this website cannot be selected with the mouse, you can
    use the following keyboard operations to browse the information: <br />
    ← → or ↑↓: Use the left and right arrow keys or the up and down arrow keys
    to move the tab order. <br />
    Tab: After hovering over the tab, you can use the Tab key to jump to the
    content to browse that item.<br />
    Tab + Shift: Press Tab + Shift to jump back to the previous item.<br />
    The right-side menu can be closed using the ESC key.<br /><br />
    1.Frequently Asked Options:
    <span
      tabindex="0"
      class="link_style"
      @click="enterInter"
      @keyup.enter="enterInter"
      >https://manpower.dgbas.gov.tw/dgbas_community/Common_Inquire/Index_eng</span
    >
    <br />
    2.More Formatting Options:
    <span
      tabindex="0"
      class="link_style"
      @click="enterCommon"
      @keyup.enter="enterCommon"
      >https://manpower.dgbas.gov.tw/dgbas_community/Statics_Inquire/MoreInquire_eng</span
    >
    <br />
  </div>
</template>
<script>
export default {
  layout: 'BackStage_eng',
  data() {
    return {
      // Define your data properties here
    }
  },
  methods: {
    enterInter() {
      this.$router.push({
        path: '/Common_Inquire/Interaction'
      })
    },
    enterCommon() {
      this.$router.push({
        path: '/Common_Inquire/index'
      })
    },
    enterMore() {
      this.$router.push({
        path: '/Statics_Inquire/MoreInquire'
      })
    },
    enterCity() {
      this.$router.push({
        path: '/Statics_Inquire/CityInquire'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.link_style {
  color: blue;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: darken(blue, 10%);
  }
}
</style>
