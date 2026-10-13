# v1.4 临汴日常 · 改动与验收

## v1.4.2 白话叙事改写（2026-10-13）

- 70桩案件均有独立开场、结案解释和错断后果，补齐原有40案的缺失正文。20桩新案的60段供词和主线12段供词重新按人物口吻改写。
- 改写五幕主线、69条街闻、三种出身、人物交往、成功结局及店铺入股、添置叙述。故事以“你”的视角自然成段；费用、收益和操作提示保持简洁。
- 修正割牛舌案宰牛后又牵活牛的矛盾，灰阑案统一为三年前丧子后抱养；审驴案不再称没有失主。茶坊折扣统一为实际4贯，端午选项明确玩家得1贯，连破成就改称十案连破；取消喝茶永久免费的错误承诺，并明确指认仍须选择已锁定者。
- 程序、奖励及经济规则保持原数值；案件名、答案、嫌疑人顺序、线索数量、矛盾位置、来源记录均与改写前基准核对。原有美术嵌入数据与改写前哈希相同，两个入口字节一致。
- 母稿与构建说明见 `content/README.md`。本次备份为 `game.html.bak-v1.4.1-before-prose` 与 `index.html.bak-v1.4.1-before-prose`。
- Node验收：原22组回归通过；另逐一验证70案对质、正确指认、结案正文、奖励、存档恢复和退堂。70种错断正文各不相同，文案构建可重复执行且不改变输出。
- Codex In-app Browser：完整走通碎饼案提审、三次走访、证据对质、指认、结案续档及案簿回看；续档后银钱仍为154贯50文，没有重复发放赏钱。
- 手机尺寸模拟：320×667验收汇总案卷与旧卷，旧卷可实际滚到底部，返回案簿与合上按钮可操作，无横向溢出；390×844验收结案全文。截图为 `prose-mobile-verdict.png`、`prose-mobile-archive-320.png`，测量记录为 `prose-mobile-metrics.json`。
- 验收范围为本地版本与浏览器手机尺寸模拟，尚未做实机手机及线上发布验收。

文案专项回归：`node qa/prose-regression.cjs`。

## 本次范围

- 六种成功结果转入日常阶段，保留现钱、产业、关系、本事与在办案件；首章功过册单独留存。失败仍结束。
- 新增20案，只在日常阶段开放；优先抽尚未遇过的新案，全部走过后再回到原案库，70案全部抽过后才循环。
- 新增案簿，区分查明、错断、逼供草结与吃案。旧存档没有案情历史的数据，从升级后的新办理记录开始收藏。
- 四种本事还债后上限由5级延至10级。眼力6级起减调查体力，8级解锁一次补充问话。
- 三家全资店铺各有三次添置；只在日常阶段开放，增加固定旬收益。原有旬经营操作回到相应店铺入口。
- 继续伙食、房租、旬分红与每30日发俸。房租欠款单独登记，不重新触发债主期限。
- 保存键沿用 `dsdg_save_v2`，版本2.2，兼容已有2.0和2.1未结束存档。原版已结束且已清除的存档无法恢复。
- 结案奖励先存入待退堂记录，重开页面只恢复结案弹窗，不重复发钱。

## 来源与改编

