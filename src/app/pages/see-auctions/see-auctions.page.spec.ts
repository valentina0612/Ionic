import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeeAuctionsPage } from './see-auctions.page';

describe('SeeAuctionsPage', () => {
  let component: SeeAuctionsPage;
  let fixture: ComponentFixture<SeeAuctionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAuctionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
