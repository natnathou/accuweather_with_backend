const crypto    = require('crypto')
const algorithm = 'aes-256-cbc'
const iv        = crypto.randomBytes(16)

exports.encrypt = (text, key) => {
    let cipher    = crypto.createCipheriv(algorithm, Buffer.alloc(32, key), iv)
    let encrypted = cipher.update(text)
    encrypted     = Buffer.concat([encrypted, cipher.final()]);
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')}
};

exports.decrypt = (text, key) => {
    let iv            = Buffer.from(text.iv, 'hex')
    let encryptedText = Buffer.from(text.encryptedData, 'hex')
    let decipher      = crypto.createDecipheriv(algorithm, Buffer.alloc(32, key), iv)
    let decrypted     = decipher.update(encryptedText)
    decrypted         = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString()
};

