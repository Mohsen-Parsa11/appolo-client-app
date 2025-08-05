import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  body: string;
}

const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      title
      body
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!){
    updatePost(id: $id, input: $input){
    title
    body
    }
  }`

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }`

function App() {
  const [post, setPost] = useState<{ title?: string; body?: string }>({});
  const { loading, error, data } = useQuery(GET_POSTS);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_POSTS }],
  });
  const [updatePost] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_POSTS}]
});
const [deletePost] = useMutation(DELETE_POST, {
  refetchQueries: [{ query: GET_POSTS }],
});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreatePost = async () => {
    console.log(post);
    await createPost({
      variables: {
        input: {
          title: post.title,
          body: post.body,
        },
      },
    });
  };

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
      <div>
        {data.posts.data.map((post: Post) => (
          <div key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <button onClick={()=>handleUpdatePost(post.id)}>Update Post</button>
            <button onClick={()=>handleDeletePost(post.id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
