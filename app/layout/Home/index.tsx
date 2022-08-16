import { AboutMe } from "./AboutMe";
import { Quotes } from "./Quotes";
import { Skills } from "./Skills";

export const Home = () => {
  return (
    <div>
      <Quotes />
      {/* <AboutMe /> */}
      {/* <div className="h-[80vh]" /> */}
      <Skills />
      <div className="h-[80vh]" />
    </div>
  );
};
