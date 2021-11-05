import React, { useEffect } from "react";

function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <p
      style={{
        backgroundColor: `${type}`,
        padding: "4px",
        paddingLeft: "25px",
        borderRadius: "20px",
      }}
    >
      {msg}
    </p>
  );
}

export default Alert;
