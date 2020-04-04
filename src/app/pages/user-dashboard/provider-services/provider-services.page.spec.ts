import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProviderServicesPage } from './provider-services.page';

describe('ProviderServicesPage', () => {
  let component: ProviderServicesPage;
  let fixture: ComponentFixture<ProviderServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
