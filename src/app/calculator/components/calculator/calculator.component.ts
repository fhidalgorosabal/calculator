import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {
  calculatorsButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string){
    console.log({key});    
  }
  
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      'Escape': 'C',
      'Delete': 'C',
      'Backspace': 'C',
      '*': 'x',
      '/': '÷',
      'Enter': '='
    }

    const key = keyEquivalents[event.key] ?? event.key;
    this.handleClick(key)
    this.calculatorsButtons().forEach(button => button.keyboardPressedStyle(key));
  }

}
