import { Haiku } from "../types/Haiku";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "swiper/css";
import "swiper/css/navigation";

type Props = {
  data: Array<Haiku>;
  selectedNumber: number;
  onChange: (number: number) => void;
};

const HaikuSwiper = React.memo((props: Props) => {
  const { data, selectedNumber, onChange } = props;
  const [swiper, setSwiper] = useState<any | null>(null);

  // console.log(`this is haiku swiper`);

  useEffect(() => {
    if (selectedNumber && swiper) {
      swiper.slideTo(selectedNumber, 0);
    }
  }, [selectedNumber]);

  useEffect(() => {
    swiper?.update();
  }, [data]);

  return (
    <Swiper
      modules={[Navigation]}
      initialSlide={selectedNumber}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      mousewheel={true}
      className="h-[100%]"
      onSlideChange={(swiper) => onChange(swiper.activeIndex)}
      onSwiper={(swiper) => {
        setSwiper(swiper);
      }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="
              text-center w-[100%] h-[100%] flex items-center justify-center
              [writing-mode:vertical-rl] landscape:[writing-mode:horizontal-tb] lg:landscape:[writing-mode:vertical-rl]
            "
          >
            <div className="p-4 text-[1.75rem] tracking-wider leading-10">{parse(item.text)}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

export default HaikuSwiper;
