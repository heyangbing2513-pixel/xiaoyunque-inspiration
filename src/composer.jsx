// Composer with chip support for inspiration items
const Composer = ({ text, setText, chips, removeChip }) => {
  const canSend = text.trim().length > 0 || chips.length > 0;

  return (
    <>
      <div className="hero-logo"/>
      <h1>Hi Luka，小云雀助你产出爆款视频</h1>

      <div className="composer">
        {chips.length > 0 && (
          <div className="composer-chips">
            {chips.map((c) => (
              <div className="composer-chip" key={c.id}>
                {c.thumb && <div className="chip-thumb" style={{backgroundImage:`url(${c.thumb})`}}/>}
                <span className="chip-label">{c.kind && <span style={{opacity:.7,marginRight:4}}>@{c.kind}:</span>}{c.label}</span>
                <button className="chip-x" onClick={() => removeChip(c.id)}><Icon name="x" size={11}/></button>
              </div>
            ))}
          </div>
        )}
        <textarea
          className="composer-text"
          placeholder="描述你的想法，可用@指定素材，快速引用已上传内容。"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
        />
        <div className="composer-tools">
          <button className="tool-btn"><Icon name="plus" size={16}/></button>
          <button className="tool-btn mode">
            <Icon name="sparkle" size={14}/> Agent 模式
            <Icon name="chevron_down" size={12}/>
          </button>
          <button className="tool-btn"><Icon name="stats" size={14}/> <Icon name="chevron_down" size={12}/></button>
          <button className="tool-btn"><Icon name="at" size={14}/></button>
          <button className="tool-btn"><Icon name="grid_square" size={14}/></button>
          <button className="tool-btn"><Icon name="keyboard" size={14}/></button>
          <div className="spacer"/>
          <button className="tool-btn"><Icon name="sparkles" size={14} style={{color:'#8B5CF6'}}/></button>
          <button className={`tool-send${canSend ? ' active' : ''}`}>
            <Icon name="send" size={14}/>
          </button>
        </div>
      </div>

      <div className="suggest-row">
        {['古风女侠雪夜出剑','宠物卡点变装视频','鱼眼镜头街头特写','手绘线稿转动画'].map((s, i) => (
          <button className="chip" key={i} onClick={() => setText(s)}>{s}</button>
        ))}
        <button className="chip-refresh"><Icon name="refresh" size={14}/></button>
      </div>
    </>
  );
};

window.Composer = Composer;
