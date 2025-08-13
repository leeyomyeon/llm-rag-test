import React from 'react';
import imgList from '../bin/imgList';
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';

const CounterCarousel = () => {
  const makeCarouselItem = () => {
    return imgList.map((item) => {
      return (
        <CarouselItem text={item.name} key={`carousel${item.name}`}>
          <img src={item.src} alt={item.name} className="d-block w-100" />
          <CarouselCaption>
          </CarouselCaption>
        </CarouselItem>
      )
    });
  }

  return (
    <>
      <Carousel variant="dark">
        {makeCarouselItem()}
      </Carousel>
    </>
  )
}

export default CounterCarousel;