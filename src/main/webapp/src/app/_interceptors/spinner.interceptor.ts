import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(res => {
          if (res.type === HttpEventType.Sent) {
            this.spinner.show();
            console.log('interceptor spinner: request sent');
          }

          if (res.type === HttpEventType.Response) {
            this.spinner.hide();
            console.log('interceptor spinner: response received');
          }
        },
        () => {
          this.spinner.hide();
        }
      )
    );
  }
}
