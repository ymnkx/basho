import { gsap, Power1 } from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  count: number;
  total: number;
};

const HaikuNumber = (props: Props) => {
  const { count, total } = props;
  const obj = {
    count: 0,
  };

  const countElement = useRef<HTMLElement>(null);

  type CounterConfig = {
    end: number;
    duration: number;
    ease: string;
    increment: number;
  };

  gsap.registerEffect({
    name: "counter",
    extendTimeline: true,
    defaults: {
      end: 0,
      duration: 0.5,
      ease: "linear",
      increment: 1,
    },
    effect: (targets: Array<HTMLElement>, config: CounterConfig) => {
      let tl = gsap.timeline();
      let num = targets[0].innerText.replace(/\,/g, "");
      targets[0].innerText = num;
      tl.to(
        targets,
        {
          duration: config.duration,
          innerText: config.end,
          modifiers: {
            innerText: function (innerText) {
              return gsap.utils
                .snap(config.increment, innerText)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
          ease: config.ease,
        },
        0
      );
      return tl;
    },
  });

  useEffect(() => {
    gsap.timeline().counter(countElement.current, { end: count + 1, duration: 0.5, ease: "Power3.easeOut" });
  }, [count]);

  return (
    <div>
      <span ref={countElement}>0</span> / {total}
    </div>
  );
};

export default HaikuNumber;
