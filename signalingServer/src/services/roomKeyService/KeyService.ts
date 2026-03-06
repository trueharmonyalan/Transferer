import {
  KeyConstructor,
  CryptoBasedKey,
} from "signalingServer/src/lib/KeyGenerator/keyGen.js";

export function generateKey() {
  const key_obj = new CryptoBasedKey();
  const key = new KeyConstructor(key_obj);
  return key.generateKey();
}
