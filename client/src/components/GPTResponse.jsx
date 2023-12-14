import React from "react";

export const GPTResponse = ({ response }) => {
  const res = response.data;

  return <div className="response">{res}</div>;
};
