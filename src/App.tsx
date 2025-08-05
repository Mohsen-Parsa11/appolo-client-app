import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_POSTS } from "./graphql/queries";
import { CREATE_POST, DELETE_POST, UPDATE_POST } from "./graphql/mutaion";
import PostList from "./conponents/postList";


function App() {
  // State to hold the post data
  const [post, setPost] = useState<{ title?: string; body?: string }>({});

  // Apollo Client hooks for querying and mutating data
  const { loading, error, data } = useQuery(GET_POSTS);

  // Using the CREATE_POST mutation
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });

  // Using the DELETE_POST mutations  
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS}]
});

// Using the DELETE_POST mutation
const [deletePost] = useMutation(DELETE_POST, {
  refetchQueries: [{ query: GET_POSTS }],
});

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to handle creating a post
  const handleCreatePost = async () => {
    await createPost({
      variables: {
        input: {
          title: post.title,
          body: post.body,
        },
      },
    });
  };

  // Functions to handle updating and deleting posts
  const handleUpdatePost = async (postId: string)=>{
    await updatePost({
      variables: {
        id: postId,
        input: {
          title: post.title,
          body: post.body
        }
      }
    })
  }

  // Function to handle deleting a post
  const handleDeletePost = async (postId: string) =>{
    await deletePost({
      variables: {id: postId}
    })
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setPost((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Body"
          onChange={(e) =>
            setPost((prev) => ({ ...prev, body: e.target.value }))
          }
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
        <PostList
        posts={data.posts.data}
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
      />
    </>
  );
}

export default App;
