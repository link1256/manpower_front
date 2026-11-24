<template>
  <div class="dynamic-charts">
    <span
      id="centercontent"
      class="topfocus"
      accesskey="C"
      tabindex="0"
      title="中間區塊，主要顯示內容"
      aria-label="中間區塊，主要顯示內容"
      >:::</span
    >
    <h1 :class="{ 'has-instruction': selectedChart }">
      {{ selectedChart ? selectedChart.title : '動態統計圖' }}
    </h1>
    <p v-if="selectedChart" class="dynamic-chart-instruction">
      {{ selectedChart.instruction }}
    </p>
    <section v-if="selectedChart" :aria-busy="status === 'loading'">
      <p v-if="status === 'loading'" role="status">正在載入統計資料…</p>
      <p v-else-if="status === 'empty'" role="status">
        目前沒有可顯示的統計資料。
      </p>
      <div v-else-if="status === 'error'">
        <p role="alert">暫時無法載入圖表。</p>
        <button type="button" class="dynamic-chart-retry" @click="loadChart">
          重新載入
        </button>
      </div>
      <div
        v-show="status === 'ready'"
        ref="chart"
        class="dynamic-chart-root"
      ></div>
      <p v-if="status === 'ready'" class="dynamic-chart-source">
        資料來源為行政院主計總處人力資源調查。{{ selectedChart.note }}
      </p>
    </section>
    <nav
      class="dynamic-chart-directory"
      :aria-label="selectedChart ? '查看更多圖表' : '動態統計圖'"
    >
      <h2 v-if="selectedChart">查看更多圖表</h2>
      <div class="dynamic-chart-links">
        <nuxt-link
          v-for="chart in charts"
          :key="chart.id"
          :to="{ path: '/DynamicCharts', query: { chart: chart.id } }"
          :aria-current="
            selectedChart && selectedChart.id === chart.id ? 'page' : null
          "
        >
          <img :src="assetBase + 'card-' + chart.id + '.png'" alt="" />
          <span>{{ chart.title }}</span>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
import { RequetURL } from '@/utils/RequestUrl'
import { mountChart } from '@/components/DynamicCharts/runtime'

const charts = [
  {
    id: 'industry',
    instruction: '按下播放鍵可查看排名變化。',
    title: '歷年前十大就業行業排行',
    load: () => import('@/components/DynamicCharts/industry')
  },
  {
    id: 'unemployment',
    instruction: '按下播放鍵可查看各時期變化。',
    title: '歷年失業原因變化',
    note: '灰色區域為畢業季，紅色標記為重大事件。缺資料的月份以斷線呈現。',
    load: () => import('@/components/DynamicCharts/unemployment')
  },
  {
    id: 'notinlabor',
    instruction: '按下播放鍵可查看排名變化。',
    title: '歷年未參與勞動力原因',
    load: () => import('@/components/DynamicCharts/notinlabor')
  },
  {
    id: 'county',
    instruction: '按下播放鍵可查看排名變化。',
    title: '歷年縣市別勞動參與率變化',
    note: '板塊高度依當年勞參率排名。民國 100 年起使用改制後邊界。',
    load: () => import('@/components/DynamicCharts/county')
  }
]

const boundaryRequests = new Map()

function fetchBoundary(version) {
  if (!boundaryRequests.has(version)) {
    const request = axios
      .get(RequetURL.dynamicCharts, {
        params: { chart: 'boundaries', version }
      })
      .then((response) => response.data)
      .catch((error) => {
        boundaryRequests.delete(version)
        throw error
      })
    boundaryRequests.set(version, request)
  }
  return boundaryRequests.get(version)
}

