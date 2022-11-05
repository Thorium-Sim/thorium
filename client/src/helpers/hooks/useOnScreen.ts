import React from "react";

function useOnScreen(ref: React.MutableRefObject<any>, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (el) {
      observer.observe(el);
    }
    return () => {
      observer.unobserve(el);
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}

export default useOnScreen;
