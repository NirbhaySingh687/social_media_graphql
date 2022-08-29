import React from "react";
import { Card, Image, Button } from "semantic-ui-react"
import moment from "moment"
import { Link } from "react-router-dom"


function PostCards({ post }){
    const { body, createdAt, likeCount, commentCount, id, likes, username } = post;
    function likePost(){
        console.log(`Likes Posts`)
    }
    function commentPost(){
        console.log("Comments in Posts")
    }
    return(
        <Card.Group>
            <Card>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                    <Card.Description>
                        {body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button
                        color='teal'
                        content='Like'
                        icon='heart'
                        label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}
                        onClick={likePost}
                    />
                    <Button
                        color='teal'
                        content='Comments'
                        icon='comments'
                        label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
                        onClick={commentPost}
                    />
                </Card.Content>
            </Card>
        </Card.Group>
    )
}

export default PostCards