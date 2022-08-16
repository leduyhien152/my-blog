import { useEffect, useRef } from "react";
import { useTheme } from "~/contexts/ThemeContext";
import useWindowSize from "~/hooks/useWindowSize";
import cx from "classnames";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const windowSize = useWindowSize();
  const scrollingContainerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height]);

  const setBodyHeight = () => {
    if (scrollingContainerRef.current) {
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollingContainerRef.current) {
      scrollingContainerRef.current.style.transform = `translateY(-${data.rounded}px)`;

      // Recursive call
      requestAnimationFrame(() => smoothScrollingHandler());
    }
  };

  return (
    <div
      className={cx(
        "fixed top-0 left-0 w-full h-full overflow-hidden transition-all duration-300",
        isDark ? "bg-black" : "bg-white"
      )}
    >
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};
