import cx from "classnames";
import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

interface AboutMeProps {
  isDark?: boolean;
}

export const AboutMe = ({ isDark }: AboutMeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<{
    position: number;
    direction: "up" | "down";
    percentage: number;
  }>({ position: 0, direction: "down", percentage: 0 });

  useEffect(() => {
    const getCenter = () => {
      if (ref.current) {
        const centerScreen = document.documentElement.clientHeight / 2;
        const centerImage =
          ref.current.getBoundingClientRect().y +
          ref.current.getBoundingClientRect().height / 2;
        const percentage = Math.min(
          (centerImage - centerScreen) / ref.current.clientHeight,
          1
        );
        setScroll((scroll) => ({
          ...scroll,
          percentage,
        }));
      }
    };
    const handleScroll = () => {
      const position = document.documentElement.scrollTop;
      const direction = position > scroll.position ? "down" : "up";
      scroll.position = position;
      scroll.direction = direction;
      getCenter();
    };
    getCenter();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveX = `${
    (scroll.percentage < 0 ? -Math.abs(scroll.percentage) / 2 : 0) * 100
  }%`;
  const moveY = `${scroll.percentage * 50}px)`;

  return (
    <div
      className={cx(
        "flex items-center justify-center gap-x-10",
        isDark ? "text-white invisible" : "text-black visible"
      )}
      ref={ref}
    >
      <div
        className="w-full max-w-[30vw] transition-transform"
        style={{
          transform: `translate(${moveX}, ${moveY}`,
        }}
      >
        <img
          src="/images/avatar.jpeg"
          alt="avatar"
          style={{
            transform:
              scroll.percentage < 0
                ? `scale(${1 + Math.abs(scroll.percentage) / 2})`
                : undefined,
          }}
        />
      </div>
      <div className="flex flex-col max-w-[30vw] gap-y-3">
        <span className="text-xl font-normal uppercase">Hien Le</span>
        <p>
          Learning is a continuous process of life, the pinnacle of the attitude
          and vision of the universe. I believe that there is so much more on
          this journey for me to become an appropriate front-end developer.
        </p>
        <Link
          to="/about"
          className="flex items-center overflow-hidden gap-x-2 w-fit group"
        >
          <div
            data-text="More about me"
            className="relative uppercase group after:content-[attr(data-text)] after:absolute after:text-primary after:top-full after:left-0 transition-transform duration-200 group-hover:-translate-y-full"
          >
            More about me
          </div>
          <div className="flex items-center justify-center w-6 h-6 leading-6 rounded-full group-hover:border group-hover:border-primary group-hover:text-primary">
            &rarr;
          </div>
        </Link>
      </div>
    </div>
  );
};
