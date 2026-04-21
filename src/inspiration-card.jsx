// Inspiration card used in masonry (精选作品 tab)
const InspirationCard = ({ item, onUse, onRemix }) => {
  return (
    <div className={`insp-card ${item.duration ? 'video' : ''}`}>
      <div
        className="insp-media"
        style={{
          backgroundImage: `url(${item.cover})`,
          aspectRatio: item.aspect || '16/9',
        }}
      >
        {item.official && (
          <div className="insp-official">
            <Icon name="sparkle" size={10}/> 官方精选
          </div>
        )}
        {item.duration && (
          <div className="insp-duration">
            <Icon name="play" size={9}/> {item.duration}
          </div>
        )}
      </div>

      <div className="insp-overlay">
        <span className="insp-prompt-label">Prompt</span>
        <div className="insp-prompt">{item.prompt}</div>
        <div className="insp-actions">
          <button className="insp-btn ghost" onClick={(e) => { e.stopPropagation(); onRemix(item); }}>
            <Icon name="shuffle" size={13}/> Remix
          </button>
          <button className="insp-btn primary" onClick={(e) => { e.stopPropagation(); onUse(item); }}>
            <Icon name="add_plus" size={13}/> 使用
          </button>
        </div>
      </div>

      <div className="insp-meta">
        <div className="insp-meta-row">
          <div className="insp-author">
            <div className="insp-author-avatar" style={{ background: item.author.avatar }}/>
            <span className="insp-author-name">{item.author.name}</span>
          </div>
          <div className="insp-stats">
            <Icon name="shuffle" size={11}/> {item.remix > 999 ? `${(item.remix/1000).toFixed(1)}k` : item.remix}
          </div>
        </div>
        {item.tags && (
          <div className="insp-tags">
            {item.tags.map((t, i) => <span key={i} className="insp-tag">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
};

// Compact asset card for 角色/道具/场景/风格 etc.
const AssetCard = ({ item, kind, onUse, onRemix }) => {
  return (
    <div className={`insp-asset ${kind}`}>
      <div className="insp-asset-img" style={{backgroundImage:`url(${item.img})`}}>
        <div className="insp-overlay" style={{padding:12}}>
          {item.prompt && (
            <>
              <span className="insp-prompt-label">Prompt</span>
              <div className="insp-prompt">{item.prompt}</div>
            </>
          )}
          <div className="insp-actions" style={{marginTop: item.prompt ? 0 : 'auto'}}>
            {item.prompt && (
              <button className="insp-btn ghost" onClick={(e) => { e.stopPropagation(); onRemix(item); }}>
                <Icon name="shuffle" size={12}/> Remix
              </button>
            )}
            <button className="insp-btn primary" onClick={(e) => { e.stopPropagation(); onUse({ ...item, kind }); }}>
              <Icon name="add_plus" size={12}/> 使用
            </button>
          </div>
        </div>
      </div>
      <div className="insp-asset-meta">
        <div className="insp-asset-name">{item.name}</div>
        <div className="insp-asset-sub">
          <Icon name="heart" size={10}/> {item.likes > 999 ? `${(item.likes/1000).toFixed(1)}k` : item.likes}
          {item.tags && <span style={{color:'var(--insp-ink-4)'}}>· {item.tags[0]}</span>}
        </div>
      </div>
    </div>
  );
};

// Prompt template card (text-heavy)
const PromptCard = ({ item, onUse }) => (
  <div className="insp-card" style={{padding:'16px 18px', cursor:'pointer'}} onClick={() => onUse({ id:item.id, label:item.name, kind:'prompt' })}>
    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
      <Icon name="quote" size={14} style={{color:'var(--insp-warm)'}}/>
      <div style={{fontSize:13.5, fontWeight:600, color:'var(--insp-ink-1)'}}>{item.name}</div>
    </div>
    <div style={{fontSize:12.5, color:'var(--insp-ink-2)', lineHeight:1.55, marginBottom:12}}>
      {item.prompt}
    </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className="insp-stats"><Icon name="heart" size={10}/> {item.likes}</div>
      <div style={{display:'flex',gap:6}}>
        {item.tags.map((t,i) => <span key={i} className="insp-tag">{t}</span>)}
      </div>
    </div>
  </div>
);

Object.assign(window, { InspirationCard, AssetCard, PromptCard });
