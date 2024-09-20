# Encryption and Decryption

Helpful information and documentation regarding encryption and decryption.

**Table of Contents**
   * [Glossary](#glossary)
   * [crypto](#crypto)
   * [What is Encryption?](#What-is-Encryption?)
   * [What is Decryption?](#What-is-Decryption?)
   * [What is the cipher algorithm?](#What-is-the-cipher-algorithm?)
   * [What is hashing?](#What-is-hashing?)
   * [Block Cipher and CTR Mode](#Block-Cipher-and-CTR-Mode)

## Glossary

Counter - initial counter incremented after each intermediate result until overflow.
Initialization Vector (IV) - 128 bits longs, includes nonce and initial counter.

## crypto

Built-in Node module providing cryptographic functions.

More information found [here](https://nodejs.org/api/crypto.html)
Extra information found [here](https://metaschool.so/articles/nodejs-crypto-module/)

## What is Encryption?

Cybersecurity method protecting data by scrambling it using math modals so only authorized parties can access it.

Converts readable data into an unreadable format called ciphertext.

Only those with the key to decrypt the data can access the original information.

## What is Decryption?

Process of converting encrypted data back into its original, readable form.

[Encryption and Decryption Doc](https://docs.oracle.com/cd/E19047-01/sunscreen151/806-5397/i996724/index.html#:~:text=Encryption%20is%20the%20process%20by,its%20original%20(readable)%20format.)

## What is the cipher algorithm?

A set of instructions that transforms data into an unrecognizable form, called ciphertext, to protect sensitive information.

## What is hashing?

Hashing is a method to convert plain text to encrypted/cipher text.

You cannot recover original text from cipher text.

You can regenerate the exact cipher text from the original text.

## Block Cipher and CTR Mode

Data is encrypted and decrypted by XORing with the key stream produced by AES.

Key stream precomputation - key stream is precomputed once iv and nonce are assigned.

CTR is a Block cipher mode of operation using block cipher algorithm

AES Processing Ability

Cipherkey length for AES is 256.

Limitation - working mode works on units fixed sizd (128 bits for 1 block), but text in real world has a variety of lengths.

Last block of text provided to this primitive must be padded to 128 bits before encryption or decryption .

IV is random in our case so it can be combined with the counter using an invertible operation to produce unique counter block for encryption.

Key is constant when you use CTR.

IV affects the cipher input, so the keystream varies.

The decrypter will know both the key and the IV.

They can calculate the same function as the encrypter did, resulting in the same keystream block, which a XOR cancels out.

Block cipher consists of two paired algorithms, one for encryption and another for decryption

Both encryption and decryption algorithms accept two inputs: input block and key (which we get off secret)

[Understanding CTR Mode](https://xilinx.github.io/Vitis_Libraries/security/2020.1/guide_L1/internals/ctr.html)

[CTR Mode](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CTR)
