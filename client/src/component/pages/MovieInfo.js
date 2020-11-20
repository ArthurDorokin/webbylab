import React, {Component} from "react";
//import {connect} from "react-redux";
//import {useHttp} from "../hooks/http.hook";

    class MovieInfo extends Component {
    // const {loading, error, request} = useHttp()
    // const moviesInfoHandler = async () => {
    //     try  {
    //         let id = '5fb6f3776e64fc430013f523';
    //         const data = await request(`/api/movies/${id}`, 'GET')
    //         console.log('Data', data)
    //     } catch (e) {}
    // }
        render() {
            return (
                <div>
                    {/*<button onClick={moviesInfoHandler}>click</button>*/}
                    <button>click</button>
                </div>
            )
        }
}
export default MovieInfo;