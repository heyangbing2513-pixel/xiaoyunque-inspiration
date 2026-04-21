/**
 * [INPUT]: FEATURED_WORKS (window.__INSP_DATA__)；onOpen(item) / onUse(item) 回调
 * [OUTPUT]: 大轮播 Hero Banner — 精品感的沉浸式横幅，含作者/tag/标题/按钮
 * [POS]: 灵感模块入口顶部，主页与灵感TV 共用
 */
const InspirationBanner = ({ onOpen, onUse }) => {
  const { FEATURED_WORKS } = window.__INSP_DATA__;
  // 挑 5 条有 official 或 remix/likes 高的，过滤掉不当意象
  const slides = React.useMemo(() => {
    const exclude = new Set(['f3', 'f12']);
    const pool = FEATURED_WORKS.filter(f => !exclude.has(f.id));
    const order = ['f2', 'f8', 'f11', 'f10', 'f7'];
    return order.map(id => pool.find(f => f.id === id)).filter(Boolean);
  }, []);

  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % slides.length);
    }, 5200);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (d) => setIdx(i => (i + d + slides.length) % slides.length);
  const goTo = (i) => setIdx(i);

  if (!slides.length) return null;

  return (
    <div
      className="banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="banner-track">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`banner-slide ${i === idx ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.cover})` }}
            aria-hidden={i !== idx}
          >
            <div className="banner-scrim"/>
            <div className="banner-content">
              {s.official && (
                <span className="banner-badge">
                  <Icon name="sparkle" size={11}/> 官方精选
                </span>
              )}
              <h1 className="banner-title">{s.title}</h1>
              <p className="banner-prompt">{s.prompt}</p>
              <div className="banner-meta">
                <div className="banner-author">
                  <div className="banner-author-avatar" style={{ background: s.author.avatar }}/>
                  <span>{s.author.name}</span>
                </div>
                <span className="banner-dot">·</span>
                <span><Icon name="clock" size={11}/> {s.duration}</span>
                <span className="banner-dot">·</span>
                <span><Icon name="shuffle" size={11}/> {s.remix} Remix</span>
                <span className="banner-dot">·</span>
                <span><Icon name="heart" size={11}/> {s.likes.toLocaleString()}</span>
              </div>
              <div className="banner-actions">
                <button className="banner-btn primary" onClick={() => onOpen && onOpen(s)}>
                  <Icon name="play" size={14}/> 观看详情
                </button>
                <button
                  className="banner-btn ghost"
                  onClick={() => onUse && onUse({ id: s.id, kind: '参考作品', label: s.title, thumb: s.cover })}
                >
                  <Icon name="add_plus" size={14}/> 作为灵感
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="banner-nav prev" onClick={() => go(-1)} aria-label="上一张">
        <Icon name="chevron_down" size={20} style={{ transform: 'rotate(90deg)' }}/>
      </button>
      <button className="banner-nav next" onClick={() => go(1)} aria-label="下一张">
        <Icon name="chevron_down" size={20} style={{ transform: 'rotate(-90deg)' }}/>
      </button>

      <div className="banner-indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`banner-dot-btn ${i === idx ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`切到第 ${i + 1} 张`}
          >
            <span className="banner-dot-fill"/>
          </button>
        ))}
      </div>
    </div>
  );
};

window.InspirationBanner = InspirationBanner;
