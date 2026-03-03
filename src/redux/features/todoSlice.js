import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tasks : localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [],
    search : '',
    filter : 'all'
}

const todoSlice = createSlice({
    name:'tasks',
    initialState,
    reducers: {
        createTask : (state, action) => {
            state.tasks = [action.payload, ...state.tasks];
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        deleteTask : (state, action) => {
            state.tasks = state.tasks.filter(task => {
                return task.id !== action.payload
            });
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        completeTask : (state, action) => {            
            state.tasks = state.tasks.map(task => {
                return task.id === action.payload ? {...task, completed: !task.completed} : task;
            });
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        editTask : (state, action) => {
            state.tasks = state.tasks.map(task => {
                return task.id === action.payload.id ? action.payload : task
            });
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        searchTasks : (state, action) => {
            state.search = action.payload
        },
        filterTasks : (state, action) => {
            state.filter = action.payload
        }
    }

})

export const {createTask, deleteTask, completeTask, editTask, searchTasks, filterTasks} = todoSlice.actions;
export default todoSlice.reducer;