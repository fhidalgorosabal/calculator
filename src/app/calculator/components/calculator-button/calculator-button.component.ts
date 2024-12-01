import { CommonModule } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  HostBinding, 
  input, 
  output, 
  signal, 
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
    class: 'border-r border-b border-blue-400',
    '[class.w-1/4]': '!isDoubleSize()',
    '[class.w-2/4]': 'isDoubleSize()'
  }
})
export class CalculatorButtonComponent {
  isPressed = signal(false);
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  isCommand = input(false);
  isCommandPlus = input(false);
  isDoubleSize = input(false);
  onClick = output<string>();

  handleClick() {
    if (!this.contentValue()?.nativeElement) return;    
    this.onClick.emit(this.contentValue()!.nativeElement.innerText.trim());
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()?.nativeElement) return;
    const value = this.contentValue()!.nativeElement.innerText.trim();

    if (value !== key) return;
    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
