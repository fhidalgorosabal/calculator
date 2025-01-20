import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '÷'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  resultText = signal('0');
  subResultText = signal('0');
  lastOperator = signal('+');

  constructNumber(value: string) {
    if (![...numbers, ...operators, ...specialOperators].includes(value)) return;

    if (value === '=') {
      this.calculateResult();
      return;      
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().length === 1 || (this.resultText().includes('-') && this.resultText().length === 2)) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update(v => v.slice(0, -1));
      return;
    }

    if (operators.includes(value)) {
      if (operators.includes(this.resultText().slice(-1))) return;
    
      if (!this.resultText() || isNaN(parseFloat(this.resultText()))) {
        this.resultText.set('0');
        return;
      }

      const currentResult = this.resultText();    
      this.calculateResult();    
      this.lastOperator.set(value);    
      this.subResultText.set(currentResult);

      if (this.resultText() !== '0') {
        this.resultText.set('0');
      }    
      return;
    }

    if (this.resultText().length >= 10) return;

    if (value === '.') {
      if (this.resultText().includes('.')) return;
    
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
    
      const lastChar = this.resultText().slice(-1);
      if (operators.includes(lastChar)) return;
    
      this.resultText.update(text => text + '.');
      return;
    }
    
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0'))  return;  

    if (value === '+/-') {
      const currentValue = this.resultText();
      if (currentValue === '0') return;
      this.resultText.update(text => (text.startsWith('-') ? text.slice(1) : '-' + text));
      return;
    }

    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);  
        return;
      }
      this.resultText.update(text => text + value);
      return;
    }
  }

  calculateResult() {    
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    if (isNaN(number1) || isNaN(number2)) return;

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;     
      case 'x':
        result = number1 * number2;
        break;   
      case '÷':
        result = number2 === 0 ? NaN : number1 / number2;
        break;          
    
      default:
        break;
    }
  
    if (!isFinite(result) && !isNaN(result)) {      
      this.resultText.set('Error');
    } else {
      this.resultText.set(parseFloat(result.toPrecision(10)).toString());
    }

    this.subResultText.set('0');
  }
}
