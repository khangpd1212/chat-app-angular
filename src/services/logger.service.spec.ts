import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LogService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be check listMessage', () => {
    let count = service.listMessage.length;
    expect(count).toBe(0);
  });

  it('function log', () => {
    service.log('hello');
    expect(service.listMessage.length).toBe(1);
  });

  it('function clear', () => {
    service.listMessage = ['hel', 'work'];
    service.clear();
    expect(service.listMessage.length).toBe(0);
  });
});
