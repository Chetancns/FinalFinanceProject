import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFinanceComponent } from './list-of-finance.component';

describe('ListOfFinanceComponent', () => {
  let component: ListOfFinanceComponent;
  let fixture: ComponentFixture<ListOfFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
