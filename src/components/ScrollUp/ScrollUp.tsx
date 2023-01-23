import { useState } from "react";
import { useActionOnScroll } from "../../hooks";
import "./style.scss";

export const ScrollUp = () => {
  const [showButton, setShowButton] = useState(false);

  const showButtonTrue = () => {
    setShowButton(true);
  };

  useActionOnScroll({
    actionFn: showButtonTrue,
    from: "top",
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => setShowButton(false), 1000);
  };

  return (
    <button
      className={`scroll-up ${showButton ? "show-button" : "hide-button"}`}
      onClick={handleClick}
    >
      top ^
    </button>
  );
};
