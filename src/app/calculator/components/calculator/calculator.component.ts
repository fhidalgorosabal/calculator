import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '../../services/calculator.service';

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

  private calculatorService = inject(CalculatorService);
  resultText = computed(() => this.calculatorService.resultText());
  subResultText = computed(() => this.calculatorService.subResultText());
  lastOperator = computed(() => this.calculatorService.lastOperator());

  calculatorsButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string){
    this.calculatorService.constructNumber(key);
  }
  
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      'Escape': 'C',
      'Delete': 'C',
      '*': 'x',
      '/': '÷',
      'Enter': '='
    }

    const key = keyEquivalents[event.key] ?? event.key;
    this.handleClick(key)
    this.calculatorsButtons().forEach(button => button.keyboardPressedStyle(key));
  }

}
