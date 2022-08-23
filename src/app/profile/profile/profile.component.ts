import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../_service/token-storage.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { API_AUTH } from 'src/app/_api/apiURL';
import {MdbPopconfirmRef, MdbPopconfirmService} from "mdb-angular-ui-kit/popconfirm";
import {PopupConfirmComponent} from "../popup-confirm/popup-confirm.component";
import {CommonService} from "../../_service/common.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public infoForm !: FormGroup;

  popconfirmRef: MdbPopconfirmRef<PopupConfirmComponent> | null = null;

  constructor(private formBuilder: FormBuilder,private commonService: CommonService, private router: Router, private tokenStorage: TokenStorageService, private http: HttpClient, private popconfirmService: MdbPopconfirmService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser)

    this.infoForm = this.formBuilder.group({
      email: new FormControl(this.currentUser.email, []),
      phone: new FormControl(this.currentUser.phone, []),
      name: new FormControl(this.currentUser.name, []),
      address: new FormControl(this.currentUser.address, []),
      dateBirth: new FormControl(this.currentUser.dateBirth, []),
      gender: new FormControl(this.currentUser.gender, [])
    })
  }

  signOut() {
    this.currentUser = null;
    this.tokenStorage.signOut();
    this.router.navigate(["home"]);
  }

  changeInfo() {
    const user = {
      "id": this.currentUser.id,
      "username": this.currentUser.username,
      "password": this.currentUser.password,
      "email": this.infoForm.value.email,
      "phone": this.infoForm.value.phone,
      "name": this.infoForm.value.name,
      "address": this.infoForm.value.address,
      "dateBirth": this.infoForm.value.dateBirth,
      "gender": this.currentUser.gender,
      "comfirmToken": this.currentUser.comfirmToken
    }
    this.http.put("http://localhost:3000/user/" + this.currentUser.id, user).subscribe(res => {
      this.commonService.toastSuccess("Thay đổi thông tin thành công thành công!")
      this.tokenStorage.saveUser(user);
      this.currentUser = this.tokenStorage.getUser();
      console.log(this.currentUser)
      window.location.reload();
    })

  }

  changeGender({e}: { e: any }) {
    this.currentUser.gender = e.target.value;
    console.log(e.target.value);
  }

  openPopconfirm(event: Event) {
    const target = event.target as HTMLElement;

    this.popconfirmRef = this.popconfirmService.open(PopupConfirmComponent, target)
    this.popconfirmRef.onConfirm.subscribe(()=>{
        this.http.delete<any>("http://localhost:3000/user/"
        +this.tokenStorage.getUser()['id']
      ).subscribe(()=>{
          localStorage.clear()
          this.router.navigate(['home'])
        })
    })
  }
}
