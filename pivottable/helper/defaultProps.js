export default {
  props: {
    data: {
      type: [Array, Object, Function],
      required: true
    },
    aggregatorName: String,
    cols: {
      type: Array,
      default() {
        return []
      }
    },
    rendererName: {
      type: String,
      default: 'Table'
    },
    rowTotal: {
      type: Boolean,
      default: true
    },
    colTotal: {
      type: Boolean,
      default: true
    },
    showRootLabel: {
      type: Boolean,
      default: true
    },
    forFloatThead: {
      type: Boolean,
      default: false
    },
    keyTextMapping: {
      type: Object,
      default() {
        return {}
      }
    },
    globalSet: {
      type: Object,
      default() {
        return {}
      }
    },
    defaultNumberFormat: {
      type: Object,
      default() {
        return {}
      }
    },
    exceptFormatList: {
      type: Object,
      default() {
        return {}
      }
    },
    rows: {
      type: Array,
      default() {
        return []
      }
    },
    vals: {
      type: Array,
      default() {
        return []
      }
    },
    valueFilter: {
      type: Object,
      default() {
        return {}
      }
    },
    sorters: {
      type: [Function, Object],
      default() {
        return {}
      }
    },
    derivedAttributes: {
      type: Object,
      default() {
        return {}
      }
    },
    rowOrder: {
      type: String,
      default: 'key_a_to_z',
      validator(value) {
        return ['key_a_to_z', 'value_a_to_z', 'value_z_to_a'].includes(value)
      }
    },
    colOrder: {
      type: String,
      default: 'key_a_to_z',
      validator(value) {
        return ['key_a_to_z', 'value_a_to_z', 'value_z_to_a'].includes(value)
      }
    }
  }
}
