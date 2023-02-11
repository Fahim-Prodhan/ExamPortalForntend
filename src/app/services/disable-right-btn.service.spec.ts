import { TestBed } from '@angular/core/testing';

import { DisableRightBtnService } from './disable-right-btn.service';

describe('DisableRightBtnService', () => {
  let service: DisableRightBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisableRightBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
