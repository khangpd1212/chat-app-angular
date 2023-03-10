import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  beforeEach(() => {
    const mockLoggerService = jasmine.createSpyObj('LoggerService', [
      'log',
      'clear',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    });
    service = TestBed.inject(CalculatorService);
    loggerServiceSpy = TestBed.inject(
      LoggerService
    ) as jasmine.SpyObj<LoggerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('function add', () => {
    expect(service.add(2, 3)).toBe(5);
    expect(loggerServiceSpy.log).toHaveBeenCalled();
    expect(loggerServiceSpy.clear).toHaveBeenCalledTimes(1);
  });

  it('function subtract', () => {
    expect(service.subtract(3, 3)).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
});
