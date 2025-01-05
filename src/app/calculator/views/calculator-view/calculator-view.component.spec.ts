import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {

  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;
  const MUST_HAVE_CLASS: string = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden';


  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
});

  it('should create CalculatorViewComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => { 
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  it('should render div with css classes', () => {
    const divElement = compiled.querySelector('div');
    const arrayClass = MUST_HAVE_CLASS.split(' ');
    const divClasses = divElement?.classList.value.split(' ');

    expect(divElement).not.toBeNull();

    arrayClass.forEach((cssClass) => {  
      expect(divClasses).toContain(cssClass);
    });
  });
});