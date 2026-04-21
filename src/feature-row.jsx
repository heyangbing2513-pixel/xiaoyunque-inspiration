const FeatureRow = () => {
  const [tab, setTab] = React.useState('common');
  const tabs = [
    { id: 'common', label: '常用功能' },
    { id: 'tools', label: '通用工具' },
    { id: 'edu', label: '知识教育' },
    { id: 'anime', label: '腿情创作' },
    { id: 'market', label: '营销增长' },
  ];
  const { svgPlaceholder } = window.__INSP_DATA__;
  const cards = [
    { title: '短剧 Agent', sub: 'Seedance 2.0 最新支持1080P', badge: 'New', bg: svgPlaceholder('', 600, 400, '#065F46', '#78350F') },
    { title: 'Seedance 2.0', sub: '首发试用', bg: svgPlaceholder('', 600, 400, '#F472B6', '#78350F') },
    { title: '爆款复刻', sub: '自动解析爆点、参考文案/主题/画风', bg: svgPlaceholder('', 600, 400, '#1F2937', '#EC4899') },
    { title: '一镜到底', sub: '多张图片生成连续自然的镜头', bg: svgPlaceholder('', 600, 400, '#44403C', '#6B7280') },
  ];
  return (
    <section className="feature-section">
      <div className="feature-tabs">
        {tabs.map(t => (
          <button key={t.id} className={`feature-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="feature-grid">
        {cards.map((c, i) => (
          <div className="feat-card" key={i} style={{backgroundImage:`url(${c.bg})`, backgroundSize:'cover', backgroundPosition:'center'}}>
            {c.badge && <div className="feat-badge">{c.badge}</div>}
            <div className="feat-card-body">
              <div className="feat-title">{c.title}</div>
              <div className="feat-sub">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.FeatureRow = FeatureRow;
