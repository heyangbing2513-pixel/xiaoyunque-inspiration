// Featured hero card - highlights 可拆解 differentiator
const InspirationFeatured = ({ item, decompose, onUse, onRemix }) => {
  return (
    <div className="insp-featured">
      <div className="insp-featured-media" style={{ backgroundImage: `url(${item.cover})` }}/>
      <div className="featured-body">
        <div className="featured-top">
          <div className="featured-badge">
            <Icon name="flame" size={12}/> 本周爆款
          </div>
          <button className="featured-play" aria-label="play">
            <Icon name="play" size={18}/>
          </button>
        </div>
        <div className="featured-info">
          <h3>{item.title}</h3>
          <p>{item.prompt}</p>

          <div className="featured-author">
            <div className="av" style={{ background: item.author.avatar }}/>
            <span>@{item.author.name}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span><Icon name="shuffle" size={10} style={{verticalAlign:-1}}/> {item.remix} remix</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span><Icon name="heart" size={10} style={{verticalAlign:-1}}/> {item.likes.toLocaleString()}</span>
          </div>

          {decompose && (
            <>
              <div className="decompose-label">✦ 拆解复用 · 点任意元素带入你的创作</div>
              <div className="decompose-chips">
                {decompose.map((d, i) => (
                  <button
                    key={i}
                    className="dc-chip"
                    onClick={() => onUse({ id: `${item.id}-${i}`, kind: d.kind, label: d.name, thumb: d.thumb })}
                  >
                    <div className="dc-thumb" style={{ backgroundImage: `url(${d.thumb})` }}/>
                    <span className="dc-kind">{d.kind}</span>
                    <span>{d.name}</span>
                    <Icon name="plus" size={11}/>
                  </button>
                ))}
              </div>
              <div style={{display:'flex',gap:10,marginTop:18}}>
                <button className="insp-btn primary" style={{flex:'none',padding:'10px 20px'}} onClick={() => onUse({ id: item.id, label: item.title, kind: '作品', thumb: item.cover })}>
                  <Icon name="add_plus" size={14}/> 用整段
                </button>
                <button className="insp-btn ghost" style={{flex:'none',padding:'10px 20px'}} onClick={() => onRemix(item)}>
                  <Icon name="shuffle" size={14}/> Remix 这个想法
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

window.InspirationFeatured = InspirationFeatured;
