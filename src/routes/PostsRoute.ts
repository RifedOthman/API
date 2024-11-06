import { Router } from 'express';
import { PostsController } from '../controllers';
import { validateCreatePost } from '../middlewares/dataValidator';
import authJwt from '../middlewares/authJwt';
import authorize from '../middlewares/authorize';

export class PostsRoute {
  private postsController: PostsController;

  constructor(postsController: PostsController) {
    this.postsController = postsController;
  }

  createRouter(): Router {
    const router = Router();

    //CREATE POST 
    router.post('/posts', authJwt.verifyToken, validateCreatePost, this.postsController.createPost.bind(this.postsController));

    //GET ALL POSTS 
    router.get('/allposts', this.postsController.getPosts.bind(this.postsController));

    //GET POST BY ID 
    router.get('/posts/:id', this.postsController.getPostById.bind(this.postsController));

    //DeletePOST
    router.delete('/posts/:id', authorize('admin'), authJwt.verifyToken , this.postsController.deletePost.bind(this.postsController));

    // UPDATE POST  
    router.put('/posts/:id',authorize('admin'),this.postsController.updatePost.bind(this.postsController)) ; 

    //GET ALL POSTS BY USER 
    router.get('/users/:userId/posts', this.postsController.getAllPostsByUser.bind(this.postsController));

    //GET POSTS BY CATEGORY 
    router.get('/posts', this.postsController.getPostsByCategory.bind(this.postsController));

    //GET CATEGORIES 
    router.get('/categories', this.postsController.getCategories.bind(this.postsController));

    //UPVOTE,DOOWNVOTE POST   
    router.post('/posts/:id/vote',authJwt.verifyToken , this.postsController.updownvote.bind(this.postsController));

    return router;
  }
}
