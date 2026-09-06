# 《我在大宋打工》v1.0 + v2 美术素材

本目录严格按最新版 `03-美术需求稿.md` 制作。v1 原清单 14 张全部交付，另有 1 张城外乡集母版；v2 的 4 张必要图和 3 项锦上添花图也已全部完成，其中“三种出身”按 3 张独立半身像交付。

## 目录

- `master/`：24 张完整母版。场景、封面、结局为 1536×1024；5 张人物头像为 1024×1024。
- `runtime/`：8 张 720×110 横条；包含原 6 地点、城外草市和新增药铺。
- `source/PROMPTS.md`：统一风格、逐图提示词与返修约束记录。
- `ASSET_MANIFEST.md`：逐项清单、规格和用途对应关系。
- `CHECKSUMS.sha256`：全部 32 张 PNG 及文档的 SHA-256 校验值。

## 接入 `game.html`

`game.html` 中已经有 `ART_OVERRIDE` 接口。若保持外部图片形式，可写为：

```js
const ART_OVERRIDE = {
  home: "assets/art/runtime/home.png",
  yamen: "assets/art/runtime/yamen.png",
  market: "assets/art/runtime/market.png",
  dock: "assets/art/runtime/dock.png",
  casino: "assets/art/runtime/casino.png",
  tea: "assets/art/runtime/tea.png",
  rural: "assets/art/runtime/rural.png"
};
```

`runtime/pharmacy.png` 已准备好，但当前 `game.html` 的 `ART` / `ART_OVERRIDE` 尚无独立药铺键位。若必须继续保持单文件 HTML，可将所需图片转换为 base64 后填入对应键位。本次只完成美术交付，未改动 `game.html`。

## 制作约束

- 统一风格：北宋审美、水墨设色、宣纸肌理、低饱和赭石/靛蓝点色、细笔触与留白。
- 全部画面不含标题、说明文字、招牌字、印章或水印；万民伞仅用不可辨认的远景墨点表现密集姓名，避免生成可读伪字；标题后续用 CSS 字体叠加。
- 场景牌匾、幌子、纸张和证据均保持空白；封面及结局中的铁尺已做无铭文返修。
- 生成方式：Codex 内置 `imagegen`；尺寸归一与运行时横条使用无拉伸的中心裁切、等比重采样流程。
