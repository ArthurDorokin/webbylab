import React, {Component} from "react";
//import {useHttp} from '../hooks/http.hook'
import {connect} from "react-redux";
import {fetchMovie} from "../redux/action/movieData";
import MovieSidebar from "./MovieSidebar";
import {NavLink} from "react-router-dom";
import {importMovie} from "../redux/action/movieData";

class Movies extends Component {
    componentDidMount() {
        this.props.fetchMovie()
    }

    render() {
        const {movieData} = this.props.movieData

        const handleSubmit = () => {
            importMovie()
        }

        return (
            <div className="container">
                <div className="main">
                    <div className="center">
                        <div className="uploadFile">
                            <form  onSubmit={handleSubmit}>
                                <label>
                                    Upload file:
                                    <input id="file" type="file"/>
                                </label>
                                <button className="btn-add-file" type="submit">Add file</button>
                            </form>
                        </div>
                        <div className="listMovie">
                            {movieData.map(item =>
                                <NavLink to={`/movie/:${item.id}`} key={item.id}>
                                    <div className="itemList">
                                        <div className="title"><p><strong>Name movie:</strong></p><p>{item.Title}</p></div>
                                        <div className="author"><p><strong>Author movie:</strong></p>{item.Stars.map((item, index) => <p key={index}>{item}</p>)}
                                        </div>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <div className="left">
                        <MovieSidebar/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({movieData}) => ({movieData: movieData})
const mapDispatchToProps = dispatch => ({
    fetchMovie: () => dispatch(fetchMovie())
})

export default connect(mapStateToProps, mapDispatchToProps)(Movies);

