import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../post';
import { PostsService } from '../posts.service';


import { Store, Select, Selector } from '@ngxs/store';

import * as fromPostsState from './../store/states/posts.state';
import * as fromPostActions from './../store/actions/post.actions';

@Component({
  selector: 'app-posts-test',
  templateUrl: './posts-test.component.html',
  styleUrls: ['./posts-test.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('2s ease-out',
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('2s ease-in',
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class PostsTestComponent implements OnInit {
  posts: Observable<Post[]>;
  spanVisible: boolean;
  inputVisible: boolean;
  btnText: string;

  // @Select(state => state.postsArray.posts) posts$: Observable<fromPostsState.PostsStateModel>;
  @Select(fromPostsState.PostsState.getPostsList) posts$;
  // @Select(fromPostsState.PostsState) posts$: Observable<fromPostsState.PostsState>;
  poststate: fromPostsState.PostsStateModel;
  storeSub: Subscription;


  @ViewChild('inputTitle') nameInputRef: ElementRef;
  @ViewChild('titleCreate') nameInputCreate: ElementRef;


  constructor(private http: HttpClient, private postsService: PostsService, private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new fromPostActions.GetPosts());
  }

  createUser(title: string): void {
    this.store.dispatch(new fromPostActions.AddPost(title)).subscribe(
      x => {
        this.nameInputCreate.nativeElement.value = '';
      }
    );
  }

  updatePost(id: number): void {
    this.store.dispatch(new fromPostActions.ManageUpdatePost(id, this.nameInputRef));

    /*postTitle === undefined ?
      this.store.dispatch(new fromPostActions.ManageUpdatePost(postId, ''))
      : this.store.dispatch(new fromPostActions.ManageUpdatePost(postId, postTitle));*/


    // if (post['btnText'] === 'edit') {
      // this.store.dispatch(new fromPostActions.UpdatePost(post));
    // }


    /*post['spanVisible'] = !post['spanVisible'];
    post['inputVisible'] = !post['inputVisible'];

    post['inputVisible'] ? post['btnText'] = 'save' : post['btnText'] = 'edit';

    if (post['btnText'] === 'edit') {
      console.log('here we would send info to server');
    }*/
    /*this.postsService.updatePost({ id: post['value'].id, title: 'title changedd' }).subscribe(
      x => {
        this.getPosts();
      }
    );*/

    /*post['value'].spanVisible = !post['value'].spanVisible;
    post['value'].inputVisible = !post['value'].inputVisible;
    // post['value'].btnText === 'edit' ? post['value'].btnText = 'save' : post['value'].btnText = 'edit';

    if (post['value'].btnText === 'edit') {
      post['value'].btnText = 'save';
    } else {
      post['value'].btnText = 'edit';
      this.postsService.updatePost({ id: +post['value'].id, title: post['value'].title, }).subscribe(
        x => this.getPosts()
      );
    }*/



  }

  deletePost(id: number): void {
    // this.store.dispatch(new fromPostActions.DeletePost(+id)).subscribe(
      // x => this.posts = x.postsArray.posts
    // );
    this.store.dispatch(new fromPostActions.DeletePost(+id)).subscribe(
      // x => this.store.dispatch(new fromPostActions.GetPosts())
    );
  }

}
