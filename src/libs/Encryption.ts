// built-in module providing cryptographic functions
import crypto from 'crypto'
import { IVandKey } from './typings'

// TO DO
// Write documentation 

// What is encryption?
// Cybersecurity method protecting data by scrambling it using math modals so only authorized parties can access it
// Converts readable data into an unreadable format called ciphertext
// Only those with the key to decrypt the data can access the original information

// What is decryption?
// Process of converting encrypted data back into its original, readable form form

// cipher algorithm
// Block cipher mode of operation that uses Advanced Encryption Standard (AES) to encrypt data
// Good choice for high-speed networking
// Counter - initial counter incremented after each intermediate result until overflow
// Initialization Vector (IV) - 128 bits longs, includes nonce and initial counter
// Data is encrypted and decrypted by XORing with the key stream produced by AES
// Key stream precomputation - key stream is precomputed once iv and nonce are assigned

// CTR Mode
/**
 * https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CTR
 * Block cipher mode of operation using block cipher algorithm
 * AES Processing Ability
 * Cipherkey length for AES is 256
 * Limitation - working mode works on units fixed sizd (128 bits for 1 block), but text in real world has a variety of lengths
 * Last block of text provided to this primitive must be padded to 128 bits before encryption or decryption 
 * https://xilinx.github.io/Vitis_Libraries/security/2020.1/guide_L1/internals/ctr.html
 */

/**
 * IV is random in our case so it can be combined with the counter using an invertible operation to produce unique counter block for encryption
 * Key is constant when you use CTR
 * IV affects the cipher input, so the keystream varies
 * The decrypter will know both the key and the IV
 * They can calculate the same function as the encrypter did, resulting in the same keystream block, which a XOR cancels out
 */

// Block cipher
/**
 * Consists of two paired algorithms, one for encryption and another for decryption
 * Both encryption and decryption algorithms accept two inputs: input block and key (which we get off secret)
 */

// Hashing is a method to convert plain text to encrypted/cipher text
// You cannot recover original text from cipher text
// You can regenerate the exact cipher text from the original text

/**
   * Returns an object with methods, encrypt and decrypt and private string variables algorithm and secret
   * 
   * @param secret - encryption key with string type
   * @returns Object with encrypt and decrypt methods, along with private string variables algorithm and secret
   */
export default function Encryption(secret: string) {
  const alg: string = 'aes-256-ctr'



  return {
    _algorithm: alg,
    _secret: secret,

    /**
     * Returns a string of the ciphertext
     * 
     * @remarks
     * This method uses another function, getFilledSecret to get a digest secret from our provided secret.
     * It then proceeds to use this digest secret to get an initialization vector (IV) and a key from the getKeyandIV function.
     * It then creates a Cipher Object using the built-in Node module crypto and its function createCipheriv with the algorithm provided, key, and iv.
     * An input string is then constructed based on the input argument provided.
     * The Cipher is then updated and encoded with utf8 and base64 and returned.
     * 
     * @link https://metaschool.so/articles/nodejs-crypto-module/
     * 
     * @param input - data with string or Buffer type that needs to be ciphered and encrypted, such as a password or message.
     * @returns ciphertext of string type
     */
    encrypt(input: Buffer | string): string {

      const secret = getFilledSecret(this._secret)
      const { iv, key } = getKeyAndIV(secret)
      const cipher = crypto.createCipheriv(this._algorithm, key, iv)
      const inputStr =
        input instanceof Buffer ? input.toString('base64') : input

      let cipherText = cipher.update(inputStr, 'utf8', 'base64')
      cipherText += cipher.final('base64')

      return `${cipherText}:${iv.toString('base64')}`
    },
    /**
     * Returns a string of the deciphered text
     * 
     * @remarks
     * This method takes the ciphertext input string and splits it at the character ":"'
     * It then uses another function, getFilledSecret to get a digest secret from our provided secret.
     * We then convert the iv string part of the ciphertext input string to a Buffer.
     * It then proceeds to use this digest secret and ivBuffer to get an initialization vector (IV) and a key from the getKeyandIV function.
     * It then creates a Decipher Object using the built-in Node module crypto and its function createDecipheriv with the algorithm provided, key, and iv.
     * The Decipher is then updated and encoded with utf8 and base64 and returned.
     * 
     * @link https://metaschool.so/articles/nodejs-crypto-module/
     * 
     * @param ciphertext - data with string type that needs to be deciphered.
     * @returns decrypted text of string type
     */
    decrypt(ciphertext: string): string {
      const cipherTextAndIv = ciphertext.split(":")
      const secret = getFilledSecret(this._secret)
      // Get the iv from the input so it is the same as our encrypt
      // Convert string back to original Buffer format
      const ivBuffer = Buffer.from(cipherTextAndIv[1], 'base64');
      // Get the key from the secret
      const { key, iv } = getKeyAndIV(secret, ivBuffer)
      // Create input string
      const decipher = crypto.createDecipheriv(this._algorithm, key, iv)
      let decrypted = decipher.update(cipherTextAndIv[0], 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    },
  }
}

/**
 * Returns a string of the digest secret
 * 
 * @remarks
 * Create an sha256 hash.
 * Add data with the input secret string to the hash.
 * Generate a digest.
 * Return the base64 string hash of the secret data.
 * base64 is a method of encoding binary data into a string of printable characters.
 * 
 * @link https://stackoverflow.com/questions/27970431/using-sha-256-with-nodejs-crypto
 * 
 * @param secret - secret text with string type.
 * @returns digest secret of string type.
 */
function getFilledSecret(secret: string): string {
  const sha256Sum = crypto.createHash('sha256')
  sha256Sum.update(secret)
  return sha256Sum.digest('base64')
}

/**
 * Returns an object with iv and key properties of type IVandKey
 * 
 * @remarks
 * If no IV Buffer is provided, generate cryptographically secure random data with built-in Node module crypto and its function randomBytes.
 * Generate a derived key using crypto algorithm pbkdf2Sync (password-based key derivation function) and providing it with password, salt, keylen, and digest as arguments.
 * Return the object with ivBuffer and derivedKey
 * 
 * @link https://metaschool.so/articles/nodejs-crypto-module/
 * 
 * @param key - secret key with string type.
 * @param iv - Initialization Vector (IV) with Buffer type.
 * @returns digest secret of string type.
 */
function getKeyAndIV(key: string, iv?: Buffer): IVandKey {
  // if no iv buffer provided, generate cryptographically secure random data
  const ivBuffer = iv || crypto.randomBytes(16) // Buffer - similar to array of integers but corresponds to a raw memory allocation
  // generate a derived key using pbkdf2Sync algorithm, which is a password-based key derivation function.
  // password, salt, keylen, options
  const derivedKey = crypto.pbkdf2Sync(key, ivBuffer, 1e5, 32, 'sha256') // Buffer
  // return iv and key
  return {
    iv: ivBuffer,
    key: derivedKey,
  }
}
