import CryptoJS from "crypto-js";

function decodeBase64() {
  return CryptoJS.enc.Base64.parse(this).toString(CryptoJS.enc.Utf8)
};

String.prototype.decodeBase64 = decodeBase64;

function encodeBase64() {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this))
};

String.prototype.encodeBase64 = encodeBase64;

function encodeMd5() {
  return CryptoJS.MD5(this).toString()
};

String.prototype.encodeMd5 = encodeMd5