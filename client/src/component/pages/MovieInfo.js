import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class MovieInfo extends Component {
    render() {
        const {movieId, movieData} = this.props.movieId
        return (
            <div className="container">
                <h2>Detailed information</h2>
                <div className="back-page">
                    <NavLink to="/">Back to page</NavLink>
                </div>
                <div className="block-info">
                    {movieData.filter(item => item.id === movieId).map(item =>
                        <div className="block-info-wrap" key={item.id}>
                            <p><strong>Title: </strong>{item.Title}</p>
                            <p><strong>Release Year: </strong> {item.ReleaseYear}</p>
                            <p><strong>Format: </strong> {item.Format}</p>
                            <p><strong>Stars: </strong> {item.Stars}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({movieData}) => ({
    movieId: movieData,
    movieData: movieData
})

export default connect(mapStateToProps, null)(MovieInfo);