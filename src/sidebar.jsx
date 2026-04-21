const Sidebar = () => {
  const { svgPlaceholder } = window.__INSP_DATA__;
  const history = [
    { title: '创意', sub: '动作模仿', thumb: svgPlaceholder('', 64, 64, '#E94560', '#F5AF19') },
    { title: '古装美女视频创作', sub: '沉浸式短片', thumb: svgPlaceholder('', 64, 64, '#F472B6', '#FEF3C7') },
    { title: '海德格尔在概念介绍', sub: '全能创作Agent', thumb: svgPlaceholder('', 64, 64, '#8B5CF6', '#06B6D4') },
    { title: '人物变装视频创作', sub: '沉浸式短片', thumb: svgPlaceholder('', 64, 64, '#EC4899', '#F59E0B') },
    { title: '角色舞蹈视频', sub: '沉浸式短片', thumb: svgPlaceholder('', 64, 64, '#6EE7B7', '#8B5CF6') },
    { title: '导弹击沉美航母', sub: '沉浸式短片', thumb: svgPlaceholder('', 64, 64, '#1F2937', '#F5AF19') },
    { title: '仅会单字我', sub: '沉浸式短片', thumb: svgPlaceholder('', 64, 64, '#D97706', '#FEF3C7') },
    { title: '古风宠物角色扮演', sub: '沉浸式短片', thumb: svgPlaceholder('', 64, 64, '#065F46', '#A7F3D0') },
    { title: '三视图', sub: '图片', thumb: svgPlaceholder('', 64, 64, '#EC4899', '#06B6D4') },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-head">
        <div className="sb-logo">
          <span className="sb-logo-mark"/>
          小云雀
        </div>
        <button className="sb-collapse" aria-label="collapse"><Icon name="panel_left" size={16}/></button>
      </div>

      <button className="sb-new"><Icon name="plus" size={16}/> 新对话</button>
      <button className="sb-item"><Icon name="folder" size={16}/> 资产库</button>

      <div className="sb-section-head">
        <span>历史记录</span>
        <a href="#">全部</a>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:2}}>
        <div className="sb-section-head" style={{marginTop:0,color:'var(--ink-3)',fontWeight:500,fontSize:12}}>本月</div>
        <div className="sb-history-item">
          <div className="sb-thumb" style={{backgroundImage: `url(${history[0].thumb})`}}/>
          <div className="sb-history-text">
            <div className="sb-history-title">{history[0].title}</div>
            <div className="sb-history-sub">{history[0].sub}</div>
          </div>
        </div>

        <div className="sb-section-head" style={{color:'var(--ink-3)',fontWeight:500,fontSize:12}}>更早</div>
        {history.slice(1).map((h, i) => (
          <div className="sb-history-item" key={i}>
            <div className="sb-thumb" style={{backgroundImage: `url(${h.thumb})`}}/>
            <div className="sb-history-text">
              <div className="sb-history-title">{h.title}</div>
              <div className="sb-history-sub">{h.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

const TopBar = () => (
  <div className="top-bar">
    <div className="pill-credits">
      <Icon name="plus" size={12}/> 1385
    </div>
    <button className="btn-pro">开会员</button>
    <button className="icon-btn" aria-label="help"><Icon name="help" size={18}/></button>
    <button className="icon-btn" aria-label="notifications"><Icon name="bell" size={18}/></button>
    <div className="avatar"/>
  </div>
);

Object.assign(window, { Sidebar, TopBar });
