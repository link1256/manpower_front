/* eslint-disable import/named */
import {
  color,
  easeCubicInOut,
  easePolyOut,
  easeQuadInOut,
  format,
  geoMercator,
  geoPath,
  interpolateNumber,
  line,
  max,
  min,
  range,
  scaleLinear,
  select,
  timer
} from 'd3'
/* eslint-enable import/named */

const d3 = {
  color,
  easeCubicInOut,
  easePolyOut,
  easeQuadInOut,
  format,
  geoMercator,
  geoPath,
  interpolateNumber,
  line,
  max,
  min,
  range,
  scaleLinear,
  select,
  timer
}

const speeds = [
  { label: '1x', factor: 1 },
  { label: '2x', factor: 2 },
  { label: '0.5x', factor: 0.5 }
]

let nextChartId = 0

function el(tag, attrs = {}, html) {
  const node = document.createElement(tag)
  Object.entries(attrs).forEach(([name, value]) =>
    node.setAttribute(name, value)
  )
  if (html != null) node.innerHTML = html
  return node
}

function stage(width, height) {
  const root = el('div', {
    class: 'dynamic-chart-stage',
    style: 'aspect-ratio:' + width + '/' + height
  })
  const card = el('div', {
    class: 'dynamic-chart-card',
    style: 'width:' + width + 'px;height:' + height + 'px'
  })
  root.appendChild(card)
  let scale = 1
  let designWidth = width
  const resize = () => {
    scale = Math.min(1, root.clientWidth / designWidth) || 1
    card.style.setProperty('--chart-scale', scale)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(root)

  return {
    el: root,
    card,
    setSize(nextWidth, nextHeight) {
      designWidth = nextWidth
      card.style.width = nextWidth + 'px'
      card.style.height = nextHeight + 'px'
      root.style.aspectRatio = nextWidth + ' / ' + nextHeight
      resize()
    },
    toLocal(event) {
      const bounds = card.getBoundingClientRect()
      return [
        (event.clientX - bounds.left) / scale,
        (event.clientY - bounds.top) / scale
      ]
    },
    destroy() {
      observer.disconnect()
    }
  }
}

function timeline({ years, stepMs }, previous) {
  let index = Math.max(0, years.indexOf(previous?.year))
  let speedIndex = Math.max(0, speeds.indexOf(previous?.speed))
  let playing = years.length > 1 && (previous?.playing ?? true)
  let timer
  const subscribers = new Set()
  const state = () => ({
    year: years[index],
    playing,
    speed: speeds[speedIndex],
    stepMs: stepMs / speeds[speedIndex].factor
  })

  function emit(changedYear) {
    const current = state()
    subscribers.forEach((listener) => listener(current, changedYear))
  }

  function schedule() {
    clearInterval(timer)
    if (!playing) return
    timer = setInterval(() => {
      index = (index + 1) % years.length
      emit(true)
    }, state().stepMs)
  }

  schedule()

  return {
    state,
    toggle() {
      if (years.length < 2) return
      playing = !playing
      schedule()
      emit(false)
    },
    cycleSpeed() {
      speedIndex = (speedIndex + 1) % speeds.length
      schedule()
      emit(false)
    },
    subscribe(listener) {
      subscribers.add(listener)
      listener(state(), true)
    },
    destroy() {
      clearInterval(timer)
      subscribers.clear()
    }
  }
}

export function mountChart(mount, root, rows, boundaries, assets, responsive) {
  const viewport = responsive ? matchMedia('(max-width: 640px)') : null
  let disposeChart
  let controls

  function render() {
    const previous = controls?.state()
    const focusedControl = root.contains(document.activeElement)
      ? document.activeElement.dataset.act
      : null
    if (disposeChart) disposeChart()
    const cleanup = []
    disposeChart = () => {
      cleanup.reverse().forEach((fn) => fn())
      root.replaceChildren()
    }
    const context = {
      d3,
      id: 'dynamic-chart-' + ++nextChartId,
      assets,
      el,
      mobile: viewport?.matches ?? false,
      css(id, text) {
        const style = el('style', { 'data-dynamic-chart': id })
        style.textContent = text
        document.head.appendChild(style)
        cleanup.push(() => style.remove())
      },
      stage(width, height) {
        const chartStage = stage(width, height)
        cleanup.push(chartStage.destroy)
        return chartStage
      },
      timeline(options) {
        controls = timeline(options, previous)
        cleanup.push(controls.destroy)
        return controls
      }
    }
    try {
      const unmount = mount(root, context, rows, boundaries)
      if (unmount) cleanup.push(unmount)
      if (focusedControl) {
        const button = root.querySelector('[data-act="' + focusedControl + '"]')
        if (button) button.focus({ preventScroll: true })
      }
    } catch (error) {
      disposeChart()
      throw error
    }
  }

  render()
  if (viewport) viewport.addEventListener('change', render)
  return () => {
    if (viewport) viewport.removeEventListener('change', render)
    disposeChart()
  }
}
