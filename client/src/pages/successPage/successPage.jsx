import React from "react";
import { useLocation } from "react-router-dom";

const successPage = () => {
  const query = new URLSearchParams(useLocation().search);

  const reference = query.get("reference");

  return (
  <>
  <div>
    <span>
        Payment Successful
    </span>
    Thank you for your payment. Your transaction was successful!
  </div>
    {reference && (
        <p><strong>Reference ID:</strong> {reference} </p>
    ) }
  </>
  )
};

export default successPage;
