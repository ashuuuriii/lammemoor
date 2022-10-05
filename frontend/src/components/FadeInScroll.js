import React, { useEffect, useRef } from "react";

const FadeInScroll = (props) => {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fadein-on-scroll ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

export default FadeInScroll;
