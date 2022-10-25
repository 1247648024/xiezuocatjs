import sm3Digest from "./SM3.js"

function SM3SignatureUtil() {

  /**
   * 获取SM3签名
   *
   * @param data
   * @param key
   * @return
   */
  this.signatureSM3 = function(data, key) {
    const signatureSM3Str = this.signatureSM3Str(data);
    const concat = signatureSM3Str.concat("secretKey=").concat(key);
    const sm3Str = sm3Digest(concat);
    return sm3Str;
  }

  /**
   * 递归获取拼接除secretKey之外的所有待签名字符串
   *
   * @param data 待签名数据
   * @return 签名
   */
  this.signatureSM3Str = function(data) {
    const keyArray = Object.keys(data);
    keyArray.sort();
    let builder = "";
    for (let i = 0; i < keyArray.length; i++) {
      const key = keyArray[i];
      const obj = data[key];
      if (obj){ // 参数值为空，则不参与签名
        if(obj instanceof Object) { // 递归调用
          builder += `${key}={${this.signatureSM3Str(obj)}}`
        } else if (obj instanceof Array) { // 如果是JSONARRAY 不参与签名计算
          continue;
        } else {
          builder += `${key}=${obj.toString().trim()}`;
        }
      }
    }
    return builder;
  }

}

export default SM3SignatureUtil