import { Router } from 'express';
import { UserController } from '../controllers';
import { validateCreateUser, validateLoginUser ,validateUpdateUser } from '../middlewares/dataValidator';
import authJwt from '../middlewares/authJwt';
import authorize from '../middlewares/authorize';

export class UsersRoute {
  private userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  createRouter(): Router {
    const router = Router();
    
   // create user 
    router.post('/users', validateCreateUser, this.userController.createUser.bind(this.userController)); 

    // admin update user 
    router.put('/users/:id' , validateUpdateUser ,authorize('admin') , this.userController.updateUser.bind(this.userController) );

    // connected user update 
    router.put('/usersconnected',authJwt.verifyToken, this.userController.updateConnectedUser.bind(this.userController));  // Bind the updateUser method
 
    // delete user 
    router.delete('/users/:id' ,authorize('admin'), this.userController.DeleteUser.bind(this.userController) );

    //change password  
    router.patch('/users/password' ,authJwt.verifyToken,  this.userController.changePassword.bind(this.userController) ) ; 

    // get all users 
    router.get('/users', this.userController.getUsers.bind(this.userController)); 
    
    // get user by id 
    router.get('/users/:id', authJwt.verifyToken, this.userController.getUserById.bind(this.userController)); 

    // login user 
    router.post('/auth/login', validateLoginUser, this.userController.login.bind(this.userController)); 

    
    return router;
  }
}
