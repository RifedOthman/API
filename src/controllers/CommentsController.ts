import { Request, Response } from 'express';
import { CommentsService } from '../services';
import { validationResult } from 'express-validator';


export class CommentsController {
    private commentsService: CommentsService;
  
    constructor(commentsService: CommentsService) {
      this.commentsService = commentsService;
    }




      async addCommentToPost(request: Request, response: Response): Promise<void> {
      /*  const errors = validationResult(request);
    
        if (!errors.isEmpty()) {
          response.status(400).json({
            status: 400,
            message: 'Bad request.',
            data: errors.array(),
          });
        } else {
         */  try {
            const { description } = request.body;
    
            const commentData = {
              description,
              postId:request.params.postId ,
              createdBy: request.userId,
            };
            
            console.log(request.body)
            const commentResponse = await this.commentsService.createComment(commentData);
    
            response.status(commentResponse.status).send({
              ...commentResponse,
            });
          } catch (error) {
            console.error('Error adding comment:', error);  // Logs the actual error
            response.status(500).json({
                status: 500,
                message: 'Internal server error',
                data: error
            });
        }
      }

      

      async getComments(request: Request, response: Response): Promise<void> {
        try {
          console.log('Comments : ');
          console.log(request.query.category);
    
          const commentsResponse = await this.commentsService.getComments();
    
          response.status(commentsResponse.status).send({
            ...commentsResponse,
          });
        } catch (error) {
          response.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: error
          });
        }
      }


    
    async getallCommentsPost(request: Request, response: Response): Promise<void> {
        const { postId } = request.params;
    
        try {
            const commentResponse = await this.commentsService.getAllCommentsPost(postId);
    
            response.status(commentResponse.status).send({
                ...commentResponse,
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                message: 'Internal server error',
                data: error
            });
        }
    }




    async getCommentById(request: Request, response: Response): Promise<void> {
        try {
          if (request.params.id) {
            const commentResponse = await this.commentsService.getCommentById(request.params.id);
    
            response.status(commentResponse.status).send({
              ...commentResponse,
            });
          } else {
            response.status(404).json({
              status: 404,
              message: 'Comment not found'
            });
          }
        } catch (error) {
          response.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: error
          })
        }
      }


    
      async updateComment(request: Request, response: Response): Promise<void> {
        // Validate incoming data
        const errors = validationResult(request);
        
       /* 
       HERE ADD CHECK ADMINNNN PLEASE DO NOT FORGETTT 
        if (request.body.role !== 'admin') {
          response.status(400).json({
            status: 403,
            message: 'FORBIDDEN YOU DONT HAVE THE PERMISSION TO PERFORM ',
            data: errors.array(),
          });
          return; }
    */
    
    
        try {
          const commentId = request.params.id; // Get the POSTS ID from the route parameters YEY !! 
          const updateData = request.body;
          // Check if the post exists bi id to implement later :) 
         
      
          // Update the user data in the database
          const updateResponse = await this.commentsService.updateComment(commentId, updateData); // Call the updateUser method in UsersService
      
          response.status(updateResponse.status).send({
            ...updateResponse,
            commentId // Include the user ID in the response
          });
        } catch (error) {
          response.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: error, // Optionally log error for debugging
          });
        }
      }
     
      
  async deleteComment(request: Request, response: Response): Promise<void> {
    // Validate incoming data
    const errors = validationResult(request);

    // to check if the post exists later with find post by id :) 
    try {
      const commentId = request.params.id; // Get the user ID from the route parameters
      
    
  
      // Update the user data in the database
      const updateResponse = await this.commentsService.deleteComment(commentId); // Call the updateUser method in UsersService
  
      response.status(updateResponse.status).send({
        ...updateResponse,
        commentId // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error, // Optionally log error for debugging
      });
    }
  }


/*
  async updownvote(request: Request, response: Response): Promise<void> {
    const postId = request.params.id; // Get the post ID from the route parameters
    const userId = request.userId; // Assuming you have middleware to set the userId

    try {
      
      const voteResponse = await this.commentsService.updownvotePost(postId, userId as string);

      response.status(voteResponse.status).send(voteResponse);
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error,
      });
    }
  }
*/
    
}