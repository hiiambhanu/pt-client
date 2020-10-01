import React from 'react';

export default function Header() {
    return (
        <div style={headContainer}>
            <h1 style={{
                fontWeight: 700,
                fontStyle: "bold"
            }}>
               $ Price Tracker
            </h1>
            Get your favourite product at the best price possible!
        </div>
    );
}

const headContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "20vh",
    textAlign:"center",
    flexDirection: "column"
};