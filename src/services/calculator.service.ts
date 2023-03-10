import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private logger: LoggerService) {}

  add(a: number, b: number) {
    this.logger.log('hello');
    this.logger.clear();
    return a + b;
  }

  subtract(a: number, b: number) {
    this.logger.log('hello2');
    return a - b;
  }
}
