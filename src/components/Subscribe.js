import React from 'react'

export default class Subscribe extends React.Component {

    state = {
        name: "",
        email: "",
        budget: "",
        maxPrice: this.props.maxPrice
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.name === "" || this.state.email === "" || this.state.budget ==="") return;
        
        console.log("Submitted");
    }

    render() {

        return (
            <div className="flex col subscribe">
                <h2 align="center">
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
                        <input required min={0} max={this.state.maxPrice} type="number" className="textbox range" onChange={this.handleChange}></input>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button type="submit" className="btn " onClick={this.handleSubmit} > Subscribe! </button>
                    </div>
                </form>
            </div>
        )
    }

};
