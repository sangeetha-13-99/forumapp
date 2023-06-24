import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading } from '@chakra-ui/react'
import { TriangleDownIcon,TriangleUpIcon } from '@chakra-ui/icons'
import { useForumContext } from '../store/forumContext'
import {  Link, useParams } from 'react-router-dom';


export const PostDetail = () => {
    const{data:{user},dispatchForumData}=useForumContext();
    const {postId} =useParams();
    let post;
    if(postId!==null && !post){
        post=user.posts.find(post=>post.postId===postId)
    }
    
  return (
    <div>
        <div>
            <Link to="/">Home Page</Link>
        </div>
        <Card>
            <Flex justifyContent="flex-start" alignItems="center">
                <Flex justifyContent="flex-start" alignItems="center" flexDirection="column">
                    <TriangleUpIcon onClick={()=>dispatchForumData({type:'UPVOTE',payload:post.postId})}/>
                        {post.upvotes>post.downvotes?post.upvotes:-post.downvotes}
                    <TriangleDownIcon onClick={()=>dispatchForumData({type:'DOWNVOTE',payload:post.postId})}/>
                </Flex>
                <div>

                    <CardHeader>
                        <Flex justifyContent="space-around" alignItems="center" alignSelf="flex-start" >
                            <Avatar src={post.picUrl} alt={post.name}/>
                            <div>
                                <p>{post.name}</p>
                                <p>@{post.username}</p>
                                <Heading>{post.post}</Heading>
                            </div>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        {post.postDescription}
                    </CardBody>
                </div>
            </Flex>
            <CardFooter>
                <Flex justifyContent="space-between" alignItems="center">
                    <button>Share</button>
                    <button onClick={()=>dispatchForumData({type:'BOOKMARK',payload:post.postId})}>bookmark</button>
                </Flex>
            </CardFooter>
        </Card>
    </div>
  )
}