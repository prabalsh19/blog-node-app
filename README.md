# Blog Application with Social Authentication and Admin Approval

## Project Overview
This is a blog application built with React for the frontend, Node.js for the backend, and MongoDB as the database. The application allows users to create, view, and manage blog posts. It includes features like user authentication, social login (Google and Facebook), admin approval, and user roles.

## Features
- User Authentication:
  - Users can sign in with Facebook accounts (Facebook formalities not completed)
  - User data is securely stored.

- Blog Post Management:
  - Registered users can create, edit, and delete their blog posts.
  - Posts include a title, content, and optional image upload.

- Blog Post Listing:
  - The homepage lists blog posts with the latest posts at the top.
  - Users can view and comment on blog posts without authentication.

- Admin Approval:
  - A system is in place for admin approval of blog post submissions.
  - When a user creates a new blog post, it's submitted for admin review.
  - Admins have a dashboard to approve or reject pending blog posts.
  - Approved posts appear on the homepage for all users to see.

- User Roles:
  - There are two user roles: "User" and "Admin."
  - Admins can approve or reject blog posts.
  - All other users have the "User" role, allowing them to create and view posts.

## Tech Stack
- Frontend: React, TypeScript, Vite, SCSS
- Backend: Node.js, Express, MongoDB
- Authentication: Facebook OAuth
- User Roles: Role-based access control (Admin || User)

