/**
 * [INPUT]: 依赖 window.__INSP_DATA__.buildDetail 派生作品详情；依赖父组件传入 item / onClose / onUse
 * [OUTPUT]: 全屏详情 Modal — 左侧大图播放区，右侧"灵感配方"(创作者/角色/场景/中间帧/背景/know-how)
 * [POS]: 灵感模块子组件，由 App 在有 detailItem 时渲染
 */
const InspirationDetail = ({ item, onClose, onUse }) => {
  const { buildDetail } = window.__INSP_DATA__;
  const detail = React.useMemo(() => item ? buildDetail(item) : null, [item]);
  const [playing, setPlaying] = React.useState(true);
  const [expandedTip, setExpandedTip] = React.useState(null); // `${segmentIdx}-${tipIdx}`

  // ESC 关闭
  React.useEffect(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const addToComposer = (kind, label, thumb) => {
    onUse({ id: `${item.id}-${kind}-${label}`, kind, label, thumb });
  };

  return (
    <div className="detail-backdrop" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="关闭">
          <Icon name="close" size={20}/>
        </button>

        {/* 左：大图 + 播放态 */}
        <div className="detail-stage">
          <div
            className="detail-cover"
            style={{ backgroundImage: `url(${item.cover})` }}
          >
            <button
              className={`detail-play ${playing ? 'playing' : ''}`}
              onClick={() => setPlaying(v => !v)}
              aria-label={playing ? '暂停' : '播放'}
            >
              <Icon name={playing ? 'pause' : 'play'} size={32}/>
            </button>
            {playing && <div className="detail-playing-hint">▶ 正在播放 · {item.duration}</div>}
          </div>
          <div className="detail-stage-meta">
            {item.official && <span className="detail-badge">官方精选</span>}
            <h2 className="detail-title">{item.title}</h2>
            <div className="detail-tags">
              {item.tags.map(t => <span key={t} className="insp-tag">{t}</span>)}
            </div>
          </div>
        </div>

        {/* 右：灵感配方 */}
        <div className="detail-recipe">
          {/* 创作者 */}
          <section className="recipe-creator">
            <div className="creator-avatar" style={{ background: detail.creator.avatar }}/>
            <div className="creator-info">
              <div className="creator-name">{detail.creator.name}</div>
              <div className="creator-bio">{detail.creator.bio}</div>
              <div className="creator-stats">
                <span>{detail.creator.works} 作品</span>
                <span>·</span>
                <span>{detail.creator.followers.toLocaleString()} 粉丝</span>
              </div>
            </div>
            <button className="creator-follow">+ 关注</button>
          </section>

          <h3 className="recipe-title">
            <Icon name="sparkle" size={14}/> 灵感配方
          </h3>

          {/* 1. 创作背景 */}
          <section className="recipe-section">
            <div className="recipe-section-head">
              <span>创作背景</span>
            </div>
            <p className="recipe-prose">{detail.background}</p>
          </section>

          {/* 2. 作品角色 */}
          <section className="recipe-section">
            <div className="recipe-section-head">
              <span>作品角色 · {detail.characters.length}</span>
            </div>
            <div className="recipe-thumbs">
              {detail.characters.map(c => (
                <div key={c.id} className="recipe-thumb character">
                  <div
                    className="recipe-thumb-img"
                    style={{
                      backgroundImage: `url(${c.img})`,
                      ...(c.fit === 'contain' && {
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#fff',
                      }),
                    }}
                  />
                  <div className="recipe-thumb-name">{c.name}</div>
                  <div className="recipe-thumb-actions">
                    <button
                      className="chip-btn"
                      onClick={() => addToComposer('角色', c.name, c.img)}
                      title="加入输入框"
                    >
                      <Icon name="add_plus" size={10}/>
                    </button>
                    <button className="chip-btn" title="存资产库">
                      <Icon name="bookmark" size={10}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. 作品场景 */}
          <section className="recipe-section">
            <div className="recipe-section-head">
              <span>作品场景 · {detail.scenes.length}</span>
            </div>
            <div className="recipe-thumbs">
              {detail.scenes.map(s => (
                <div key={s.id} className="recipe-thumb scene">
                  <div className="recipe-thumb-img" style={{ backgroundImage: `url(${s.img})` }}/>
                  <div className="recipe-thumb-name">{s.name}</div>
                  <div className="recipe-thumb-actions">
                    <button
                      className="chip-btn"
                      onClick={() => addToComposer('场景', s.name, s.img)}
                    >
                      <Icon name="add_plus" size={10}/>
                    </button>
                    <button className="chip-btn"><Icon name="bookmark" size={10}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. 中间帧 */}
          <section className="recipe-section">
            <div className="recipe-section-head">
              <span>中间帧 · {detail.keyframes.length}</span>
            </div>
            <div className="recipe-keyframes">
              {detail.keyframes.map((kf, i) => (
                <div
                  key={i}
                  className="recipe-keyframe"
                  style={{ backgroundImage: `url(${kf})` }}
                >
                  <span className="keyframe-idx">#{i + 1}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 分片段 Know-how */}
          <section className="recipe-section">
            <div className="recipe-section-head">
              <span>分片段 Know-how · {detail.knowhow.length} 段</span>
            </div>
            <div className="recipe-segments">
              {detail.knowhow.map((seg, si) => (
                <div key={si} className="recipe-segment">
                  <div
                    className="segment-head"
                    style={{ backgroundImage: `url(${seg.cover})` }}
                  >
                    <div className="segment-scrim"/>
                    <span className="segment-name">{seg.segment}</span>
                  </div>
                  <ul className="segment-tips">
                    {seg.tips.map((t, ti) => {
                      const key = `${si}-${ti}`;
                      const expanded = expandedTip === key;
                      return (
                        <li key={ti} className={`segment-tip ${expanded ? 'expanded' : ''}`}>
                          <div className="tip-row">
                            <div className="tip-text">
                              <strong>{t.title}</strong>
                              <span>{t.tip}</span>
                            </div>
                            <div className="tip-actions">
                              <button
                                className="chip-btn"
                                onClick={() => setExpandedTip(expanded ? null : key)}
                                title={expanded ? '收起' : '展开 prompt'}
                              >
                                <Icon name={expanded ? 'x' : 'chevron_down'} size={10}/>
                              </button>
                              <button
                                className="chip-btn"
                                onClick={() => addToComposer('know-how', `${t.title}：${t.prompt}`)}
                                title="加入输入框"
                              >
                                <Icon name="add_plus" size={10}/>
                              </button>
                              <button className="chip-btn" title="存资产库">
                                <Icon name="bookmark" size={10}/>
                              </button>
                            </div>
                          </div>
                          {expanded && (
                            <div className="tip-prompt">
                              <span className="tip-prompt-label">完整 Prompt</span>
                              <p>{t.prompt}</p>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

window.InspirationDetail = InspirationDetail;
