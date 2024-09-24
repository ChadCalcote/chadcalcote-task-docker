import assert from 'assert'
import crypto from 'crypto'
import Encryption, { getKeyAndIV, getFilledSecret } from './Encryption'

describe('Encryption', function () {
  const enc = Encryption('abc123')
  const originalText = 'test123'
  let cipherTextAndIv: string
  let plainText: string

  describe('#encrypt()', function () {

    it(`should return iv only when empty string is provided as input`, function () {
      cipherTextAndIv = enc.encrypt('')
      assert.strictEqual(typeof cipherTextAndIv, 'string')
      assert.strictEqual(2, cipherTextAndIv.split(':').length)
      assert.strictEqual(cipherTextAndIv.split(':')[0], '')
      assert.strictEqual(cipherTextAndIv.split(':')[1].length, 24)
      assert.strictEqual(cipherTextAndIv.split(':')[0], '')
    })

    it(`should encrypt string with one character without issue`, function () {
      cipherTextAndIv = enc.encrypt('a')
      assert.strictEqual(typeof cipherTextAndIv, 'string')
      assert.strictEqual(2, cipherTextAndIv.split(':').length)
      assert.notStrictEqual(cipherTextAndIv.split(':')[0], 'a')
    });

    it(`should encrypt strings with a lot of characters without issue`, function () {
      const longString = 'a'.repeat(1000)
      cipherTextAndIv = enc.encrypt(longString)
      assert.strictEqual(typeof cipherTextAndIv, 'string')
      assert.strictEqual(2, cipherTextAndIv.split(':').length)
      assert.notStrictEqual(cipherTextAndIv.split(':')[0], longString)
    });


    it(`should encrypt buffer without issue`, function () {
      const buffer = Buffer.from(originalText)
      cipherTextAndIv = enc.encrypt(buffer)
      assert.strictEqual(typeof cipherTextAndIv, 'string')
      assert.strictEqual(2, cipherTextAndIv.split(':').length)
      assert.notStrictEqual(cipherTextAndIv.split(':')[0], originalText)
    })

    it(`should encrypt string without issue`, function () {
      cipherTextAndIv = enc.encrypt(originalText)
      assert.strictEqual(typeof cipherTextAndIv, 'string')
      assert.strictEqual(2, cipherTextAndIv.split(':').length)
      assert.notStrictEqual(cipherTextAndIv.split(':')[0], originalText)
    })
  })

  describe('#decrypt()', function () {
    it(`should decrypt cipher string without issue`, function () {
      plainText = enc.decrypt(cipherTextAndIv)
      assert.strictEqual(typeof plainText, 'string')
      assert.strictEqual(plainText, originalText)
    })

    it (`should decrypt cipher string with one character without issue`, function () {
      const enc = Encryption('abc123')
      const cipherTextAndIv = enc.encrypt('a')
      const plainText = enc.decrypt(cipherTextAndIv)
      assert.strictEqual(plainText, 'a')
    })

    it(`should decrypt cipher string with a lot of characters without issue`, function () {
      const longString = 'a'.repeat(1000)
      const enc = Encryption('abc123')
      const cipherTextAndIv = enc.encrypt(longString)
      const plainText = enc.decrypt(cipherTextAndIv)
      assert.strictEqual(plainText, longString)
    })

    it(`should decipher two different strings when provided two different secrets`, function () {
      const enc1 = Encryption('abc123')
      const cipherTextAndIv1 = enc1.encrypt(originalText)
      const enc2 = Encryption('wrongsecret')
      const cipherTextAndIv2 = enc2.encrypt(originalText)
      assert.notStrictEqual(cipherTextAndIv1, cipherTextAndIv2)
    })
  })

  describe('#getKeyAndIV()', function () {
    it('should return key and iv without issue when providing key only', function () {
      const key = 'testkey'
      const result = getKeyAndIV(key)
      assert.strictEqual(result.iv.length, 16)
      assert.strictEqual(result.key.length, 32)
    })

    it('should return key and iv when providing both key and iv as input', function () {
      const key = 'testkey'
      const iv = Buffer.from('1234567890123456')
      const result = getKeyAndIV(key, iv)
      assert.strictEqual(result.iv.toString('base64'), iv.toString('base64'))
      assert.strictEqual(result.key.length, 32)
    })
  })

  describe('#getFilledSecret()', function () {
    it('should return a base64 encoded sha256 hash of the secret', function () {
      const secret = 'mysecret'
      const expectedHash = crypto.createHash('sha256').update(secret).digest('base64')
      const result = getFilledSecret(secret)
      assert.strictEqual(result, expectedHash)
    })

    it('should return different hashes for different secrets', function () {
      const secret1 = 'secret1'
      const secret2 = 'secret2'
      const hash1 = getFilledSecret(secret1)
      const hash2 = getFilledSecret(secret2)
      assert.notStrictEqual(hash1, hash2)
    })

    it('should return the same hash for the same secret', function () {
      const secret = 'consistentSecret'
      const hash1 = getFilledSecret(secret)
      const hash2 = getFilledSecret(secret)
      assert.strictEqual(hash1, hash2)
    })
  })
})
