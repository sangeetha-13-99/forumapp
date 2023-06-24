import React from 'react'
import { useForumContext } from '../store/forumContext'
import { Post } from './Post';

export const Home = () => {
    const {data:{user,sortBy}}=useForumContext();
    
    let posts=user.posts;
    if(sortBy.latest){
        posts=user.posts.sort(({createdAt:post1},{createdAt:post2})=>{
            if(post1<post2) return 1
            else if(post1>post2) return -1
            return 0;
        })
    }
    else if(sortBy.upvotes){
        posts=user.posts.sort(({upvotes:post1},{upvotes:post2})=>{
            if(post1<post2) return 1
            else if(post1>post2) return -1
            return 0;
        }) 

    }
    else if(sortBy.downvotes){
        posts=user.posts.sort(({downvotes:post1},{downvotes:post2})=>{
            if(post1<post2) return -1
            else if(post1>post2) return 1
            return 0;
        }) 
    }
    console.log(posts,"home page")
  return (
    <div>
        {posts.map((post)=>{
            console.log(post)
            return <Post key={post.postId} post={post}/>
        })}
    </div>
  )
}
