import React from "react";

export default function ProgressBar(props) {
  const { completed } = props;

  return (
    <div className="progressbar-container">
      <div className="progressbar-filler" style={{ width: `${completed}%`}}>
      </div>
    </div>
  );
}
