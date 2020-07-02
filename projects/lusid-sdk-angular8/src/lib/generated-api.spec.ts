import { TestBed } from '@angular/core/testing';

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Configuration, ConfigurationParameters } from './generated/configuration';
import { BASE_PATH } from './generated/variables';
import { PortfoliosService } from './generated/api/portfolios.service';

const basePath = 'https://api.finbourne.com';
// tslint:disable-next-line:max-line-length : this needs to be set to a valid token
const accessToken = 'Put your token here!';

function handleError(error: HttpErrorResponse, done: any) {
  let clientFacingError = 'Something bad happened: pleae try again later.';

  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('Network error occurred:', error.error.message);
    clientFacingError = 'There was a network error, please try again later';
  } else {
    // The backend returned an unsuccessful response code.
    console.error(`Service error occurred: status=${error.status} (${error.statusText})`, error.error);
    clientFacingError = `The service call failed, status=${error.status} (${error.statusText})`;
  }
  fail(clientFacingError);
  done();
  // return an observable with a user-facing error message
  return throwError(clientFacingError);
}

function call<T>(observable: Observable<T>, done: any): Observable<T> {
  return observable.pipe(
    catchError(error => handleError(error, done))
  );
}

function getPortfoliosService(config?: ConfigurationParameters): PortfoliosService {
  const configuration = new Configuration({
    accessToken: accessToken,
    basePath: basePath
  });
  if (config) {
    Object.assign(configuration, config);
  }

  TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      { provide: BASE_PATH, useValue: configuration.basePath },
      { provide: Configuration, useValue: configuration },
      PortfoliosService,
    ]
  });

  const portfoliosService: PortfoliosService = TestBed.get(PortfoliosService);
  if (config) {
    Object.assign(portfoliosService.configuration, config);
  }

  return portfoliosService;
}

describe('When using a remote srevice', () => {

  describe('With unknown BASE_PATH', () => {

    let service: PortfoliosService;

    beforeEach(() => {
      service = getPortfoliosService({ basePath: 'https://unknown.com/' });
    });

    it('getting resource fails due to network error', (done) => {
      service.listPortfolioScopes().subscribe(
        result => {
          fail('Should not have got a response.');
          done();
        },
        error => {
          expect(error).toBeTruthy('error should have some content');
          expect(error instanceof HttpErrorResponse).toBe(true, 'error should be a HttpErrorResponse');
          const err = <HttpErrorResponse>error;
          expect(err.status).toBe(0, 'error status');
          done();
        }
      );
    });

  });

  describe('With no access token', () => {

    let service: PortfoliosService;

    beforeEach(() => {
      service = getPortfoliosService({ accessToken: null });
    });

    it('getting resource fails with Unauthorized (401)', (done) => {
      service.listPortfolioScopes().subscribe(
        result => {
          fail('Should not have got a response.');
          done();
        },
        error => {
          expect(error).toBeTruthy('error should have some content');
          expect(error instanceof HttpErrorResponse).toBe(true, 'error should be a HttpErrorResponse');
          const err = <HttpErrorResponse>error;
          expect(err.status).toBe(401, 'error status');
          done();
        }
      );
    });

  });

  describe('With valid setup', () => {

    let service: PortfoliosService;

    beforeEach(() => {
      service = getPortfoliosService();
    });

    describe('GET listPortfolioScopes `body`', () => {
      it('should return a list of scopes', (done) => {
        call(service.listPortfolioScopes(), done).subscribe(
          body => {
            expect(body).toBeTruthy('body');
            expect(body.values).toBeTruthy('body.values');
            expect(body.values.length).toBeGreaterThanOrEqual(0, 'body.values.length');
            done();
          }
        );
      });
    });

    describe('GET listPortfolioScopes `response`', () => {
      it('should return the full response (body, hearders, status, ...)', (done) => {
        call(service.listPortfolioScopes(undefined, undefined, undefined, 'response'), done).subscribe(
          response => {
            expect(response).toBeTruthy();
            expect(response.status).toBe(200, 'response.status');
            expect(response.headers).toBeTruthy('response.headers');
            // You can only access headers allowd by CORS
            expect(response.headers.keys()).toBeTruthy('response.headers.keys()');
            const body = response.body; // Should be the same as result when observe=`body`
            expect(body).toBeTruthy('body');
            expect(body.values).toBeTruthy('body.values');
            expect(body.values.length).toBeGreaterThanOrEqual(0, 'body.values.length');
            done();
          }
        );
      });
    });

  });

});
