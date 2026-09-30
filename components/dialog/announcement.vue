<template>
  <v-container>
    <div class="modal-header AllCenter">
      <label>系統公告</label>
    </div>
    <div class="modal-body">
      <div class="modaltable">
        <div v-for="(item, index) in items" :key="index" class="ann_item">
          <label
            v-if="item.show"
            class="tiptitle"
            style="color: #18605C; font-size: 1.25em;"
            >{{ item.Type }}</label
          >
          <br />
          <div v-if="item.show" v-html="item.Desc"></div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <div class="AllLeft">
        <v-checkbox
          v-model="todayshow"
          :value="1"
          label="今日不再顯示此則訊息"
        ></v-checkbox>
      </div>
      <div class="AllCenter">
        <bluecommonbtn :name="'確定'" @click.native="closethis"></bluecommonbtn>
      </div>
    </div>
  </v-container>
</template>
<script>
import bluecommonbtn from '~/components/button/bluecommonbtn'
import 'bootstrap'
import 'summernote'
export default {
  components: {
    bluecommonbtn
  },
  props: {
    tdata: {
      default: null,
      type: Array
    }
  },
  data() {
    return {
      items: [],
      todayshow: 0
    }
  },
  mounted() {
    const vm = this
    const data = vm.tdata
    const item = []
    for (let i = 0; i < data.length; i++) {
      const tmp = {}
      tmp.SNO = data[i].SNO
      tmp.Type = data[i].Type
      tmp.Subject = data[i].Subject
      if (data[i].IsForEver === 1) {
        tmp.Desc = data[i].Desc
        tmp.show = true
      } else {
        const d = new Date().getTime()
        const d1 = new Date(data[i].StartDate).getTime()
        const d2 = new Date(data[i].EndDate).getTime()
        if (d < d2 && d > d1) {
          tmp.Desc = data[i].Desc
          tmp.show = true
        } else {
          tmp.show = false
        }
      }
      item.push(tmp)
    }
    vm.items = item
  },
  methods: {
    closethis() {
      if (this.todayshow === 1) {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        this.$cookie.set('notShow', 'true')
        this.$cookie.set('uDate', tomorrow.getTime())
        this.$cookie.set('sDate', today.getTime())
      }
      this.$emit('closedialog')
    }
  }
}
</script>
