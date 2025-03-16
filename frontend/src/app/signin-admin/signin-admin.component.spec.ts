import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAdminComponent } from './signin-admin.component';

describe('SigninAdminComponent', () => {
  let component: SigninAdminComponent;
  let fixture: ComponentFixture<SigninAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
