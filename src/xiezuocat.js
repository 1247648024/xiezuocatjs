import axios from 'axios';
import SM3SignatureUtil from "./SM3SignatureUtil.js";
import encode from "./Base64Util.js"

var Xiezuocat = function (secretKey) {
  this.secretKey = secretKey;
  this.checkUrl = "https://apicheck.xiezuocat.com/api/text_check";
  this.rewriteUrl = "http://api.xiezuocat.com/para_api_v2";

  this.setCheckUrl = function (checkUrl) {
    this.checkUrl = checkUrl;
  }

  this.setRewriteUrl = function (rewriteUrl) {
    this.rewriteUrl = rewriteUrl;
  }

  this.check = function (data) {
    var config = {
      method: 'post',
      url: this.checkUrl,
      headers: {
        'Content-Type': 'application/json',
        'secret-key': this.secretKey,
      },
      data : data
    };

    return axios(config);
  }

  this.rewrite = function (data) {
    var config = {
      method: 'post',
      url: this.rewriteUrl,
      headers: {
        'Content-Type': 'application/json',
        'secret-key': this.secretKey,
      },
      data : data
    };

    return axios(config);
  }

  this.signature = function (appId, id) {
    const timestamp = new Date().getTime();
    const paraMap = {
      "appId": appId,
      "uid": id,
      "timestamp": timestamp,
    };

    //签名字符串
    const sM3SignatureUtil = new SM3SignatureUtil();
    const sign = sM3SignatureUtil.signatureSM3(paraMap,secretKey);
    paraMap["sign"] = sign;
    try {
      const paraMapStr = JSON.stringify(paraMap);
      const base64EncodedString = encode(paraMapStr, "utf-8");
      return base64EncodedString;
    } catch (e) {
      console.error(e);
    }
  }
}

//导出这个方法
export default Xiezuocat