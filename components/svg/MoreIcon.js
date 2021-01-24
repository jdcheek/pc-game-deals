import React from "react";

export default function MoreIcon({ color }) {
  let fill = color || "#000000";

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill={fill}
      viewBox='0 0 24 24'>
      <path d='M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z' />
    </svg>
  );
}
