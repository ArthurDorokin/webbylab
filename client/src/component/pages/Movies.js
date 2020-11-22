import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteMoviePush, fetchMovie, takeIdMovie} from "../redux/action/movieData";
import MovieSidebar from "./MovieSidebar";
import {NavLink} from "react-router-dom";
import {importMovie} from "../redux/action/movieData";

class Movies extends Component {
    state = {
        arr: []
    };

    componentDidMount() {
        this.props.fetchMovie();
    }

    handleSubmit = () => {
        importMovie()
    }

    deleteMovie = (id) => {
        if (window.confirm("Do you want to delete this movie?")) {
            this.setState({ arr: id });
            return (
                fetch(`/api/movies/${id}`, {
                    method: 'DELETE',
                    headers: {'Content-type': 'application/json'}
                }).then(r => r.json()).then(res => {
                    if (res) {
                        this.props.deleteMoviePush(this.state.arr)
                        return res;
                    }
                })
            );
        }
    }

    render() {
        const {movieData, search} = this.props.movieData
        const movieDataNew = movieData.filter(item => item.Title.toLowerCase().includes(search.toLowerCase()) ||
            item.Stars[0].toLowerCase().includes(search.toLowerCase()) )

        return (
            <div className="container">
                <div className="main">
                    <div className="center">
                        <div className="uploadFile">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Upload file:
                                    <input id="file" type="file"/>
                                </label>
                                <button className="btn-add-file" type="submit">Add file</button>
                            </form>
                        </div>
                        <div className="listMovie">
                            {movieDataNew.map(item =>
                                <div className="listMovie-item" key={item.id}>
                                    <NavLink to={`/movie/:${item.id}`}
                                             onClick={() => this.props.takeIdMovie(item.id)}>
                                        <div className="itemList">
                                            <div className="title"><p><strong>Name movie:</strong></p>
                                                <p>{item.Title}</p>
                                            </div>
                                            <div className="author"><p><strong>Author movie:</strong></p>
                                                <p>{item.Stars}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <div className="wrap-for-btn">
                                        <button className="btn-delete"
                                                onClick={() => this.deleteMovie(item._id)}>delete
                                        </button>
                                    </div>
                                </div>
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
    fetchMovie: () => dispatch(fetchMovie()),
    takeIdMovie: (id) => dispatch(takeIdMovie(id)),
    deleteMoviePush: (id) => dispatch(deleteMoviePush(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Movies);

