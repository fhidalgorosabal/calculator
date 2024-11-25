import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent { }
