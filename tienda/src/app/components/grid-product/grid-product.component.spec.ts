import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';

import { GridProductComponent } from './grid-product.component';

describe('GridProductComponent', () => {
  let component: GridProductComponent;
  let fixture: ComponentFixture<GridProductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GridProductComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(GridProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start animation on hover', () => {
    const animationController = TestBed.inject(AnimationController);
    spyOn(animationController, 'create').and.callThrough();

    // Simular hover
    component.startAnimationOnHover();

    // Verificar que se haya llamado a create en AnimationController
    expect(animationController.create).toHaveBeenCalled();
  });

  it('should toggle elevated class on hover', () => {
    const nativeElement = fixture.nativeElement;

    // Inicialmente no debe tener la clase 'elevated'
    expect(nativeElement.classList.contains('elevated')).toBeFalsy();

    // Simular hover
    component.startAnimationOnHover();

    // Después de simular hover, debería tener la clase 'elevated'
    expect(nativeElement.classList.contains('elevated')).toBeTruthy();

    // Simular hover nuevamente
    component.startAnimationOnHover();

    // Después de simular hover nuevamente, no debería tener la clase 'elevated'
    expect(nativeElement.classList.contains('elevated')).toBeFalsy();
  });
});
