import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

export function intercept(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');

    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authirization', `Bearer ${token}`),
        });

        return next(cloned);
    }

    return next(req);
}