<template>
  <footer>
    <span
      class="topfocus"
      accesskey="H"
      tabindex="0"
      title="Bottom functional area"
      role="button"
      aria-label="Bottom functional area"
      >:::</span
    >
    <div class="footerblock_eng">
      <span
        >Employment and Unemployment Statistics Enquiry System
        TEL:886-2380-3603、3604、3606、3611</span
      >
      <br />
      <span>
        Recommended browser: Chrome、Firefox、Safari、IE11 or above, 1440*1024
        resolution
      </span>
    </div>
    <div class="footerblock_eng">
      <span>Today of Views: {{ DayCount }}</span>
      <br />
      <span>No of Views: {{ TotalCount }}</span>
      <br />
      <a
        href="https://accessibility.moda.gov.tw/Applications/Detail?category=20251030155045"
        title="Accessibility Website"
      >
        <img
          src="@/assets/images/網站無障礙標章.png"
          border="0"
          width="88"
          height="31"
          alt="Passed AA Accessibility Test"
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
      DayCount: 0
    }
  },
  mounted() {
    const vm = this
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
