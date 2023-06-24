import { Card, CardHeader, CardBody, CardFooter, Flex, Box, Avatar, Heading } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { useForumContext } from '../store/forumContext'
import { Link } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp,MdChatBubbleOutline,MdShare,MdOutlineBookmarkBorder, MdOutlineBookmark,MdCircle } from 'react-icons/md';


export const Post = ({post}) => {
    const{data:{user},dispatchForumData}=useForumContext();
   
  return (
    <Card>
        <Flex justifyContent="flex-start" alignItems="center">
        <Flex justifyContent="flex-start" alignItems="center" flexDirection="column">
                    <MdArrowDropUp size="3.5rem" fill={post.upvotes>post.downvotes?'purple':'gray'} onClick={()=>dispatchForumData({type:'UPVOTE',payload:post.postId})} />
                        {post.upvotes>post.downvotes?post.upvotes:-post.downvotes}
                    <MdArrowDropDown size="3.5rem" fill={post.upvotes<post.downvotes?'purple':'gray'} onClick={()=>dispatchForumData({type:'DOWNVOTE',payload:post.postId})}/>
                </Flex>
            <div>

                <CardHeader>
                    <Flex alignItems="center" alignSelf="flex-start" >
                        <Avatar src={post.picUrl} alt={post.name} />
                        <Box pl="8" textAlign="left">
                        <p>posted by @{post.username} <MdCircle color="gray" style={{display:'inline', width:"8px"}} /> {post.createdAt}</p>
                            <Heading fontSize="1rem">{post.post}</Heading>
                            <Flex alignItems="center" alignSelf="flex-start" justifyContent="flex-start" >
                                {post.tags.map(tag=>{
                                    return (
                                        <Box p="4px" m="4px" bg="blue.100" opacity="0.7" borderRadius="8px" fontSize="10px" color="purple">{tag}</Box>
                                    )
                                })}
                            </Flex>
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
                <Link to={`posts/${post.postId}`}>
                    <MdChatBubbleOutline size="2rem"/>
                </Link>
                <MdShare size="2rem"/>
                {post.isBookmarked?
                    <MdOutlineBookmarkBorder size="2rem" color="black" onClick={()=>dispatchForumData({type:'BOOKMARK',payload:post.postId})}/>:
                    <MdOutlineBookmark size="2rem" color="purple" onClick={()=>dispatchForumData({type:'BOOKMARK',payload:post.postId})}/>
                }
            </Flex>
        </CardFooter>
    </Card>
  )
}
