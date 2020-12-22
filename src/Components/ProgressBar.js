import React from "react";

export default function ProgressBar(props) {
  const { completed } = props;

  const containerStyles = {
    height: 15,
    width: 315,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 50,
    margin: "auto 25px",
    border: "2px solid rgba(255, 255, 255, 0.7)"
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "rgba(80, 222, 113, 1)",
    borderRadius: "inherit",
    textAlign: "right",
    transition: 'width 1s ease-in-out',
  };

//   const labelStyles = {
//     padding: 5,
//     color: "white",
//     fontWeight: "bold",
//   };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        {/* <span style={labelStyles}>{`${completed}%`}</span> */}
      </div>
    </div>
  );
}
