import { Transition } from "@headlessui/react";
import { Link } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { headerItems } from "~/constants/header";

export const SubHeader = () => {
  const [visible, setVisible] = useState(false);
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
      if (position > 80 && direction === "up") {
        setVisible(true);
      } else {
        setVisible(false);
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
        show={visible}
        enter="duration-300"
        enterFrom="-translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="flex justify-center py-2 bg-white gap-x-8">
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
      </Transition>
    </div>
  );
};
