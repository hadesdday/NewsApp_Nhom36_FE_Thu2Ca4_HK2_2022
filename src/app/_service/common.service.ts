import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService, private http: HttpClient) {
  }

  public handleError(error: HttpErrorResponse, errorRes: string) {
    this.toastr.error(errorRes);
    return throwError(error);
  }
  public toastError(successText: string){
    this.toastr.error(successText,"Lỗi!!")
  }
  public toastSuccess(successText: string) {
    this.toastr.success(successText,"Thành công")
  }
}
