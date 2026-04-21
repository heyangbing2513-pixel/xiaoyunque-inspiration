// Inspiration card used in masonry (精选作品 tab)
const InspirationCard = ({ item, onOpen }) => {
  return (
    <div
      className={`insp-card ${item.duration ? 'video' : ''}`}
      onClick={() => onOpen && onOpen(item)}
    >
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
        {/* Hover: 播放态 — 只显示一个大播放按钮，模拟点击即播放 */}
        <div className="insp-play-overlay">
          <div className="insp-play-btn">
            <Icon name="play" size={28}/>
          </div>
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

// Compact asset card for 角色/道具/场景/镜头/风格 —
// 统一 hover: 左 [+资产库] 右 [使用]，使用=直接入输入框
const AssetCard = ({ item, kind, onUse, onSave }) => {
  const imgStyle = { backgroundImage: `url(${item.img})` };
  // 真实角色立绘 (白底竖图) 用 contain 保留全身；其他横图保持 cover
  if (item.fit === 'contain') {
    imgStyle.backgroundSize = 'contain';
    imgStyle.backgroundRepeat = 'no-repeat';
    imgStyle.backgroundColor = '#FFFFFF';
  }
  const kindLabel = { character:'角色', prop:'道具', scene:'场景', lens:'镜头', style:'风格' }[kind] || '素材';
  return (
    <div className={`insp-asset ${kind}`}>
      <div className="insp-asset-img" style={imgStyle}>
        <div className="insp-overlay" style={{padding:12}}>
          {item.prompt && (
            <>
              <span className="insp-prompt-label">Prompt</span>
              <div className="insp-prompt">{item.prompt}</div>
            </>
          )}
          <div className="insp-actions" style={{marginTop: item.prompt ? 0 : 'auto'}}>
            <button
              className="insp-btn ghost"
              onClick={(e) => { e.stopPropagation(); onSave && onSave(item, kindLabel); }}
            >
              <Icon name="bookmark" size={12}/> 资产库
            </button>
            <button
              className="insp-btn primary"
              onClick={(e) => { e.stopPropagation(); onUse({ id: item.id, kind: kindLabel, label: item.name, thumb: item.img }); }}
            >
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

// Story card — 竖卡片，上图下大段 prompt 文字
const StoryCard = ({ item, onUse, onSave }) => (
  <div className="insp-story">
    <div className="insp-story-cover" style={{ backgroundImage: `url(${item.cover})` }}>
      <span className="insp-story-genre">{item.genre}</span>
      <span className="insp-story-duration">
        <Icon name="clock" size={10}/> {item.duration} · {item.acts} 幕
      </span>
    </div>
    <div className="insp-story-body">
      <div className="insp-story-title">{item.name}</div>
      <div className="insp-story-tags">
        {item.tags.map((t, i) => <span key={i} className="insp-tag">{t}</span>)}
      </div>
      <div className="insp-story-prompt">{item.prompt}</div>
      <div className="insp-story-footer">
        <div className="insp-stats">
          <Icon name="heart" size={10}/> {item.likes > 999 ? `${(item.likes/1000).toFixed(1)}k` : item.likes}
        </div>
        <div style={{display:'flex',gap:6}}>
          <button className="insp-btn ghost" onClick={() => onSave && onSave(item, '故事')}>
            <Icon name="bookmark" size={12}/> 资产库
          </button>
          <button
            className="insp-btn primary"
            onClick={() => onUse({ id: item.id, kind: '故事', label: item.name, thumb: item.cover })}
          >
            <Icon name="add_plus" size={12}/> 使用
          </button>
        </div>
      </div>
    </div>
  </div>
);

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

Object.assign(window, { InspirationCard, AssetCard, PromptCard, StoryCard });
