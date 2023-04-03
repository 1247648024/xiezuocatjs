import axios from 'axios';
import SM3SignatureUtil from "./SM3SignatureUtil.js";
import encode from "./Base64Util.js"

var Xiezuocat = function (secretKey) {
  this.secretKey = secretKey;
  this.checkUrl = "https://apicheck.xiezuocat.com/api/text_check";
  this.rewriteUrl = "https://apicheck.xiezuocat.com/api/api/rewrite";
  this.aiWriteGenerateUrl = "https://apicheck.xiezuocat.com/api/api/generate";
  this.aiWriteGetGenerateResultUrl = "https://apicheck.xiezuocat.com/api/api/generation/{docId}";

  this.setCheckUrl = function (checkUrl) {
    this.checkUrl = checkUrl;
  }

  this.setRewriteUrl = function (rewriteUrl) {
    this.rewriteUrl = rewriteUrl;
  }

  this.check = function (data) {
    return this.doPost(this.checkUrl, data);
  }

  this.rewrite = function (data) {
    return this.doPost(this.rewriteUrl, data);
  }

  this.generate = function (data) {
    return this.doPost(this.aiWriteGenerateUrl, data);
  }

  this.getGenerateResult = function (docId) {
    let url = this.aiWriteGetGenerateResultUrl.replace("{docId}", docId);
    return this.doGet(url);
  }

  this.doPost = function (url, postData) {
    var config = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'secret-key': this.secretKey,
      },
      data : postData
    };

    return axios(config);
  }

  this.doGet = function (url) {
    var config = {
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'secret-key': this.secretKey,
      },
    };

    return axios(config);
  }

  this.getSSOSignature = function (appId, id) {
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
