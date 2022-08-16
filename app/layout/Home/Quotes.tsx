import cx from "classnames";
import { useEffect } from "react";
import { useTheme } from "~/contexts/ThemeContext";
import { useInView } from "~/hooks/useInView";

export const Quotes = () => {
  const { setIsDark } = useTheme();
  const { ref, percentage } = useInView();
  const isDark = percentage > 0.8;

  useEffect(() => {
    setIsDark(isDark);
  }, [isDark, setIsDark]);

  return (
    <div
      ref={ref}
      className={cx(
        "flex justify-center items-center h-screen px-5",
        // "h-[calc(100vh-5rem)] max-h-[800px] min-h-[30rem]",
        isDark ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex select-none">
        <div className="relative">
          <span className="absolute left-0 font-serif text-9xl text-primary h-14 -top-7">
            &ldquo;
          </span>
        </div>
        <div className="text-5xl font-serif italic px-16 max-w-[17ch] text-right text-white">
          things take time, take time.
        </div>
        <div className="relative">
          <span className="absolute right-0 font-serif text-9xl text-primary h-14 -bottom-7">
            &rdquo;
          </span>
        </div>
      </div>
    </div>
  );
};
