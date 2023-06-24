import { Grid, GridItem,Flex, Heading, Avatar } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {forumData} from "./../db"
import { Filter } from "./Filter";
import { Post } from "./Post";
import { useForumContext } from "../store/forumContext";

export const RootPage = () => {

    const {data:{user}}=useForumContext();
  return(
    <Fragment>
    <Flex h="10vh" px="5rem" borderBottom="1px solid gray" w="100vw" justifyContent="space-between" alignItems="center">
        <Heading color="purple.400" fontFamily="monospace">MyForum</Heading>
        <p color="purple.400" fontFamily="monospace">Home</p>
    </Flex>
    <Grid
      h="90vh"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} border="1px solid" h="100%">
        <Flex justifyContent="space-between" alignContent="space-between" flexDirection="column"  h="100%">
            <Flex color="black" fontSize="1rem" fontWeight="bold" fontFamily="monospace" justifyContent="space-around" alignItems="center" flexDirection="column" h="60%">
                <Link to="/">Home</Link>
                <Link to="/">Explore</Link>
                <Link to="/">BookMarks</Link>
                <Link to="/">Profile</Link>
            </Flex>
            <Flex justifyContent="space-around" alignItems="center" >
                <Avatar src={user.picUrl} alt={user.name}/>
                <div>
                    <p>{user.name}</p>
                    <p>@{user.username}</p>
                </div>
            </Flex>
        </Flex>
      </GridItem>
      <GridItem colSpan={3} >
        {user.posts.map((post)=>{
            console.log(post)
            return <Post key={post.postId} post={post}/>
        })}
      </GridItem>
      <GridItem colSpan={1} >
        <Filter/>
      </GridItem>
    </Grid>

    </Fragment>
    )
};
