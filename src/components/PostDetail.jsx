import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading, Text } from '@chakra-ui/react'
import { MdArrowDropDown,MdArrowDropUp, MdChatBubbleOutline, MdCircle, MdOutlineBookmark, MdOutlineBookmarkBorder, MdShare ,MdThumbUp} from "react-icons/md";
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
        <Box fontSize="1.5rem">
            <Link to="/">Home Page</Link>
        </Box>
        <Card>
            <Flex justifyContent="flex-start" alignItems="center">
                <Flex justifyContent="flex-start" alignItems="center" flexDirection="column">
                    <MdArrowDropUp size="3.5rem" onClick={()=>dispatchForumData({type:'UPVOTE',payload:post.postId})} fill={post.upvotes>post.downvotes?'purple':'gray'} />
                        {post.upvotes>post.downvotes?post.upvotes:-post.downvotes}
                    <MdArrowDropDown size="3.5rem" color={post.upvotes<post.downvotes?'purple.500':'gray.500'} onClick={()=>dispatchForumData({type:'DOWNVOTE',payload:post.postId})}/>
                </Flex>
                <div>

                <CardHeader>
                    <Flex alignItems="center" alignSelf="flex-start" >
                        <Avatar src={post.picUrl} alt={post.name} />
                        <Box pl="8" textAlign="left">
                        <p>posted by @{post.username} <MdCircle color="gray" style={{display:'inline', width:"8px"}} /> {post.createdAt}</p>
                            <Heading fontSize="1rem">{post.post}</Heading>
                        </Box>
                    </Flex>
                </CardHeader>
                    <CardBody>
                        {post.postDescription}
                    </CardBody>
                </div>
            </Flex>
            <CardFooter borderTop="1px solid black">
            <Flex justifyContent="space-between" alignItems="center" w="100%">
                <MdShare size="2rem"/>
                {post.isBookmarked?
                    <MdOutlineBookmarkBorder size="2rem" color="black" onClick={()=>dispatchForumData({type:'BOOKMARK',payload:post.postId})}/>:
                    <MdOutlineBookmark size="2rem" color="purple" onClick={()=>dispatchForumData({type:'BOOKMARK',payload:post.postId})}/>
                }
            </Flex>
            </CardFooter>
            <CardFooter >
                <Flex justifyContent="space-between" alignItems="center" w="100%" flexDirection="column">
                    {post.comments.map(comment=>{
                        return (
                            <Card key={comment.commentId} w="100%" p="1rem">
                                <Flex alignItems="center" alignSelf="flex-start" >
                                    <Avatar src={comment.picUrl} alt={post.username} w="2rem" h="2rem"/>
                                    <Box pl="8" textAlign="left" color="purple">
                                        <p>@{comment.username}</p>
                                    </Box>
                                </Flex>
                                <Text textAlign="left" pl="3rem">
                                    {comment.comment}
                                </Text>
                                <Box alignSelf="flex-start">
                                    <MdThumbUp color="purple" style={{display:'inline'}}/>
                                    <Text as="span">{comment.likes}</Text>
                                </Box>
                            </Card>
                        )
                    })}
                </Flex>
            </CardFooter>
        </Card>
    </div>
  )
}
