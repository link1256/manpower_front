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
    <br />
    本網站依無障礙網頁設計原則建置，網站的主要內容分為三大區塊： <br />
    1. 上方功能區塊、2. 中央內容區塊、3.下方功能區塊。 <br />
    本網站提供定位點(:::)（原名網頁導盲磚）搭配鍵盤快速鍵(Accesskey)，快速鍵﹝Accesskey﹞設定如下：
    <br />
    Alt+U：上方選單連結區，此區塊列有本網站的主要連結，包括回首頁、名詞定義、答客問等。
    <br />
    Alt+C：中央內容區塊，為本頁主要內容區。 <br />
    Alt+H：下方功能區塊。 <br />
    如果您的瀏覽器是Firefox，快速鍵的使用方法是 Shift+Alt+(快速鍵字母)，例如
    Shift+Alt+C會跳至網頁中央區塊，以此類推。<br /><br />
    ※當本網站項目頁籤無法以滑鼠點選時，您可利用以下鍵盤操作方式瀏覽資料 <br />
    ← → or ↑↓：按左右鍵或上下鍵移動標籤順序。 <br />
    Tab：停留於該標籤後,可利用Tab鍵跳至內容瀏覽該筆資料。<br />
    Tab + Shift：按Tab + Shift可往回跳至上一筆資料。<br />
    右側選單可透過ESC鍵關閉。<br /><br />
    1.就失業統計互動：<span
      tabindex="0"
      class="link_style"
      @click="enterInter"
      @keyup.enter="enterInter"
      >https://manpower.dgbas.gov.tw/dgbas_community/Common_Inquire/Interaction</span
    >
    <br />
    2.常用資料查詢：<span
      tabindex="0"
      class="link_style"
      @click="enterCommon"
      @keyup.enter="enterCommon"
      >https://manpower.dgbas.gov.tw/dgbas_community/Common_Inquire/index</span
    >
    <br />
    3.更多資料查詢：<span
      tabindex="0"
      class="link_style"
      @click="enterMore"
      @keyup.enter="enterMore"
      >https://manpower.dgbas.gov.tw/dgbas_community/Statics_Inquire/MoreInquire</span
    >
    <br />
    4.縣市資料查詢：<span
      tabindex="0"
      class="link_style"
      @click="enterCity"
      @keyup.enter="enterCity"
      >https://manpower.dgbas.gov.tw/dgbas_community/Statics_Inquire/CityInquire</span
    >
    <br />
  </div>
</template>
<script>
export default {
  layout: 'BackStage',
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
