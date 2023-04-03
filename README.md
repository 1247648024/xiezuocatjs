# xiezuocatjs
对智能纠错、智能改写、AI写作、单点登录签名算法进行封装
## 一、npm引入
```js
npm install xiezuocatjs

import Xiezuocat from 'xiezuocatjs/src/xiezuocat.js'
```

## 二、调用示例
### 1、智能纠错
#### 调用示例
```js
var checkData = JSON.stringify({
  "texts": [
    "哈哈哈。我天今吃了一顿饭",
    "我想念十分赵忠祥。嘿嘿嘿。"
  ]
});
var xiezuocat = new Xiezuocat("XXX");
xiezuocat.check(checkData).then(res => {
  console.log(JSON.stringify(res.data));
}).catch(err => {
  console.error(err);
})
```
#### 返回结果
```json
{"errCode":0,"errMsg":"","data":null,"alerts":[[{"alertType":4,"alertMessage":"建议用“今天”替换“天今”。","sourceText":"天今","replaceText":"今天","start":5,"end":6,"errorType":3,"advancedTip":true},{"alertType":2,"alertMessage":"根据段落，句子应已完结，句尾建议添加句号","sourceText":"饭","replaceText":"。","start":11,"end":11,"errorType":2,"advancedTip":false}],[{"alertType":4,"alertMessage":"建议用“十分想念”替换“想念十分”。","sourceText":"想念十分","replaceText":"十分想念","start":1,"end":4,"errorType":3,"advancedTip":false}]],"checkLimitInfo":{"checkWordCountLeftToday":"997268","totalCheckWordCountLeft":"997268","expireDate":"2024-02-02 00:00:00"}}
```
### 2、智能改写
##### 调用示例
```js
var rewriteData = JSON.stringify({
  "items": [
    "一般"
  ],
  "level": "middle"
});
var xiezuocat = new Xiezuocat("XXX");
xiezuocat.rewrite(rewriteData).then(res => {
  console.log(JSON.stringify(res.data));
}).catch(err => {
  console.error(err);
})
```
##### 返回结果
```json
{"errcode":0,"errmsg":null,"items":["普通"],"stat":"997268"}
```

### 3、AI写作
#### 创建生成任务
##### 调用示例
```js
var generateParams = JSON.stringify({
  "type": "Step",
  "title": "飞机",
  "length": "default"
});
var xiezuocat = new Xiezuocat("XXX");
xiezuocat.generate(generateParams).then(res => {
  console.log(JSON.stringify(res.data));
}).catch(err => {
  console.error(err);
})
```
##### 返回结果
```json
{"errCode":0,"errMsg":"success","data":{"docId":"66a3d815-4aed-4d29-a045-2d5a0e3acdc8"}}
```

#### 获取生成结果
##### 调用示例
```js
var xiezuocat = new Xiezuocat("XXX");
var docId = "66a3d815-4aed-4d29-a045-2d5a0e3acdc8"; // 此处docId为第一步生成的结果
xiezuocat.getGenerateResult(docId).then(res => {
  console.log(JSON.stringify(res.data));
}).catch(err => {
  console.error(err);
})
```
##### 返回结果
```json
{"errCode":0,"errMsg":"success","data":{"status":"FINISHED","result":"飞机\n《飞机》是一款以飞行为主题的模拟经营类手游。游戏中你可以驾驶着飞机，从一架飞机，飞入一个未知的世界去探索和冒险。为了完成你的目标，你需要不断的升级武器装备，来帮助你到达更高的高度。在游戏中，玩家可以通过驾驶飞机在空中进行各种机动作战和驾驶体验。《飞度》是一款可以操控你的飞度飞行，不断收集金币道具从而来完成任务获得更高等级奖励的冒险小游戏。在游戏中，玩家需要操作着战斗机进行冒险行动来赢得任务奖励和升级装备来提升自己的战斗力从而完成最终目标！在这里通过驾驶不同机型和收集金币道具装备完成各项任务从而解锁更高等级奖励以及更高强度的挑战。\n游戏介绍\n游戏中，玩家可以操控着战斗机在空中进行各种机动作战和驾驶体验，并且还能通过不断的升级武器装备来获得更高等级的奖励。在游戏中还可以解锁各种酷炫的战机来帮助玩家来驾驶。并且还可以通过关卡收集各种奖励来获得额外升级装备，从而帮助玩家完成更多任务。\n特色系统\n飞机：\n1、多种机型，可以选择不同的风格\n2、升级飞行设备，解锁更多玩法\n3、可以收集更多的金币，提升自己的战斗力\n4、获得丰富的奖励，让你的战斗力得到提升\n5、挑战难度，给你不一样的体验。\n游戏攻略\n飞机在游戏中是一种可以进行飞行的飞行器，通过玩家的操作驾驶飞机，不断躲避敌人的进攻，将飞机飞到更高的高度去完成任务。\n游戏评测\n在《飞度》游戏中，玩家可以通过游戏的飞行视角来控制飞机进行空中作战，并且还可以通过不断的升级自己的装备来提升战斗力，让自己成为一名优秀的飞行员。而且在这里还会有各种不同飞行风格的飞机，你可以选择最喜欢的款式和颜色进行操作，来体验更多飞行乐趣。在游戏中有很多不同类型的战斗机可以供玩家驾驶，其中还有一些战机拥有独特的技能帮助您更好地进行作战。在这里操作起来也是非常方便简单，而且也不会占用过多时间，只需要按一下飞行键就可以轻松完成各种动作了呢。\n系统更新\n1.更新地图\n2.优化飞行体验\n3.优化 UI界面\n4.改善部分 bug，修复已知 BUG。\n","wordCount":"807","restCount":"137567"}}
```
### 4、单点登录签名算法
##### 调用示例
```js
var xiezuocat = new Xiezuocat("XXX");
const signature = xiezuocat.getSSOSignature("xxx", "ll");
console.log(signature);
```
##### 返回结果
```json
eyJhcHBJZCI6Inh4eCIsInVpZCI6ImxsIiwidGltZXN0YW1wIjoxNjgwNTA2MjI2MzgxLCJzaWduIjoiY2M1YzBiZjA0ZDUxZjQ3NmVkOGRiYjVkOWVmNDI5ZTNmZmEyNTUyZjEyMzc4MDgwODI5NGY4ODY0M2I4MjQ3OSJ9
```
