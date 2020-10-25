import React from 'react';
import Chart from "react-google-charts";
import Subscribe from './Subscribe';


export default class PriceChart extends React.Component {

    state = {
        heading: "Price Chart",
        options: {
            title: "Price of the Product",
            curveType: "function",
            legend: { position: "bottom" },
            animation: {
                duration: 1000,
                easing: 'in',
                "startup": true
            }
        },
        buttonClicked: true //flase
    }

    subscribe = () => {
        this.setState({ buttonClicked: true })
    }
    render() {
        return (
            <div className="searchContainer">
                <h2>{this.state.heading}</h2>

                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    
                    data={this.props.data}
                    options={this.state.options}
                />
                <div className="flex">
                    <div>
                        Average Price: {calcAvgPrice(this.props.data)}
                    </div>
                    <div>
                        Minimum Price: {minPrice(this.props.data)}
                    </div>
                    <div>
                        Current Price: {this.props.currentPrice}
                    </div>
                </div>
                {!this.state.buttonClicked ? < button className='btn' onClick={this.subscribe}>
                    Subscribe for updates
                </button> : ""}

                { this.state.buttonClicked ? ( <Subscribe maxPrice={this.props.currentPrice}/> ) : ""}
            </div >
        );
    }

};


let calcAvgPrice = (data) => {
    let total = 0;
    for (var d of data) {
        if (d[1] && !Number.isNaN(Number.parseFloat(d[1])))
            total += Number.parseFloat(d[1]);
    }
    return (total / (data.length - 1)).toFixed(2);
}


let minPrice = (data) => {

    let ans = Infinity;

    for (var d of data) {
        if (d[1] && !Number.isNaN(Number.parseFloat(d[1])))
            ans = Math.min(ans, Number.parseFloat(d[1]));
    }

    return (ans !== Infinity) ? ans : "Not Available";
}


PriceChart.defaultProps = {
    currentPrice: 20,

    data: [
        ["Date", "Price"],
        ["27-09-2020", 1030],
        ["28-09-2020", 1000],
        ["29-09-2020", 1170],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
        ["30-09-2020", 660],
    ]

};
