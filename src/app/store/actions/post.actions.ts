import { ElementRef } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Post } from 'src/app/post';
import { PostsService } from 'src/app/posts.service';

export class GetPosts {
  static readonly type = '[Post] Get Posts';
}
export class AddPost {
  static readonly type = '[Post] Add Post';
  constructor(public title: string) {}
}
export class DeletePost {
  static readonly type = '[Post] Delete Post';
  constructor(public id: number) {}
}
export class ManageUpdatePost {
  static readonly type = '[Post] Manage UpdatePost Post';
  constructor(public id: number, public iRef: ElementRef) {}
}


export class UpdatePost {
  static readonly type = '[Post] Update Post';
  constructor(public post: Post) {}
}


