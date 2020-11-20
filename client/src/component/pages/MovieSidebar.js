import React, {Component} from "react";
import {connect} from 'react-redux';
import {setFilter, setReset, setSearch} from "../redux/action/sidebarFilter";

class MovieSidebar extends Component {

    onUpdateSearch = (e) => {
        this.props.setSearch(e.target.value)
    };

    render() {
        return(
            <div className="sidebar">
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
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setSearch: (search) => dispatch(setSearch(search)),
    setFilter: () => dispatch(setFilter()),
    setReset: () => dispatch(setReset()),
})

export default connect(null, mapDispatchToProps)(MovieSidebar);