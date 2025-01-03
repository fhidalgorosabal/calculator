import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;
  const MUST_HAVE_CLASS: string = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  //Test example
  it('test example: should be 3', () => {
    //Arrange
    const num1 = 1;
    const num2 = 2;

    //Act
    const result = num1 + num2;

    //Assert
    expect(result).toBe(3);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'calculator' title`, () => {
    expect(app.title).toEqual('calculator');
  });

  it('should render router-outlet', () => { 
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
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