export default {
  layout: 'BackStage',
  data() {
    return { charts, status: 'loading' }
  },
  computed: {
    selectedChart() {
      return charts.find((chart) => chart.id === this.$route.query.chart)
    },
    assetBase() {
      return this.$router.options.base + 'dynamic-charts/'
    }
  },
  watch: {
    selectedChart() {
      this.loadChart()
      this.$nextTick(() => {
        const container = this.$el.closest('#outerPage')
        if (container) container.scrollTop = 0
        window.scrollTo(0, 0)
      })
    }
  },
  created() {
    this.chartRequest = 0
  },
  mounted() {
    this.loadChart()
  },
  beforeDestroy() {
    this.chartRequest++
    this.disposeChart()
  },
  methods: {
    disposeChart() {
      if (this.chartCleanup) this.chartCleanup()
      this.chartCleanup = null
    },
    async loadChart() {
      const request = ++this.chartRequest
      this.disposeChart()
      const chart = this.selectedChart
      if (!chart) return

      this.status = 'loading'
      try {
        const [module, response] = await Promise.all([
          chart.load(),
          axios.get(RequetURL.dynamicCharts, { params: { chart: chart.id } })
        ])
        if (request !== this.chartRequest) return
        const rows = response.data.rows
        if (!rows.length) {
          this.status = 'empty'
          return
        }

        const boundaries = {}
        if (chart.id === 'county') {
          const versions = [...new Set(rows.map((row) => row.version))]
          await Promise.all(
            versions.map(async (version) => {
              boundaries[version] = await fetchBoundary(version)
            })
          )
        }
        if (request !== this.chartRequest) return
        this.status = 'ready'
        await this.$nextTick()
        if (request === this.chartRequest && this.$refs.chart) {
          this.chartCleanup = mountChart(
            module.default,
            this.$refs.chart,
            rows,
            boundaries,
            this.assetBase,
            chart.id !== 'notinlabor'
          )
        }
      } catch (error) {
        if (request === this.chartRequest) this.status = 'error'
      }
    }
  },
  head() {
    return {
      titleTemplate: '%s',
      title: this.selectedChart ? this.selectedChart.title : '動態統計圖'
    }
  }
}
</script>

<style>
.dynamic-charts {
  --font: 'Microsoft JhengHei', 'Noto Sans TC', sans-serif;
  --font-black: 'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
  max-width: 1220px;
  margin: 0 auto;
  padding: 30px 40px 48px;
  color: #344955;
}
.dynamic-charts h1 {
  margin: 0 0 20px;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
}
.dynamic-chart-directory h2 {
  margin: 32px 0 16px;
  font-size: 1.4rem;
  font-weight: 700;
}
.dynamic-chart-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.dynamic-chart-links a {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #d4e0e2;
  border-radius: 8px;
  background: #fff;
  color: #304e54 !important;
  text-decoration: none;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}
.dynamic-chart-links a:hover,
.dynamic-chart-links a:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(41, 43, 59, 0.12);
}
.dynamic-chart-links a[aria-current='page'] {
  font-weight: 700;
}
.dynamic-chart-links img {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 1;
  object-fit: cover;
}
.dynamic-chart-links span {
  padding: 16px 18px;
  font-size: 1.1rem;
}
.dynamic-chart-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}
.dynamic-chart-card {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform-origin: 0 0;
  transform: scale(var(--chart-scale, 1));
  background: #fff;
}
.dynamic-chart-card .abs {
  position: absolute;
  display: block;
}
.dynamic-chart-card img {
  max-width: none;
}
.dynamic-chart-retry {
  padding: 8px 16px;
  border: 1px solid #719896;
  border-radius: 5px;
}
.dynamic-charts h1.has-instruction {
  margin-bottom: 4px;
}
.dynamic-chart-instruction {
  margin: 0 0 20px;
  font-size: 14pt;
  color: #344955;
}
.dynamic-chart-source {
  margin-top: 4px;
  color: #52636d;
}
@media (max-width: 720px) {
  .dynamic-charts {
    padding: 20px 16px 32px;
  }
}
@media (max-width: 640px) {
  .dynamic-chart-links {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
