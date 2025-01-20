import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '../../services/calculator.service';

class MockCalculatorService {
  resultText = jasmine.createSpy('resultText').and.returnValue('100');
  subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => { 
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ 
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService }
      ]
    }).compileComponents(); 

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    //fixture.detectChanges();
  });

  it('should create CalculatorComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('50');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');

    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('10 -');
    expect(component.resultText()).toBe('50');
    expect(component.subResultText()).toBe('10');
    expect(component.lastOperator()).toBe('-');
  });

  it('should have 19 calculator-buttons with content projection', () => {
    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons).toBeTruthy();
    expect(buttons.length).toBe(19);
    expect(buttons[0]?.textContent?.trim()).toBe('C');
    expect(buttons[1]?.textContent?.trim()).toBe('+/-');
    expect(buttons[2]?.textContent?.trim()).toBe('%');
  });

  /* it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventESC = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventESC);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  }); */

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('100');
    mockCalculatorService.subResultText.and.returnValue('10');    
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('100');
    expect(compiled.querySelector('span')?.innerText).toContain('10 -');
  });
});  