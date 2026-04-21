// Tweaks panel for design variations
const Tweaks = ({ visible, tweaks, setTweak }) => {
  if (!visible) return null;
  const set = (k, v) => {
    setTweak(k, v);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };
  return (
    <div className="tweaks-panel">
      <h4>Tweaks</h4>
      <div className="tweaks-row">
        <div className="tweaks-label">精选布局</div>
        <div className="tweaks-opts">
          {['hero-left','hero-full','compact'].map(v => (
            <button key={v} className={`tweaks-opt${tweaks.featuredLayout===v?' active':''}`} onClick={() => set('featuredLayout', v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="tweaks-row">
        <div className="tweaks-label">卡片密度</div>
        <div className="tweaks-opts">
          {['cozy','compact','roomy'].map(v => (
            <button key={v} className={`tweaks-opt${tweaks.cardDensity===v?' active':''}`} onClick={() => set('cardDensity', v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="tweaks-row tweaks-toggle">
        <span>卡片显示 prompt 摘要</span>
        <button className={`switch${tweaks.showPromptOnCard?' on':''}`} onClick={() => set('showPromptOnCard', !tweaks.showPromptOnCard)}/>
      </div>
    </div>
  );
};

window.Tweaks = Tweaks;
