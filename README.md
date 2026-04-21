# 小云雀 · 灵感模块

小云雀 AI 视频创作的「灵感模块」H5 Demo。

## 技术栈

- React 18（CDN UMD）
- Babel Standalone（浏览器内 JSX 实时编译）
- 无构建、零依赖，纯静态站点

## 本地预览

```bash
# 任选一种本地静态服务器
python3 -m http.server 8000
# 或
npx serve .
```

打开 http://localhost:8000

## 目录

```
index.html           # 入口
styles.css           # 全局样式
src/
  app.jsx            # 主编排
  sidebar.jsx        # 左侧导航
  composer.jsx       # 顶部输入区
  feature-row.jsx    # 功能卡片行
  inspiration.jsx    # 灵感流容器
  inspiration-card.jsx
  data.jsx           # mock 数据
  placeholders.jsx   # 占位图
  tweaks.jsx         # 可视化微调面板
covers/              # 作品封面图 (12 张横图)
screenshots/         # 设计参考截图
```

## 部署

代码仓库私有，通过 Vercel 部署到公开 URL。
