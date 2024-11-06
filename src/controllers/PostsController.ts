import { Request, Response } from "express";
import { PostsService } from "../services";
import { validationResult } from "express-validator";

export class PostsController {
  private postsService: PostsService;
  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }

  async createPost(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(400).json({
        status: 400,
        message: "Bad request.",
        data: errors.array(),
      });
    } else {
      try {
        const { title, description, categories } = request.body;

        const postData = {
          title,
          description,
          categories,
          createdBy: request.userId,
        };

        const postResponse = await this.postsService.createPost(postData);

        response.status(postResponse.status).send({
          ...postResponse,
        });
      } catch (error) {
        response.status(500).json({
          status: 500,
          message: "Internal server error",
          data: error,
        });
      }
    }
  }

  async getPosts(request: Request, response: Response): Promise<void> {
    try {
      console.log("Category name");
      console.log(request.query.category);

      const postsResponse = await this.postsService.getPosts();

      response.status(postsResponse.status).send({
        ...postsResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error,
      });
    }
  }

  //GET POST BY ID
  async getPostById(request: Request, response: Response): Promise<void> {
    try {
      if (request.params.id) {
        const postResponse = await this.postsService.getPostById(
          request.params.id,
        );

        response.status(postResponse.status).send({
          ...postResponse,
        });
      } else {
        response.status(404).json({
          status: 404,
          message: "Post not found",
        });
      }
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error,
      });
    }
  }

  async getAllPostsByUser(request: Request, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
      const postsResponse = await this.postsService.getAllPostsByUser(userId);

      response.status(postsResponse.status).send({
        ...postsResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error,
      });
    }
  }

  async getCategories(request: Request, response: Response): Promise<void> {
    try {
      const categoriesResponse = await this.postsService.getCategories();

      response.status(categoriesResponse.status).send({
        ...categoriesResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error,
      });
    }
  }

  async deletePost(request: Request, response: Response): Promise<void> {
    // Validate incoming data
    const errors = validationResult(request);

    // to check if the post exists later with find post by id :)
    try {
      const postId = request.params.id; // Get the user ID from the route parameters

      // Update the user data in the database
      const updateResponse = await this.postsService.deletePost(postId); // Call the updateUser method in UsersService

      response.status(updateResponse.status).send({
        ...updateResponse,
        postId, // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error, // Optionally log error for debugging
      });
    }
  }

  async updatePost(request: Request, response: Response): Promise<void> {
    // Validate incoming data
    const errors = validationResult(request);

    try {
      const postId = request.params.id; // Get the POSTS ID from the route parameters YEY !!
      const updateData = request.body;
      // Check if the post exists bi id to implement later :)

      // Update the user data in the database
      const updateResponse = await this.postsService.updatePost(
        postId,
        updateData,
      ); // Call the updateUser method in UsersService

      response.status(updateResponse.status).send({
        ...updateResponse,
        postId, // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error, // Optionally log error for debugging
      });
    }
  }

  async updownvote(request: Request, response: Response): Promise<void> {
    const postId = request.params.id; // Get the post ID from the route parameters
    const userId = request.userId; // Assuming you have middleware to set the userId

    try {
      const voteResponse = await this.postsService.updownvotePost(
        postId,
        userId as string,
      );

      response.status(voteResponse.status).send(voteResponse);
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error,
      });
    }
  }

  async getPostsByCategory(
    request: Request,
    response: Response,
  ): Promise<void> {
    try {
      const category = request.query.category as string;

      if (!category) {
        response.status(400).json({
          status: 400,
          message: "Category is required.",
        });
        return;
      }

      const postsResponse =
        await this.postsService.getPostsByCategory(category);

      response.status(postsResponse.status).send({
        ...postsResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: "Internal server error",
        data: error,
      });
    }
  }
}
