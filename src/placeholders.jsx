// Icon primitives (stroke-based, single weight)
const Icon = ({ name, size = 16, className = '', style = {} }) => {
  const paths = {
    plus: <path d="M12 5v14M5 12h14"/>,
    folder: <path d="M3 7a2 2 0 0 1 2-2h3l2 2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
    panel: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></>,
    send: <path d="M7 17l10-10M17 17V8M17 8H8"/>,
    sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01"/></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18"/></>,
    chevron_down: <path d="M6 9l6 6 6-6"/>,
    at: <><circle cx="12" cy="12" r="4"/><path d="M16 12v1a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></>,
    grid_square: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18M3 15h18M15 3v18"/></>,
    keyboard: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></>,
    stats: <><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-5"/></>,
    play: <path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    shuffle: <><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    arrow_right: <path d="M5 12h14M13 6l6 6-6 6"/>,
    check: <path d="M5 12l5 5L20 7"/>,
    x: <path d="M18 6L6 18M6 6l12 12"/>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
    quote: <path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5zm12 0c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5z"/>,
    film: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    package: <><path d="M16 3h5v5"/><path d="M21 3l-8 8"/><path d="M3 7l9-4 9 4v10l-9 4-9-4z"/></>,
    mountain: <path d="M3 20l6-12 4 7 3-4 5 9z"/>,
    camera: <><path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="3.5"/></>,
    palette: <><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 1 0 0 20 2 2 0 1 0 0-4 2 2 0 1 1 0-4h2a6 6 0 0 0 0-12z"/></>,
    add_plus: <path d="M12 5v14M5 12h14"/>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    sort: <><path d="M3 6h18M6 12h12M10 18h4"/></>,
    flame: <path d="M12 2s5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 1-5-2 2-3 5-3 8a7 7 0 0 0 14 0c0-5-7-13-7-13z"/>,
    collapse: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></>,
    panel_left: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></>,
    sound: <><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15 9a4 4 0 0 1 0 6"/></>,
    drag: <><circle cx="9" cy="5" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="5" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="19" r="1.5"/></>,
    wand: <><path d="M15 4l5 5-11 11H4v-5z"/><path d="M14 5l5 5"/></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
         fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
         className={className} style={style} aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

window.Icon = Icon;
