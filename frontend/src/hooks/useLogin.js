import {useState} from 'react'
import  useAuthContext from './useAuthContext'

const useLogin = () =>{
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email,password) => {
        setIsLoading(true)  
        setError(null)

        const response = await fetch('/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const json = await response.json()
        console.log(response)
        // console.log(response.headers.token)
        // json.token = response.headers.token

        // json.push({'token':`${response.headers.token}`})

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            // save the user to the local storage
            // const { authorization } = response.headers
            // const token = response.headers.token
            // console.log(token)
            
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN' ,payload:json})
            setIsLoading(false)
        }
    }
    return {login , isLoading , error}
}

export default useLogin