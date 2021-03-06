import React, { Component } from 'react';
import SearchForm from '../components/SearchForm/index';
// import API from '../utils/searchAPI';
import API from '../utils/API'
import Container from '../components/Container/index';


class Search extends Component {
    state = {
        results: [],
        search: ""
    };

    componentDidMount() {
        this.searchJobs();
    };

    searchJobs = (query) => {
        // API.searchJob(query)
        //     .then(res => this.setState({ results: res.data}))
        //     .catch(err => console.log(err));
        if (!query){
            return
        }
        API.get(`/api/jobsearch/${query}`)
            .then(res => {
                if (res.error){
                    console.log(res.error)
                    return
                }
                this.setState({results: res.data})
            })
            .catch(err => console.log('err'))
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchJobs(this.state.search);
    };

    render() {
        return (
            <div>
                <SearchForm 
                    value={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <Container 
                    results={this.state.results}
                />
            </div>
        );
    }
};

export default Search;