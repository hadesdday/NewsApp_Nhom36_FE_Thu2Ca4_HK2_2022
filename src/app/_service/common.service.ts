import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  public handleError(error: HttpErrorResponse, errorRes: string) {
    this.toastr.error(errorRes);
    return throwError(error);
  }
}
