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
  { id: 'story', label: '故事设计', icon: 'quote', count: 412 },
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

// === Characters — 前 4 个为真实古风角色立绘，c5-c8 复用同组立绘（MVP 演示完整 8 位）
const CHARACTERS = [
  { id: 'c1', name: '冷霜', tags: ['古风', '女侠', '清冷'], likes: 4821, img: './characters/lengshuang.jpg', fit: 'contain', prompt: '白衣高束发女子，湖蓝腰带，胸前黑玉佩，袖口银色裂纹纹饰，气质冷冽' },
  { id: 'c2', name: '沧溟', tags: ['古风', '异族', '邪魅'], likes: 3960, img: './characters/cangming.jpg', fit: 'contain', prompt: '银白长发赤膊男性，双耳戴粉色贝壳饰品，胸口图腾纹身，黑色宽松长裤' },
  { id: 'c3', name: '柳青', tags: ['古风', '剑修', '儒雅'], likes: 5104, img: './characters/liuqing.jpg', fit: 'contain', prompt: '白色长袍内搭湖蓝襦裙，青色祥云纹，头顶黑色蛇形发簪，黑靴，气质儒雅邪性' },
  { id: 'c4', name: '长老', tags: ['古风', '长辈', '威严'], likes: 3207, img: './characters/zhanglao.jpg', fit: 'contain', prompt: '银白长发额前蓝色印记，深蓝长袍白色交领，铜扣腰带，米色厚底长靴' },
  { id: 'c5', name: '冷霜（雪落式）', tags: ['古风', '女侠'], likes: 2410, img: './characters/lengshuang.jpg', fit: 'contain', prompt: '白衣高束发女子，雪夜出剑姿态，袖口银线流光，寒气四溢' },
  { id: 'c6', name: '沧溟（渊海式）', tags: ['古风', '异族'], likes: 2188, img: './characters/cangming.jpg', fit: 'contain', prompt: '银白长发男子，耳饰珊瑚贝壳，胸口图腾亮起微光，海潮涌动背景' },
  { id: 'c7', name: '柳青（青锋式）', tags: ['古风', '剑修'], likes: 3045, img: './characters/liuqing.jpg', fit: 'contain', prompt: '白袍剑修，湖蓝内衬，青色祥云纹，发间蛇形玉簪，手握长剑' },
  { id: 'c8', name: '长老（镇岳式）', tags: ['古风', '长辈'], likes: 1920, img: './characters/zhanglao.jpg', fit: 'contain', prompt: '银发长者，额前蓝色印记若隐若现，深蓝长袍沉稳站立' },
];

// 道具 / 场景 / 镜头：复用 TapTV covers 作为真实参考图（MVP 演示）
// — 同一组图在不同 tab 承担不同角色：cover 是场景，裁切中心是道具，构图是镜头
const PROPS = [
  { id: 'p1', name: '发光机械核心', tags: ['科幻'], likes: 1203, img: './covers/cover-1.jpg', prompt: '金属幽蓝走廊核心光源，蓝白高对比，赛博感' },
  { id: 'p2', name: '港式霓虹茶楼灯', tags: ['港风'], likes: 892, img: './covers/cover-2.jpg', prompt: '老茶楼吊灯，暖黄光晕，玻璃反光，烟火气' },
  { id: 'p3', name: '军官面具', tags: ['战争'], likes: 1543, img: './covers/cover-3.jpg', prompt: '防毒面具特写，金属质感，冷蓝调' },
  { id: 'p4', name: '金色派皮字', tags: ['复古', '平面'], likes: 721, img: './covers/cover-4.jpg', prompt: '烘焙字母拼接海报，暖棕色调，美食质感' },
  { id: 'p5', name: '霓虹招牌', tags: ['美式复古'], likes: 1045, img: './covers/cover-5.jpg', prompt: '红色霓虹灯招牌，50 年代美式字体，蓝天对比' },
  { id: 'p6', name: '红色鬼面具', tags: ['日漫', '战斗'], likes: 1532, img: './covers/cover-6.jpg', prompt: '日式妖怪鬼面，朱红漆色，金纹装饰' },
  { id: 'p7', name: '百叶窗', tags: ['悬疑'], likes: 876, img: './covers/cover-7.jpg', prompt: '水平百叶窗，光影切割人脸，心理悬疑' },
  { id: 'p8', name: '毛笔字幅', tags: ['手绘', '温情'], likes: 2103, img: './covers/cover-8.jpg', prompt: '黄纸毛笔书法字，墨迹浓淡，手写温度' },
];

