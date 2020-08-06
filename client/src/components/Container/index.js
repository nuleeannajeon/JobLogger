import React from 'react';
import './style.css';
import processServerReturn from '../../utils/processServerReturn';
import {useGlobalStore } from '../GlobalStore';
import API from '../../utils/API';

const Result= (props) => {
    const [globalStore, dispatch] = useGlobalStore()
    const {id, url, company_logo, postLink, company, title, location, description} = props 
    const serverData = {
        company, 
        title, 
        postingType: 'wishlists', 
        companyLogoImage: company_logo, 
        postLink: url, 
        location
    }
    
    const htmlReg = /<.+?>/
    const htmlLessString = description.replace(htmlReg, ' ')
    console.log("Result -> htmlLessString", htmlLessString)

    const sendMePlease = async () => {
        const serverResponse = await API.post('/api/posts', serverData)
        console.log("sendMePlease -> serverResponse", serverResponse)
        processServerReturn(serverResponse, dispatch)

        
    }

    return (
        <div className="card my-2" key={id}>
            <div className="row">
                <div className="col-sm-12 col-md-3 text-center left-col">
                    <img className="company-logo" src={company_logo} />
                    <br></br>
                    <br />
                    <button onClick={() => {sendMePlease()}} className="btn add-btn">Add to My Wishlist</button>
                </div>
                <div className="col-sm-12 col-md-9 right-col">
                    <h1><strong>{company}</strong></h1>
                    <h4>{title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
            </div>
        </div> 
    )
}

function Container(props) {
    return(
        <div className="container">
            {props.results.map(result => (
               <Result id={result.id} location={result.location} url={result.url} company_logo={result.company_logo} description={result.description} title={result.title} company={result.company}
               />
            ))}
        </div>
    )
}

export default Container;