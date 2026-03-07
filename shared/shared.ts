export interface Key {
  value: number;
}

export interface KeyGenerator {
  getRandomBytes(length: number): Uint8Array;
}

export type ProjectENV = {
  PORT: string;
};

export type RoomKeyResponse = {
  key: string;
  status?: true | false;
  error?: string | undefined;
};

export interface keyValidator {
  dbKeyCheck(key: string): Promise<boolean>;
}