来自 [NiuTrans/Classical-Modern](https://github.com/NiuTrans/Classical-Modern) 收录的《折狱龟鉴》古籍原文。仓库声明数据来自互联网，因此逐案记录原文位置与Git blob哈希；未使用现代译文或现成游戏代码。只保留古案的谜题思路，为游戏补写物证、证人、凭单及对白，避免单凭神异、表情或试探定案。完整来源索引见 `case-sources.json`。

| 游戏案件 | 取材篇目 | 推理侧重 |
|---|---|---|
| 碎饼索赔案 | [183、孙宝称馓](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E8%AF%81%E6%85%9D/text.txt) | 称重核数 |
| 树下羊皮案 | [187、李惠拷皮](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E8%AF%81%E6%85%9D/text.txt) | 物件残留 |
| 针铺丝团案 | [187、李惠拷皮附傅琰](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E8%AF%81%E6%85%9D/text.txt) | 微屑辨物 |
| 芦花鸡争主案 | [185、傅琰破嗉](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E8%AF%81%E6%85%9D/text.txt) | 喂养记录 |
| 青菜墨字案 | [215、高浟市脯附书菜](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E8%BF%B9%E7%9B%97/text.txt) | 预留标记 |
| 鹿脯换签案 | [215、高浟市脯](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E8%BF%B9%E7%9B%97/text.txt) | 追查销赃 |
| 河边旧靴案 | [216、高湝留靴](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E8%BF%B9%E7%9B%97/text.txt) | 修补辨物 |
| 雪夜木栏案 | [201、曹摅察理](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E5%AF%9F%E7%9B%97/text.txt) | 失物用途 |
| 船底银匣案 | [209、阎济美料银](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E5%AF%9F%E7%9B%97/text.txt) | 藏物位置 |
| 失印又现案 | [208、裴度待印](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E5%AF%9F%E7%9B%97/text.txt) | 借物留下用途 |
| 庙钟验贼案 | [222、陈述古祠钟](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E8%B0%B2%E7%9B%97/text.txt) | 试探与赃证 |
| 瓦袋换骡案 | [219、高谦之枷囚](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E8%B0%B2%E7%9B%97/text.txt) | 袋内调包 |
| 衣带割钱案 | [213、彭思永黥盗](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E4%B8%83%C2%B7%E5%AF%9F%E7%9B%97/text.txt) | 切口与工具 |
| 匿名诬状案 | [154、国渊比书附王安礼](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E6%A0%B8%E5%A5%B8/text.txt) | 匿名笔迹 |
| 田券缺邻案 | [166、刘沆问邻](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E6%A0%B8%E5%A5%B8/text.txt) | 交易见证 |
| 药册认亲案 | [168、程颢校年](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E6%A0%B8%E5%A5%B8/text.txt) | 年代矛盾 |
| 地窖古钱案 | [193、程颢辨钱](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E8%AF%81%E6%85%9D/text.txt) | 铸钱年代 |
| 染痕索医案 | [194、李南公捏痕](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E8%AF%81%E6%85%9D/text.txt) | 伪造伤痕 |
| 邸店两本账案 | [155、韦皋验簿](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E6%A0%B8%E5%A5%B8/text.txt) | 交叉核账 |
| 高田报涝案 | [171、王罕按图](https://github.com/NiuTrans/Classical-Modern/blob/main/%E5%8F%A4%E6%96%87%E5%8E%9F%E6%96%87/%E6%8A%98%E7%8B%B1%E9%BE%9F%E9%89%B4/%E5%8D%B7%E5%85%AD%C2%B7%E6%A0%B8%E5%A5%B8/text.txt) | 实地核查 |

## 可重复回归

在项目目录运行：

```sh
node qa/leisure-regression.cjs
```

该脚本用Node VM加载实际HTML内的脚本，使用最小DOM与存储桩、固定随机值；检验状态与结算，不代表真实浏览器或真人好玩验收。

`browser-fixture.html` 是本机浏览器场景夹具，iframe加载实际游戏文件。通过界面按钮准备还债、新案、店铺、第30日和隐藏成功路线，可快速验收，不能替代正常完整游玩。

原文件备份：`game.html.bak-v1.3-before-leisure`、`index.html.bak-v1.3-before-leisure`。

## 本次验收记录（2026-10-13）

- Node回归：22组通过；20个新增案逐个走完查线索、对质、正确指认、领赏、存档恢复及退堂。另测错断、逼供、吃案、70案抽取循环、旧版未结束存档、六种成功路线、失败路线、本事与三店升级。
- GitHub取材：实际采用的五篇原文，下载字节均与仓库树中记录的Git blob SHA一致。
- Codex In-app Browser：本机HTTP页面；实际点击走通普通还清、隐藏成功、接新案、完整调查与对质、结案弹窗中途重开续档、案簿与首章功过册。
- 店铺浏览器验收：三家各添置一次；茶坊请说书人；跨第29、30、31日实际观察分红，茶坊6800文、赌坊12900文、药铺6600文（茶坊含关系500文及说书800文）。升级后重开状态保留。
- 手机布局：390×844的浏览器尺寸模拟，检查长案卷弹窗、功过册、导航与店铺按钮；页面可滚动、无横向裁切。截图为 `mobile-leisure.jpg`，来自受控测试存档。
- 浏览器最后读取的错误／警告日志为空。现有美术数据保持原样，`game.html`与`index.html`字节一致。
- 验收边界：未做真人完整长局、实机手机或线上发布验收；本次交付为本地版本。

## v1.4.1 手机界面收折（2026-10-13）

- 手机常显银钱、体力、天气和债事进度，其余状态在“详情”中查看。
- 去处与随身簿册分别收折；选地点或打开簿册后自动收起导航。
- 街景开关并入地点标题行；近况默认仅露一条摘要，可展开完整日志。
- 常用调查、提审、指认与店铺日常操作保留。辅助办案、升级扩建、零工、行商装备和其他往来分组收折。
- 折叠偏好独立保存在 `dsdg_ui_v1`；手机和桌面分别记忆，不消耗行动时段。展开状态可跨操作刷新、页面重开与续档保留。
- 手机按钮保留足够触控高度，长弹窗的操作按钮可随滚动停留在底部。桌面保留侧栏与完整状态。
- 源文件、存档格式、案件、数值与既有美术核对：游戏机制区完整保持原样；两个入口字节一致。原文件备份为 `*.bak-v1.4-before-mobile-ui`。
- 回归：原22组逻辑回归通过；应用内浏览器实际走通导航、升级、市场弹窗、查线索、展开过堂、结案、案簿及折叠偏好续档。
- 同一茶坊测试存档，390×844尺寸的页面高度1096→844px；操作区起点453.5→239.89px。320×667尺寸的办案初始场景页面高度667px，两者没有横向溢出。测量见 `mobile-ui-metrics.json`，前后截图见 `mobile-ui-before.jpg` 与 `mobile-ui-after.jpg`，小屏截图见 `mobile-ui-case-320.jpg`。
- 桌面1280×800布局已检查。均为浏览器尺寸模拟，未做实机手机或线上发布。
- 环境日志另记：自动化期间捕获到 `MutationObserver.observe` 参数类型报错；游戏源码没有该调用或外部脚本引用，功能流程未出现对应阻断，因此未把控制台记录表述为完全无错误。
