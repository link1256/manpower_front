<template>
  <footer>
    <span
      class="topfocus"
      accesskey="H"
      tabindex="0"
      title="下方區塊，連絡相關資訊，此區塊列有本網站的主要連結"
      role="button"
      aria-label="下方區塊，連絡相關資訊，此區塊列有本網站的主要連結"
      >:::</span
    >
    <div class="footerblock0">
      <span
        >就業及失業統計資料查詢系統 TEL：(02)2380-3603、3604、3606、3611</span
      >
      <br />
      <span>
        建議最佳瀏覽環境
        Chrome、Firefox、Safari、IE11以上版本、最佳瀏覽模式建議為1440*1024(採預設文字大小)
      </span>
      <br />
      <span
        >*相容性檢視設定：若網頁出現異常(大片空白區、文字排版問題)、按鈕無功能等問題，請開啟IE進行相容性檢視設定，詳細步驟請<a
          :href="pdfhref"
          style="color: #ffffff; text-decoration: underline;"
          title="就業及失業統計資料查詢系統-相容性設定文件.pdf"
          tabindex="0"
          >點此</a
        ></span
      >
    </div>
    <div class="footerblock">
      <span>今日訪客: {{ DayCount }}</span>
      <br />
      <span>累計訪客數: {{ TotalCount }}</span>
      <br />
      <a
        href="https://accessibility.moda.gov.tw/Applications/Detail?category=20251030155045"
        title="無障礙網站"
      >
        <img
          src="@/assets/images/網站無障礙標章.png"
          border="0"
          width="88"
          height="31"
          alt="通過AA無障礙網頁檢測"
        />
      </a>
    </div>
  </footer>
</template>
<script>
import qs from 'qs'
import axios from '../../plugins/axios'
export default {
  data() {
    return {
      TotalCount: 0,
      DayCount: 0,
      pdfhref: '/'
    }
  },
  mounted() {
    const vm = this
    vm.pdfhref = this.RequetURL.compdfurl
    axios
      .post(
        vm.RequetURL.backurl,
        qs.stringify({
          op: 'SetViewCount'
        })
      )
      .then(function(Response) {
        axios
          .post(
            vm.RequetURL.backurl,
            qs.stringify({
              op: 'GetViewCount'
            })
          )
          .then(function(fResponse) {
            if (typeof fResponse === 'object' && fResponse.status === 200) {
              const data = fResponse.data
              vm.TotalCount = data.TotalCount
              vm.DayCount = data.DayCount
            }
          })
      })
  }
}
</script>
