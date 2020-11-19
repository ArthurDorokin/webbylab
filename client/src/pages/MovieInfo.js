import React from 'react'
import {useHttp} from "../hooks/http.hook";

export const MovieInfo = () => {
    const {loading, error, request} = useHttp()
    const moviesInfoHandler = async () => {
        try  {
            let id = '5fb6f3776e64fc430013f523';
            const data = await request(`/api/movies/${id}`, 'GET')
            console.log('Data', data)
        } catch (e) {}
    }
    return(
        <div>
           <button onClick={moviesInfoHandler}>click</button>
        </div>
    )
}