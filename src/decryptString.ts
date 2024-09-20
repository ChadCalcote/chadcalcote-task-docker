import { env } from "process";
import Encryption from './libs/Encryption'

const ciphertext: string = env.ciphertext as string

const enc = Encryption('risk3sixty')
const plainText: string = enc.decrypt(ciphertext)

console.log(plainText)