# `imagegen` 提示词记录

生成模式：Codex 内置 `imagegen`。`02-city-panorama.png` 先作为风格母版，后续图片在同一任务中连续生成；人物与结局补充身份特征约束。

## 全局提示词

```text
Traditional Chinese ink wash painting (shuimo), Song dynasty aesthetic, aged rice-paper texture, elegant negative space, muted colors with subtle ochre and indigo accents, fine brushwork, no modern elements, no photorealism, no text.
Historically plausible Northern Song architecture, clothing, furniture, tools and boats. All banners, plaques, flags, boards, papers, walls and lanterns are blank. No characters, numbers, pseudo-writing, calligraphy, seals, logos or watermark.
Avoid: anime style, vibrant saturated colors, 3D render, photograph, modern clothing, text, watermark.
```

横向图统一增加：

```text
Exact 3:2 landscape composition intended for 1536×1024. Concentrate key silhouettes and props across the central horizontal band so a later 720×110 center crop remains readable.
```

人物头像统一增加：

```text
Exact square composition intended for 1024×1024. Waist-up three-quarter portrait, centered with generous blank rice-paper margins, anatomically coherent, exactly two normal hands.
```

## 逐图主提示词

1. `01-cover-opening.png`：沈砚立于北宋城门前；上方巨大空白欠据如乌云压城，纸面阴影中是手持算盘、冷笑的肥胖债主；顶部留出 CSS 标题区。
2. `02-city-panorama.png`：北宋河城横卷，运河货船、拱桥、灰瓦屋顶、木构店铺、远处城门与层叠薄雾。
3. `03-shen-yan-portrait.png`：年轻捕快沈砚，瘦削椭圆脸、直眉、黑巾帽、深靛蓝公服，腰间悬无铭文长方铁尺，疲惫但坚定。
4. `04-jin-mantang-portrait.png`：肥胖钱庄债主金满堂，华贵宋制服饰、玉戒、冷笑与算计眼神，双手持木算盘。
5. `05-yamen.png`：北宋州衙正堂，高案、深色木柱、石地与肃穆中轴，所有匾额挂轴为空白。
6. `06-market.png`：繁忙北宋市街，木店、空白布幌、货摊、脚夫、商贩与市民。
7. `07-dock.png`：运河码头、靠泊货船、搬运麻袋的脚夫、木箱、绳索、宽阔水面与晨雾。
8. `08-casino.png`：昏暗赌坊，矮木骰桌、成年赌客、无字红纸灯笼、烟雾与木梁。
9. `08a-home.png`：主角陋室，板床、粗木桌、油灯、墙上无铭文长方铁尺、补丁纸窗、陶水缸，贫穷但整洁。
10. `08b-teahouse.png`：温暖茶坊，木桌长凳、陶茶壶、蒸汽水壶、宋制服饰客人、空白纸窗与悬幅。
11. `09-ending-repaid.png`：沈砚在衙门前迎着晨光释然站立，完全空白的欠据碎片如雪飘落。
12. `10-ending-fired.png`：沈砚卸去公服与兵器，穿朴素便服、肩背小包袱，于暮色中离开城门。
13. `11-ending-prison.png`：沈砚穿素衣戴无字木枷，在雨街中由两名差役押行，围观者保持距离，严肃且无血腥。
14. `12-ending-hidden.png`：沈砚把一叠完全空白的证据纸按在官案上；金满堂戴锁链跪地，知州居中审理。
15. `13-rural-market.png`：北宋河城城门外的乡村集市；土路两侧草棚与席棚，农户售卖粮袋、蔬菜，独轮车与挑担穿行；柳树、田野和远处城墙形成晨雾背景；画面右侧安静角落藏有一名盐贩及三只盖布藤筐。市场活动与盖筐均处于可裁成 720×110 的中部横带，无任何文字。

追加乡集的最终生成提示词：

