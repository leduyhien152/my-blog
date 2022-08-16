import { Transition } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { headerItems } from "~/constants/header";
import { useTheme } from "~/contexts/ThemeContext";
import cx from "classnames";

export const Header = () => {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState<"main" | "sub" | null>("main");
  const scroll: {
    position: number;
    direction: "up" | "down";
  } = useMemo(
    () => ({
      position: 0,
      direction: "down",
    }),
    []
  );

  useEffect(() => {
    const toggleVisible = () => {
      const position = document.documentElement.scrollTop;
      const direction = position > scroll.position ? "down" : "up";
      if (position < 80) {
        setVisible("main");
      } else if (direction === "up") {
        setVisible("sub");
      } else {
        setVisible(null);
      }
      scroll.position = position;
      scroll.direction = direction;
    };
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [scroll]);

  return (
    <div className="fixed top-0 z-10 w-full">
      <Transition
        show={!!visible}
        enter="duration-500"
        enterFrom="-translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <header
          className={cx(
            "bg-opacity-70",
            isDark ? "bg-black text-white" : "bg-white text-black"
          )}
        >
          <div className="flex items-center justify-between w-full h-20 max-w-5xl mx-auto">
            <Link to="/" className="flex items-center gap-x-4">
              <span className="text-4xl font-semibold tracking-wider uppercase">
                Hien Le
              </span>
              <div className="relative before:absolute before:h-full before:border before:border-white before:transform before:rotate-[20deg]">
                <div className="flex flex-col pl-5 text-sm font-normal leading-4">
                  <span>part time dev</span>
                  <span>full time weirdo</span>
                </div>
              </div>
            </Link>
            <div className="flex gap-x-8">
              {headerItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className="relative leading-10 uppercase after:absolute after:h-full after:w-full after:left-0 after:top-0 hover:text-primary hover:after:border-b-2 hover:after:border-primary"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </header>
        {/* {visible === "main" ? (
          <Header />
        ) : (
          <div className="flex justify-center py-2 bg-white gap-x-8">
            {headerItems.map((item) => (
              <Transition.Child key={item.title}>
                <Link
                  to={item.link}
                  className="relative leading-10 uppercase after:absolute after:h-full after:w-full after:left-0 after:top-0 hover:text-primary hover:after:border-b-2 hover:after:border-primary"
                >
                  {item.title}
                </Link>
              </Transition.Child>
            ))}
          </div>
        )} */}
      </Transition>
    </div>
  );
};
