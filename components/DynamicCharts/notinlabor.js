// 歷年未參與勞動力原因 — Figma Chart 42:12583 (main component 42:5326), 1140×694
export default function mount(root, ctx, rowsData) {
  const d3 = ctx.d3
  const A = ctx.assets + 'notinlabor/'
  const mobileViewport = matchMedia('(max-width: 640px)')
  let mobile = mobileViewport.matches
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx.css(
    'notinlabor',
    `
      .nil .film { position: absolute; left: 66px; top: 115.5px; width: 1040px; height: 415px; background: url(${A}film-tile.svg) right 0 top 0 / 208px 415px repeat-x; /* anchored right: holes travel with the strip end */ }
      .nil .chart { position: absolute; left: 186px; top: 162px; width: 904px; height: 334px; overflow: hidden; }
      .nil .chart svg { position: absolute; left: 0; top: 0; width: 904px; height: 334px; overflow: visible; }
      .nil .unit { position: absolute; left: 8px; top: 12px; font: 700 12px/17px var(--font); color: #c4cad3; white-space: nowrap; }
      .nil .tick-lbl { font: 400 12px var(--font); fill: #c4cad3; }
      .nil .val { font: 700 14px var(--font); font-variant-numeric: tabular-nums; }
      .nil .band { fill: rgba(255,255,255,.08); opacity: 0; transition: opacity .15s ease; }
      .nil .band.on { opacity: 1; }
      .nil .cats { position: absolute; left: 56px; top: 282px; width: 829px; display: flex; pointer-events: none; }
      .nil .cats span { flex: 1 0 0; min-width: 0; display: flex; justify-content: center; text-align: center; font: 700 13px/1.33 var(--font); color: #e8ebef; }
      .nil .cats span i { font-style: normal; display: block; }
      .nil .hits { position: absolute; left: 56px; top: 40px; width: 829px; height: 280px; display: flex; }
      .nil .hits button { flex: 1 0 0; min-width: 0; height: 100%; border: 0; padding: 0; margin: 0; background: none; cursor: pointer; border-radius: 4px; }
      .nil .hits button:focus-visible { outline: 2px solid #e8ebef; outline-offset: -2px; }
      .nil .tip { position: absolute; z-index: 5; padding: 12px; border-radius: 8px; background: #fff; display: flex; flex-direction: column; gap: 4px;
        pointer-events: none; filter: drop-shadow(0 8px 8px rgba(0,0,0,.32)); font: 400 12px/17px var(--font); color: #37474f; white-space: nowrap; opacity: 0; transition: opacity .12s ease; }
      .nil .tip.on { opacity: 1; }
      .nil .tip .t1 { font-size: 13px; line-height: 18px; margin-bottom: 4px; }
      .nil .tip .tip-detail { display: flex; align-items: center; gap: 6px; }
      .nil .tip .dot { width: 12px; height: 12px; border-radius: 50%; flex: none; }
      .nil .tip .delta { color: #62748e; font-variant-numeric: tabular-nums; }
      .nil .tip .up { color: #3f8f6a; } .nil .tip .down { color: #c0603f; }
      .nil .ctl { position: absolute; padding: 0; margin: 0; border: 0; background: none; cursor: pointer; transition: transform .18s ease; }
      .nil .ctl:hover, .nil .ctl:focus-visible { transform: translateY(-4px); outline: none; }
      .nil .ctl:focus-visible::after { content: ""; position: absolute; inset: -4px; border: 2px solid #37474f; border-radius: 6px; }
      .nil .ctl img, .nil .ctl svg { position: absolute; display: block; }
      .nil .ctl [hidden] { display: none; }
      .nil .speed-txt { position: absolute; left: 0; width: 80.6px; top: 35.2px; height: 35.4px; line-height: 35.4px; text-align: center; font: 900 26.59px var(--font-black); color: #fff; white-space: nowrap; }
      .nil .speed-txt.tick, .nil .stamp .n.tick { animation: nil-pop .35s ease; }
      .nil .stamp { position: absolute; left: 1018px; top: 573px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: flex-start;
        color: #49599c; font-family: "Microsoft JhengHei", var(--font); font-weight: 700; white-space: nowrap; }
      .nil .stamp .l { font-size: 20px; line-height: 26px; }
      .nil .stamp .yn { line-height: 48px; display: flex; align-items: baseline; }
      .nil .stamp .n { display: inline-block; font-size: 48px; font-variant-numeric: tabular-nums; }
      .nil .stamp .u { font-size: 20px; margin-left: 5px; }
      .nil .stamp .n.tick { animation-name: nil-flip; }
      @keyframes nil-flip { from { transform: translateY(35%); opacity: 0; } to { transform: none; opacity: 1; } }
      @keyframes nil-pop { 0% { transform: scale(.6); opacity: .2; } 70% { transform: scale(1.12); } 100% { transform: none; opacity: 1; } }
      .nil .mobile-canister { display: none; }
      .nil-mobile .mobile-canister { position: absolute; display: block; top: 0; left: 0; width: 420px; height: 84px;
        pointer-events: none; overflow: hidden; z-index: 1; background: url(${A}film-canister-mobile.svg) center / 100% 100% no-repeat; }
      .nil-mobile .mobile-canister img { position: absolute; left: 268px; top: -2px; width: 80px; height: 183px;
        transform: translate(-50%, -50%) rotate(90deg); }
      .nil-mobile .canister, .nil-mobile .nil-character, .nil-mobile .cats { display: none; }
      .nil-mobile .film { left: 26px; top: 77px; width: 358px; height: var(--film-length, var(--mobile-film-height));
        background: #fff url(${A}film-tile-mobile.svg) center bottom / 100% 162px repeat-y; }
      .nil-mobile .chart { left: 54px; top: 100px; width: 302px; height: calc(var(--mobile-plot-height) + 13px);
        clip-path: inset(0 0 max(0px, calc(var(--mobile-plot-height) + 36px - var(--film-length, var(--mobile-film-height))))); }
      .nil-mobile .chart svg { width: 302px; height: var(--mobile-plot-height); }
      .nil-mobile .unit { top: 6px; left: 4px; }
      .nil-mobile .hits { left: 0; top: 38px; width: 302px; height: var(--mobile-rows-height); flex-direction: column; }
      .nil-mobile .hits button { width: 100%; height: auto; }
      .nil-mobile .mobile-category { font: 700 14px var(--font); fill: #e8ebef; }
      .nil-mobile .val { font-size: 13px; }
      .nil-mobile .tip { max-width: calc(100% - 16px); box-sizing: border-box; white-space: normal; }
      .nil-mobile .ctl { top: calc(var(--mobile-film-height) + 91px) !important; }
      .nil-mobile [data-act="play"] { left: 36px !important; }
      .nil-mobile [data-act="speed"] { left: 176px !important; }
      .nil-mobile .stamp-outline { display: none; }
      .nil-mobile .stamp { left: 330px; top: calc(var(--mobile-film-height) + 87px); width: 136px; height: 92px; box-sizing: border-box; padding: 10px 16px; align-items: center;
        background: url(${A}stamp-frame.svg) center / 100% 100% no-repeat; }
      .nil-mobile .stamp .l { font-size: 16px; line-height: 22px; }
      .nil-mobile .stamp .yn { line-height: 38px; }
      .nil-mobile .stamp .n { font-size: 39px; }
      @media (prefers-reduced-motion: reduce) { .nil .stamp .n.tick, .nil .speed-txt.tick { animation: none; } }
    `
  )

  const YEARS = [...new Set(rowsData.map((row) => row.year))].sort(
    (a, b) => a - b
  )
  const SERIES = [
    { name: '求學及準備升學', color: '#a9c8ec' },
    { name: '料理家務', color: '#f9c9a3' },
    { name: '高齡、身心障礙', color: '#a8ddc9' },
    {
      name: '想工作而未找工作且隨時可以開始工作',
      lines: ['想工作而未找工作且', '隨時可以開始工作'],
      color: '#c7addd'
    },
    { name: '其他', color: '#f4b7c4' }
  ]
  const seriesByName = new Map(SERIES.map((series) => [series.name, series]))
  SERIES.forEach((series) => {
    series.v = {}
  })
  for (const row of rowsData) {
    const series = seriesByName.get(row.name)
    if (series) series.v[row.year] = row.value
  }

  // ---------- geometry (Chart Area coords, Figma 184:14829) ----------
  const W = 904
  const X0 = 56
  const PW = 829
  const BASE = 272
  const TOP = 48
  const BAR_W = 56
  const BAND_W = 114
  const COL = PW / SERIES.length
  const cx = (i) => X0 + COL * (i + 0.5)
  const niceMax = (y) =>
    Math.max(
      1000,
      Math.ceil((d3.max(SERIES, (s) => s.v[y]) * 1.04) / 1000) * 1000
    )
  const MOBILE_W = 302
  const MOBILE_X0 = 9
  const MOBILE_X1 = 253
  const MOBILE_TOP = 38
  const MOBILE_ROW = 62
  const mobileRowsHeight = MOBILE_ROW * SERIES.length
  const mobilePlotHeight = MOBILE_TOP + mobileRowsHeight + 46
  const mobileFilmHeight = mobilePlotHeight + 56
  const mobileStageHeight = mobileFilmHeight + 193
  const mobileY = (i) => MOBILE_TOP + (i + 0.5) * MOBILE_ROW
  const valueScale = (m) =>
    d3
      .scaleLinear()
      .domain([0, m])
      .range(mobile ? [MOBILE_X0, MOBILE_X1] : [BASE, TOP])
  const fmt = d3.format(',')

  // ---------- stage ----------
  const S = ctx.stage(1140, 694)
  const card = S.card
  card.classList.add('nil')
  card.classList.toggle('nil-mobile', mobile)
  card.style.setProperty('--mobile-rows-height', mobileRowsHeight + 'px')
  card.style.setProperty('--mobile-plot-height', mobilePlotHeight + 'px')
  card.style.setProperty('--mobile-film-height', mobileFilmHeight + 'px')
  if (mobile) S.setSize(420, mobileStageHeight)
  card.innerHTML = `
      <div class="abs" style="left:0;bottom:0;width:1140px;height:334px;overflow:hidden"><img class="abs" src="${A}bg.png" alt="" style="left:0;top:2.14%;width:100%;height:97.86%"></div>
      <div class="film" aria-hidden="true"></div>
      <div class="mobile-canister" aria-hidden="true"><img src="${A}canister-text.svg" alt=""></div>
      <div class="canister" aria-hidden="true">
        <div class="abs" style="left:-93px;top:115.5px;width:247px;height:415px;background:#f5c578"></div>
        <div class="abs" style="left:-101px;top:530.5px;width:262px;height:30px;border-radius:4px;background:#333"></div>
        <div class="abs" style="left:-100px;top:85.5px;width:261px;height:30px;border-radius:4px;background:#333"></div>
        <div class="abs" style="left:-24.64px;top:46px;width:109.79px;height:39.961px;border-radius:4px 4px 0 0;background:#333"></div>
        <div class="abs" style="left:-93px;top:115.5px;width:131px;height:415px;background:#6c7682"></div>
        <img class="abs" src="${A}canister-text.svg" alt="" style="left:-4.97px;top:136.99px;width:126.818px;height:234.609px">
        <div class="abs" style="left:69.18px;top:55.99px;width:7.985px;height:19.981px;border-radius:4px;background:#575757"></div>
        <div class="abs" style="left:105.11px;top:93.95px;width:47.909px;height:11.988px;border-radius:2px;background:#575757"></div>
        <div class="abs" style="left:117.58px;top:360.19px;width:23.954px;height:47.953px;background:#efd88d"></div>
        <div class="abs" style="left:117.58px;top:416.14px;width:23.954px;height:47.953px;background:#efd88d"></div>
        <div class="abs" style="left:117.58px;top:472.09px;width:23.954px;height:47.953px;background:#efd88d"></div>
      </div>
      <div class="chart" role="img" aria-label="各年未參與勞動力原因人數長條圖，單位千人">
        <div class="unit">單位：千人</div>
        <svg viewBox="0 0 ${W} 334" aria-hidden="true">
          <defs><clipPath id="nil-clip"><rect x="0" y="0" width="${W}" height="${BASE}"/></clipPath></defs>
          <g class="grid"></g>
          <g class="mobile-categories"></g>
          <rect class="band" x="0" y="${TOP -
            1}" width="${BAND_W}" height="${BASE - TOP + 1}"/>
          <g class="bars" clip-path="url(#nil-clip)"></g>
          <g class="vals"></g>
        </svg>
        <div class="cats"></div>
        <div class="hits"></div>
        <div class="tip" role="status" aria-live="polite"><b class="t1"></b><div class="tip-detail"><span class="dot"></span><span><span class="nm"></span><b class="vv"></b></span></div><span class="delta"></span></div>
      </div>
      <button class="ctl" data-act="play" type="button" aria-label="播放" style="left:672px;top:583px;width:116px;height:85px">
        <img src="${A}camera.svg" alt="" style="left:0;top:0;width:116px;height:85px">
        <svg class="pause" viewBox="0 0 116 85" style="left:0;top:0;width:116px;height:85px" hidden><circle cx="58" cy="49" r="22" fill="#434242"/><rect x="49" y="38" width="7" height="22" rx="1.5" fill="#fff"/><rect x="60" y="38" width="7" height="22" rx="1.5" fill="#fff"/></svg>
      </button>
      <button class="ctl" data-act="speed" type="button" aria-label="播放速度 1x" style="left:817px;top:585px;width:80.6px;height:84.84px">
        <img src="${A}lens-body.svg" alt="" style="left:0;top:20.92px;width:80.6px;height:50.028px">
        <img src="${A}lens-union.svg" alt="" style="left:12.04px;top:9.87px;width:56.513px;height:20.925px">
        <img src="${A}lens-top.svg" alt="" style="left:12.15px;top:0;width:56.31px;height:19.874px">
        <img src="${A}lens-base.svg" alt="" style="left:0;top:57.05px;width:80.6px;height:27.793px">
        <img src="${A}lens-top-inner.svg" alt="" style="left:15.75px;top:1.85px;width:49.101px;height:13.897px">
        <span class="speed-txt">1x</span>
      </button>
      <div aria-hidden="true">
        <div class="abs stamp-outline" style="left:932px;top:557px;width:172px;height:109px;box-sizing:border-box;border:5px solid #49599c;border-radius:6px"></div>
        <div class="abs stamp-outline" style="left:939px;top:564px;width:158px;height:95px;box-sizing:border-box;border:3px solid #49599c;border-radius:6px"></div>
        <img class="abs stamp-outline" src="${A}stamp-line.svg" alt="" style="left:947px;top:576.5px;width:2px;height:70px">
        <img class="abs stamp-outline" src="${A}stamp-line.svg" alt="" style="left:1087px;top:576.5px;width:2px;height:70px">
        <div class="stamp"><span class="l">民國</span><span class="yn"><span class="n">95</span><span class="u">年</span></span></div>
      </div>
      <img class="abs nil-character" src="${A}ground.svg" alt="" style="left:-29px;top:629px;width:494px;height:98px">
      <img class="abs nil-character" src="${A}woman-young.svg" alt="" style="left:175px;top:556px;width:163.808px;height:308.729px">
      <img class="abs nil-character" src="${A}woman-old.svg" alt="" style="left:409.9px;top:560px;width:108px;height:327.768px;transform:scaleX(-1)">`
  const q = (s) => card.querySelector(s)
  const tip = q('.tip')
  const svg = d3.select(q('.chart svg'))
  const band = svg.select('.band')

  // category labels + hit targets
  SERIES.forEach((s, i) => {
    q('.cats').appendChild(
      ctx.el(
        'span',
        {},
        s.lines ? `<i style="width:120px">${s.lines.join('<br>')}</i>` : s.name
      )
    )
    const b = ctx.el('button', { type: 'button', 'data-i': i })
    q('.hits').appendChild(b)
  })
  const hits = [...card.querySelectorAll('.hits button')]

  // ---------- timeline (Media Control) ----------
  const tl = ctx.timeline({ years: YEARS, stepMs: 2600 })
  root.appendChild(S.el)

  let year = YEARS[0]
  let hover = null
  let scale = valueScale(niceMax(YEARS[0]))

  function drawAxis() {
    const ticks = d3.range(0, scale.domain()[1] + 1, 1000)
    const groups = svg
      .select('.grid')
      .selectAll('g.tk')
      .data(ticks, (d) => d)
      .join((enter) => {
        const group = enter.append('g').attr('class', 'tk')
        group.append('line').attr('stroke', '#fff')
        group.append('text').attr('class', 'tick-lbl')
        return group
      })
      .attr('transform', (d) =>
        mobile
          ? 'translate(' + scale(d) + ',0)'
          : 'translate(0,' + scale(d) + ')'
      )
    groups
      .select('line')
      .attr('x1', mobile ? 0 : X0)
      .attr('x2', mobile ? 0 : X0 + PW)
      .attr('y1', mobile ? MOBILE_TOP : 0.5)
      .attr('y2', mobile ? MOBILE_TOP + mobileRowsHeight : 0.5)
      .attr('stroke-opacity', (d) => (d === 0 ? 0.45 : 0.14))
    groups
      .select('text')
      .attr('x', mobile ? 0 : 48)
      .attr('y', mobile ? 31 : 4.5)
      .attr('text-anchor', mobile ? 'middle' : 'end')
      .text(fmt)
    svg
      .select('.mobile-categories')
      .selectAll('text')
      .data(mobile ? SERIES : [])
      .join('text')
      .attr('class', 'mobile-category')
      .attr('x', MOBILE_X0)
      .attr('y', (d, i) => mobileY(i) - 15)
      .attr('dominant-baseline', 'middle')
      .text((d) => d.name)
  }

  const barSel = svg
    .select('.bars')
    .selectAll('rect')
    .data(SERIES)
    .join('rect')
    .attr('x', (d, i) => cx(i) - BAR_W / 2)
    .attr('width', BAR_W)
    .attr('rx', 6)
    .attr('fill', (d) => d.color)
  const valSel = svg
    .select('.vals')
    .selectAll('text')
    .data(SERIES)
    .join('text')
    .attr('class', 'val')
    .attr('x', (d, i) => cx(i))
    .attr('text-anchor', 'middle')
    .attr('fill', (d) => d.color)

  // draw the chart + stamp for `yr` instantly (called while the film is rewound / hidden)
  let shown = null
  function render(yr) {
    if (shown === yr) return
    shown = yr
    scale = valueScale(niceMax(yr))
    drawAxis()
    const position = (d) => scale(d.v[yr] ?? 0)
    barSel
      .attr('x', (d, i) => (mobile ? MOBILE_X0 : cx(i) - BAR_W / 2))
      .attr('y', (d, i) => (mobile ? mobileY(i) + 1 : position(d)))
      .attr('width', (d) => (mobile ? position(d) - MOBILE_X0 : BAR_W))
      .attr('height', (d) => (mobile ? 26 : BASE - position(d) + 6))
    valSel
      .attr('x', (d, i) => (mobile ? position(d) + 5 : cx(i)))
      .attr('y', (d, i) => (mobile ? mobileY(i) + 18 : position(d) - 9))
      .attr('text-anchor', mobile ? 'start' : 'middle')
      .text((d) => (Number.isFinite(d.v[yr]) ? fmt(d.v[yr]) : '無資料'))
    hits.forEach((b, i) => {
      const v = SERIES[i].v[yr]
      b.disabled = !Number.isFinite(v)
      b.setAttribute(
        'aria-label',
        `民國${yr}年 ${SERIES[i].name}：${
          b.disabled ? '無資料' : fmt(v) + '千人'
        }`
      )
    })
    const n = q('.stamp .n')
    n.textContent = yr
    n.classList.remove('tick')
    void n.offsetWidth
    n.classList.add('tick')
  }

  function fillTip(i) {
    const s = SERIES[i]
    const v = s.v[shown]
    q('.t1').textContent = `民國${shown}年`
    q('.tip .dot').style.background = s.color
    q('.tip .nm').textContent = s.name
    q('.tip .vv').textContent = `：${fmt(v)}千人`
    const d = q('.tip .delta')
    if (Number.isFinite(s.v[shown - 1])) {
      const diff = v - s.v[shown - 1]
      d.innerHTML = `較上年 <span class="${
        diff > 0 ? 'up' : diff < 0 ? 'down' : ''
      }">${diff > 0 ? '▲' : diff < 0 ? '▼' : '—'} ${fmt(
        Math.abs(diff)
      )}千人</span>`
    } else d.textContent = '較上年 —'
  }
  function placeTip(i) {
    const w = tip.offsetWidth
    const h = tip.offsetHeight
    if (mobile) {
      const rowTop = mobileY(i) - MOBILE_ROW / 2
      const preferred = rowTop + MOBILE_ROW + 4
      tip.style.left = Math.max(8, MOBILE_W - w - 8) + 'px'
      tip.style.top =
        (preferred + h <= mobilePlotHeight
          ? preferred
          : Math.max(8, rowTop - h - 4)) + 'px'
      band
        .attr('x', 0)
        .attr('y', rowTop)
        .attr('width', MOBILE_W)
        .attr('height', MOBILE_ROW)
      return
    }
    const c = cx(i)
    let left = c + BAND_W / 2 - 15
    if (left + w > W - 8) left = c - BAND_W / 2 + 15 - w
    const top = Math.max(8, Math.min(BASE - h, scale(SERIES[i].v[shown]) - 7))
    tip.style.left = left + 'px'
    tip.style.top = top + 'px'
    band
      .attr('x', c - BAND_W / 2)
      .attr('y', TOP - 1)
      .attr('width', BAND_W)
      .attr('height', BASE - TOP + 1)
  }
  // the tooltip is only drawn while no film sequence is running; `hover` remembers the column meanwhile
  function syncTip() {
    const on = hover !== null && !seq && Number.isFinite(SERIES[hover].v[shown])
    if (on) {
      fillTip(hover)
      placeTip(hover)
    }
    band.classed('on', on)
    tip.classList.toggle('on', on)
  }
  hits.forEach((b, i) => {
    const show = () => {
      hover = i
      syncTip()
    }
    const hide = () => {
      if (hover === i) {
        hover = null
        syncTip()
      }
    }
    b.addEventListener('pointerenter', show)
    b.addEventListener('pointerleave', hide)
    b.addEventListener('focus', show)
    b.addEventListener('blur', hide)
  })

  // ---------- year change = film rewinds into the canister, then pulls back out (reference video) ----------
  // 0 → ½T: chart fades out fast, strip retracts leftwards into the canister (holes travel with the strip end)
  // ½T: stamp + chart switch to the new year
  // ½T → T: strip extends to full length, chart fades in 30% → 100%
  const film = q('.film')
  const chart = q('.chart')
  const FILM_W = 1040
  const FILM_MIN = 80 // 66 + 80 = 146 < canister edge 154
  const easeOut = d3.easePolyOut.exponent(2.5)
  let seq = null
  let timer = 0
  let raf = 0

  let stepMs = 2600

  function applyFilm(fraction, opacity) {
    const min = mobile ? 12 : FILM_MIN
    const max = mobile ? mobileFilmHeight : FILM_W
    const length = (min + (max - min) * fraction).toFixed(1) + 'px'
    if (mobile) card.style.setProperty('--film-length', length)
    else film.style.width = length
    chart.style.opacity = opacity.toFixed(3)
  }

  function setGeometry() {
    svg.attr(
      'viewBox',
      mobile ? `0 0 ${MOBILE_W} ${mobilePlotHeight}` : '0 0 904 334'
    )
    svg
      .select('clipPath rect')
      .attr('width', mobile ? MOBILE_W : W)
      .attr('height', mobile ? mobilePlotHeight : BASE)
  }
  setGeometry()

  function onViewportChange(event) {
    mobile = event.matches
    card.classList.toggle('nil-mobile', mobile)
    S.setSize(mobile ? 420 : 1140, mobile ? mobileStageHeight : 694)
    film.style.removeProperty('width')
    card.style.removeProperty('--film-length')
    setGeometry()
    const displayed = shown
    shown = null
    render(displayed)
    if (seq) frame()
    else {
      applyFilm(1, 1)
      syncTip()
    }
  }
  mobileViewport.addEventListener('change', onViewportChange)

  function frame() {
    clearTimeout(timer)
    cancelAnimationFrame(raf)
    if (!seq) return
    const p = Math.min(1, (performance.now() - seq.t0) / seq.dur)
    if (p < 0.5) {
      const k = p / 0.5
      applyFilm(1 - easeOut(k), Math.max(0, 1 - k / 0.3))
    } else {
      render(seq.to)
      const k = (p - 0.5) / 0.5
      applyFilm(easeOut(k), 0.3 + 0.7 * k ** 2.5)
    }
    if (p >= 1) {
      finish()
      return
    }
    // rAF for smoothness, timeout as a fallback so the sequence also completes in a hidden/background pane
    raf = requestAnimationFrame(frame)
    timer = setTimeout(frame, 40)
  }
  function finish() {
    clearTimeout(timer)
    cancelAnimationFrame(raf)
    if (seq) render(seq.to)
    seq = null
    applyFilm(1, 1)
    syncTip()
  }
  function changeYear(yr) {
    if (seq) finish() // new year mid-sequence: jump to the end state first
    if (REDUCED || shown === null) {
      render(yr)
      syncTip()
      return
    }
    seq = { to: yr, t0: performance.now(), dur: Math.min(1900, 0.72 * stepMs) }
    syncTip() // hide the tooltip during the rewind
    frame()
  }

  q('[data-act=play]').addEventListener('click', () => tl.toggle())
  q('[data-act=speed]').addEventListener('click', () => tl.cycleSpeed())

  let lastSpeed = '1x'
  tl.subscribe((s, changedYear) => {
    stepMs = s.stepMs
    year = s.year
    if (changedYear) changeYear(year)
    q('[data-act=play] .pause').toggleAttribute('hidden', !s.playing) // SVGElement has no .hidden property
    q('[data-act=play]').setAttribute('aria-label', s.playing ? '暫停' : '播放')
    const st = q('.speed-txt')
    if (s.speed.label !== lastSpeed) {
      st.classList.remove('tick')
      void st.offsetWidth
      st.classList.add('tick')
      lastSpeed = s.speed.label
    }
    st.textContent = s.speed.label
    q('[data-act=speed]').setAttribute(
      'aria-label',
      `播放速度 ${s.speed.label}`
    )
  })
  return () => {
    mobileViewport.removeEventListener('change', onViewportChange)
    clearTimeout(timer)
    cancelAnimationFrame(raf)
    seq = null
  }
}
