import React from "react";
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {Grid} from "semantic-ui-react"
import PostCards from "../component/PostCards";

function Home(){
    const { loading, data } = useQuery(FETCH_POST_QUERY);
    let posts = []
    if(data){
        posts = data.getPosts
    }
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? <h1>Loading Post..</h1> : (
                        posts && posts.map(post => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                                <PostCards post={post}/>
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>

        </Grid>
    )
}

const FETCH_POST_QUERY = gql`{
  getPosts {
    body,
    createdAt,
    id,
    username,
    comments {
      body,
      id,
      username,
    },
    likes {
      createdAt,
      id,
      username
    },
    likeCount,
    commentCount
  }
}
`

export default Home;