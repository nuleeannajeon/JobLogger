import React, {Component} from "react";
import SearchForm from "./SearchForm";
import API from '../../utils/API';


class SearchResultContainer extends Component {
    state = {
        search: "",
        location: "",
        results: [],
    }

    componentDidMount() {
        this.searchJob();
    }

    searchJob = query => {
        API.getJobData(query, location)
            .then (res => this.setState({ results: res.data}))
            .catch(err => console.log(err))
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchJob(this.state.search, this.state.location)
    };

    render() {
        return (
            <div className="container">
                <div className="card">
        <h1>{this.state}</h1>
                </div>
            </div>
        )
    }


}