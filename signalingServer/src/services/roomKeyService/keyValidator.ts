import { keyValidator } from "@shared/shared";

export class DbKeyCheckClass implements keyValidator {
  async dbKeyCheck(key: string): Promise<boolean> {
    console.log(key);

    return true;
  }
}
