export interface Key {
  value: number;
}

export interface KeyGenerator {
  getRandomBytes(length: number): Uint8Array;
}

export type ProjectENV = {
  PORT: string;
};
