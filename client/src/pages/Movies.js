import React from 'react'
import {useHttp} from '../hooks/http.hook'

export const Movies = () => {
    const {loading, error, request} = useHttp()
    const moviesHandler = async () => {
        try  {
            const data = await request('/api/movies/', 'GET')
            console.log('Data', data)
        } catch (e) {}
    }
    return(
        <div>
            <button onClick={moviesHandler}>Click</button>
        </div>
    )
}

