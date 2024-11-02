import { Post } from '../types/entities/Post';
import { Comment } from '../types/entities/Comment';
import { FirestoreCollections } from '../types/firestore';
import { IResBody } from '../types/api';
import { firestoreTimestamp } from '../utils/firestore-helpers';
import { Timestamp } from 'firebase/firestore';
import { categories } from '../constants/categories';

export class PostsService {
  private db: FirestoreCollections;

  constructor(db: FirestoreCollections) {
    this.db = db;
  }

  async createPost(postData: Post): Promise<IResBody> {
    const postRef = this.db.posts.doc();
    await postRef.set({
      ...postData,
      voteCount: 0,
      createdAt: firestoreTimestamp.now(),
      updatedAt: firestoreTimestamp.now(),
    });

    return {
      status: 201,
      message: 'Post created successfully!',
    };
  }

  async getPosts(): Promise<IResBody> {
    const posts: Post[] = [];
    const postsQuerySnapshot = await this.db.posts.get();

    for (const doc of postsQuerySnapshot.docs) {
      posts.push({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data()?.createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data()?.updatedAt as Timestamp)?.toDate(),
      });
    }

    return {
      status: 200,
      message: 'Posts retrieved successfully!',
      data: posts
    };
  }


  async getPostById(postId: string): Promise<IResBody> {
    // Get the post document by ID
    const postDoc = await this.db.posts.doc(postId).get();

    // Check if the post document exists
    if (!postDoc.exists) {
        return {
            status: 404,
            message: 'Post not found!',
            data: null,
        };
    }

    // Return the post data, including id and converting timestamps
    const postData = {
        id: postDoc.id,
        ...postDoc.data(),
        createdAt: (postDoc.data()?.createdAt as Timestamp)?.toDate(),
        updatedAt: (postDoc.data()?.updatedAt as Timestamp)?.toDate(),
    };

    return {
        status: 200,
        message: 'Post retrieved successfully!',
        data: postData
    };
}


async getAllPostsByUser(userId: string): Promise<IResBody> {
  const posts: Post[] = [];
  
  // Query the posts collection to find all posts created by the specified user
  const postsQuerySnapshot = await this.db.posts.where('createdBy', '==', userId).get();

  // Check if there are any posts found
  if (postsQuerySnapshot.empty) {
      return {
          status: 404,
          message: 'No posts found for this user.',
          data: [],
      };
  }

  // Iterate through the documents and push them to the posts array
  for (const doc of postsQuerySnapshot.docs) {
      posts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: (doc.data()?.createdAt as Timestamp)?.toDate(),
          updatedAt: (doc.data()?.updatedAt as Timestamp)?.toDate(),
      });
  }

  return {
      status: 200,
      message: 'Posts retrieved successfully!',
      data: posts
  };
}

  async getCategories(): Promise<IResBody> {
    return {
      status: 200,
      message: 'Categories retrieved successfully!',
      data: categories
    };
  }

  async addCommentToPost(commentData: Comment, postId: string): Promise<IResBody> {
    try {
      // Get a reference to the post document and its 'comments' subcollection
      const postRef = this.db.posts.doc(postId);
      const commentRef = postRef.collection('comments').doc();

      // Set the comment data, including createdAt
      await commentRef.set({
        ...commentData,
        createdAt: firestoreTimestamp.now(),
      });

      // Fetch the saved comment to return it in the response
      const savedComment = (await commentRef.get()).data();

      return {
        status: 200,
        message: 'Comment added successfully!',
        data: {
          id: commentRef.id,
          ...savedComment,
        },
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      return {
        status: 500,
        message: 'Failed to add comment.',
        data: error,
      };
    }
  } 


  async getPostsByCategory(category: string): Promise<IResBody> {
    const posts: Post[] = [];
    const postsQuerySnapshot = await this.db.posts.where('categories', 'array-contains', category).get();
  
    for (const doc of postsQuerySnapshot.docs) {
      posts.push({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data()?.createdAt as Timestamp)?.toDate(),
        updatedAt: (doc.data()?.updatedAt as Timestamp)?.toDate(),
      });
    }
  
    return {
      status: 200,
      message: 'Posts retrieved successfully!',
      data: posts
    };
  }
  

  async updatePost(postId: string, updateData: Partial<Post>): Promise<IResBody> {
    const postRef = this.db.posts.doc(postId);
  
    // Check if the posts exists before trying to update
    const postDoc = await postRef.get();
    if (!postDoc.exists) {

      return {
        status: 404,
        message: 'POST not found',
      };
    }
  
    // Update the post data
    await postRef.update({
      ...updateData,
      updatedAt: firestoreTimestamp.now(), // Update the timestamp
    });
  
    return {
      status: 200,
      message: 'post updated successfully!',
      data: {
        id: postId, // Return the updated post ID
        ...updateData, // Include the updated fields
      },
    };
  }
  

  async deletePost(postID: string): Promise<IResBody> {
    const postRef = this.db.posts.doc();
    
    postRef.delete ; 

    return {
      status: 200,
      message: 'Post Deleted Successfuly',
    };
  }




}
