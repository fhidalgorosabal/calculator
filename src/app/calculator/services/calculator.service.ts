import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  resultText = signal('0');
  subResultText = signal('0');
  lastOperator = signal('+');

  constructNumber(value: string) {
    if ([...numbers, ...operators, ...specialOperators].includes(value)) return;

    if (value === '=') {
      //TODO
      console.log('Calcular');
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
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }
    }

    this.resultText.update(v => v.slice(0, -1));

    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0') {
        this.resultText.update(text => text + '0.');
      }
    }

    this.resultText.update(text => text + '.');
    return;
  }

}
