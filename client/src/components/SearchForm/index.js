import React from 'react';
import './styles.css';

function SearchForm(props) {

    return(
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4"> Search for Jobs</h1>
                <form>
                    <div className="input-group">
                        <input
                            value={props.value}
                            name="search"
                            onChange={props.handleInputChange}
                            type="text"
                            placeholder="Enter the job position"
                            className="form-control"
                            id="search"
                        />
                        <button onClick={props.handleFormSubmit} className="btn btn-search">Search</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchForm;