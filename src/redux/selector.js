import { createSelector } from "@reduxjs/toolkit";

export const searchFilterTodo = createSelector(
    (state => state.todo.tasks),
    (state => state.todo.search),
    (state => state.todo.filter),
    (tasks, search, filter) => {

        let filteredTasks = tasks;

        if(search.trim()){
            const lower = search.toLowerCase()

        filteredTasks =  tasks.filter(task => {
            return task.title.toLowerCase().includes(lower)
        });
        }

        if(filter === "completed"){
            filteredTasks = filteredTasks.filter(task => task.completed);
        }

        if(filter === "pending"){
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }

        return filteredTasks;
    }
)