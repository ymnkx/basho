import { useEffect, useRef } from "react";
import { Haiku } from "../types/Haiku";
import { gsap } from "gsap";

type Props = {
  data: Haiku;
};

const HaikuInfo = (props: Props) => {
  const { data } = props;

  const location = useRef<HTMLInputElement>(null);
  const word = useRef<HTMLInputElement>(null);
  const fromParam = { x: 10, opacity: 0 };
  const toParam = { x: 0, opacity: 1 };
  let tl: GSAPTimeline | null = null;

  useEffect(() => {
    tl?.kill();
    tl = gsap.timeline().fromTo(location.current, fromParam, toParam).fromTo(word.current, fromParam, toParam, "-=0.25");
  }, [data]);

  return (
    <>
      <div ref={location}>{data.location}</div>
      <div ref={word}>{data.season_word && `${data.season_word} (${data.season})`}</div>
    </>
  );
};

export default HaikuInfo;
