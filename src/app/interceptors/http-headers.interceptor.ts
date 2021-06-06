import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone(
            {
                setHeaders: {
                },
                setParams: {
                    key: '534521d1aa85401bacce61e37e7ea2c0',
                }
            }
        );

        return next.handle(req);
    }
}
