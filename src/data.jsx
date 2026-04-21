// Shared data for 灵感 module
// Images use pravatar (avatars) + placehold gradients via SVG data URLs + actual imagery via Unsplash-like hotlinks is not reliable offline.
// Instead we generate rich gradient SVG placeholders with labels to avoid broken images.

const svgPlaceholder = (label, w, h, c1, c2, c3 = null) => {
  const id = Math.random().toString(36).slice(2, 9);
  const extra = c3 ? `<stop offset="100%" stop-color="${c3}"/>` : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="${c3 ? '50%' : '100%'}" stop-color="${c2}"/>
        ${extra}
      </linearGradient>
      <radialGradient id="r${id}" cx="30%" cy="25%" r="70%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g${id})"/>
    <rect width="${w}" height="${h}" fill="url(#r${id})"/>
    <text x="50%" y="50%" fill="rgba(255,255,255,0.85)" font-family="serif" font-size="${Math.round(Math.min(w,h)/10)}" font-weight="600" text-anchor="middle" dominant-baseline="middle" font-style="italic">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const INSPIRATION_TABS = [
  { id: 'featured', label: '精选作品', icon: 'film', count: 248 },
  { id: 'character', label: '角色', icon: 'user', count: 1860 },
  { id: 'prop', label: '道具', icon: 'package', count: 924 },
  { id: 'scene', label: '场景', icon: 'mountain', count: 1340 },
  { id: 'lens', label: '镜头语言', icon: 'camera', count: 186 },
  { id: 'style', label: '风格 / 画风', icon: 'palette', count: 312 },
  { id: 'remix', label: '热门 Remix', icon: 'shuffle', count: 96 },
  { id: 'prompt', label: '提示词模板', icon: 'quote', count: 520 },
];

// === Featured videos (完整 AI 短片)
// different heights for masonry
const FEATURED_WORKS = [
  {
    id: 'f1',
    title: '霓虹东京 · 午夜巴士',
    duration: '00:48',
    author: { name: '林未央', avatar: 'linear-gradient(135deg,#FF6B9D,#C06EFF)' },
    cover: svgPlaceholder('霓虹东京', 600, 900, '#1E3A8A', '#E94560', '#F5AF19'),
    prompt: '雨后的东京街头，霓虹灯牌在水洼中倒映，一辆老式巴士缓缓驶过涩谷路口，镜头从车窗内升格拍摄雨滴，赛博朋克调色，胶片颗粒感',
    tags: ['赛博朋克', '升格', '夜景'],
    remix: 1284,
    likes: 8920,
    official: true,
    aspect: '9/14',
  },
  {
    id: 'f2',
    title: '白鹿图',
    duration: '01:12',
    author: { name: '水墨不二', avatar: 'linear-gradient(135deg,#8EC5FC,#E0C3FC)' },
    cover: svgPlaceholder('白鹿图', 600, 750, '#4A5568', '#CBD5E0', '#F7FAFC'),
    prompt: '水墨风格，一只白鹿在竹林雾气中漫步，镜头缓慢横移，枝叶随风颤动，光线从顶部漏下形成丁达尔效应',
    tags: ['水墨', '长镜头', '自然'],
    remix: 342,
    likes: 5621,
    official: true,
    aspect: '4/5',
  },
  {
    id: 'f3',
    title: '皮克斯美发店',
    duration: '00:32',
    author: { name: 'Studio_K', avatar: 'linear-gradient(135deg,#FFA751,#FFE259)' },
    cover: svgPlaceholder('Pixar Shop', 600, 600, '#FF6B35', '#F7931E', '#FFD166'),
    prompt: '皮克斯3D动画风格，一只柴犬坐在美发店椅子上，表情紧张，美发师是个戴眼镜的章鱼，温暖灯光',
    tags: ['皮克斯', '3D动画', '幽默'],
    remix: 892,
    likes: 12340,
    aspect: '1/1',
  },
  {
    id: 'f4',
    title: '一镜到底 · 菜市场',
    duration: '01:45',
    author: { name: '老王摄影', avatar: 'linear-gradient(135deg,#667EEA,#764BA2)' },
    cover: svgPlaceholder('菜市场', 600, 800, '#D97706', '#DC2626', '#991B1B'),
    prompt: '一镜到底跟拍，早晨的潮汕菜市场，从卖海鲜的老伯镜头穿过拥挤人群，到卖粿条的阿姨摊前，烟雾缭绕，写实纪录片风格',
    tags: ['一镜到底', '纪录片', '烟火气'],
    remix: 567,
    likes: 7823,
    aspect: '3/4',
  },
  {
    id: 'f5',
    title: 'Studio Ghibli · 飞行少女',
    duration: '00:56',
    author: { name: '宫崎粉', avatar: 'linear-gradient(135deg,#43E97B,#38F9D7)' },
    cover: svgPlaceholder('飞行少女', 600, 850, '#0EA5E9', '#6EE7B7', '#FEF3C7'),
    prompt: '吉卜力动画风格，一个扎双马尾的少女骑着扫帚飞越云海，夕阳金光洒在云朵上，远处有风车和绿色丘陵',
    tags: ['吉卜力', '动画', '治愈'],
    remix: 2103,
    likes: 15600,
    official: true,
    aspect: '3/5',
  },
  {
    id: 'f6',
    title: '赛博朋克 · 面条店',
    duration: '00:40',
    author: { name: 'Neo_2077', avatar: 'linear-gradient(135deg,#EC4899,#8B5CF6)' },
    cover: svgPlaceholder('赛博面店', 600, 900, '#581C87', '#EC4899', '#06B6D4'),
    prompt: '赛博朋克风格，狭窄的后巷面条店，一个机械义肢的厨师在煮拉面，顾客是戴头显的朋克青年，蒸汽弥漫',
    tags: ['赛博朋克', '氛围', '夜市'],
    remix: 743,
    likes: 9210,
    aspect: '2/3',
  },
  {
    id: 'f7',
    title: '海底列车',
    duration: '01:08',
    author: { name: '幻想工厂', avatar: 'linear-gradient(135deg,#4FACFE,#00F2FE)' },
    cover: svgPlaceholder('海底列车', 600, 700, '#0C4A6E', '#0284C7', '#BAE6FD'),
    prompt: '一列玻璃顶列车穿行海底，鲸鱼在车顶游过，柔光渲染，梦幻氛围，儿童插画质感',
    tags: ['奇幻', '治愈', '童话'],
    remix: 412,
    likes: 6043,
    aspect: '6/7',
  },
  {
    id: 'f8',
    title: '武侠 · 雨中剑客',
    duration: '00:52',
    author: { name: '江湖子', avatar: 'linear-gradient(135deg,#434343,#000000)' },
    cover: svgPlaceholder('雨中剑客', 600, 900, '#1F2937', '#6B7280', '#9CA3AF'),
    prompt: '武侠风格，一位白衣剑客在暴雨中立于石桥，远景拉近，剑尖滴水，慢动作拍摄，黑白略带青色',
    tags: ['武侠', '慢动作', '黑白'],
    remix: 289,
    likes: 4782,
    aspect: '2/3',
  },
];

// Decomposition (可拆解元素) - shown in featured card
const FEATURED_DECOMPOSE = {
  f1: [
    { kind: 'character', name: '机械义肢女孩', thumb: svgPlaceholder('char', 100, 100, '#EC4899', '#8B5CF6') },
    { kind: 'scene', name: '雨夜涩谷', thumb: svgPlaceholder('scene', 100, 100, '#1E3A8A', '#F5AF19') },
    { kind: 'lens', name: '升格 + 车内POV', thumb: svgPlaceholder('lens', 100, 100, '#06B6D4', '#8B5CF6') },
    { kind: 'style', name: '霓虹赛博', thumb: svgPlaceholder('style', 100, 100, '#E94560', '#F5AF19') },
  ],
};

// === Characters
const CHARACTERS = [
  { id: 'c1', name: '机甲少女 · 伊芙', tags: ['科幻', '角色'], likes: 3201, img: svgPlaceholder('Eve', 500, 500, '#667EEA', '#F093FB'), prompt: '银白短发机甲少女，赛博朋克，冷光' },
  { id: 'c2', name: '水墨狐仙', tags: ['水墨', '东方'], likes: 2109, img: svgPlaceholder('狐仙', 500, 500, '#F5F5F5', '#718096'), prompt: '九尾白狐人形，素衣，朦胧水墨' },
  { id: 'c3', name: '蒸汽朋克船长', tags: ['蒸汽朋克'], likes: 1892, img: svgPlaceholder('船长', 500, 500, '#D97706', '#78350F'), prompt: '铜质义眼老船长，雾角，油画质感' },
  { id: 'c4', name: '皮克斯柴犬厨师', tags: ['皮克斯', '动物'], likes: 4502, img: svgPlaceholder('柴厨', 500, 500, '#FFA751', '#FF6B35'), prompt: '戴厨师帽柴犬，围裙，3D渲染' },
  { id: 'c5', name: '吉卜力邮差少年', tags: ['吉卜力'], likes: 2843, img: svgPlaceholder('邮差', 500, 500, '#6EE7B7', '#FEF3C7'), prompt: '骑自行车送信的少年，草原背景' },
  { id: 'c6', name: '武侠白衣剑客', tags: ['武侠'], likes: 1654, img: svgPlaceholder('剑客', 500, 500, '#1F2937', '#9CA3AF'), prompt: '飘逸白衣，手持长剑，竹林' },
  { id: 'c7', name: '霓虹女歌手', tags: ['赛博朋克'], likes: 3891, img: svgPlaceholder('歌手', 500, 500, '#EC4899', '#06B6D4'), prompt: '紫色长发，全息麦克风，雨夜舞台' },
  { id: 'c8', name: '童话兔子绅士', tags: ['童话', '动物'], likes: 1240, img: svgPlaceholder('兔先生', 500, 500, '#F472B6', '#FEF3C7'), prompt: '戴高帽西装兔，怀表，插画感' },
];

const PROPS = [
  { id: 'p1', name: '发光机械核心', tags: ['科幻'], likes: 1203, img: svgPlaceholder('Core', 400, 500, '#06B6D4', '#8B5CF6') },
  { id: 'p2', name: '古剑 · 秋水', tags: ['武侠'], likes: 892, img: svgPlaceholder('秋水', 400, 500, '#4A5568', '#CBD5E0') },
  { id: 'p3', name: '紫砂茶壶', tags: ['东方'], likes: 543, img: svgPlaceholder('紫砂', 400, 500, '#92400E', '#FED7AA') },
  { id: 'p4', name: '水晶麦克风', tags: ['赛博朋克'], likes: 1892, img: svgPlaceholder('Mic', 400, 500, '#EC4899', '#F472B6') },
  { id: 'p5', name: '铜制义眼', tags: ['蒸汽朋克'], likes: 721, img: svgPlaceholder('Eye', 400, 500, '#D97706', '#78350F') },
  { id: 'p6', name: '竹制风铃', tags: ['东方', '治愈'], likes: 1045, img: svgPlaceholder('风铃', 400, 500, '#6EE7B7', '#FEF3C7') },
  { id: 'p7', name: '悬浮魔法书', tags: ['奇幻'], likes: 1532, img: svgPlaceholder('Book', 400, 500, '#8B5CF6', '#F5AF19') },
  { id: 'p8', name: '老式相机', tags: ['复古'], likes: 876, img: svgPlaceholder('Camera', 400, 500, '#78350F', '#FEF3C7') },
];

const SCENES = [
  { id: 's1', name: '雨夜涩谷十字路口', tags: ['赛博朋克', '城市'], likes: 4203, img: svgPlaceholder('Shibuya', 640, 400, '#1E3A8A', '#E94560') },
  { id: 's2', name: '云海竹林', tags: ['东方', '自然'], likes: 2189, img: svgPlaceholder('竹林', 640, 400, '#065F46', '#A7F3D0') },
  { id: 's3', name: '废弃工厂', tags: ['废土'], likes: 1432, img: svgPlaceholder('工厂', 640, 400, '#44403C', '#FCA5A5') },
  { id: 's4', name: '海底水晶宫', tags: ['奇幻'], likes: 3421, img: svgPlaceholder('水晶宫', 640, 400, '#0C4A6E', '#BAE6FD') },
  { id: 's5', name: '潮汕菜市场', tags: ['纪录片', '烟火'], likes: 1654, img: svgPlaceholder('菜市场', 640, 400, '#D97706', '#991B1B') },
  { id: 's6', name: '极光下的森林', tags: ['自然'], likes: 2892, img: svgPlaceholder('极光', 640, 400, '#064E3B', '#A7F3D0') },
  { id: 's7', name: '蒸汽朋克飞艇港', tags: ['蒸汽朋克'], likes: 1823, img: svgPlaceholder('飞艇港', 640, 400, '#92400E', '#FED7AA') },
  { id: 's8', name: '沙漠绿洲黄昏', tags: ['自然'], likes: 1234, img: svgPlaceholder('绿洲', 640, 400, '#D97706', '#FEF3C7') },
];

// Lens / camera work
const LENSES = [
  { id: 'l1', name: '希区柯克变焦', tags: ['运镜'], likes: 892, img: svgPlaceholder('Dolly Zoom', 500, 500, '#1F2937', '#F472B6'), prompt: 'Dolly zoom 希区柯克变焦，紧张氛围' },
  { id: 'l2', name: '一镜到底长跟拍', tags: ['运镜'], likes: 1432, img: svgPlaceholder('Oner', 500, 500, '#7C3AED', '#F5AF19'), prompt: '一镜到底，跟拍主角穿越多个空间' },
  { id: 'l3', name: '升格慢动作', tags: ['运镜'], likes: 2103, img: svgPlaceholder('Slow-mo', 500, 500, '#06B6D4', '#EC4899'), prompt: '120fps升格拍摄，水滴飞溅' },
  { id: 'l4', name: '上帝视角俯拍', tags: ['运镜'], likes: 784, img: svgPlaceholder('God view', 500, 500, '#065F46', '#6EE7B7'), prompt: '无人机俯拍，上帝视角垂直下降' },
  { id: 'l5', name: 'POV第一人称', tags: ['运镜'], likes: 1245, img: svgPlaceholder('POV', 500, 500, '#991B1B', '#F472B6'), prompt: '手持POV第一人称视角' },
  { id: 'l6', name: '环绕镜头', tags: ['运镜'], likes: 934, img: svgPlaceholder('Orbit', 500, 500, '#5B21B6', '#06B6D4'), prompt: '360度环绕主角，电影感' },
  { id: 'l7', name: '荧幕边缘溢出', tags: ['运镜'], likes: 523, img: svgPlaceholder('Overflow', 500, 500, '#D97706', '#1F2937'), prompt: '物体从画框边缘溢出' },
  { id: 'l8', name: '希区柯克逆向推轨', tags: ['运镜'], likes: 612, img: svgPlaceholder('Reverse', 500, 500, '#0C4A6E', '#FEF3C7'), prompt: '推轨后退同时变焦拉近' },
];

const STYLES = [
  { id: 'st1', name: '赛博朋克 2077', tags: ['风格'], likes: 5892, img: svgPlaceholder('Cyberpunk', 500, 500, '#581C87', '#06B6D4') },
  { id: 'st2', name: '吉卜力水彩', tags: ['风格'], likes: 6420, img: svgPlaceholder('Ghibli', 500, 500, '#0EA5E9', '#FEF3C7') },
  { id: 'st3', name: '皮克斯3D', tags: ['风格'], likes: 7312, img: svgPlaceholder('Pixar', 500, 500, '#FFA751', '#FFE259') },
  { id: 'st4', name: '国风水墨', tags: ['风格'], likes: 3421, img: svgPlaceholder('Ink', 500, 500, '#F5F5F5', '#4A5568') },
  { id: 'st5', name: '油画印象派', tags: ['风格'], likes: 2109, img: svgPlaceholder('Oil', 500, 500, '#D97706', '#065F46') },
  { id: 'st6', name: 'Wes Anderson 对称', tags: ['风格'], likes: 4203, img: svgPlaceholder('Wes', 500, 500, '#EC4899', '#FEF3C7') },
  { id: 'st7', name: '胶片颗粒复古', tags: ['风格'], likes: 1892, img: svgPlaceholder('Film', 500, 500, '#78350F', '#F59E0B') },
  { id: 'st8', name: '黑白默片', tags: ['风格'], likes: 934, img: svgPlaceholder('BW', 500, 500, '#1F2937', '#9CA3AF') },
];

// Remix chains
const REMIXES = [
  { id: 'r1', name: '从「霓虹东京」衍生', variants: 42, likes: 1840, img: svgPlaceholder('Remix 42', 500, 700, '#E94560', '#F5AF19'), prompt: '被改成各种城市版本' },
  { id: 'r2', name: '皮克斯柴犬→熊猫', variants: 28, likes: 1203, img: svgPlaceholder('Panda', 500, 600, '#FFA751', '#38F9D7'), prompt: '把柴犬换成熊猫版本' },
  { id: 'r3', name: '白鹿图 四季版', variants: 18, likes: 892, img: svgPlaceholder('Seasons', 500, 800, '#065F46', '#FEF3C7'), prompt: '春夏秋冬四季白鹿' },
  { id: 'r4', name: '一镜到底 · 城市变体', variants: 64, likes: 2103, img: svgPlaceholder('Cities', 500, 650, '#D97706', '#8B5CF6'), prompt: '不同城市的菜市场版本' },
  { id: 'r5', name: '赛博面店 × 各国料理', variants: 31, likes: 1432, img: svgPlaceholder('Ramen', 500, 750, '#EC4899', '#06B6D4'), prompt: '墨西哥卷饼/意面/越南粉版本' },
];

// Prompt templates
const PROMPTS = [
  { id: 'pt1', name: '史诗开场三连镜', tags: ['模板', '开场'], likes: 2103, prompt: '[远景] 日出中的城堡剪影 → [中景] 城门缓缓打开 → [特写] 骑士眼神坚定，史诗交响乐，电影调色' },
  { id: 'pt2', name: '悬疑追逐', tags: ['模板'], likes: 1892, prompt: '[手持跟拍] 主角在狭窄巷弄奔跑 → [过肩镜头] 身后追踪者模糊身影 → [低角度] 跳过矮墙，雨夜氛围' },
  { id: 'pt3', name: 'Vlog 生活随拍', tags: ['模板'], likes: 3421, prompt: '[自然光] 晨起泡咖啡 → [POV] 走向阳台 → [俯拍] 街景早安，温暖调色' },
  { id: 'pt4', name: '产品展示 360°', tags: ['模板', '商业'], likes: 4502, prompt: '产品在旋转台上360度环绕，干净白背景，柔光，无障碍全貌展示' },
  { id: 'pt5', name: '情绪片段 · 离别', tags: ['模板'], likes: 1543, prompt: '[特写] 眼泪滑落 → [中景] 挥手告别 → [拉远远景] 背影渐远，钢琴配乐' },
  { id: 'pt6', name: '美食广告', tags: ['模板', '商业'], likes: 2840, prompt: '[升格] 酱汁倾倒 → [宏观] 食材纹理 → [慢推] 最终成品，金色暖光' },
];

window.__INSP_DATA__ = {
  INSPIRATION_TABS,
  FEATURED_WORKS,
  FEATURED_DECOMPOSE,
  CHARACTERS,
  PROPS,
  SCENES,
  LENSES,
  STYLES,
  REMIXES,
  PROMPTS,
  svgPlaceholder,
};
