import { TestBed } from '@angular/core/testing';

import { RickyMortyBdService } from './ricky-morty-bd.service';

describe('RickyMortyBdService', () => {
  let service: RickyMortyBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickyMortyBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
