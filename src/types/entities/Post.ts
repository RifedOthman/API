import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  title?: string;
  description?: string;
  voteCount?: number;
  usersVote?: string[] ; 
  categories?: string[];
  createdBy?: string;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}
