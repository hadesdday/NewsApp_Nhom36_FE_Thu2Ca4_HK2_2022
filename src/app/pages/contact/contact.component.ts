import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {API_AUTH, API_URL} from "../../_api/apiURL";
import {CommonService} from "../../_service/common.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private commonService: CommonService, private router: Router) {
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      text: new FormControl("", [Validators.required])
    })
  }

  contact() {
    this.http.post<any>(API_URL.CONTACT, {
      "email": this.contactForm.value.email,
      "name": this.contactForm.value.name,
      "title": this.contactForm.value.title,
      "text": this.contactForm.value.text
    }).subscribe(res => {
      this.commonService.toastSuccess("Gửi tin thành công thành công!")
      window.location.reload();
    },error => {
      this.commonService.toastError("Gửi tin thất bại!!")
    });
  }
}
