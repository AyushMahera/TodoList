import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) :[],
    loggedUser : localStorage.getItem("loggedUser") ? JSON.parse(localStorage.getItem("loggedUser")) : null,
    auth :  localStorage.getItem("auth") ? localStorage.getItem("auth") : "false"
}

const usersSlice = createSlice({
    name:'users',
    initialState
})