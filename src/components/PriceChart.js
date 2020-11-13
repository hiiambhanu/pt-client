import React from 'react';
import Chart from "react-google-charts";
import config from '../config.json';
const baseUrl = config.baseUrl;


export default class PriceChart extends React.Component {

    state = {
        heading: "Price Chart",
        currentPrice: this.props.currentPrice,

        options: {
            title: "Price of the Product",
            curveType: "function",
            legend: { position: "bottom" },
            animation: {
                duration: 1000,
                easing: 'in',
                "startup": true
            }
        }
    }

    subscribe = () => {
        this.setState({ buttonClicked: true })
    }

    componentDidMount() {
        if (this.state.currentPrice === false) {
            fetch(baseUrl + '/currentPrice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'url': this.props.url,
                })
            }).then(res => res.json())
                .then(res => {
                    this.setState({ currentPrice: res.currentPrice });
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


    render() {
        return (
            <div >
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
    let ans = (total / (data.length - 1));

    return ans.toLocaleString('en-IN');
}


let minPrice = (data) => {

    let ans = Infinity;

    for (var d of data) {
        if (d[1] && !Number.isNaN(Number.parseFloat(d[1])))
            ans = Math.min(ans, Number.parseFloat(d[1]));
    }

    return (ans !== Infinity) ? ans.toLocaleString('en-IN') : "Not Available";
}


PriceChart.defaultProps = {
    currentPrice: 20,

    data: [
        ["Date", "Price"],
        ["27-09-2020", 1030],
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
