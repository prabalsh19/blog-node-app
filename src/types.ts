export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Comment {
  text: string;
  author: string;
  _id: string;
  createdAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  user: User;
  isApproved: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
