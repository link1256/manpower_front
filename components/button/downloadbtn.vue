<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <button class="showbtn" v-on="on">
        <img
          src="@/assets/images/Btn_Image/download.svg"
          style="margin-bottom: 4px;"
          alt=""
        />
        {{ name }}
      </button>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="itemclick(index)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  props: {
    name: {
      default: '資料下載',
      type: String
    },
    items: {
      default: new Array(0),
      type: Array
    }
  },
  data() {
    return {}
  },
  mounted() {
    if (this.items.length === 0) {
      this.items = [
        {
          title: '下載PNG'
        },
        {
          title: '下載JPEG'
        }
      ]
    }
  },
  methods: {
    itemclick(idx) {
      if (idx === 0) {
        this.$emit('downloadclick', 'image/png')
      } else if (idx === 1) {
        this.$emit('downloadclick', 'image/jpeg')
      } else if (idx === 2) {
        this.$emit('downloadclick', 'application/pdf')
      }
    }
  }
}
</script>
<style lang="scss">
.showbtn {
  color: #344059;
  background: #ffffff;
  border: 1px solid #aeaeae;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.125em;
  padding: 5px 15px;
  margin-right: 10px;
}
</style>
