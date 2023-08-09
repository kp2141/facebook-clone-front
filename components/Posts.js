import React, { useEffect } from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux';
import { addAllPost, selectPost } from '../public/src/features/postSlice';
import axios from 'axios';

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);

    useEffect(()=>{
        const fetchData= () =>{
            const response =  axios.get("http://localhost:8080/api/v1/post")
            .then((response)=>{
                console.log(posts)
                console.log("getting through the get request",response.data)
                dispatch(addAllPost(response.data))
            })
        }
        fetchData()
        
    },[])

    // console.log("data after diapatch", posts)

let content;

if (!posts){
    content = <div>Error Loading the albums</div>
}
else{
    content = posts.map((post)=>{
    
        return <Post post={post} key={post.id}/>
     })
}
  
    
    
  return (
    <div>
        {/* {
        (posts.map((post)=>{
    
           <Post post={post} key={post.id}/>
        }))
         } */}

         <div>{content}</div>
    </div>
  );
  
}

export default Posts