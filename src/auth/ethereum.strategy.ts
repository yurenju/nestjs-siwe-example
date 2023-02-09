import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, SessionNonceStore } from 'passport-ethereum-siwe';

@Injectable()
export class EthereumStrategy extends PassportStrategy(Strategy) {
  private store;

  constructor() {
    const store = new SessionNonceStore();
    super({ store });
    this.store = store;
  }

  async validate(address: string): Promise<any> {
    return { address };
  }

  challenge(req: Request) {
    return new Promise((resolve, reject) => {
      this.store.challenge(req, (err, nonce) => {
        if (err) {
          return reject(err);
        } else {
          return resolve({ nonce });
        }
      });
    });
  }
}
