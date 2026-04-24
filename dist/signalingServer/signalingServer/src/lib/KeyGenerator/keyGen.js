import { webcrypto } from "crypto";
export class KeyConstructor {
    generator;
    actualKey;
    constructor(generator) {
        this.generator = generator;
    }
    generateKey(length = 5) {
        const bytes = this.generator.getRandomBytes(length);
        this.actualKey = Buffer.from(bytes).toString("hex");
        return this.actualKey;
    }
}
export class CryptoBasedKey {
    getRandomBytes(length) {
        return webcrypto.getRandomValues(new Uint8Array(length));
    }
}
