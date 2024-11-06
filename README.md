# SyncVote Rest API

Nodejs (TypeScript)


## Installation

Install the project dependencies

```bash
npm install
```

## Developing

Copy **.env.example** and name it **.env** and set the env variables.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.


### Create a new admin

```bash
npm run create-admin
```
# ---------------- #
# Usersroutes  
# ---------------- #
# Create USER : 
Route : POST
Method : /users
![alt text](<create user .png>)

# User login : 
Route : POST  
Method : /auth/login
![alt text](image.png)

# Change password : 
Route : /users/password  
Method : PATCH
 ![alt text](<password change.png>)

 # Get all users :
Route : /users  
Method : GET
 ![alt text](<get all users.png>)

 # Change user informations :
Route : /users/:id  
Method : PUT
 ![alt text](<update user informations.png>)

 # update connected user informations (1 - saisie de token): 
 # j'ai changé la route /users/me par /usersconnected pour eviter la confusion avec la route de update user
Route : PUT  
Method : usersconnected
![alt text](<updateconnecteduser 1 .png>)
 # update connected user informations ( 2 - saisie de nouveau informations de user ): 
![alt text](<update user 2 .png>)

 # Delete user :
Route : DELETE  
Method : /users/:id
![alt text](<delete user .png>)


# ---------------- #
# PostsRoutes 
# ---------------- #
 # GetallPOSTS :
Route : /posts  
Method : GET
![alt text](<GET ALL POSTS .png>)
 
# GetPostbyID :
Route : /posts/id  
Method : GET
  ![alt text](<GET POSTS BY ID .png>)

# Updatepost :
Route : /posts/:id  
Method : PUT
![alt text](<update POST .png>)

# Deletepost : 
Route : /posts/:id  
Method : DELETE
![alt text](<delete post .png>)

 # Getallpostsbyuser :
Route : /users/:id/posts  
Method : GET
![alt text](GetAllPostByuser.png)

 # GetallGetpostsbycategory :
Route : /posts?category=marvel  
Method : GET
 ![alt text](image-1.png)


 # ------------------------ #
 # Comments & Votes Routes : 
 # ----------------------- #

 # GET ALL COMENTS OF A POST  :
Route : /posts/:id/comments  
Method : GET
![alt text](Getallcommentsofapost.png)

 # Get a comment by ID :
Route : /comments/:id  
Method : GET
![alt text](GETCOMMENTBYID.png)

 # Addacommenttoapost 
 Route : /posts/:id/comments  
Method : POST
![alt text](<AJOUT COMMENTAIRE.png>)

 # Update comment
Route : /comments/:id  
Method : PUT
![alt text](updatecomment.png) 

 # Deleted comment
Route : /comments/:id  
Method : DELETE
![alt text](deletedcomment.png)

 # Post-Upvote/Downvote
Route : /posts/:id/vote  
Method : POST
![alt text](VOTEUPDOWNPOST.png)

 # Comment-Upvote/Downvote
Route : /comments/:id/vote  
Method : POST
![alt text](COMMENTUPVOTE.png)

 # TOP COMMENTS IN A POST 
Route : /posts/:id/comments/top
Method : GET
![alt text](<TOPCOMMENT POST .png>)


