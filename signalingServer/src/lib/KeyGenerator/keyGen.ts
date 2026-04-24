import { webcrypto } from "crypto";
import { KeyGenerator } from "@shared/shared.js";

export class KeyConstructor {
  public actualKey!: string;

  constructor(private generator: KeyGenerator) {}

  generateKey(length: number = 5): string {
    const bytes = this.generator.getRandomBytes(length);
    this.actualKey = Buffer.from(bytes).toString("hex");
    return this.actualKey;
  }
}

export class CryptoBasedKey implements KeyGenerator {
  getRandomBytes(length: number): Uint8Array {
    return webcrypto.getRandomValues(new Uint8Array(length));
  }
}
