import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiErrorAlertComponent } from './error-alert.component';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

describe('UiErrorAlertComponent', () => {
  let component: UiErrorAlertComponent;
  let fixture: ComponentFixture<UiErrorAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiErrorAlertComponent],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(UiErrorAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter alertIsVisible como true inicialmente', () => {
    expect(component.alertIsVisible).toBeTruthy();
  });

  it('deve definir alertIsVisible como true ao mudar trigger via ngOnChanges', () => {
    component.alertIsVisible = false;

    component.ngOnChanges({
      trigger: new SimpleChange(false, true, true)
    });

    expect(component.alertIsVisible).toBeTruthy();
  });

  it('não deve alterar alertIsVisible se trigger não mudar em ngOnChanges', () => {
    component.alertIsVisible = false;

    component.ngOnChanges({
      message: new SimpleChange('Erro anterior', 'Novo erro', false)
    });

    expect(component.alertIsVisible).toBeFalsy();
  });

  it('deve fechar o alerta quando closeAlert for chamado', () => {
    component.alertIsVisible = true;

    component.closeAlert();

    expect(component.alertIsVisible).toBeFalsy();
  });
});
