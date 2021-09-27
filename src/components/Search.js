import React from 'react';
import PriceChart from './PriceChart'
import "../App.css";
import Subscribe from './Subscribe';

import config from '../config.json';
const baseUrl = config.baseUrl;

export default class Search extends React.Component {

    state = {
        loaded: false,
        url: ""
    }
    handleChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value, loaded: false });
    }

    render() {
        return (
            <div>
                <div className="searchContainer">
                    <div className="flexchild">
                        <h2>Track Your Favourite Product</h2>
                        <p style={{ color: "grey" }}> Please enter the following details: </p>
                    </div>
                    <form className="flexchild">
                        <label for="Email">Amazon URL: </label>
                        <input type="url" required className="textbox" name="url" id="url" onChange={this.handleChange} />
                        <button className="btn" type="submit" onClick={this.hs}>Submit</button>
                    </form>
                </div>
                { this.state.loaded ? (
                    (this.state.data.length !== 1) ? (
                        <div className="searchContainer"><PriceChart data={this.state.data} url={this.state.url} currentPrice={this.state.currentPrice} /><Subscribe url={this.state.url} /></div>
                    )
                        : <div className="searchContainer"> <div className="center">We do not have sufficient data to show the chart, please Subscribe </div><Subscribe url={this.state.url} /> </div>) : ""}
            </div >
        );

    }
    trim(url){
        url = url.toLowerCase();

        if(url.includes('amazon.in')){
            if( url.includes('gp/product/')){
                let code = url.split('gp/product/')[1];
                if(code){
                    code = code.split('/')[0];
                    console.log(code);
                    return 'https://www.amazon.in/gp/product/' + code; 
                }
                return false;
            } 
            else if(url.includes('dp')){
                let code = url.split('dp/')[1];
                if(code){
                    code = code.split('?')[0];
                    code = code.split('/')[0];
                    console.log(code);
                    return 'https://www.amazon.in/gp/product/' + code; 
                }
            }
        }

        if(url.includes("flipkart")){
            if(url.includes("p/itm")){
                let firstPart = url.split("?")[0];

                console.log(firstPart);
                return firstPart;
            }
        }

        return false;
    }
    hs = (e) => {

        let trimmedUrl = this.trim(this.state.url);

        console.log("trimmed url", trimmedUrl);

        this.setState({url: trimmedUrl});

        if(!trimmedUrl){
            e.preventDefault();
            return alert('The url does not seem to be correct');
        }
        fetch(baseUrl + '/chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'url': trimmedUrl,
            })
        }).then(res => res.json())
            .then(res => {
                var data = [];
                data.push(["Date", "Price"]);

                let currentPrice = false;
                if(!res.prices){
                    return this.setState({data: data, loaded: true});
                }
                for (let d of res.prices) {
                    let date = d.date;
                    let price = d.price;
                    currentPrice = new Date().toLocaleDateString() === d.date ? d.price : currentPrice;
                    data.push([date, price]);
                }
                this.setState({ data: data, currentPrice: currentPrice, loaded: true });

            })
            .catch((err) => {
                console.log(err);
            })

        e.preventDefault();
    }
}

