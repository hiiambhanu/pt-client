import React from 'react'
import config from '../config.json';
const baseUrl = config.baseUrl;


export default class Subscribe extends React.Component {

    state = {
        name: "",
        email: "",
        budget: "",
        maxPrice: this.props.maxPrice,
        requestProcessed: false
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.name === "" || this.state.email === "" || this.state.budget === "") return alert("Please enter all 3 fields");


        fetch(baseUrl + '/fetchPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'url': this.props.url,
                'email': this.state.email,
                'budget': this.state.budget
            })
        }).then(res => {
            console.log(res);
            if (res.status !== 500) {
                this.setState({
                    requestProcessed
                        : true
                });
            }

        })
            .catch((err) => {
                console.log(err);
            })



        console.log("Submitted");
    }

    render() {

        return (

            !this.state.requestProcessed ? (<div className="flex col subscribe"><h2 align="center">
                Please enter the following details
                </h2>
                <form>
                    <div>
                        <label for="name" >
                            Name
                    </label>
                        <input required type="text" name="name" className="textbox" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label for="email" >
                            Email
                    </label>
                        <input required type="email" name="email" className="textbox" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label for="budget">Maximum Budget <span className="smalltext"> (You will be notified if the price drop is less than this)</span></label>
                        <input required min={0} max={this.state.maxPrice} type="number" name="budget" className="textbox range" onChange={this.handleChange}></input>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button type="submit" className="btn " onClick={this.handleSubmit} > Subscribe! </button>
                    </div>
                </form>
            </div>) : (<div className="flex col subscribe">Your Request has been processed. Thanks for using this product.</div>)

        )
    }

};
