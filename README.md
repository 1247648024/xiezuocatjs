# xiezuocatjs

```js

import Xiezuocat from "./src/xiezuocat.js";

var checkData = JSON.stringify({
  "texts": [
    "哈哈哈。我天今吃了一顿饭",
    "我想念十分赵忠祥。嘿嘿嘿。"
  ]
});

var rewriteData = JSON.stringify({
  "items": [
    "一般"
  ],
  "level": "middle"
});

var xiezuocat = new Xiezuocat("xxx");
// xiezuocat.setCheckUrl("https://checkerbeta.metasotalaw.cn/api/text_check");
// xiezuocat.setRewriteUrl("https://checkerbeta.metasotalaw.cn/html/api/rewrite");

xiezuocat.check(checkData).then(res => {
  console.log('check result === ', res.data);
}).catch(err => {
  console.log('check err === ', err);
})


xiezuocat.rewrite(rewriteData).then(res => {
  console.log('rewrite result === ', res.data);
}).catch(err => {
  console.log('rewrite err === ', err);
})

```