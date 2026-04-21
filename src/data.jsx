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

// === Featured works (TapTV 社区作品封面)
// 统一 16:9 横图，cover 指向 /covers/cover-N.jpg
const FEATURED_WORKS = [
  {
    id: 'f1',
    title: '提示词 Prompt',
    duration: '00:58',
    author: { name: '假想核儿', avatar: 'linear-gradient(135deg,#FF6B9D,#C06EFF)' },
    cover: './covers/cover-1.jpg',
    prompt: '金属幽蓝走廊里一对年轻男女紧紧相拥亲吻，画面左侧"PROMPT 提示词"大字浮现，电影级光感，情感张力爆棚',
    tags: ['都市', '爱情', '剧情'],
    remix: 12,
    likes: 70,
    aspect: '16/9',
  },
  {
    id: 'f2',
    title: '【SIGN】What Comes After Curiosity?',
    duration: '01:34',
    author: { name: 'DiDi_OK', avatar: 'linear-gradient(135deg,#FFA751,#FFE259)' },
    cover: './covers/cover-2.jpg',
    prompt: '港式老茶楼内几位长者围桌闲谈，窗外一只橘猫俯视众生，玻璃上"SIGN"字样若隐若现，生活流观察',
    tags: ['港风', '烟火', '慢节奏'],
    remix: 240,
    likes: 1499,
    official: true,
    aspect: '16/9',
  },
  {
    id: 'f3',
    title: 'ACHERON · Surviving Military Bunker',
    duration: '00:42',
    author: { name: 'zooilabs', avatar: 'linear-gradient(135deg,#667EEA,#1F2937)' },
    cover: './covers/cover-3.jpg',
    prompt: '戴着防毒面具的军官在顶光下缓缓抬起军帽，冷蓝色调，压迫感十足，史诗战争片风格',
    tags: ['战争', '末世', '角色'],
    remix: 2,
    likes: 5,
    aspect: '16/9',
  },
  {
    id: 'f4',
    title: 'Lost Signal',
    duration: '00:15',
    author: { name: 'CodyMalick', avatar: 'linear-gradient(135deg,#D97706,#FED7AA)' },
    cover: './covers/cover-4.jpg',
    prompt: '复古海报设计，"LOST SIGNAL"字样由金色派皮烘烤拼成，质感细腻，暖棕色调，创意平面',
    tags: ['复古', '平面', '创意'],
    remix: 1,
    likes: 3,
    aspect: '16/9',
  },
  {
    id: 'f5',
    title: 'Hello There',
    duration: '00:36',
    author: { name: 'lion', avatar: 'linear-gradient(135deg,#8EC5FC,#E0C3FC)' },
    cover: './covers/cover-5.jpg',
    prompt: '美国 50 年代郊区街景，排屋整齐，蓝天白云，中央"Hello There"红色霓虹招牌张扬又温馨',
    tags: ['美式复古', '招牌', '郊区'],
    remix: 5,
    likes: 28,
    aspect: '16/9',
  },
  {
    id: 'f6',
    title: '火葬空间',
    duration: '01:12',
    author: { name: 'yachimat', avatar: 'linear-gradient(135deg,#991B1B,#F5F5F5)' },
    cover: './covers/cover-6.jpg',
    prompt: '日式漫画风格，少年手执兵器面对巨大红色鬼面，"火葬空间"书法体压顶，二次元战斗氛围拉满',
    tags: ['日漫', '战斗', '异界'],
    remix: 3,
    likes: 14,
    aspect: '16/9',
  },
  {
    id: 'f7',
    title: '镜渊 | The Dream Abyss',
    duration: '00:48',
    author: { name: 'WildPusa野菩萨', avatar: 'linear-gradient(135deg,#4A5568,#CBD5E0)' },
    cover: './covers/cover-7.jpg',
    prompt: '多个相同面孔的女孩依次排列在百叶窗后方，面部特写递进，心理悬疑氛围浓厚',
    tags: ['悬疑', '心理', '惊悚'],
    remix: 8,
    likes: 44,
    aspect: '16/9',
  },
  {
    id: 'f8',
    title: '纸手机',
    duration: '02:10',
    author: { name: '李婷Team', avatar: 'linear-gradient(135deg,#FEF3C7,#D97706)' },
    cover: './covers/cover-8.jpg',
    prompt: '黄纸手绘风格，画面主体是少年肖像与"让爱延续"毛笔字，右侧排布导演/编剧/制片信息栏',
    tags: ['手绘', '家庭', '温情'],
    remix: 42,
    likes: 383,
    official: true,
    aspect: '16/9',
  },
  {
    id: 'f9',
    title: 'NO MINUTES WERE TAKEN',
    duration: '00:40',
    author: { name: 'Mika', avatar: 'linear-gradient(135deg,#DC2626,#78350F)' },
    cover: './covers/cover-9.jpg',
    prompt: '火星废土表面一座锈迹斑斑的天文台穹顶，大字"NO MINUTES WERE TAKEN"刻在血红色地平线上',
    tags: ['末世', '科幻', '火星'],
    remix: 2,
    likes: 16,
    aspect: '16/9',
  },
  {
    id: 'f10',
    title: 'CRASH LAND',
    duration: '00:33',
    author: { name: 'KUNC', avatar: 'linear-gradient(135deg,#FFA751,#38F9D7)' },
    cover: './covers/cover-10.jpg',
    prompt: '卡通 3D 风格，小狐狸与婴儿角色并肩立于破碎星球之上，中央巨大"CRASH LAND"字样，奇幻太空童话',
    tags: ['卡通', '太空', '童话'],
    remix: 7,
    likes: 52,
    aspect: '16/9',
  },
  {
    id: 'f11',
    title: 'THE LAST Requiem · 最后的安魂曲',
    duration: '01:20',
    author: { name: '橙橙子', avatar: 'linear-gradient(135deg,#5B21B6,#CBD5E0)' },
    cover: './covers/cover-11.jpg',
    prompt: '一片望不到头的白色十字架墓地，独奏者在其间演奏大提琴，紫色暗调，史诗苍凉',
    tags: ['暗黑', '配乐', '史诗'],
    remix: 11,
    likes: 89,
    aspect: '16/9',
  },
  {
    id: 'f12',
    title: 'ACHERON · Trinity',
    duration: '00:55',
    author: { name: 'zooilabs', avatar: 'linear-gradient(135deg,#78350F,#1F2937)' },
    cover: './covers/cover-12.jpg',
    prompt: '战争废墟中的三位士兵群像，复古电影调色，硝烟弥漫，镜头缓慢推近，历史感厚重',
    tags: ['战争', '群像', '纪录'],
    remix: 4,
    likes: 21,
    aspect: '16/9',
  },
];

