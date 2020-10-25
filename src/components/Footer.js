import React from 'react';

export default function Footer() {
    return (
        <div style={headContainer}>
            <div>
                Bhanu Pratap Singh 2K18/CO/109
            </div>
            <div>
                Arnav Garg 2K18/CO/087
            </div>
        </div>
    );
}

const headContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    textAlign: "center",
    flexDirection: "column",
    padding:"2em", 
    paddingTop: "5em",
};