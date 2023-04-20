import React from "react";
import Slider from "react-slick";

function SliderComponent({ arrImg }) {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {arrImg?.map((i) => (
        <img className="w-full" src={i} alt="" />
      ))}
    </Slider>
  );
}

export default SliderComponent;
