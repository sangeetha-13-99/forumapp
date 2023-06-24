import React from 'react'
import { useForumContext } from '../store/forumContext'

export const Filter = () => {
    const {data,dispatchForumData}=useForumContext();
    const changeHandler=(e)=>{
        dispatchForumData({type:'SORTBY',payload:e.target.value})
    }
    console.log(data)
  return (
    <div>
        <label>Sort </label>
        <select onChange={(e)=>changeHandler(e)}>
            <option value="LATEST">By Latest Posts</option>
            <option value="UPVOTE">By UpVotes</option>
            <option value="DOWNVOTE">By DownVotes</option>
        </select>
    </div>
  )
}