const SCENES = [
  { id: 's1', name: '金属幽蓝走廊', tags: ['赛博朋克', '科幻'], likes: 4203, img: './covers/cover-1.jpg', prompt: '长廊深处蓝冷光源，金属反光，极致透视' },
  { id: 's2', name: '港式老茶楼', tags: ['港风', '烟火'], likes: 2189, img: './covers/cover-2.jpg', prompt: '木桌铜壶，吊顶暖灯，窗外橘猫俯视' },
  { id: 's3', name: '末世军事地堡', tags: ['战争', '末世'], likes: 1432, img: './covers/cover-3.jpg', prompt: '冷蓝钢铁地堡，顶光硬阴影，压迫感' },
  { id: 's4', name: '复古美式郊区', tags: ['美式复古'], likes: 3421, img: './covers/cover-5.jpg', prompt: '50 年代排屋，蓝天白云，霓虹招牌点缀' },
  { id: 's5', name: '异界战斗空间', tags: ['日漫', '异界'], likes: 1654, img: './covers/cover-6.jpg', prompt: '朱红狂风漫画感，少年与妖怪对峙' },
  { id: 's6', name: '百叶窗镜廊', tags: ['悬疑', '心理'], likes: 2892, img: './covers/cover-7.jpg', prompt: '多扇百叶窗叠加，女孩面孔递进，心理空间' },
  { id: 's7', name: '火星废土天文台', tags: ['末世', '科幻'], likes: 1823, img: './covers/cover-9.jpg', prompt: '血红地平线锈迹穹顶，孤寂末世感' },
  { id: 's8', name: '十字架墓园', tags: ['暗黑', '史诗'], likes: 1234, img: './covers/cover-11.jpg', prompt: '白色十字架海洋，紫色暗调，大提琴独奏' },
];

// Lens / camera work — 复用 covers 作为镜头语言参考图
const LENSES = [
  { id: 'l1', name: '深焦透视走廊', tags: ['构图'], likes: 892, img: './covers/cover-1.jpg', prompt: '极致中心透视，灭点居中，深焦长走廊，强压缩感' },
  { id: 'l2', name: '高机位观察视角', tags: ['视角'], likes: 1432, img: './covers/cover-2.jpg', prompt: '橘猫高机位俯视，上帝视角观察生活流' },
  { id: 'l3', name: '低角度仰拍', tags: ['运镜'], likes: 2103, img: './covers/cover-3.jpg', prompt: '低角度仰拍军官，顶光勾轮廓，压迫感十足' },
  { id: 'l4', name: '对称构图', tags: ['构图'], likes: 784, img: './covers/cover-5.jpg', prompt: '中轴对称构图，Wes Anderson 风格，色块平衡' },
  { id: 'l5', name: '特写面部递进', tags: ['运镜'], likes: 1245, img: './covers/cover-7.jpg', prompt: '多个特写叠化递进，心理镜头语言，百叶窗切割' },
  { id: 'l6', name: '宏大广角远景', tags: ['构图'], likes: 934, img: './covers/cover-9.jpg', prompt: '超广角末世远景，人物渺小，地平线压低' },
  { id: 'l7', name: '群像中景', tags: ['构图'], likes: 523, img: './covers/cover-12.jpg', prompt: '三人群像中景，三分法构图，硝烟弥漫背景' },
  { id: 'l8', name: '升格慢动作', tags: ['运镜'], likes: 612, img: './covers/cover-10.jpg', prompt: '120fps 升格拍摄，爆炸碎片飞溅，时间凝固感' },
];

