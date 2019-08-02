import {State, Store, Action, StateContext, Selector, Select} from '@ngxs/store';
import {Post} from './../../post';
import {GetPosts, AddPost, DeletePost, ManageUpdatePost, UpdatePost} from './../actions/post.actions';
import {PostsService} from './../../posts.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


export interface PostsStateModel {
  posts: Post[];
  selectedPost: Post;
}

@State<PostsStateModel>({
  name: 'postsArray',
  defaults: {
    posts: [],
    selectedPost: null
  }
})

export class PostsState {

  @Selector()
  static getPostsList(state: PostsStateModel) {
    return state.posts;
  }
  constructor(private store: Store, private postService: PostsService) { }

  @Action(GetPosts)
    getPosts({getState, setState}: StateContext<PostsStateModel>) {
    return this.postService.getPosts().pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          posts: result
        });
    }),
    catchError(error => of(window.alert('could not get posts'))),
    );
  }


  @Action(AddPost)
  AddPost(ctx: StateContext<PostsStateModel>, title: string) {
    const state = ctx.getState();


    return this.postService.createPost(state.posts.length, title['title']).pipe(tap((result) => {
      ctx.setState({
        ...state,
        posts: [
          ...state.posts,
          {
            id: state.posts.length,
            title: title['title'],
            author: 'new author',
            btnText: 'edit',
            spanVisible: true,
            inputVisible: false
          }
        ]
      });
    }),
  catchError(error => of(window.alert('could not add post')))).subscribe();
  }

  @Action(DeletePost)
  DeletePost(ctx: StateContext<PostsStateModel>, payload: number) {
    const state = ctx.getState();
    return this.postService.deletePost(payload).pipe(tap((result) => {
      console.log('resultado del delete: ', result);
      const state = ctx.getState();
      console.log('delete: ', result);
      ctx.patchState({
        ...state,
        posts: [...state.posts.filter(x => x.id !== payload['id'])]
      });
    }),
    catchError(error => of(window.alert('could not delete post')))).subscribe();
  }

  @Action(ManageUpdatePost)
  ManageUpdatePost(ctx: StateContext<PostsStateModel>, myParam: any) {
    const state = ctx.getState();
    const postsList = [...state.posts];
    const postIndex = postsList.findIndex(item => item.id === myParam['id']);

    const editedPost = {
      id: myParam['id'],
      title: myParam['iRef'] !== undefined ? myParam['iRef']['nativeElement']['value'] : postsList[postIndex]['title'],
      author: 'author edited',
      btnText: postsList[postIndex]['btnText'] === 'edit' ? 'save' : 'edit',
      spanVisible: !postsList[postIndex]['spanVisible'],
      inputVisible: !postsList[postIndex]['inputVisible']
    };

    postsList[postIndex] = editedPost;

    ctx.patchState({
      ...state,
      posts: postsList
    });

    if (editedPost.spanVisible) {
      this.store.dispatch(new UpdatePost(editedPost));
    }
  }

  @Action(UpdatePost)
  UpdatePost(ctx: StateContext<PostsStateModel>, postTitle: string) {
    const state = ctx.getState();
    return this.postService.updatePost(postTitle).pipe(tap((result) => {
      console.log('resultado del update: ', result);
      const state = ctx.getState();
      state.posts.filter(x => {
        if (x.id === postTitle['post']['id']) {
          x = postTitle['post']['title']
        }
      });
      ctx.patchState({
        ...state
      });
    }),
    catchError(error => of(window.alert('could not update post')))).subscribe();
  }
}
