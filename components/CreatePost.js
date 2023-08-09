import Image from "next/image";
import { React, useState, useRef } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { addPost, selectPost } from "../public/src/features/postSlice";
import { useDispatch, useSelector } from "react-redux";

function CreatePost() {
    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/post";
    const {data:session} = useSession()
    const inputRef = useRef(null);
    const hiddenFileInput = useRef(null)
    const handleClick = () =>{
        hiddenFileInput.current.click()
    }
    const dispatch = useDispatch();
    const [imageToPost,setImageToPost] = useState(null);
    const addImageToPost = (e) =>{
        console.log("this is noraml event",e)
        const reader = new FileReader();
        if (e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) =>{
                setImageToPost(e.target.result)
            }
        }

    }
    const removeImage = () =>{
        setImageToPost(null);
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (!inputRef.current.value) return;
        const formData = new FormData()
        formData.append("file", imageToPost);
        formData.append("post",inputRef.current.value);
        formData.append("name",session.user.name);
        formData.append("email", session?.user.email);
        formData.append("profilePic",session?.user.image);
        axios.post(FACEBOOK_CLONE_ENDPOINT,formData,{
            headers: {Accept:'application/json'}
        }).then((response)=>{
            inputRef.current.value = "";
            dispatch(addPost(response.data));
            console.log(response.data)
            removeImage()
        }).catch((erroe)=>{
            console.log(error);
        })
    }

  return (
    <div className='bg-white rounded-md shadow-md text-gray-500 p-2 divide-y'>
        <div className='flex p-4 space-x-2 items-center'>
            <Image 
                src={session?.user.image}
                height={40}
                width={40}
                className=' rounded-full cursor-pointer'/>
            <form className='flex flex-1'>
                <input ref = {inputRef} className='rounded-full h-12 flex-grow focus:outline-none font-medium bg-gray-100 px-4' type="text" placeholder={`What's in your mind, ${session?.user.name}?`} />
                <button hidden onClick={handleSubmit}></button>
            </form> 
        </div>
        {imageToPost && (
            <div onClick={removeImage} className="flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer">
                <img src={imageToPost} className="h-10 object-contain" alt="" />
                <RiDeleteBin6Line className="h-8 hover:text-red-500"/>
            </div>
        )}
        <div className="flex justify-evenly py-2">
            <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
                <HiOutlineVideoCamera size={20} className="text-red-500" />
                <p className="font-semibold text-gray-600">Live Video</p>
            </div>
            <div onClick={handleClick} className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
                <IoMdPhotos size={20} className="text-green-500"/>
                <p className="font-semibold text-gray-600">Photo/Video</p>
                <input onChange={addImageToPost} type="file" ref = {hiddenFileInput} hidden accept="image/*"/>
            </div>
            <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md hover:cursor-pointer">
                <BsEmojiSmile size={20} className="text-yellow-500"/>
                <p className="font-semibold text-gray-600">Feeling/Activity</p>
            </div>
        </div>
        
    </div>
  )
}

export default CreatePost