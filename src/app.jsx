// Main App orchestrator
const { useState, useEffect } = React;

const App = () => {
  const [text, setText] = useState('');
  const [chips, setChips] = useState([]);
  const [toast, setToast] = useState(null);
  const [tweaks, setTweaks] = useState(window.__TWEAKS__);
  const [tweaksVisible, setTweaksVisible] = useState(false);

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

  const removeChip = (id) => setChips(prev => prev.filter(c => c.id !== id));

  return (
    <div className="app">
      <Sidebar/>
      <main className="main">
        <TopBar/>
        <div className="hero">
          <Composer text={text} setText={setText} chips={chips} removeChip={removeChip}/>
        </div>
        <FeatureRow/>
        <Inspiration onUse={onUse} onRemix={onRemix}/>
        <div className="footer-space"/>
      </main>

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
