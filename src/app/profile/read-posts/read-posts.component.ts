import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbPopconfirmRef, MdbPopconfirmService } from "mdb-angular-ui-kit/popconfirm";
import { ToastrService } from 'ngx-toastr';
import { PopupConfirmComponent } from 'src/app/profile/popup-confirm/popup-confirm.component';
import { ReadPostResponse } from 'src/app/_model/post.model';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { PostService } from '../../post/post.service';

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
  temp!: any;

  constructor(private toastrService: ToastrService, private postService: PostService, private router: Router, private tokenStorage: TokenStorageService, private http: HttpClient, private popconfirmService: MdbPopconfirmService) { }

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

        this.tokenStorage.signOut();
        this.router.navigate(['home'])
      })
    })
  }

  delete_read_post(link: string) {
    var loggedUser = JSON.parse(localStorage.getItem('auth-user') || '{}');
    const { email } = loggedUser;
    this.postService.get_read_news(email).subscribe((res: ReadPostResponse) => {
      this.temp = res;
      var read_post = this.temp[0];
      var existed = read_post.posts.findIndex((x: any) => x?.link === link);
      if (existed !== -1) {
        read_post.posts.splice(existed, 1);
        this.postService.save_read_post(read_post).subscribe(res => {
          if (res) {
            this.toastrService.success("Xóa thành công", "Thành công");
            this.get_data();
          } else {
            this.toastrService.error("Xóa thất bại", "Thất bại");
          }
        });
      }
    });
  }
}
