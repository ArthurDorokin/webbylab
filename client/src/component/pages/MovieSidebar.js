import React, {Component} from "react";
import {connect} from 'react-redux';
import Select from 'react-select';
import {setFilter, setSearch, takeMoviePush} from "../redux/action/sidebarFilter";

const options = [
    {value: 'DVD', label: 'DVD'},
    {value: 'VHS', label: 'VHS'},
    {value: 'Blu-Ray', label: 'Blu-Ray'}
]

class MovieSidebar extends Component {
    state = {
        Title: '',
        ReleaseYear: '',
        Format: '',
        Stars: '',
        arr: []
    };


    onUpdateSearch = (e) => {
        this.props.setSearch(e.target.value)
    };

    handleChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value});
    }
    handleChangeSelect = (e) => {
        const arraySelect = Array.isArray(e) ? e.map(x => x.value) : ''
        this.setState({Format: arraySelect});
    }

    addMovie = (e) => {
        e.preventDefault();
        fetch('/api/movies/', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(this.state)
        }).then(r => r.json()).then(res => {

            if (!res.errors.length) {
                this.setState({arr: res});
                this.props.takeMoviePush(this.state.arr)
            }

            res.errors.map(item =>
                alert(item.msg)
            );
            return res;
        })

        this.setState({
            Title: '',
            ReleaseYear: '',
            Format: '',
            Stars: ''
        });
    }

    handleChanges = (e) => {
        const releaseYear = e.target.validity.valid ? e.target.value : this.state.ReleaseYear;
        this.setState({ReleaseYear: releaseYear});
    }

    render() {
        const {Title, ReleaseYear, Stars} = this.state;

        return (
            <div className="sidebar">
                <div className="block-filter">
                    <div className="item-sidebar sort" onClick={() => this.props.setFilter()}>Sort by name (A-Z)</div>
                    <div className="item-sidebar search">
                        <input className="input-search"
                               type="text"
                               placeholder="Search movie for name..."
                               onChange={this.onUpdateSearch}
                        />
                    </div>
                </div>
                <div className="block-form">
                    <form onSubmit={this.addMovie}>
                        <input type="text" name="Title" value={Title} onChange={this.handleChange}
                               placeholder="Title..."/>
                        <input type="text" pattern="[0-9]*" onInput={this.handleChanges} name="ReleaseYear"
                               value={ReleaseYear} placeholder="Release Year..."/>
                        {/*<input type="text" name="Format" value={Format} onChange={this.handleChange} placeholder="Format..." />*/}
                        <Select
                            value={options.filter(obj => this.state.Format.includes(obj.value))}
                            onChange={this.handleChangeSelect}
                            isMulti
                            name="Format"
                            options={options}
                            className="format-multi-select"
                            classNamePrefix="select"
                            placeholder="Format..."
                        />
                        <input type="text" name="Stars" value={Stars} onChange={this.handleChange}
                               placeholder="Stars..."/>
                        <button className={`${"btn-add-data"} ${this.state.Title.length >= 1 &&
                        this.state.ReleaseYear.length >= 1 &&
                        this.state.Format.length >= 1 &&
                        this.state.Stars.length >= 1 ? "" : "disabled"}`} type="submit">Add movie
                        </button>
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