import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuelistComponent } from './issuelist.component';

describe('IssuelistComponent', () => {
  let component: IssuelistComponent;
  let fixture: ComponentFixture<IssuelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
