// Main App orchestrator
const { useState, useEffect } = React;

const App = () => {
  const [text, setText] = useState('');
  const [chips, setChips] = useState([]);
  const [toast, setToast] = useState(null);
  const [tweaks, setTweaks] = useState(window.__TWEAKS__);
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'tv'

  // Tweaks mode protocol — register listener BEFORE announcing availability
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    // announce after handler is live — send multiple times in case host missed the first
    const announce = () => window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    announce();
    const t1 = setTimeout(announce, 200);
    const t2 = setTimeout(announce, 800);
    const t3 = setTimeout(announce, 2000);
    return () => {
      window.removeEventListener('message', handler);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  const setTweak = (k, v) => setTweaks(prev => ({ ...prev, [k]: v }));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const onUse = (item) => {
    // Add as chip to composer
    const chip = {
      id: `${item.id || Date.now()}-${Math.random()}`,
      kind: item.kind || '素材',
      label: item.label || item.name || item.title,
      thumb: item.thumb || item.img || item.cover,
    };
    setChips(prev => [...prev, chip]);
    showToast(`已添加「${chip.label}」到输入框`);
    // Scroll to top so user sees the chip
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onRemix = (item) => {
    const prompt = item.prompt || '';
    setText(prev => (prev ? prev + '\n\n' : '') + `[基于《${item.title || item.name}》Remix] ${prompt}`);
    setChips(prev => [...prev, {
      id: `remix-${item.id}-${Date.now()}`,
      kind: 'Remix 自',
      label: item.title || item.name,
      thumb: item.cover || item.img,
    }]);
    showToast(`已载入 Remix 基础 · 可在输入框二次编辑`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSave = (item, kindLabel) => {
    showToast(`已收藏「${item.name}」到${kindLabel || ''}资产库`);
  };

  const removeChip = (id) => setChips(prev => prev.filter(c => c.id !== id));

  const navigate = (v) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app view-${view}`}>
      <Sidebar view={view} onNavigate={navigate}/>
      <main className="main">
        <TopBar/>
        {view === 'home' && (
          <>
            <div className="hero">
              <Composer text={text} setText={setText} chips={chips} removeChip={removeChip}/>
            </div>
            <FeatureRow/>
          </>
        )}
        {view === 'tv' && (
          <>
            <div className="tv-header">
              <button className="tv-back" onClick={() => navigate('home')}>
                <Icon name="chevron_down" size={16} style={{ transform: 'rotate(90deg)' }}/>
                返回首页
              </button>
              <div className="tv-title">
                <Icon name="film" size={18}/>
                <span>灵感 TV</span>
                <span className="tv-subtitle">沉浸式浏览社区精选作品</span>
              </div>
            </div>
            <InspirationBanner onOpen={setDetailItem}/>
          </>
        )}
        <Inspiration onUse={onUse} onRemix={onRemix} onSave={onSave} onOpen={setDetailItem}/>
        <div className="footer-space"/>
      </main>

      <InspirationDetail
        item={detailItem}
        onClose={() => setDetailItem(null)}
        onUse={(it) => { onUse(it); }}
      />

      {toast && (
        <div className="toast">
          <Icon name="check" size={16}/>
          {toast}
        </div>
      )}

      <Tweaks visible={tweaksVisible} tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