```text
Use case: historical-scene
Asset type: game environment master
Primary request: A rural market outside the city gate of a Northern Song dynasty river town: thatched stalls and simple mat-shed booths along a dirt road, farmers selling grain sacks and vegetables from wooden wheelbarrows and carrying poles, willow trees and open fields with the distant city wall in the background. At the quiet far-right edge of the market, include one discreet illicit salt peddler beside several woven baskets fully covered by plain cloth so the salt is not visible; this covered-basket stall is a subtle gameplay clue, not the main subject.
Style/medium: Traditional Chinese ink wash painting (shuimo), Song dynasty aesthetic, aged rice paper texture, elegant negative space, muted colors with subtle ochre and indigo accents, fine brushwork, painterly game background, no photorealism; refined low-saturation Song-dynasty game environment master.
Composition/framing: exact 3:2 landscape composition intended for 1536×1024 output; eye-level wide view; use only the upper quarter for sky, haze and distant city wall; arrange the entire readable line of market activity from left to right directly across the vertical center of the canvas, centered near 50% image height: thatched stall roofs just above the centerline, farmers, grain sacks, vegetable wheelbarrows, carrying-pole walkers and the covered-basket salt peddler all intersecting the same central horizontal band; the central 720×110 crop must include the core market activity and covered salt baskets at the quiet right edge; keep the foreground dirt road restrained and shallow; no frame.
Lighting/mood: morning haze, unhurried country atmosphere, calm rural daylight.
Color palette: rice-paper ivory, ink gray and black, muted ochre, restrained indigo.
Constraints: historically plausible Northern Song rural clothing, tools, woven baskets, stalls, wooden wheelbarrows, carrying poles, dirt road and city wall; no modern elements; no written characters anywhere; every banner, sign, sack, basket cover and wall surface must be blank with no lettering, symbols, seals or pseudo-writing; no logos; no watermark.
Avoid: high horizon, excessive empty sky, market activity concentrated at the bottom, salt baskets below the central crop, anime style, vibrant saturated colors, 3D render, photograph, modern clothing, text, calligraphy, seal marks, watermark.
```

技术说明：曾尝试附加 `02-city-panorama.png` 作为风格参考，但参考图通道两次网络失败；最终成图仍使用 Codex 内置 `imagegen` 的新图生成通道，并按现有母版人工比对纸纹、色彩、笔触与无字约束。

## v2 增补提示词（最新版 v0.3）

以下各图均前接本文“全局提示词”，横图使用 1536×1024，半身像归一为 1024×1024：

1. `v2-13-ending-wanmin-umbrella.png`：长街两侧站满北宋百姓，向沈砚呈送一柄收拢、未打开的大型万民伞；初雪落下。伞布密布数百个姓名的远景墨迹感，但任何单字都不可辨认，不生成可读伪字。
2. `v2-14-ending-brothers.png`：暮色运河码头，沈砚与风霜船夫在小货船旁对饮大笑；火盆内燃尽完全空白的欠据，少量纸灰飘起；只有两名主角。
3. `v2-15-ending-parting.png`：清晨茶坊后院，空木桌上严格两只杯，一只用过、一只未动；远处院门只有一名小而模糊的离去身影。
4. `v2-16-pharmacy.png`：北宋药铺正面室内，整墙小药柜、柜台铜秤、药罐、梁上成束干药材；所有抽屉、药罐、挂牌、纸张均无标签；核心物件位于中部横带。
5. `v2-17-chenzhou-road.png`：裸露冬田之间的孤寂驿路，一头骡、一辆车、两名成年旅人，远处城郭；冷光与大面积冬日留白。
6. `v2-18-courtroom.png`：从知州高案后方略俯视公堂，堂下严格三名跪者并排，一侧一名书吏执毛笔、纸面空白，柱边差役为次要人物。
7. `v2-19-origin-veteran-constable.png`：风霜老捕快，深靛蓝公服、灰白短须、警觉眼神、腰悬无铭文长方铁尺；一人半身像。
8. `v2-19-origin-failed-scholar.png`：瘦削落第书生，破旧补丁灰褐长衫，手持一支毛笔，疲惫、克制而倔强；一人半身像。
9. `v2-19-origin-discharged-guardsman.png`：宽肩退役禁军，素色深灰短褐，脸上一道愈合旧伤，神情沉稳戒备；无甲胄、兵器和军职标记；一人半身像。

药铺横条由 `v2-16-pharmacy.png` 中央视觉带无拉伸裁切并等比重采样为 `runtime/pharmacy.png`（720×110）。

## 局部返修提示词

封面、还清结局、隐藏结局、v2 老捕快出身像曾在铁尺表面出现伪文字，均使用以下不变量返修：

```text
Remove only every pseudo-writing mark, character-like stroke, inscription and symbol from the rectangular iron ruler at Shen Yan's belt. Replace it with a smooth plain dark iron surface with subtle natural wear. Preserve all people, faces, hands, poses, clothing, papers, chains, buildings, furniture, lighting, composition, dimensions, crop, ink-wash brushwork and rice-paper texture exactly.
```
