import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

// Create a mock AuthService
class MockAuthService {
  getToken() {
    return 'mock-token'; // Return a mock token
  }
}

describe('AuthInterceptor', () => {
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to test HTTP requests
      providers: [
        { provide: AuthService, useClass: MockAuthService } // Provide the mock AuthService
      ]
    });

    // Create an instance of AuthInterceptor using the mock service
    authInterceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add Authorization header if token is available', () => {
    const mockRequest = { headers: {} } as any;  // Mock HTTP request
    const mockNext = { handle: () => {} } as any;  // Mock HTTP handler

    spyOn(mockNext, 'handle').and.callFake((req: any) => {
      // Check if the Authorization header is added
      expect(req.headers.get('Authorization')).toBe('Bearer mock-token');
      return mockNext.handle(req); // Return the result of next.handle()
    });

    // Call intercept method
    authInterceptor.intercept(mockRequest, mockNext);
  });
});
