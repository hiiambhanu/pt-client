import React from 'react';
import PriceChart from './PriceChart'
import "../App.css";
import Subscribe from './Subscribe';

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
                        <div className="searchContainer"><PriceChart data={this.state.data} currentPrice={this.state.currentPrice} /><Subscribe /></div>
                    )
                        : <div className="searchContainer"><Subscribe /> </div>) : ""}
            </div >
        );

    }
    hs = (e) => {
        fetch('http://localhost:3000' + '/chart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'url': this.state.url,
            })
        }).then(res => res.json())
            .then(res => {
                var data = [];
                data.push(["Date", "Price"]);

                for (let d of res) {
                    let date = d.date;
                    let price = d.price;
                    data.push([date, price]);
                }
                this.setState({ data: data, loaded: true });

            })
            .catch((err) => {
                console.log(err);
            })

        e.preventDefault();
    }
}

