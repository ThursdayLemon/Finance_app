# 储蓄教练 · PWA

一个静态站点，就这几个文件，没有构建步骤。

## 传到 GitHub Pages

1. 在 github.com 新建一个仓库（**Public** —— 免费账号只有公开仓库能开 Pages）
2. 把**这个文件夹里的所有文件**拖进去（Add file → Upload files → 拖 → Commit）
3. Settings → Pages → Source 选 **Deploy from a branch**，分支 `main`，目录 `/ (root)`
4. 等一两分钟，网址是 `https://<你的用户名>.github.io/<仓库名>/`

手机 Safari 打开这个网址 → 分享 → **添加到主屏幕**。

## 之后要更新

只需要重新上传 `index.html`（其他文件不用动）。传完手机上刷新一下就是新版。
Service Worker 是「先拿网络、拿不到再用缓存」，所以不会被旧版本卡住。

## 文件

| 文件 | 作用 |
|---|---|
| `index.html` | 整个 app，单文件，纯前端 |
| `manifest.webmanifest` | 应用名、图标、全屏方式 |
| `sw.js` | 离线缓存 |
| `icon-192.png` / `icon-512.png` | 安卓和 manifest 用 |
| `apple-touch-icon.png` | iOS 主屏幕图标（180×180） |

## 数据在哪

在**你手机浏览器的本地存储**里，键名 `savingcoach.v1`。不上传任何地方，
GitHub 和我都看不到。所以：

- 换手机、清缓存之前，先在「我 → 你的数据 → 导出备份」存一份
- 网址一旦定了就别改 —— 浏览器按网址隔离存储，换域名等于换了一个 app
