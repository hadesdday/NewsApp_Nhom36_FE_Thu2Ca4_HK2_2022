import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../_service/token-storage.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public infoForm !: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private tokenStorage: TokenStorageService, private http: HttpClient) {
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
      "id":this.currentUser.id,
      "username": this.currentUser.username,
      "password": this.currentUser.password,
      "email": this.infoForm.value.email,
      "phone": this.infoForm.value.phone,
      "name": this.infoForm.value.name,
      "address": this.infoForm.value.address,
      "dateBirth": this.infoForm.value.dateBirth,
      "gender":this.currentUser.gender
    }
    this.http.put("http://localhost:3000/user/" + this.currentUser.id, user).subscribe(res => {
      alert("change success")
      this.tokenStorage.saveUser(user);
      this.currentUser=this.tokenStorage.getUser();
      console.log(this.currentUser)
      window.location.reload();
    })

  }
  changeGender({e}: { e: any }) {
    this.currentUser.gender=e.target.value;
    console.log(e.target.value);
  }
}
