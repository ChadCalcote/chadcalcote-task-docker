// built-in module providing cryptographic functions
import crypto from 'crypto'
import { IVandKey } from './typings'

// TO DO
// Write documentation 
// Add more typings

// What is encryption?
// Cybersecurity method protecting data by scrambling it using math modals so only authorized parties can access it
// Converts readable data into an unreadable format called ciphertext
// Only those with the key to decrypt the data can access the original information

// What is decryption?
// Process of converting encrypted data back into its original, readable form form

// returns an object
export default function Encryption(secret: string) {
  // cipher algorithm
  // Block cipher mode of operation that uses Advanced Encryption Standard (AES) to encrypt data
  // Good choice for high-speed networking
  // Counter - initial counter incremented after each intermediate result until overflow
  // Initialization Vector (IV) - 128 bits longs, includes nonce and initial counter
  // Data is encrypted and decrypted by XORing with the key stream produced by AES
  // Key stream precomputation - key stream is precomputed once iv and nonce are assigned
  const alg: string = 'aes-256-ctr'

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

  return {
    // private variables 
    _algorithm: alg,
    _secret: secret,

    encrypt(input: Buffer | string): string {
      const secret = getFilledSecret(this._secret) // digest secret
      const { iv, key } = getKeyAndIV(secret) // deconstruct for iv and key (Buffers)
      // Create Cipher Object that can be used to encrypt data using algorithm, key, and initialization vector
      const cipher = crypto.createCipheriv(this._algorithm, key, iv)
      // If it is Buffer type, convert to base64 string
      // If not, keep same input
      const inputStr =
        input instanceof Buffer ? input.toString('base64') : input
      // encrypt inputStr (encode with utf8 and base64)
      let cipherText = cipher.update(inputStr, 'utf8', 'base64')
      cipherText += cipher.final('base64')
      return `${cipherText}:${iv.toString('base64')}`
    },

    decrypt(ciphertext: string): string {
      const cipherTextAndIv = ciphertext.split(":")
      // Get the secret
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

// Private methods
function getFilledSecret(secret: string): string {
  // Hashing is a method to convert plain text to encrypted/cipher text
  // You cannot recover original text from cipher text
  // You can regenerate the exact cipher text from the original text

  // Create the hash
  const sha256Sum = crypto.createHash('sha256')
  // Add data to the hash
  sha256Sum.update(secret)
  // Generate a digest
  // Return the base64 string hash of the secret data
  // base64 is a method of encoding binary data into a string of printable characters
  return sha256Sum.digest('base64')
}

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
