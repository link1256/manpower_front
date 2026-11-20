// 歷年失業原因變化 — Figma Chart 42:12120 (main component 42:5036), 1140×694
export default function mount(root, ctx, rowsData) {
  const d3 = ctx.d3
  const A = ctx.assets + 'unemployment/'
  ctx.css(
    'unemployment',
    `
      .unem svg.plot { position: absolute; left: 0; top: 0; width: 1140px; height: 694px; overflow: visible; pointer-events: none; }
      .unem svg.plot text { font-family: var(--font); font-size: 12px; font-weight: 700; }
      .unem .ylab { fill: #314158; text-anchor: end; dominant-baseline: middle; }
      .unem .xlab { fill: #62748e; text-anchor: middle; }
      .unem .grid line { stroke: #bcd4db; stroke-width: 1; }
      .unem .band { fill: rgba(164,164,164,.15); }
      .unem .series path { fill: none; stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }
      .unem .end text { dominant-baseline: middle; }
      .unem .guide { stroke: #62748e; stroke-width: 1; stroke-dasharray: 3 3; }
      .unem .unit { position: absolute; left: 48px; top: 70px; font: 700 12px/16px var(--font-black); color: #62748e; white-space: nowrap; }
      .unem .legend { position: absolute; left: 133px; top: 45px; width: 785px; height: 16px; display: flex; justify-content: center; align-items: center; gap: 4px;
        font: 700 12px/16px var(--font); color: #62748e; white-space: nowrap; }
      .unem .legend i { width: 12px; height: 12px; border-radius: 2px; background: #d9d9d9; }
      .unem .xunit { position: absolute; right: calc(1140px - 930px); top: 508px; font: 700 12px/16px var(--font); color: #62748e; }
      .unem .pin { position: absolute; top: 66px; padding: 4px 6px; border-radius: 999px; background: #f35380; color: #fff; font: 700 12px/16px var(--font); white-space: nowrap; pointer-events: none; }
      .unem .hit { position: absolute; left: 127px; top: 86px; width: 797px; height: 400px; cursor: crosshair; outline: none; border-radius: 4px; }
      .unem .hit:focus-visible { box-shadow: inset 0 0 0 2px #379bb9; }
      .unem .tip { position: absolute; z-index: 5; padding: 12px; border-radius: 8px; background: #fff; display: flex; flex-direction: column; gap: 4px; pointer-events: none;
        filter: drop-shadow(0 8px 8px rgba(0,0,0,.32)); font: 400 12px/16px var(--font); color: #37474f; white-space: nowrap; opacity: 0; transition: opacity .12s ease; }
      .unem .tip.on { opacity: 1; }
      .unem .tip .tip-date { font-weight: 700; line-height: 18px; margin-bottom: 4px; }
      .unem .tip .tip-detail { display: flex; align-items: center; gap: 4px; font-variant-numeric: tabular-nums; }
      .unem .tip .tip-detail img { width: 12px; height: 12px; display: block; }
      .unem .tv { position: absolute; left: 407px; top: 536px; width: 326px; height: 142px; border-radius: 4px; background: #dadada; overflow: hidden; }
      .unem .tv .scr { position: absolute; left: 6px; top: 6px; width: 314px; height: 120px; border-radius: 2px; background: #616161; overflow: hidden; }
      .unem .tv .scr i { position: absolute; inset: 13px 14px 12px 14px; border-radius: 2px; background: #505050; }
      .unem .tv-yr { position: absolute; left: 50%; top: 28px; transform: translateX(-50%); color: #fff; font-weight: 700; white-space: nowrap; }
      .unem .tv-yr .l1 { font-size: 20px; line-height: 26px; }
      .unem .tv-yr .l2 { height: 48px; line-height: 48px; display: flex; align-items: baseline; }
      .unem .tv-yr .n { display: inline-block; font-size: 48px; font-variant-numeric: tabular-nums; }
      .unem .tv-yr .u { font-size: 20px; margin-left: 5px; }
      .unem .tv .ecg { position: absolute; left: 14px; top: 13px; width: 286px; height: 95px; overflow: visible; }
      .unem .tv .ecg path { fill: none; stroke: #c9f5ef; stroke-width: 2.2; stroke-linejoin: round; stroke-linecap: round; filter: drop-shadow(0 0 3px rgba(140,235,222,.85)); }
      .unem .key { position: absolute; left: 336px; width: 54px; height: 54px; padding: 0; margin: 0; border: 0; background: none; cursor: pointer; border-radius: 8px; transition: transform .12s ease; }
      .unem .key:hover { transform: translateY(-2px); }
      .unem .key:active { transform: translateY(2px); }
      .unem .key:focus-visible { outline: 2px solid #37474f; outline-offset: 2px; }
      .unem .key > * { position: absolute; display: block; }
      .unem .key .pz { left: 14px; top: 10px; width: 26px; height: 28px; background: #737373; }
      .unem .key .pz::before, .unem .key .pz::after { content: ""; position: absolute; top: 3px; width: 7px; height: 22px; border-radius: 1.5px; background: #fff; }
      .unem .key .pz::before { left: 4px; } .unem .key .pz::after { right: 4px; }
      .unem .key .spd { left: 10.6px; top: 8.16px; width: 33.6px; height: 32.6px; display: flex; align-items: center; justify-content: center;
        font: 900 26.59px/1 var(--font-black); color: #fff; letter-spacing: -.5px; }
      .unem .key .spd.sm { font-size: 18px; }
    `
  )

  const Y0 = d3.min(rowsData, (row) => row.year)
  const Y1 = d3.max(rowsData, (row) => row.year)
  const endMonth = d3.max(
    rowsData.filter((row) => row.year === Y1),
    (row) => row.month
  )
  const SERIES = [
    {
      key: 'first',
      name: '初次尋職',
      line: '#7FA6D8',
      text: '#6280a7',
      dot: 'dot1.svg'
    },
    {
      key: 'closure',
      name: '工作場所業務緊縮或歇業',
      line: '#E8B46C',
      text: '#a68961',
      dot: 'dot2.svg'
    },
    {
      key: 'unsat',
      name: '對原有工作不滿意',
      line: '#86C1A0',
      text: '#669183',
      dot: 'dot3.svg'
    },
    {
      key: 'other',
      name: '其他',
      line: '#A99AD4',
      text: '#7d78a5',
      dot: 'dot4.svg'
    }
  ]
  const MONTHS = d3.range((Y1 - Y0) * 12 + endMonth).map((i) => ({
    i,
    Y: Y0 + Math.floor(i / 12),
    m: (i % 12) + 1,
    t: Y0 + i / 12
  }))
  const byName = new Map(SERIES.map((series) => [series.name, series]))
  SERIES.forEach((series) => {
    series.v = []
  })
  for (const row of rowsData) {
    const series = byName.get(row.name)
    if (series) series.v[(row.year - Y0) * 12 + row.month - 1] = row.value
  }

  const EVENTS = [
    { t: 90, name: '網路泡沫' },
    { t: 98, name: '金融海嘯' },
    { t: 109, name: 'COVID-19疫情' }
  ]
  // blocks of 10 years; the x scale spans Jan y … Dec y+9 so consecutive blocks have no gap
  const YEARS = d3.range(Y0, Y1 + 1, 10)
  const SPAN = 9 + 11 / 12
  // the last block only has data to 114/12: shrink its axis so it ends on 115 at the right edge (client 2026-11-16)
  const isLast = (c) => c + 9 > Y1
  const spanOf = (c) => (isLast(c) ? Y1 + 1 - c : SPAN)
  const endYear = (c) => Math.min(c + 9, Y1)

  // ---------- geometry (card coordinates from Figma) ----------
  const X0 = 133
  const X1 = 918
  const YT = 96
  const YB = 478
  const LABEL_X = 936
  const maxValue = Math.max(
    50,
    Math.ceil(d3.max(rowsData, (row) => row.value) / 50) * 50
  )
  const y = d3.scaleLinear([0, maxValue], [YB, YT])
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---------- stage ----------
  const S = ctx.stage(1140, 694)
  const card = S.card
  card.classList.add('unem')
  card.innerHTML = `
      <div class="abs" style="left:0;top:542px;width:1140px;height:334px;overflow:hidden"><img class="abs" src="${A}bg.png" alt="" style="left:0;top:2.14%;width:100%;height:97.86%"></div>
      <svg class="plot" viewBox="0 0 1140 694" aria-hidden="true">
        <defs><clipPath id="unem-clip"><rect x="${X0}" y="0" width="${X1 -
    X0}" height="694"></rect></clipPath>
          <clipPath id="unem-clip-l"><rect class="reveal" x="${X0 -
            2}" y="0" width="${X1 -
    X0 +
    4}" height="694"></rect></clipPath></defs>
        <g class="bands" clip-path="url(#unem-clip)"></g>
        <g class="grid"></g>
        <g class="ylabs"></g>
        <g class="xticks"></g>
        <g class="evlines"></g>
        <g class="series" clip-path="url(#unem-clip-l)"></g>
        <line class="guide" y1="${YT}" y2="${YB}" visibility="hidden"></line>
        <g class="end"></g>
        <g class="hdots" visibility="hidden"></g>
      </svg>
      <div class="unit">單位：千人</div>
      <div class="legend"><i></i>畢業季(每年5~9月)</div>
      <div class="xunit">民國</div>
      <div class="pins"></div>
      <div class="hit" tabindex="0" role="img" aria-label="歷年失業原因折線圖，聚焦後可用左右方向鍵逐月查看數值"></div>
      <div class="tip" role="status" aria-live="polite"></div>
      <div class="abs" style="left:542px;top:678px;width:56px;height:16px;background:#a9a9a9"></div>
      <div class="abs" style="left:547px;top:684px;width:5px;height:5px;border-radius:99px;background:#a4daa2"></div>
      <div class="tv">
        <div class="scr"><i></i><svg class="ecg" viewBox="0 0 286 95" aria-hidden="true"><defs><clipPath id="unem-ecg-clip"><rect class="sweep" x="0" y="-10" width="0" height="115"></rect></clipPath></defs><path clip-path="url(#unem-ecg-clip)" d="M0 58H72Q80 44 88 58H102L106 64L112 6L119 82L124 58H152Q162 40 172 58H286"></path></svg><img class="abs" src="${A}tv-lights.svg" alt="" style="right:2px;top:67px;width:10px;height:36px"></div>
        <div class="tv-yr" aria-hidden="true"><div class="l1">民國</div><div class="l2"><span class="n">91~100</span><span class="u">年</span></div></div>
      </div>
      <div class="abs" style="left:399px;top:571px;width:8px;height:11px;background:#a9a9a9;border-radius:1px 0 0 1px"></div>
      <div class="abs" style="left:397px;top:573px;width:2px;height:7px;background:#a9a9a9;border-radius:1px 0 0 1px"></div>
      <div class="abs" style="left:390px;top:575px;width:7px;height:3px;background:#a9a9a9"></div>
      <div class="abs" style="left:399px;top:633px;width:8px;height:11px;background:#a9a9a9;border-radius:1px 0 0 1px"></div>
      <div class="abs" style="left:397px;top:635px;width:2px;height:7px;background:#a9a9a9;border-radius:1px 0 0 1px"></div>
      <div class="abs" style="left:390px;top:637px;width:7px;height:3px;background:#a9a9a9"></div>
      <button class="key" data-act="play" type="button" aria-label="播放" style="top:549px">
        <img src="${A}play.svg" alt="" style="left:0;top:0;width:54px;height:54px">
        <span class="pz" hidden></span>
      </button>
      <button class="key" data-act="speed" type="button" aria-label="播放速度 1x" style="top:612px">
        <img src="${A}speed.svg" alt="" style="left:0;top:0;width:53.8879px;height:53.8064px">
        <span class="spd">1x</span>
      </button>
      <img class="abs" src="${A}man.svg" alt="" style="left:-19px;top:526px;width:228.2px;height:218.4px">
      <img class="abs" src="${A}woman.svg" alt="" style="left:986px;top:491px;width:113.1px;height:286px">`
  const q = (s) => card.querySelector(s)
  const svg = d3.select(q('svg.plot'))
  const tip = q('.tip')
  const hit = q('.hit')

  // static: grid + y labels
  const yTicks = d3.range(0, maxValue + 1, 50)
  svg
    .select('.grid')
    .selectAll('line')
    .data(yTicks)
    .join('line')
    .attr('x1', X0)
    .attr('x2', X1)
    .attr('y1', (d) => y(d) + 0.5)
    .attr('y2', (d) => y(d) + 0.5)
  svg
    .select('.ylabs')
    .selectAll('text')
    .data(yTicks)
    .join('text')
    .attr('class', 'ylab')
    .attr('x', 108)
    .attr('y', (d) => y(d))
    .text((d) => d)

  const seriesPaths = svg
    .select('.series')
    .selectAll('path')
    .data(SERIES)
    .join('path')
    .attr('stroke', (d) => d.line)
  const endG = svg
    .select('.end')
    .selectAll('g')
    .data(SERIES)
    .join('g')
  endG
    .append('circle')
    .attr('r', 6)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('fill', (d) => d.line)
    .attr('cx', X1)
  endG
    .append('text')
    .attr('x', LABEL_X)
    .attr('fill', (d) => d.text)
  const hdots = svg
    .select('.hdots')
    .selectAll('circle')
    .data(SERIES)
    .join('circle')
    .attr('r', 5)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('fill', (d) => d.line)
  const guide = svg.select('.guide')

  // ---------- render the current block ----------
  // cur = block start year; reveal 0..1 = how far the lines are drawn in (left → right)
  let cur = YEARS[0]
  let hov = null
  let busy = false // hov = {px, py} (pointer) or {idx} (keyboard)
  const V = { reveal: 1, lineOp: 1, axisOp: 1, endOp: 1 }
  const xOf = (t) => X0 + ((t - cur) * (X1 - X0)) / spanOf(cur)
  const lineGen = d3
    .line()
    .defined((d) => Number.isFinite(d.y))
    .x((d) => xOf(d.t))
    .y((d) => d.y)
  const revealRect = q('rect.reveal')

  let renderedYear
  function renderPlot() {
    if (renderedYear === cur) return
    renderedYear = cur
    const yrs = isLast(cur) ? d3.range(cur, Y1 + 2) : d3.range(cur, cur + 10)
    // graduation-season bands: May → Sep (only for years that have data)
    svg
      .select('.bands')
      .selectAll('rect')
      .data(yrs.filter((Y) => Y <= Y1))
      .join('rect')
      .attr('class', 'band')
      .attr('y', YT)
      .attr('height', YB - YT)
      .attr('x', (d) => xOf(d + 4 / 12))
      .attr('width', (((X1 - X0) / spanOf(cur)) * 4) / 12)
    // x ticks: 10 per block; the last block runs to 115 at the right edge
    svg
      .select('.xticks')
      .selectAll('g')
      .data(yrs)
      .join((en) => {
        const g = en.append('g')
        g.append('line')
          .attr('y1', YB + 0.5)
          .attr('y2', YB + 11)
          .attr('stroke', '#62748e')
        g.append('text')
          .attr('class', 'xlab')
          .attr('y', YB + 11 + 13)
        return g
      })
      .attr('transform', (d) => `translate(${Math.round(xOf(d)) + 0.5},0)`)
      .select('text')
      .text((d) => d)
    // series
    const [i0, i1] = winIdx()
    seriesPaths.attr('d', (s) =>
      lineGen(
        d3.range(i0, i1 + 1).map((i) => ({ t: MONTHS[i].t, y: y(s.v[i]) }))
      )
    )
    // end points + labels at the block's last data month (dodged)
    const ends = SERIES.map((s) => {
      let idx = i1
      while (idx >= i0 && !Number.isFinite(s.v[idx])) idx--
      if (idx < i0) return null
      const v = s.v[idx]
      return { cx: xOf(MONTHS[idx].t), v, cy: y(v), ly: y(v) }
    })
    const sorted = ends.filter(Boolean).sort((a, b) => a.cy - b.cy)
    for (let k = 1; k < sorted.length; k++)
      sorted[k].ly = Math.max(sorted[k].ly, sorted[k - 1].ly + 16)
    for (let k = sorted.length - 1; k >= 0; k--) {
      const max = k === sorted.length - 1 ? YB + 6 : sorted[k + 1].ly - 16
      sorted[k].ly = Math.min(sorted[k].ly, max)
    }
    endG.each(function(s, k) {
      const e = ends[k]
      const g = d3.select(this)
      g.attr('visibility', e ? null : 'hidden')
      if (!e) return
      g.select('circle')
        .attr('cx', e.cx)
        .attr('cy', e.cy)
      g.select('text')
        .attr('x', Math.min(X1, e.cx) + LABEL_X - X1)
        .attr('y', e.ly)
        .text(s.name + ' ' + e.v)
    })
    pins.each(function(d) {
      const px = xOf(d.t)
      const width = d.pinWidth || (d.pinWidth = this.offsetWidth || 60)
      this.style.left =
        Math.min(1132 - width, Math.max(8, px - width / 2)) + 'px'
    })
    eventLines.attr('x1', (d) => xOf(d.t)).attr('x2', (d) => xOf(d.t))
  }

  const pins = d3
    .select(q('.pins'))
    .selectAll('.pin')
    .data(EVENTS)
    .join('div')
    .attr('class', 'pin')
    .text((d) => d.name)
  const eventLines = svg
    .select('.evlines')
    .selectAll('line')
    .data(EVENTS)
    .join('line')
    .attr('stroke', '#f35380')
    .attr('stroke-width', 2)
    .attr('y1', 86)
    .attr('y2', YB)

  // Geometry depends on the decade. Only the clip and opacity change per frame.
  function renderEffects() {
    const revealX = X0 - 2 + (X1 - X0 + 4) * V.reveal
    revealRect.setAttribute('width', Math.max(0, revealX - (X0 - 2)))
    svg.select('.bands').attr('opacity', V.axisOp)
    svg.select('.xticks').attr('opacity', V.axisOp)
    svg.select('.series').attr('opacity', V.lineOp)
    svg.select('.end').attr('opacity', V.endOp)
    const pinOpacity = (d) =>
      d.t >= cur && d.t <= cur + spanOf(cur)
        ? V.lineOp * Math.max(0, Math.min(1, (revealX - xOf(d.t)) / 24))
        : 0
    pins.each(function(d) {
      const opacity = pinOpacity(d)
      this.style.opacity = opacity
      this.style.visibility = opacity > 0 ? 'visible' : 'hidden'
    })
    eventLines.attr('opacity', pinOpacity)
  }

  // ---------- hover / keyboard tooltip ----------
  function winIdx() {
    return [
      Math.max(0, Math.round((cur - Y0) * 12)),
      Math.min(MONTHS.length - 1, Math.round((cur + spanOf(cur) - Y0) * 12))
    ]
  }
  function renderHover() {
    if (!hov || busy) {
      guide.attr('visibility', 'hidden')
      svg.select('.hdots').attr('visibility', 'hidden')
      tip.classList.remove('on')
      return
    }
    const [a, b] = winIdx()
    let idx = hov.idx
    if (hov.px != null)
      idx = Math.round(
        (cur + ((hov.px - X0) / (X1 - X0)) * spanOf(cur) - Y0) * 12
      )
    idx = Math.max(a, Math.min(b, idx))
    if (hov.idx != null) hov.idx = idx
    const d = MONTHS[idx]
    const gx = xOf(d.t)
    guide
      .attr('visibility', 'visible')
      .attr('x1', gx)
      .attr('x2', gx)
    svg.select('.hdots').attr('visibility', 'visible')
    hdots
      .attr('cx', gx)
      .attr('cy', (s) => y(s.v[idx]))
      .attr('visibility', (s) => (Number.isFinite(s.v[idx]) ? null : 'hidden'))
    const html =
      `<b class="tip-date">民國${d.Y}年${d.m}月</b>` +
      SERIES.map((s) => {
        return `<span class="tip-detail"><img src="${A}${s.dot}" alt="">${
          s.name
        }：${Number.isFinite(s.v[idx]) ? s.v[idx] + ' 千人' : '無資料'}</span>`
      }).join('')
    if (tip.dataset.k !== String(idx)) {
      tip.innerHTML = html
      tip.dataset.k = idx
    }
    const w = tip.offsetWidth
    const h = tip.offsetHeight
    let left = gx + 14
    if (left + w > 1132) left = gx - 14 - w
    const py = hov.py != null ? hov.py - h / 2 : 88
    tip.style.left = left + 'px'
    tip.style.top = Math.max(70, Math.min(YB - h, py)) + 'px'
    tip.classList.add('on')
  }
  hit.addEventListener('pointermove', (ev) => {
    const [px, py] = S.toLocal(ev)
    hov = { px, py }
    renderHover()
  })
  hit.addEventListener('pointerleave', () => {
    if (document.activeElement !== hit) {
      hov = null
      renderHover()
    }
  })
  hit.addEventListener('focus', () => {
    if (!hov) {
      hov = { idx: winIdx()[1] }
      renderHover()
    }
  })
  hit.addEventListener('blur', () => {
    hov = null
    renderHover()
  })
  hit.addEventListener('keydown', (ev) => {
    const steps = { ArrowLeft: -1, ArrowRight: 1, PageUp: -12, PageDown: 12 }
    const step = steps[ev.key]
    const [a, b] = winIdx()
    if (step == null && ev.key !== 'Home' && ev.key !== 'End') {
      if (ev.key === 'Escape') {
        hov = null
        renderHover()
      }
      return
    }
    ev.preventDefault()
    const base = hov
      ? hov.idx ??
        Math.round(
          (cur + (((hov.px ?? X1) - X0) / (X1 - X0)) * spanOf(cur) - Y0) * 12
        )
      : b
    hov = { idx: ev.key === 'Home' ? a : ev.key === 'End' ? b : base + step }
    renderHover()
  })

  // ---------- TV ----------
  const tvText = q('.tv-yr')
  const tvNum = q('.tv-yr .n')
  const sweep = q('rect.sweep')
  const blockLabel = (Y) => `${Y}~${endYear(Y)}`
  function tv(textOp, head, tail) {
    tvText.style.opacity = textOp
    sweep.setAttribute('x', tail * 286)
    sweep.setAttribute('width', Math.max(0, head - tail) * 286)
  }

  const STEP_MS = 5500
  const progress = (t, start, end) =>
    Math.max(0, Math.min(1, (t - start) / (end - start)))
  let animation

  function showPeriod(year) {
    cur = year
    busy = false
    tvNum.textContent = blockLabel(year)
    tv(1, 0, 0)
    Object.assign(V, { reveal: 1, lineOp: 1, axisOp: 1, endOp: 1 })
    renderPlot()
    renderEffects()
    renderHover()
  }

  function stopTransition() {
    if (!animation) return
    animation.timer.stop()
    clearTimeout(animation.timeout)
    animation = null
  }

  function transition(to, stepMs) {
    if (animation) {
      const previous = animation.to
      stopTransition()
      showPeriod(previous)
    }
    const from = cur
    if (RM || from === to) {
      showPeriod(to)
      return
    }

    const tvMs = Math.min(680, 0.18 * stepMs)
    const switchAt = 0.45 * tvMs
    const drawEnd = switchAt + Math.min(1550, 0.36 * stepMs)
    const end = drawEnd + Math.min(200, 0.05 * stepMs)
    function finish() {
      stopTransition()
      showPeriod(to)
    }

    busy = true
    renderHover()
    const timer = d3.timer((elapsed) => {
      if (elapsed >= end) {
        finish()
        return
      }

      const showingNewPeriod = elapsed >= switchAt
      if (showingNewPeriod && cur !== to) {
        cur = to
        tvNum.textContent = blockLabel(to)
        renderPlot()
      }
      Object.assign(
        V,
        showingNewPeriod
          ? {
              reveal: d3.easeQuadInOut(progress(elapsed, switchAt, drawEnd)),
              lineOp: 1,
              axisOp: progress(elapsed, switchAt, tvMs),
              endOp: progress(elapsed, drawEnd, end)
            }
          : {
              reveal: 1,
              lineOp: 1 - progress(elapsed, 0, switchAt),
              axisOp: 1,
              endOp: 1 - progress(elapsed, 0, switchAt)
            }
      )
      tv(
        showingNewPeriod
          ? progress(elapsed, switchAt, tvMs)
          : 1 - progress(elapsed, 0, switchAt),
        progress(elapsed, 0, switchAt),
        progress(elapsed, switchAt, tvMs)
      )
      renderEffects()
    })
    // Settle the final frame even when animation frames are suspended.
    animation = { to, timer, timeout: setTimeout(finish, end + 50) }
  }

  const tl = ctx.timeline({ years: YEARS, stepMs: STEP_MS })
  root.appendChild(S.el)
  q('[data-act=play]').addEventListener('click', () => tl.toggle())
  q('[data-act=speed]').addEventListener('click', () => tl.cycleSpeed())

  let first = true
  tl.subscribe((s, changedYear) => {
    if (changedYear) {
      if (first) {
        showPeriod(s.year)
        first = false
      } else transition(s.year, s.stepMs)
    }
    q('.key .pz').hidden = !s.playing
    q('[data-act=play]').setAttribute('aria-label', s.playing ? '暫停' : '播放')
    const spd = q('.key .spd')
    spd.textContent = s.speed.label
    spd.classList.toggle('sm', s.speed.label.length > 2)
    q('[data-act=speed]').setAttribute(
      'aria-label',
      `播放速度 ${s.speed.label}`
    )
  })
  return stopTransition
}
