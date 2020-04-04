import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobBookingDetailPage } from './job-booking-detail.page';

describe('JobBookingDetailPage', () => {
  let component: JobBookingDetailPage;
  let fixture: ComponentFixture<JobBookingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBookingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobBookingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
