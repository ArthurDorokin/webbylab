import React, {Component} from "react";
import {connect} from 'react-redux';
import {setFilter, setSearch, takeMoviePush} from "../redux/action/sidebarFilter";

class MovieSidebar extends Component {
    state = {
        Title: '',
        ReleaseYear: '',
        Format: '',
        Stars: '',
        arr: []
    };

    onUpdateSearchName = (e) => {
        this.props.setSearch(e.target.value)
    };

    onUpdateSearchActor = (e) => {
        //this.props.setSearch(e.target.value)
    };

    // form add
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    addMovie = (e) => {
        e.preventDefault();
        fetch('/api/movies/', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(this.state)
        }).then(r=>r.json()).then(res=>{
            this.setState({ arr: res });
            this.props.takeMoviePush(this.state.arr)
            return res;
        })

        this.setState({
            Title: '',
            ReleaseYear: '',
            Format: '',
            Stars: ''
        });
    }

    render() {
        const {Title, ReleaseYear, Format, Stars} = this.state;

        return(
            <div className="sidebar">
                <div className="block-filter">
                    <div className="item-sidebar sort" onClick={() => this.props.setFilter()}>Sort by name (A-Z)</div>
                    <div className="item-sidebar search">
                        <input className="input-search"
                               type="text"
                               placeholder="Search movie for name..."
                               onChange={this.onUpdateSearchName}
                        />
                        <br/>
                        <input className="input-search"
                               type="text"
                               placeholder="Search movie for name actor..."
                               onChange={this.onUpdateSearchActor}
                        />
                    </div>
                </div>
                <div className="block-form">
                    <form onSubmit={this.addMovie}>
                        <input type="text" name="Title" value={Title} onChange={this.handleChange} placeholder="Title..." />
                        <input type="text" name="ReleaseYear" value={ReleaseYear} onChange={this.handleChange} placeholder="Release Year..." />
                        <input type="text" name="Format" value={Format} onChange={this.handleChange} placeholder="Format..." />
                        <input type="text" name="Stars" value={Stars} onChange={this.handleChange} placeholder="Stars..." />
                        <button className={`${"btn-add-data"} ${this.state.Title.length >= 1 && 
                                                                  this.state.ReleaseYear.length >= 1 &&
                                                                  this.state.Format.length >= 1 &&
                                                                  this.state.Stars.length >= 1 ? "" : "disabled"}`} type="submit">Add movie</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setSearch: (search) => dispatch(setSearch(search)),
    setFilter: () => dispatch(setFilter()),
    takeMoviePush: (movie) => dispatch(takeMoviePush(movie))
})

export default connect(null, mapDispatchToProps)(MovieSidebar);