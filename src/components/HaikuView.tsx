import { useCallback, useEffect, useState } from "react";
import { ApiClient } from "../lib/apiClient";
import HaikuSwiper from "./HaikuSwiper";
import { Haiku } from "../types/Haiku";
import HaikuInfo from "./HaikuInfo";
import HaikuNumber from "./HaikuNumber";

const HaikuView = () => {
  const [data, setData] = useState<Array<Haiku>>([]);
  const [selected, setSelected] = useState<number | null>(null);

  // console.log(`this is haiku viewer`);

  const getRandom = (arr: Array<any>) => {
    return (Math.random() * arr.length) | 0;
  };

  const changeHandlr = useCallback(
    (number: number) => {
      setSelected(number);
    },
    [setSelected]
  );

  useEffect(() => {
    ApiClient({
      url: "./sample.json", //'http://localhost:3004/haiku/',
      callback: (d: any) => {
        setData(d.haiku);
        setSelected(getRandom(d.haiku));
      },
    });
  }, []);

  return (
    <div>
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%]">
        {selected !== null && <HaikuSwiper data={data} selectedNumber={selected} onChange={changeHandlr} />}
      </div>
      <div className="fixed left-[50%] top-0 translate-x-[-50%] p-2">
        {selected !== null && data.length !== 0 ? <HaikuNumber count={selected} total={data.length} /> : undefined}
      </div>
      <div className="fixed left-0 top-0 p-2 text-sm">{selected !== null && <HaikuInfo data={data[selected]} />}</div>
      <button
        type="button"
        onClick={() => {
          setSelected(getRandom(data));
        }}
        className="fixed left-[50%] bottom-5 translate-x-[-50%] border-blue-400 text-sm"
      >
        RANDOM
      </button>
    </div>
  );
};

export default HaikuView;