// 故事设计 — 优质故事 prompt (竖卡片)
const STORIES = [
  {
    id: 'story-1', name: '归途 · 末世老兵',
    cover: './covers/cover-3.jpg',
    genre: '末世 · 战争',
    duration: '3-5 分钟',
    acts: 3,
    tags: ['英雄之旅', '救赎', '独白'],
    likes: 3420,
    prompt: '老兵摘下防毒面具，在废弃地堡角落里发现一本泛黄照片册。第一幕：妻子的笑脸与末世空镜交叉剪辑。第二幕：向地表攀爬的漫长过程，途中与一只瘦骨流浪狗结伴。第三幕：抵达家园，却只剩焦黑墙壁——老兵把照片轻轻压在断墙下，转身走向远方。',
  },
  {
    id: 'story-2', name: '擦肩 · 地铁的三分钟',
    cover: './covers/cover-1.jpg',
    genre: '都市 · 爱情',
    duration: '1-2 分钟',
    acts: 3,
    tags: ['双线', '蒙太奇', '错过'],
    likes: 5812,
    prompt: '两条平行叙事：A 在地铁通道奔跑；B 在另一列车厢翻看一本旧书。关键节点在换乘站台：两人错身而过，B 的书页被气流吹散，A 捡起其中一页但未认出人。结尾 A 将那页纸夹进自己的笔记本，两人各自远去——纸页上写着他们共同的大学座位编号。',
  },
  {
    id: 'story-3', name: '茶楼 · 第七代掌柜',
    cover: './covers/cover-2.jpg',
    genre: '港风 · 纪实',
    duration: '2-3 分钟',
    acts: 3,
    tags: ['传承', '生活流', '慢节奏'],
    likes: 2890,
    prompt: '清晨港式茶楼开张。老掌柜摩挲着父亲传下的铜壶，与常客们用粤语闲聊家事。孙女从国外归来，带来咖啡豆想改造茶楼——祖孙隔着柜台争执。深夜打烊后，孙女独自坐在空茶楼里，泡了一壶父亲最爱的普洱。第二天早晨，茶楼门口多了一块新招牌：「陈记 · 第七代」。',
  },
  {
    id: 'story-4', name: '镜渊 · 一人分饰六角',
    cover: './covers/cover-7.jpg',
    genre: '悬疑 · 心理',
    duration: '4-6 分钟',
    acts: 5,
    tags: ['反转', '身份', '蒙太奇'],
    likes: 4203,
    prompt: '心理治疗师日记式叙事。一位来访者描述家中有六位身份迥异的「室友」。每集以一面镜子切入，镜中映出不同版本的她。第五幕真相揭晓：六个身份源自童年的一场交通事故——六位亲人在一瞬间消失。最终她选择留下其中一位「奶奶」继续陪伴自己，镜子逐一熄灭。',
  },
  {
    id: 'story-5', name: '纸手机 · 给外公的最后一通',
    cover: './covers/cover-8.jpg',
    genre: '家庭 · 温情',
    duration: '2-3 分钟',
    acts: 3,
    tags: ['代际', '和解', '仪式感'],
    likes: 7140,
    prompt: '奶奶在葬礼后开始每天给去世的外公"打电话"——用一台孙女手工折的黄纸手机。孙女起初觉得荒唐，陪伴几天后发现奶奶每次都会讲起外公年轻时的故事。最后一场戏：孙女接过纸手机，第一次主动打给外公，讲述自己今天的恋爱烦恼。镜头拉远，纸手机的"信号灯"轻轻亮起。',
  },
  {
    id: 'story-6', name: 'CRASH LAND · 小狐狸与婴儿',
    cover: './covers/cover-10.jpg',
    genre: '童话 · 太空',
    duration: '3-4 分钟',
    acts: 3,
    tags: ['救赎', '陪伴', '卡通 3D'],
    likes: 5230,
    prompt: '破碎星球上，一只失去家人的小狐狸捡到一个哭泣的婴儿舱。第一幕：小狐狸用尾巴围住婴儿取暖，发现舱内屏幕指示着一颗遥远母星。第二幕：两人踏上徒步穿越断裂地壳的冒险，途中遇到各种奇异生物。第三幕：抵达唯一的旧货飞船，小狐狸毫不犹豫地把婴儿送上船——自己选择留在废墟上，目送火光离开。',
  },
  {
    id: 'story-7', name: '最后的安魂曲',
    cover: './covers/cover-11.jpg',
    genre: '史诗 · 暗黑',
    duration: '5-7 分钟',
    acts: 4,
    tags: ['配乐驱动', '群像', '独奏'],
    likes: 2450,
    prompt: '一位大提琴独奏者受邀在万人墓园演奏告别曲。闪回：她的丈夫是军乐团指挥，战争中阵亡。第二幕：演奏过程中，墓碑之间渐渐浮现出每位逝者生前最爱的瞬间（婚礼、孩子出生、简单的一杯咖啡）。第三幕：最后一个音符落下，镜头拉升为上帝视角，十字架如星辰般点亮。',
  },
  {
    id: 'story-8', name: '火葬空间 · 少年与鬼',
    cover: './covers/cover-6.jpg',
    genre: '日漫 · 异界',
    duration: '4-6 分钟',
    acts: 5,
    tags: ['战斗', '羁绊', '成长'],
    likes: 3880,
    prompt: '少年误入「火葬空间」——一个人类记忆被焚化的异界中转站。他被告知只要战胜七只记忆之鬼，就能保留妹妹去世前的最后一段对话。每一战他都会失去一部分自己的记忆作为代价。最终 BOSS 竟是他妹妹的亡魂化身，少年放下武器，选择让自己被遗忘——换妹妹的记忆完整地留在这个世界。',
  },
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
  STORIES,
  STYLES,
  REMIXES,
  PROMPTS,
  svgPlaceholder,
  buildDetail,
};
