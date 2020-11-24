import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteMoviePush, fetchMovie, takeIdMovie} from "../redux/action/movieData";
import MovieSidebar from "./MovieSidebar";
import {NavLink} from "react-router-dom";
import {importMovie} from "../redux/action/movieData";

class Movies extends Component {
    state = {
        arr: [],
        currentPage: 1,
        className: "false",
        todosPerPage: 5
    };

    //pagination
    handleClick = (e) => {
        this.setState({currentPage: Number(e.target.id)});
    }

    //pagination

    componentDidMount() {
        this.props.fetchMovie();
    }

    handleSubmit = () => {
        importMovie()
    }

    deleteMovie = (id) => {
        if (window.confirm("Do you want to delete this movie?")) {
            this.setState({arr: id});
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
        const movieDataNew = movieData.filter(item => item.Title.toLowerCase().includes(search.toString().toLowerCase()) ||
            item.Stars[0].toLowerCase().includes(search.toString().toLowerCase()))

        const {currentPage, todosPerPage} = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = movieDataNew.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            return <li key={index}>{todo}</li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(movieDataNew.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

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
                            {renderTodos.length === 0 ? "No movies" : renderTodos.map(item =>
                                <div className="listMovie-item" key={item.props.children.id}>
                                    <NavLink to={`/movie/:${item.props.children.id}`}
                                             onClick={() => this.props.takeIdMovie(item.props.children.id)}>
                                        <div className="itemList">
                                            <div className="title"><p><strong>Name movie:</strong></p>
                                                <p>{item.props.children.Title}</p>
                                            </div>
                                            <div className="author"><p><strong>Author movie:</strong></p>
                                                <p>{item.props.children.Stars}</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                    <div className="wrap-for-btn">
                                        <button className="btn-delete"
                                                onClick={() => this.deleteMovie(item.props.children._id)}>delete
                                        </button>
                                    </div>
                                </div>
                            )}
                            <ul id="page-numbers">
                                {movieData.length >= 6 ?
                                    pageNumbers.map(number =>
                                        <li
                                            key={number}
                                            id={number}
                                            className={this.state.currentPage === number ? "true" : "false"}
                                            onClick={this.handleClick}
                                        >
                                            {number}
                                        </li>
                                    ) :
                                    ''}
                            </ul>
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

