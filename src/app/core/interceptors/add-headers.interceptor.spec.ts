import { TestBed } from '@angular/core/testing';

import { AddHeadersInterceptor } from './add-headers.interceptor';

describe('AddHeadersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddHeadersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddHeadersInterceptor = TestBed.inject(AddHeadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
