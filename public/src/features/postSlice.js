import {createSlice} from "@reduxjs/toolkit"

export const postSlice = createSlice({
    name: "post",
    initialState:{
        value: [],
    },
    reducers: {
        addPost: (state,action)=>{
            console.log("Adding the post", state)
            state.value.unshift(action.payload);
        },
        addAllPost: (state,action)=>{
            console.log("Adding all Post Action",state);
            // state.value = [...state.value,...action.payload]
            // state.value = {...action.payload}
            state.value.push(...action.payload);
            // console.log("after pushing the array",state.value);
        }
    }
})
export const {addPost,addAllPost} = postSlice.actions;
export const selectPost = (state) => state.post.value;
export default postSlice.reducer;

