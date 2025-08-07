import { gql } from "@apollo/client";
import { useGetAllPostsQuery } from "./gql/graphql";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query getAllPosts (
  $options: PageQueryOptions
) {
  posts(options: $options) {
    data {
      id
      title
    }
    meta {
      totalCount
    }
  }
}
`

function App() {

  const {data,error,loading} = useGetAllPostsQuery()
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
      <h1>posts are created by codegen🤣🤣🤣🤣👌👌👌 </h1>
      {
        data?.posts?.data?.map(post=>(
          <div key={post?.id} style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
            post.id: {post?.id} <br />
            post.title: {post?.title} <br />
          </div>
        ))
      }
    </>
  );
}

export default App;
