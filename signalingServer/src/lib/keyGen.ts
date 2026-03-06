import { webcrypto } from "crypto";
import { KeyGenerator } from "@shared/shared.js";

class KeyConstructor {
  public actualKey: string;

  constructor(private generator: KeyGenerator) {}

  generateKey(length: number = 5): string {
    const bytes = this.generator.getRandomBytes(length);
    console.log(bytes);
    this.actualKey = Buffer.from(bytes).toString("hex");
    return this.actualKey;
  }
}

class CryptoBasedKey implements KeyGenerator {
  getRandomBytes(length: number): Uint8Array {
    return webcrypto.getRandomValues(new Uint8Array(length));
  }
}

const generator = new CryptoBasedKey();
const keyobj = new KeyConstructor(generator);
console.log(keyobj.generateKey());
