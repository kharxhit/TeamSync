import React from "react";
import { useReducer,useContext,useEffect } from "react";
const BoardContext = React.createContext()

const intialState = {
    isLoading : true,
    boards : []
}

const reducer = (state,action) => {
    switch(action.type) {
        case "set_loading" :
            return {
                ...state,
                isLoading:true
            }
        case "get_boards" :
            return {
                ...state,
                isLoading : false,
                boards : action.payload.boards
            }
        default : 
            return state
    }
}

const BoardProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,intialState)
    const fetchBoards = async () => {
        dispatch({type:"set_loading"})
        try {
            const response = await fetch('/boards/')
            const json = await response.json()
            dispatch({type:"get_boards",
                payload : {
                    boards : json
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {  
        fetchBoards()
      }, [])
    return <BoardContext.Provider value={{...state}} >{children}</BoardContext.Provider>
}

const useGlobalBoardContext = () => {
    return useContext(BoardContext)
}

export {BoardContext,BoardProvider,useGlobalBoardContext}