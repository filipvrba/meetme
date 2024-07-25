import 'CryptoJS', 'crypto-js'

def decode_base64()
  CryptoJS.enc.Base64.parse(self).to_string(CryptoJS.enc.Utf8)
end
String.prototype.decode_base64 = decode_base64

def encode_base64()
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(self))
end
String.prototype.encode_base64 = encode_base64

def encode_md5()
  CryptoJS::MD5(self).to_s
end
String.prototype.encode_md5 = encode_md5
