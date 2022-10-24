import axios from 'axios';

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

}

//导出这个方法
export default Xiezuocat