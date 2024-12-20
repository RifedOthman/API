import {Router} from 'express' ; 
import { CommentsController } from '../controllers';
import { validateCreatePost } from '../middlewares/dataValidator';
import authJwt from '../middlewares/authJwt';


export class CommentsRoute { 
    private commentsController : CommentsController ; 
    
    constructor(commentsController : CommentsController){
        this.commentsController = commentsController ; 
    }


    createRouter(): Router{
        const router = Router() ; 

        //ADD COMMENT TO MY POST 
        router.post('/posts/:postId/comments',authJwt.verifyToken , this.commentsController.addCommentToPost.bind(this.commentsController));

        //GET ALL COMMENTS OF A POST 
        router.get('/posts/:postId/comments',this.commentsController.getallCommentsPost.bind(this.commentsController));

        //GET ALL COMMENTS 
        router.get('/comments',this.commentsController.getComments.bind(this.commentsController))

        //GET A COMMENT BY ID  
        router.get('/comments/:id',this.commentsController.getCommentById.bind(this.commentsController));

         //Delete comment
        router.delete('/comments/:id', this.commentsController.deleteComment.bind(this.commentsController));

        // UPDATE comment
        router.put('/comments/:id',this.commentsController.updateComment.bind(this.commentsController)) ; 
        
        //UPVOTE,DOOWNVOTE Comment    
       router.post('/comments/:id/vote',authJwt.verifyToken, this.commentsController.updownvote.bind(this.commentsController));

        //TOP COMMENTS 
        router.get('/posts/:postId/comments/top', this.commentsController.getTopComments.bind(this.commentsController));

        
        return router ; 

    }






}