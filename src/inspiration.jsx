// Main inspiration module - orchestrates tabs, search, layout
const Inspiration = ({ onUse, onRemix, onOpen }) => {
  const {
    INSPIRATION_TABS, FEATURED_WORKS, FEATURED_DECOMPOSE,
    CHARACTERS, PROPS, SCENES, LENSES, STYLES, REMIXES, PROMPTS
  } = window.__INSP_DATA__;

  const [tab, setTab] = React.useState('featured');
  const [sort, setSort] = React.useState('hot');
  const [query, setQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // in prototype, just scroll into view / flash
  };

  const renderContent = () => {
    if (tab === 'featured') {
      // 统一横图网格 — 所有作品等宽等高
      return (
        <div className="works-grid">
          {FEATURED_WORKS.map(item => (
            <InspirationCard key={item.id} item={item} onOpen={onOpen}/>
          ))}
        </div>
      );
    }
    if (tab === 'character') {
      return <div className="masonry" style={{columnCount:5}}>
        {CHARACTERS.map(c => <AssetCard key={c.id} item={c} kind="character" onUse={onUse} onRemix={onRemix}/>)}
      </div>;
    }
    if (tab === 'prop') {
      return <div className="masonry" style={{columnCount:5}}>
        {PROPS.map(c => <AssetCard key={c.id} item={c} kind="prop" onUse={onUse} onRemix={onRemix}/>)}
      </div>;
    }
    if (tab === 'scene') {
      return <div className="masonry" style={{columnCount:3}}>
        {SCENES.map(c => <AssetCard key={c.id} item={c} kind="scene" onUse={onUse} onRemix={onRemix}/>)}
      </div>;
    }
    if (tab === 'lens') {
      return <div className="masonry" style={{columnCount:4}}>
        {LENSES.map(c => <AssetCard key={c.id} item={c} kind="lens" onUse={onUse} onRemix={onRemix}/>)}
      </div>;
    }
    if (tab === 'style') {
      return <div className="masonry" style={{columnCount:4}}>
        {STYLES.map(c => <AssetCard key={c.id} item={c} kind="style" onUse={(v) => onUse({...v, kind:'风格'})} onRemix={onRemix}/>)}
      </div>;
    }
    if (tab === 'remix') {
      return <div className="masonry" style={{columnCount:4}}>
        {REMIXES.map(r => (
          <div key={r.id} className="insp-card">
            <div className="insp-media" style={{backgroundImage:`url(${r.img})`, aspectRatio:'3/4'}}>
              <div className="insp-duration" style={{background:'rgba(232,184,121,0.9)', color:'#1A1410'}}>
                <Icon name="shuffle" size={10}/> {r.variants} 变体
              </div>
            </div>
            <div className="insp-meta">
              <div className="insp-asset-name" style={{color:'var(--insp-ink-1)',fontSize:13}}>{r.name}</div>
              <div className="insp-asset-sub">
                <Icon name="heart" size={10}/> {r.likes.toLocaleString()} · {r.prompt}
              </div>
            </div>
            <div className="insp-overlay">
              <span className="insp-prompt-label">Remix 链</span>
              <div className="insp-prompt">{r.prompt}，已有 {r.variants} 个不同版本。</div>
              <div className="insp-actions">
                <button className="insp-btn ghost" onClick={() => onRemix(r)}><Icon name="eye" size={13}/> 看全部</button>
                <button className="insp-btn primary" onClick={() => onUse({id:r.id,kind:'remix链',label:r.name})}><Icon name="add_plus" size={13}/> 加入我的</button>
              </div>
            </div>
          </div>
        ))}
      </div>;
    }
    if (tab === 'prompt') {
      return <div className="masonry" style={{columnCount:3}}>
        {PROMPTS.map(p => <PromptCard key={p.id} item={p} onUse={onUse}/>)}
      </div>;
    }
  };

  return (
    <section className="inspiration" id="inspiration">
      <div className="insp-wrap">
        <div className="insp-tabs-row">
          <div className="insp-tabs">
            {INSPIRATION_TABS.map(t => (
              <button
                key={t.id}
                className={`insp-tab${tab === t.id ? ' active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <Icon name={t.icon} size={14}/>
                {t.label}
                <span className="count">{t.count > 999 ? `${(t.count/1000).toFixed(1)}k` : t.count}</span>
              </button>
            ))}
          </div>
          <form className="insp-search" onSubmit={handleSearch}>
            <Icon name="sparkle" size={14} className="sparkle"/>
            <input
              placeholder="AI 搜索灵感，如「赛博朋克猫」"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">搜索</button>
          </form>
          <div className="insp-sort">
            <button className={sort==='hot'?'active':''} onClick={() => setSort('hot')}><Icon name="flame" size={11}/> 热度</button>
            <button className={sort==='new'?'active':''} onClick={() => setSort('new')}><Icon name="clock" size={11}/> 最新</button>
            <button className={sort==='remix'?'active':''} onClick={() => setSort('remix')}><Icon name="shuffle" size={11}/> Remix</button>
          </div>
        </div>

        {renderContent()}

        <div className="insp-end">
          被编辑精选的作品会出现在这里
          <span className="dot-sep"/>
          <a href="#">投稿我的作品</a>
          <span className="dot-sep"/>
          <a href="#">查看更多</a>
        </div>
      </div>
    </section>
  );
};

window.Inspiration = Inspiration;
