import React from "react";
import { useReducer,useContext,useEffect } from "react";
const TaskContext = React.createContext()

const intialState = {
    isLoading : true,
    tasks : []
}

const reducer = (state,action) => {
    switch(action.type) {
        case "set_loading" :
            return {
                ...state,
                isLoading:true
            }
        case "get_tasks" :
            return {
                ...state,
                isLoading : false,
                tasks : action.payload.tasks
            }    
        default : 
            return state
    }
}

const TaskProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,intialState)
    const fetchTasks = async () => {
        dispatch({type:"set_loading"})
        try {
            const response = await fetch(`/tasks/642baafca573f36ccb7f5bf4`)
            const json = await response.json()
            dispatch({type:"get_tasks",
                payload : {
                    tasks : json
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {  
        fetchTasks()
      }, [])
    return <TaskContext.Provider value={{...state}} >{children}</TaskContext.Provider>
}

const useGlobalTaskContext = () => {
    return useContext(TaskContext)
}

export {TaskContext,TaskProvider,useGlobalTaskContext}