import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbPopconfirmRef, MdbPopconfirmService } from "mdb-angular-ui-kit/popconfirm";
import { PopupConfirmComponent } from 'src/app/profile/popup-confirm/popup-confirm.component';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-read-posts',
  templateUrl: './read-posts.component.html',
  styleUrls: ['./read-posts.component.scss']
})


export class ReadPostsComponent implements OnInit {
  currentUser: any;
  popconfirmRef: MdbPopconfirmRef<PopupConfirmComponent> | null = null;
  read_news!: Array<any>;
  data: any;
  isExisted = false;

  constructor(private postService: PostService, private router: Router, private tokenStorage: TokenStorageService, private http: HttpClient, private popconfirmService: MdbPopconfirmService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    this.get_data();
  }

  get_data() {
    this.postService.get_read_news(this.currentUser.email).subscribe(res => {
      this.data = res;
      this.read_news = this.data[0]?.posts
      this.isExisted = this.read_news.length > 0;
    });
  }

  openPopconfirm(event: Event) {
    const target = event.target as HTMLElement;

    this.popconfirmRef = this.popconfirmService.open(PopupConfirmComponent, target)
    this.popconfirmRef.onConfirm.subscribe(() => {
      this.http.delete<any>("http://localhost:3000/user/"
        + this.tokenStorage.getUser()['id']
      ).subscribe(() => {
        alert("http://localhost:3000/user/"
          + this.tokenStorage.getUser()['id'])
        this.tokenStorage.signOut();
        this.router.navigate(['home'])
      })
    })
  }
}
