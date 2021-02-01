import React, { useState, useEffect } from "react";

export default function TopButton() {
  const [pageTop, setPageTop] = useState(true);

  const handleScroll = () => {
    if (process.browser) {
      if (window.pageYOffset > 30) {
        setPageTop(false);
      } else {
        setPageTop(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return !pageTop ? (
    <button
      className='to-top-btn'
      onClick={() =>
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }>
      TOP
    </button>
  ) : null;
}
