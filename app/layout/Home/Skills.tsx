import { Transition } from "@headlessui/react";
import type { ImgHTMLAttributes } from "react";
import { useEffect, useMemo, useState } from "react";

interface ItemProps {
  show: boolean;
  imgProps?: ImgHTMLAttributes<HTMLImageElement>;
}
const Item = ({ show, imgProps }: ItemProps) => {
  return (
    <Transition
      show={show}
      enter="duration-500"
      enterFrom="scale-50 opacity-0"
      enterTo="scale-100 opacity-100"
      leave="duration-300"
      leaveFrom="scale-100 opacity-100"
      leaveTo="scale-50 opacity-0"
      className="flex items-center justify-center"
    >
      <img src="/images/avatar.jpeg" alt="avatar" {...imgProps} />
    </Transition>
  );
};

export const Skills = () => {
  const [percentage, setPercentage] = useState(0);
  const page = useMemo(() => ({ height: 0, top: 0 }), []);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const { scrollY: y, innerHeight: windowHeight } = window;
      const { top, height } = page;
      const min = top - windowHeight;
      const max = top + height;
      const percentage = max === min ? 0 : (y - min) / (max - min);
      setPercentage(percentage);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div
      className="relative h-[200vw]"
      ref={(ref) => {
        if (ref) {
          page.height = ref.offsetHeight;
          page.top = ref.offsetTop;
        }
      }}
    >
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[11%] left-[30%]">
        <Item
          show={percentage > 0 && percentage < 0.3}
          imgProps={{ width: "50%" }}
        />
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[18%] left-[75%]">
        <Item
          show={percentage > 0 && percentage < 0.38}
          imgProps={{ width: "75%" }}
        />
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[26%] left-[25%]">
        <div className="flex flex-col text-right leading-[8rem]">
          <p className="text-[9rem]">about</p>
          <p className="text-[10rem] text-primary">me</p>
        </div>
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[42%] left-[72%]">
        <Item
          show={percentage > 0.22 && percentage < 0.62}
          imgProps={{ width: "55%" }}
        />
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-[25%]">
        <Item
          show={percentage > 0.3 && percentage < 0.7}
          imgProps={{ width: "100%" }}
        />
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[56%] left-[80%]">
        <div className="flex flex-col text-left leading-[8rem]">
          <p className="text-[8rem] uppercase">skills</p>
        </div>
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[73%] left-[75%]">
        <Item
          show={percentage > 0.53 && percentage < 0.93}
          imgProps={{ width: "75%" }}
        />
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[70%] left-[25%]">
        <div className="flex flex-col text-right leading-[8rem]">
          <p className="text-[9rem] text-primary">{"more >"}</p>
        </div>
      </div>
      <div className="absolute w-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[87%] left-[30%]">
        <Item
          show={percentage > 0.67 && percentage < 1.07}
          imgProps={{ width: "70%" }}
        />
      </div>
    </div>
  );
};
