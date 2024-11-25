import React, { useState, useEffect } from 'react';
import './Feature.css';
import Item from '../Item/Item';

const Feature = () => {
  const [featureproduct, setFeatureproduct] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/featureproduct')
      .then((response) => response.json())
      .then((data) => setFeatureproduct(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= featureproduct.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(0, featureproduct.length - 3) : prevIndex - 3
    );
  };

  const visibleProducts = featureproduct.slice(currentIndex, currentIndex + 3);

  return (
    <div className='feature'>
      <button onClick={prevSlide} className="carousel-button">
        <i className='fa fa-chevron-left'></i>
      </button>
      <div className="feature-item">
        {visibleProducts.map((item, i) => (
          <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            price={item.price} 
            desc={item.description} 
          />
        ))}
      </div>
      <button onClick={nextSlide} className="carousel-button">
        <i className='fa fa-chevron-right'></i>
      </button>
    </div>
  );
};

export default Feature;
