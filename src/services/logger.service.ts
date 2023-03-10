import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public listMessage: string[] = [];
  constructor() {}

  log(message: string) {
    this.listMessage.push(message);
  }
  clear() {
    this.listMessage = [];
  }
}
