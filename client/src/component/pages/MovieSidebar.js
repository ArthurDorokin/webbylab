import React, {Component} from "react";
import {connect} from 'react-redux';
import {setFilter, setReset, setSearch} from "../redux/action/sidebarFilter";

class MovieSidebar extends Component {
    state = {
        Title: '',
        ReleaseYear: '',
        Format: '',
        Stars: ''
    };

    onUpdateSearch = (e) => {
        this.props.setSearch(e.target.value)
    };

    // form add
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmitAddMovie = (e) => {
        e.preventDefault();
        fetch('/api/movies/', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(this.state)
        }).then(r=>r.json()).then(res=>{
            if(res){
                console.log('data push')
            }
        })
    }

    render() {
        const {Title, ReleaseYear, Format, Stars} = this.state;

        return(
            <div className="sidebar">
                <div className="block-filter">
                    <div className="item-sidebar sort" onClick={() => this.props.setFilter()}>Sort by name (A-Z)</div>
                    <div className="item-sidebar reset" onClick={() => this.props.setReset()}>Reset</div>
                    <div className="item-sidebar search">
                        <input className="input-search"
                               type="text"
                               placeholder="Search movie..."
                               onChange={this.onUpdateSearch}
                        />
                    </div>
                </div>
                <div className="block-form">
                    <form onSubmit={this.handleSubmitAddMovie}>
                        <input type="text" name="Title" value={Title} onChange={this.handleChange} placeholder="Title..." />
                        <input type="text" name="ReleaseYear" value={ReleaseYear} onChange={this.handleChange} placeholder="Release Year..." />
                        <input type="text" name="Format" value={Format} onChange={this.handleChange} placeholder="Format..." />
                        <input type="text" name="Stars" value={Stars} onChange={this.handleChange} placeholder="Stars..." />
                        <button className="btn-add-data" type="submit">Add data</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setSearch: (search) => dispatch(setSearch(search)),
    setFilter: () => dispatch(setFilter()),
    setReset: () => dispatch(setReset()),
})

export default connect(null, mapDispatchToProps)(MovieSidebar);