// 歷年縣市別勞動參與率變化 — Figma Chart 42:13046 (main component 42:5616), 1140×914
export default function mount(root, ctx, rowsData, boundaries) {
  const d3 = ctx.d3
  const A = ctx.assets + 'county/'
  ctx.css(
    'county',
    `
      .cty .map-snapshot { position: absolute; left: 0; top: 0; width: 660px; height: 914px; pointer-events: none; display: none; }
      .cty.map-static:not(.map-key-active) .map-snapshot { display: block; }
      .cty.map-static:not(.map-key-active) .wall { display: none; }
      .cty.map-static:not(.map-key-active) .county { fill-opacity: 0; stroke-opacity: 0; pointer-events: fill; filter: none; }
      .cty.map-static:not(.map-key-active) .county:is(:hover, .active, :focus-visible) { stroke-opacity: 1; }
      .cty #map { position: absolute; left: 0; top: 0; width: 660px; height: 914px; overflow: visible; }
      .cty .county { stroke: #f7fbfb; stroke-width: .8; stroke-linejoin: round; cursor: pointer; transition: transform var(--county-rise-ms, 0ms) ease-in-out, fill .45s ease; outline: none; }
      .cty .county:hover, .cty .county.active { stroke: #fff; stroke-width: 2.4; filter: brightness(1.05); }
      .cty .county:focus-visible { stroke: #37474f; stroke-width: 2; }
      .cty .cg { transition: opacity .25s ease; }
      .cty .cg.dim { opacity: .28; }
      .cty .wall { stroke-width: 1.4; stroke-linejoin: round; pointer-events: none; fill: var(--county-wall-color); stroke: var(--county-wall-color); transition: transform var(--county-rise-ms, 0ms) ease-in-out; }
      .cty .labels { position: absolute; left: 0; top: 0; width: 660px; height: 914px; pointer-events: none; }
      .cty .chip { position: absolute; transform: translate(-50%, -50%); white-space: nowrap; font: 700 12px/16px var(--font); color: #37474f; transition: transform var(--county-rise-ms, 0ms) ease-in-out;
        background: rgba(255,255,255,.88); border: 1px solid rgba(55,71,79,.22); border-radius: 2px; padding: 0 3px; box-shadow: 0 1px 1px rgba(0,0,0,.12); }
      .cty .legend { position: absolute; left: 661px; top: 36px; width: 46px; height: 395px; display: flex; flex-direction: column; gap: 8px; }
      .cty .legend .ttl { display: flex; justify-content: flex-end; height: 21px; font-size: 16px; font-weight: 700; color: #62748e; white-space: nowrap; }
      .cty .legend .body { flex: 1; display: flex; gap: 4px; }
      .cty .legend .bars { width: 16px; display: flex; flex-direction: column; }
      .cty .legend .bars button { flex: 1; border: 0; padding: 0; margin: 0; cursor: pointer; transition: transform .15s ease; }
      .cty .legend .bars button:hover, .cty .legend .bars button:focus-visible { transform: scaleX(1.5); outline: none; }
      .cty .legend .ticks { flex: 1; display: flex; flex-direction: column; justify-content: space-between; font-size: 16px; font-weight: 700; color: #62748e; text-align: center; font-variant-numeric: tabular-nums; }
      .cty .tip { position: absolute; z-index: 5; min-width: 163px; padding: 12px; border-radius: 8px; background: #fff; display: flex; flex-direction: column; gap: 4px;
        pointer-events: none; filter: drop-shadow(0 8px 8px rgba(0,0,0,.24)); font-size: 12px; line-height: 16px; color: #37474f; white-space: nowrap; opacity: 0; transition: opacity .12s ease; }
      .cty .tip.on { opacity: 1; }
      .cty .tip .rank { color: #62748e; font-variant-numeric: tabular-nums; }
      .cty .tip .up { color: #3f8f6a; } .cty .tip .down { color: #c0603f; }
      .cty .tip .arrow { position: absolute; left: -9px; top: 35px; width: 14px; height: 14px; transform: rotate(-90deg); }
      .cty .tip .arrow img { position: absolute; left: 11.92%; top: 7.14%; width: 76.16%; height: 67.86%; }
      .cty .book { position: absolute; padding: 0; margin: 0; border: 0; background: none; cursor: pointer; transition: transform .18s ease; }
      .cty .book:hover, .cty .book:focus-visible { transform: translateY(-6px); outline: none; }
      .cty .book:focus-visible::after { content: ""; position: absolute; inset: -3px; border: 2px solid #37474f; border-radius: 3px; }
      .cty .book img, .cty .book svg { position: absolute; display: block; }
      .cty .speed-txt { position: absolute; left: 13.877px; width: 98.668px; top: 47px; text-align: center; font: 900 36px/43px var(--font-black); color: #fff; }
      .cty .year-label { position: absolute; left: 23px; top: 15px; font-size: 20px; font-weight: 700; color: #6c6e6e; line-height: 27px; }
      .cty .year-num { position: absolute; left: 23px; top: 39px; height: 59px; display: flex; align-items: baseline; color: #6c6e6e; font-weight: 700; white-space: nowrap; }
      .cty .year-num .n { display: inline-block; font-size: 44px; font-variant-numeric: tabular-nums; }
      .cty .year-num .u { font-size: 20px; margin-left: 6px; }
      /* right-side ambient motion while playing (client 2026-11-16) */
      .cty .amb-bag { transform-origin: 50% 18%; }
      .cty .amb-mon { transform-origin: 50% 60%; }
      .cty.playing .amb-woman { animation: cty-bob 2.4s ease-in-out infinite; }
      .cty.playing .amb-bag { animation: cty-swing 2.8s ease-in-out infinite; }
      .cty.playing .amb-mon { animation: cty-blink 3.2s ease-in-out infinite; }
      @keyframes cty-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
      @keyframes cty-swing { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
      @keyframes cty-blink { 0%, 78%, 100% { transform: scale(1); filter: none; } 86% { transform: scale(1.08); filter: brightness(1.15); } }
    `
  )

  const byYear = new Map()
  for (const row of rowsData) {
    if (!byYear.has(row.year))
      byYear.set(row.year, { version: row.version, rows: new Map() })
    const period = byYear.get(row.year)
    period.rows.set(row.code, { value: row.value, rank: period.rows.size + 1 })
  }
  const YEARS = [...byYear.keys()].sort((a, b) => a - b)
  const BINS = [52, 54, 56, 58]
  const BIN_COLORS = ['#e8f3f0', '#cde3e1', '#b1cdd3', '#90b5be', '#6d97a5']
  const binOf = (value) => BINS.filter((bin) => value >= bin).length

  // ---------- stage ----------
  const S = ctx.stage(1140, 914)
  const card = S.card
  card.classList.add('cty')
  card.innerHTML = `
      <div class="abs" style="left:0;bottom:0;width:1140px;height:350px;overflow:hidden"><img class="abs" src="${A}bg.png" alt="" style="left:0;top:2.14%;width:100%;height:97.86%"></div>
      <canvas class="map-snapshot" aria-hidden="true"></canvas>
      <svg id="map" viewBox="0 0 660 914" aria-label="各縣市勞動力參與率地圖"></svg>
      <div class="labels"></div>
      <div class="legend" aria-label="圖例">
        <div class="ttl">勞動力參與率 (%)</div>
        <div class="body"><div class="bars"></div><div class="ticks"><span>50</span><span>52</span><span>54</span><span>56</span><span>58</span><span>60</span></div></div>
      </div>
      <div class="tip" role="status" aria-live="polite"><b class="t1"></b><span class="t2"></span><span class="rank"></span><span class="arrow"><img src="${A}tooltip-arrow.svg" alt=""></span></div>
      <div class="abs" style="left:925px;top:302px;width:175px;height:175px">
        <div class="abs" style="left:0;top:0;width:175px;height:175px;border-radius:87.5px;background:#c5e1ef"></div>
        <div class="abs amb-bag" style="left:21px;top:29px;width:132.476px;height:115.744px;display:flex;align-items:center;justify-content:center">
          <img src="${A}briefcase.svg" alt="" style="width:121.216px;height:102.077px;transform:rotate(6.82deg)"></div>
      </div>
      <img class="abs" src="${A}shelf-v0.svg" alt="" style="left:724px;top:595px;width:155.316px;height:210px">
      <img class="abs" src="${A}shelf-v1.svg" alt="" style="left:733.758px;top:627.02px;width:145.558px;height:177.98px">
      <img class="abs" src="${A}shelf-v2.svg" alt="" style="left:745.491px;top:612.981px;width:144.435px;height:192.019px">
      <div class="abs yc" style="left:760px;top:487px;width:141.439px;height:203.251px">
        <img class="abs" src="${A}shelf-yearcard.svg" alt="" style="left:0;top:0;width:141.439px;height:203.251px">
        <div class="year-label">民國</div>
        <div class="year-num" aria-hidden="true"><span class="n">95</span><span class="u">年</span></div>
      </div>
      <img class="abs" src="${A}shelf-v4.svg" alt="" style="left:780px;top:602px;width:134px;height:203px">
      <img class="abs" src="${A}shelf-v5.svg" alt="" style="left:780.023px;top:595px;width:155.316px;height:210px">
      <img class="abs" src="${A}shelf-v6.svg" alt="" style="left:724px;top:740.275px;width:56.023px;height:64.717px">
      <img class="abs" src="${A}shelf-g0.svg" alt="" style="left:799.126px;top:632.847px;width:117.179px;height:153.977px">
      <img class="abs" src="${A}shelf-g1.svg" alt="" style="left:857.681px;top:669.198px;width:112.545px;height:135.802px">
      <button class="book" data-act="play" type="button" aria-label="播放" style="left:892.568px;top:669.198px;width:112.553px;height:135.802px">
        <img src="${A}shelf-g2.svg" alt="" style="left:0;top:0;width:112.553px;height:135.802px">
        <img class="play" src="${A}play.svg" alt="" style="left:54.432px;top:55.802px;width:25px;height:30px">
        <svg class="pause" viewBox="0 0 25 30" style="left:54.432px;top:55.802px;width:25px;height:30px" hidden><rect x="1" width="8" height="30" rx="2" fill="#fff"/><rect x="16" width="8" height="30" rx="2" fill="#fff"/></svg>
      </button>
      <button class="book" data-act="speed" type="button" aria-label="播放速度 1x" style="left:1005px;top:669px;width:112.545px;height:135.802px">
        <img src="${A}speed-v7.svg" alt="" style="left:13.877px;top:0;width:98.668px;height:135.802px">
        <img src="${A}speed-v8.svg" alt="" style="left:0;top:0;width:13.877px;height:135.802px">
        <img src="${A}speed-v9.svg" alt="" style="left:2.296px;top:3.349px;width:9.285px;height:9.227px">
        <span class="speed-txt">1x</span>
      </button>
      <div class="abs" style="left:697px;top:805px;width:443px;height:28px;background:#e2e5d9"></div>
      <div class="abs" style="left:723px;top:833px;width:232px;height:81px;background:#cbcec2"></div>
      <div class="abs" style="left:955px;top:833px;width:185px;height:81px;background:#9ca28b"></div>
      <div class="abs" style="left:724px;top:879px;width:231px;height:5px;background:#abaf9e"></div>
      <img class="abs" src="${A}knob.svg" alt="" style="left:833px;top:852px;width:13px;height:13px">
      <div class="abs" style="left:782px;top:140px;width:175px;height:175px;border-radius:999px;overflow:hidden">
        <div class="abs" style="left:0;top:0;width:175px;height:175px;background:#faecd2"></div>
        <img class="abs amb-woman" src="${A}woman.svg" alt="" style="left:29px;top:7px;width:106px;height:267px"></div>
      <div class="abs" style="left:968px;top:44px;width:116px;height:117px;border-radius:999px;overflow:hidden;background:#f2d0d9">
        <img class="abs amb-mon" src="${A}monitor.svg" alt="" style="left:18.4px;top:28.747px;width:79.207px;height:67.718px"></div>`
  const q = (s) => card.querySelector(s)
  const tip = q('.tip')

  // The API supplies RFC 7946 rings. D3's spherical projection uses the reverse orientation.
  const geometries = {}
  for (const [version, collection] of Object.entries(boundaries)) {
    geometries[version] = collection.features.map((feature) => ({
      ...feature,
      code: feature.properties.code,
      name: feature.properties.name,
      geometry: {
        ...feature.geometry,
        coordinates: feature.geometry.coordinates.map((polygon) =>
          polygon.map((ring) => ring.slice().reverse())
        )
      }
    }))
  }
  const snapshot = q('.map-snapshot')
  const snapshotContext =
    typeof Path2D === 'function' ? snapshot.getContext('2d') : null
  if (snapshotContext) {
    const density = Math.min(window.devicePixelRatio || 1, 2)
    snapshot.width = Math.round(660 * density)
    snapshot.height = Math.round(914 * density)
    snapshotContext.scale(snapshot.width / 660, snapshot.height / 914)
    snapshotContext.lineJoin = 'round'
  }
  const svg = d3.select(q('#map'))
  const labels = d3.select(q('.labels'))
  const allFeatures = Object.values(geometries).flat()
  const proj = d3.geoMercator().fitExtent(
    [
      [48, 66],
      [600, 840]
    ],
    {
      type: 'FeatureCollection',
      features: allFeatures
    }
  )
  const path = d3.geoPath(proj)
  const LAYERS = 12
  const H_MIN = 3
  const H_MAX = 26
  const instance = ctx.id
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const labelOffsets = {
    1: {
      '1': [32, 12],
      '16': [-30, 0],
      '17': [17, -12],
      '18': [-25, -7],
      '19': [-30, 7],
      '20': [-24, -10],
      '21': [-34, 10],
      '22': [-13, 2],
      '23': [-28, 10]
    },
    2: {
      '16': [-30, 0],
      '17': [18, -11],
      '18': [-25, -7],
      '20': [-25, -7],
      '63': [-13, 2]
    }
  }
  let features = []
  let groups
  let tops
  let activeVersion
  let year = YEARS[0]

  function buildMap(version) {
    svg.selectAll('*').remove()
    labels.selectAll('*').remove()

    features = geometries[version]
    const defs = svg.append('defs')
    features.forEach((f) => {
      f.pid = instance + '-' + version + '-' + f.code
      if (!f.shape) {
        f.shape = path(f)
        const centroid = path.centroid(f)
        const nudge = labelOffsets[version][f.code] || [0, 0]
        f.cy = centroid[1]
        f.anchor = [centroid[0] + nudge[0], centroid[1] + nudge[1]]
      }
      defs
        .append('path')
        .attr('id', f.pid)
        .attr('d', f.shape)
      f.chip = labels
        .append('span')
        .attr('class', 'chip')
        .style('left', f.anchor[0] + 'px')
        .style('top', f.anchor[1] + 'px')
        .text(f.name)
    })
    groups = svg
      .selectAll('g.cg')
      .data(features, (f) => f.code)
      .join('g')
      .attr('class', 'cg')
    groups.each(function(f) {
      const group = d3.select(this)
      for (let j = 0; j < LAYERS; j++)
        group
          .append('use')
          .attr('class', 'wall')
          .attr('href', '#' + f.pid)
      group
        .append('path')
        .attr('class', 'county')
        .attr('d', f.shape)
    })
    tops = groups
      .select('path.county')
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (f) => f.name)
    tops
      .on('pointermove', (ev, f) => showTip(f, ...S.toLocal(ev)))
      .on('pointerleave', hideTip)
      .on('focus', (ev, f) => showTip(f, f.anchor[0] + 10, f.anchor[1] - f.h))
      .on('blur', hideTip)
    activeVersion = version
  }

  // Cache the settled map as one surface. SVG paths still handle focus and hit testing.
  function drawSnapshot() {
    if (!snapshotContext) return
    snapshotContext.clearRect(0, 0, 660, 914)
    groups.each((feature) => {
      if (!feature.snapshotPath)
        feature.snapshotPath = new Path2D(feature.shape)
      const shape = feature.snapshotPath
      snapshotContext.save()
      snapshotContext.fillStyle = feature.wall
      snapshotContext.strokeStyle = feature.wall
      snapshotContext.lineWidth = 1.4
      const rise = -feature.h / (LAYERS - 1)
      for (let layer = 0; layer < LAYERS; layer++) {
        if (layer > 0) snapshotContext.translate(0, rise)
        snapshotContext.fill(shape)
        snapshotContext.stroke(shape)
      }
      snapshotContext.fillStyle = feature.fill
      snapshotContext.strokeStyle = '#f7fbfb'
      snapshotContext.lineWidth = 0.8
      snapshotContext.fill(shape)
      snapshotContext.stroke(shape)
      snapshotContext.restore()
    })
    card.classList.add('map-static')
  }

  function paint(y, duration) {
    card.classList.remove('map-static')
    const period = byYear.get(y)
    const switchVersion = activeVersion !== period.version
    const fade =
      activeVersion != null && switchVersion && !reduce && duration > 0
    card.style.setProperty(
      '--county-rise-ms',
      (switchVersion || reduce ? 0 : duration) + 'ms'
    )
    if (switchVersion) buildMap(period.version)

    const count = period.rows.size
    features.forEach((f) => {
      const stats = period.rows.get(f.code)
      f.h = stats
        ? H_MIN +
          ((count - stats.rank) / Math.max(1, count - 1)) * (H_MAX - H_MIN)
        : H_MIN
      f.fill = stats ? BIN_COLORS[binOf(stats.value)] : '#e1e4e5'
      f.wall = d3
        .color(f.fill)
        .darker(1.5)
        .formatHex()
    })
    groups = groups.sort((a, b) => a.h - b.h || a.cy - b.cy)
    tops
      .style('fill', (f) => f.fill)
      .style('transform', (f) => 'translateY(' + -f.h + 'px)')
    groups.style('--county-wall-color', (f) => f.wall)
    groups.each(function(f) {
      d3.select(this)
        .selectAll('use.wall')
        .style(
          'transform',
          (_, j) =>
            'translateY(' + ((-f.h * j) / (LAYERS - 1)).toFixed(2) + 'px)'
        )
      f.chip.style(
        'transform',
        'translate(-50%, -50%) translateY(' + -f.h + 'px)'
      )
    })

    if (fade) {
      svg.node().animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 280 })
      labels
        .node()
        .animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 280 })
    }
  }

  const tl = ctx.timeline({ years: YEARS, stepMs: 3200 })
  root.appendChild(S.el)

  const ranges = [
    '低於 52%',
    '52% 至未滿 54%',
    '54% 至未滿 56%',
    '56% 至未滿 58%',
    '58% 以上'
  ]
  const bars = d3.select(q('.bars'))
  BIN_COLORS.forEach((color, i) => {
    bars
      .append('button')
      .attr('type', 'button')
      .style('background', color)
      .attr('aria-label', '標示 ' + ranges[i] + ' 的縣市')
      .on('mouseenter focus', () => {
        card.classList.add('map-key-active')
        groups.classed('dim', (f) => {
          const stats = byYear.get(year).rows.get(f.code)
          return !stats || binOf(stats.value) !== i
        })
      })
      .on('mouseleave blur', () => {
        groups.classed('dim', false)
        card.classList.remove('map-key-active')
      })
  })

  function showTip(f, x, y) {
    if (activeVersion !== byYear.get(year).version) return
    tops.classed('active', (county) => county === f)
    const period = byYear.get(year)
    const stats = period.rows.get(f.code)
    const prior = byYear.get(year - 1)
    const priorStats =
      prior && prior.version === period.version ? prior.rows.get(f.code) : null
    q('.t1').textContent = '民國' + year + '年 勞動力參與率'
    q('.t2').textContent =
      f.name + '：' + (stats ? stats.value.toFixed(2) + '%' : '無資料')
    const rank = q('.rank')
    rank.textContent = stats
      ? '排名 第 ' + stats.rank + ' / ' + period.rows.size + ' 名'
      : ''
    if (priorStats && stats) {
      const diff = priorStats.rank - stats.rank
      const delta = document.createElement('span')
      delta.className = diff > 0 ? 'up' : diff < 0 ? 'down' : ''
      delta.textContent =
        diff > 0 ? ' ▲' + diff : diff < 0 ? ' ▼' + -diff : ' —'
      rank.appendChild(delta)
    }
    tip.style.left = Math.min(x + 16, 1140 - tip.offsetWidth - 8) + 'px'
    tip.style.top = Math.max(8, y - 42) + 'px'
    tip.classList.add('on')
  }
  function hideTip() {
    if (tops) tops.classed('active', false)
    tip.classList.remove('on')
  }

  q('[data-act=play]').addEventListener('click', () => tl.toggle())
  q('[data-act=speed]').addEventListener('click', () => tl.cycleSpeed())

  let first = true
  let yearTimer
  const yc = q('.yc')
  const yNum = q('.year-num .n')
  function showYear(y, stepMs) {
    clearTimeout(yearTimer)
    yc.getAnimations().forEach((a) => a.cancel())
    if (first || reduce) {
      yNum.textContent = y
      paint(y, 0)
      return
    }
    const cardMs = Math.min(550, 0.22 * stepMs)
    const riseMs = Math.min(850, 0.32 * stepMs)
    yc.animate(
      [
        { transform: 'translateY(0)', easing: 'cubic-bezier(.5,0,.9,.6)' },
        {
          transform: 'translateY(118px)',
          offset: 0.45,
          easing: 'cubic-bezier(.2,.9,.3,1.25)'
        },
        { transform: 'translateY(0)' }
      ],
      { duration: cardMs }
    )
    // Update the map while the year card is still rising.
    yearTimer = setTimeout(() => {
      yNum.textContent = y
      paint(y, riseMs)
    }, cardMs * 0.45)
  }
  let wasPlaying = false
  tl.subscribe((s, changedYear) => {
    year = s.year
    card.classList.toggle('playing', s.playing)
    if (changedYear) {
      hideTip()
      showYear(year, s.stepMs || 3200)
      if (!s.playing) drawSnapshot()
    } else if (wasPlaying && !s.playing) {
      clearTimeout(yearTimer)
      card
        .getAnimations({ subtree: true })
        .forEach((animation) => animation.cancel())
      if (String(year) !== yNum.textContent) {
        yNum.textContent = year
        paint(year, 0)
      }
      drawSnapshot()
    }
    wasPlaying = s.playing
    q('.book .play').toggleAttribute('hidden', s.playing)
    q('.book .pause').toggleAttribute('hidden', !s.playing)
    q('[data-act=play]').setAttribute('aria-label', s.playing ? '暫停' : '播放')
    q('.speed-txt').textContent = s.speed.label
    first = false
    q('[data-act=speed]').setAttribute(
      'aria-label',
      `播放速度 ${s.speed.label}`
    )
  })
  return () => {
    clearTimeout(yearTimer)
    card
      .getAnimations({ subtree: true })
      .forEach((animation) => animation.cancel())
  }
}
