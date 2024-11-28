import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [
    CommonModule
  ],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export class CalculatorButtonComponent {
  isCommand = input(false);
  isCommandPlus = input(false);
  isDoubleSize = input(false);

  @HostBinding('class.w-2/4') get commandStyle() {    
    return this.isDoubleSize();
  }
}
