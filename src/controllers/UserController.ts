import { Request, Response } from 'express';
import { UsersService } from '../services';
import { validationResult } from 'express-validator';

export class UserController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  async createUser(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(400).json({
        status: 400,
        message: 'Bad request.',
        data: errors.array(),
      });
    } else {
      try {
        const { email, password, username } = request.body;

        const userData = { email, password, username };

        const userResponse = await this.usersService.createUser(userData);

        response.status(userResponse.status).send({
          ...userResponse,
        });
      } catch (error) {
        response.status(500).json({
          status: 500,
          message: 'Internal server error',
          data: error
        })
      }
    }
  }

  async getUsers(request: Request, response: Response): Promise<void> {
    try {
      const usersResponse = await this.usersService.getUsers();

      response.status(usersResponse.status).send({
        ...usersResponse,
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error
      })
    }
  }

  async getUserById(request: Request, response: Response): Promise<void> {
    try {
      if (request.params.id) {
        const usersResponse = await this.usersService.getUserById(request.params.id);

        response.status(usersResponse.status).send({
          ...usersResponse,
        });
      } else {
        response.status(404).json({
          status: 404,
          message: 'User not found'
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

  async login(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.status(400).json({
        status: 400,
        message: 'Bad request.',
        data: errors.array(),
      });
    } else {
      try {
        const { email, password } = request.body;
        const userData = { email, password };

        const userResponse = await this.usersService.login(userData);

        response.status(userResponse.status).json({
          ...userResponse
        });
      } catch (error) {
        response.status(500).json({
          status: 500,
          message: 'Internal server error',
          data: error
        })
      }
    }
  }



  async updateUser(request: Request, response: Response): Promise<void> {
    // Validate incoming data
    const errors = validationResult(request);
    
    if (request.body.role !== 'admin') {
      response.status(400).json({
        status: 403,
        message: 'FORBIDDEN YOU DONT HAVE THE PERMISSION TO PERFORM ',
        data: errors.array(),
      });
      return; }

    if (!errors.isEmpty()) {
      response.status(400).json({
        status: 400,
        message: 'Bad request. Validation errors.',
        data: errors.array(),
      });
      return; // End the function after sending the response
    }
  
    try {
      const userId = request.params.id; // Get the user ID from the route parameters
      const updateData = request.body;
  
      
      // Check if the user exists
      const userDoc = await this.usersService.getUserById(userId);
      if (userDoc.status !== 200) {
        response.status(404).json({
          status: 404,
          message: 'User not found',
        });
        return; // End the function after sending the response
      }
  
      const updateResponse = await this.usersService.updateUser(userId, updateData); // Call the updateUser method in UsersService
  
      response.status(updateResponse.status).send({
        ...updateResponse,
        userId // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error, // Optionally log error for debugging
      });
    }
  }
  



  async updateConnectedUser(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);
  
    if (!errors.isEmpty()) {
      response.status(400).json({
        status: 400,
        message: 'Bad request. Validation errors.',
        data: errors.array(),
      });
      return; // End the function after sending the response
    }
  
    try {

      console.log("fffsssffff")

      const userId = request.userId; // Get the user ID from the authenticated request
  
      // Check if userId is defined
      if (!userId) {
        response.status(400).json({
          status: 400,
          message: 'User ID is required.',
        });
        return; // End the function after sending the response
      }
  
      const updateData = request.body;
  
      // Call the updateConnectedUser method in UsersService
      const updateResponse = await this.usersService.updateUser(userId, updateData);
  
      response.status(updateResponse.status).send({
        ...updateResponse,
        userId, // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error,
      });
    }
  }

  async DeleteUser(request: Request, response: Response): Promise<void> {
    // Validate incoming data
    const errors = validationResult(request);

    try {
      const userId = request.params.id; // Get the user ID from the route parameters
      
      // Check if the user exists
      const userDoc = await this.usersService.getUserById(userId);
      if (userDoc.status !== 200) {
        response.status(404).json({
          status: 404,
          message: 'User not found',
        });
        return; // End the function after sending the response
      }
  
      // Update the user data in the database
      const updateResponse = await this.usersService.DeleteUser(userId); // Call the updateUser method in UsersService
  
      response.status(updateResponse.status).send({
        ...updateResponse,
        userId // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error, // Optionally log error for debugging
      });
    }
  }
  
  
  async changePassword(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request);
  
    if (!errors.isEmpty()) {
      response.status(400).json({
        status: 400,
        message: 'Bad request. Validation errors.',
        data: errors.array(),
      });
      return; // End the function after sending the response
    }
  
    try {
      const userId = request.userId; // Ensure this is retrieved from the authenticated request
  console.log(userId) ; 
      // Check if userId is defined
      if (!userId) {
        response.status(400).json({
          status: 400,
          message: 'User ID is required.',
        });
        return;
      }
  
      const { password } = request.body;
      console.log("password")

      console.log(password)
      if (!password) {
        response.status(400).json({
          status: 400,
          message: 'Password is required.',
        });
        return;
      }
  
      // Call the changePassword method in UsersService
      const updateResponse = await this.usersService.changePassword(userId, password);
  
      response.status(updateResponse.status).send({
        ...updateResponse,
        userId, // Include the user ID in the response
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: error,
      });
    }
  }
  

}
