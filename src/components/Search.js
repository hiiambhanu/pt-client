import React from 'react';
import PriceChart from './PriceChart'
import "../App.css";

export default class Search extends React.Component {

    state = {
        loaded: false,
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
                        <br />
                        <input type="text" className="textbox" />
                        <br />
                        <label for="url">Email: </label>
                        <br />
                        <input type="text" className="textbox" />
                        <br />
                        <button className="btn" type="button" onClick={this.hs}>Submit</button>
                    </form>
                </div>
                { this.state.loaded ? <PriceChart data={this.state.data} currentPrice={this.state.currentPrice} /> : ""}
            </div >
        );

    }
    hs = () => {
        this.setState({ loaded: true })
    }
}