// Featured 模块已改为统一横图网格，不再有 hero 拆解卡；保留空对象供组件兼容
const FEATURED_DECOMPOSE = {};

// === Characters — 前 4 个为真实古风角色立绘 (fit:contain 保留全身)；c5-c8 为占位
const CHARACTERS = [
  { id: 'c1', name: '冷霜', tags: ['古风', '女侠', '清冷'], likes: 4821, img: './characters/lengshuang.jpg', fit: 'contain', prompt: '白衣高束发女子，湖蓝腰带，胸前黑玉佩，袖口银色裂纹纹饰，气质冷冽' },
  { id: 'c2', name: '沧溟', tags: ['古风', '异族', '邪魅'], likes: 3960, img: './characters/cangming.jpg', fit: 'contain', prompt: '银白长发赤膊男性，双耳戴粉色贝壳饰品，胸口图腾纹身，黑色宽松长裤' },
  { id: 'c3', name: '柳青', tags: ['古风', '剑修', '儒雅'], likes: 5104, img: './characters/liuqing.jpg', fit: 'contain', prompt: '白色长袍内搭湖蓝襦裙，青色祥云纹，头顶黑色蛇形发簪，黑靴，气质儒雅邪性' },
  { id: 'c4', name: '长老', tags: ['古风', '长辈', '威严'], likes: 3207, img: './characters/zhanglao.jpg', fit: 'contain', prompt: '银白长发额前蓝色印记，深蓝长袍白色交领，铜扣腰带，米色厚底长靴' },
  { id: 'c5', name: '吉卜力邮差少年', tags: ['吉卜力'], likes: 2843, img: svgPlaceholder('邮差', 500, 500, '#6EE7B7', '#FEF3C7'), prompt: '骑自行车送信的少年，草原背景' },
  { id: 'c6', name: '霓虹女歌手', tags: ['赛博朋克'], likes: 3891, img: svgPlaceholder('歌手', 500, 500, '#EC4899', '#06B6D4'), prompt: '紫色长发，全息麦克风，雨夜舞台' },
  { id: 'c7', name: '机甲少女 · 伊芙', tags: ['科幻'], likes: 3201, img: svgPlaceholder('Eve', 500, 500, '#667EEA', '#F093FB'), prompt: '银白短发机甲少女，赛博朋克，冷光' },
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

// === Detail 构造：为每个作品派生"灵感配方"详情数据（MVP 共用模板）
// 每次调用按 item 组合：创作者信息 / 角色 / 场景 / 中间帧 / 创作背景 / know-how
const buildDetail = (item) => {
  // 简单按 tags 选 3 个角色 + 2 个场景（循环 mod 取，保证稳定）
  const idx = parseInt(item.id.replace('f',''), 10) || 1;
  const pick = (arr, n) => Array.from({length: n}, (_, i) => arr[(idx + i) % arr.length]);
  return {
    creator: {
      name: item.author.name,
      avatar: item.author.avatar,
      bio: `AI 影像创作者 · 擅长「${item.tags[0]}」题材`,
      works: 4 + (idx * 3) % 40,
      followers: 120 + (idx * 47) % 2400,
    },
    background: `「${item.title}」灵感来自创作者对${item.tags[0]}题材的个人叙事表达。${item.prompt}。作品通过镜头语言与氛围光影的平衡，让观众在 ${item.duration} 内完成一次情绪抵达。`,
    characters: pick(CHARACTERS, 3),
    scenes: pick(SCENES, 2),
    // MVP：用 cover 复用作中间帧占位（3 张）
    keyframes: [item.cover, item.cover, item.cover],
    knowhow: [
      { title: '镜头', tip: '低机位 + 长焦压缩空间感，主角占据黄金分割点' },
      { title: '光影', tip: '顶光勾轮廓 + 底部冷色补光，避免面部过曝' },
      { title: '配色', tip: `主调 2-3 种，参考${item.tags[0]}常用色板` },
      { title: '节奏', tip: `前 3 秒必须抓住注意力，${item.duration} 内完成情绪起承转合` },
    ],
  };
};

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
  buildDetail,
};
