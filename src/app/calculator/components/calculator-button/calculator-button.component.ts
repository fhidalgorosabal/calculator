import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  HostBinding, 
  input, 
  output, 
  viewChild   
} from '@angular/core';

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
  
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  isCommand = input(false);
  isCommandPlus = input(false);
  isDoubleSize = input(false);
  onClick = output<string>();

  @HostBinding('class.w-2/4') get commandStyle() {    
    return this.isDoubleSize();
  }

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    this.onClick.emit(this.contentValue()!.nativeElement.innerText.trim());
  }
}
