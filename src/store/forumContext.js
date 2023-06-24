import { createContext, useContext, useReducer } from "react";

import { forumData } from "../db";

const initalizeData={
    user:forumData,
    sortBy:{latest:true,upvotes:false,downVotes:false}
}
const reducerFunction=(state,action)=>{
    switch (action.type) {
        case 'SORTBY':
            {
                if(action.payload==="LATEST"){
                    return {...state,sortBy:{latest:true,upvotes:false,downVotes:false}}
                }
                else if(action.payload==="UPVOTE"){
                    return {...state,sortBy:{latest:false,upvotes:true,downVotes:false}}
                }
                else if(action.payload==="DOWNVOTE"){
                    return {...state,sortBy:{latest:false,upvotes:false,downVotes:true}}
                }
                break;
            }
        case 'UPVOTE':
            {
                const updatedPosts=state.user.posts.map(post=>{
                    if(post.postId===action.payload){
                        return {...post,upvotes:post.upvotes+1};
                    }
                    return post;
                })
                return {...state,user:{...state.user,posts:updatedPosts}};
            }
        case 'DOWNVOTE':
            {
                const updatedPosts=state.user.posts.map(post=>{
                    if(post.postId===action.payload){
                        return {...post,downvotes:post.downvotes+1,upvotes:post.upvotes-1};
                    }
                    return post;
                });
                return {...state,user:{...state.user,posts:updatedPosts}}; 
            }
        case 'BOOKMARK':{
            const updatedPosts=state.user.posts.map(post=>{
                if(post.postId===action.payload){
                    return {...post,isBookmarked:!post.isBookmarked};
                }
                return post;
            });
            return {...state,user:{...state.user,posts:updatedPosts}}; 
        }
       
        default:
            break;
    }
}

const ForumContext=createContext({
    data:{},
    dispatchForumData:()=>{}
});


export const ForumContextProvider=({children})=>{
    const [data,dispatchForumData]=useReducer(reducerFunction,initalizeData)
    return (
        <ForumContext.Provider value={{
            data,dispatchForumData
        }}>
            {children}
        </ForumContext.Provider>
    )
}

export const useForumContext=()=>{
    return useContext(ForumContext);
}