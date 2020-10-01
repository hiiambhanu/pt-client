import React from 'react';

export default function Footer() {
    return (
        <div style={headContainer}>
            Footer
        </div>
    );
}

const headContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10vh",
    textAlign:"center",
    flexDirection: "column"
};