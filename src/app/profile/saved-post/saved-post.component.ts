import {Component, OnInit} from '@angular/core';
import {PostService} from "../../post/post.service";
import {TokenStorageService} from "../../_service/token-storage.service";

@Component({
  selector: 'app-saved-post',
  templateUrl: './saved-post.component.html',
  styleUrls: ['./saved-post.component.scss']
})
export class SavedPostComponent implements OnInit {
  items: any;

  constructor(private postService: PostService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.postService.get_savedPost(this.tokenStorage.getUser().id).subscribe(res => {
      console.log(res)
      this.items=res
    })

  }

}
