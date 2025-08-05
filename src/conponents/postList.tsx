import React from "react";

export interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onUpdate, onDelete }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <p><strong>ID:</strong> {post.id}</p>
          <p><strong>Title:</strong> {post.title}</p>
          <p><strong>Body:</strong> {post.body}</p>
          <button onClick={() => onUpdate(post.id)}>Update</button>
          <button onClick={() => onDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
