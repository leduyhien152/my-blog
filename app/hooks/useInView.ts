import { useEffect, useRef, useState } from "react";

export const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setPercentage(entry.intersectionRatio);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: Array.from(Array(101).keys()).map((i) => i / 100),
      }
    );

    const { current } = ref;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return { ref, percentage };
};
