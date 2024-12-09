import React from 'react';
import './CSS/About.css';

export default function AboutUs() {
  return (
    <>
      <div className="about-content">
        <h1>About Cutiepie Cakes and Pastries</h1>

        <div className="about-section">
          <div className="about-text">
            <p>
              At Cutiepie Cakes and Pastries, we believe in the magic of freshly baked treats!
              Since our inception, we’ve been dedicated to providing our customers with the best-tasting cakes,
              pastries, and sweets, made with love and quality ingredients.
            </p>
          </div>
          <div className="about-image">
            <img src="http://localhost:5000/images/birthday-cake.jpg" alt="Delicious cake" />
          </div>
        </div>

        <div className="about-section">
          <div className="about-image">
            <img src="http://localhost:5000/images/birthdaycake1.jpg" alt="Tasty pastries" />
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in [Year], Cutiepie Cakes and Pastries was born from a passion for baking and a desire
              to bring joy to our community. Our founder, [Founder’s Name], started experimenting with family recipes,
              crafting delightful treats that have become local favorites.
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h2>Our Philosophy</h2>
            <p>
              We believe that the best ingredients make the best desserts. That’s why we source high-quality,
              local ingredients whenever possible. Each product is crafted with care, ensuring that every bite is
              as delicious as the last.
            </p>
          </div>
          <div className="about-image">
            <img src="http://localhost:5000/images/wedding-cake1.jpg" alt="Delicious cake" />
          </div>
        </div>

        <div className="about-section">
          <div className="about-image">
            <img src="http://localhost:5000/images/wedding-cake2.jpg" alt="Tasty pastries" />
          </div>
          <div className="about-text">
            <h2>Our Commitment</h2>
            <p>
              Our commitment extends beyond just baking. We strive to provide a warm and inviting atmosphere
              for all our customers. Whether you're enjoying a coffee with friends or celebrating a special occasion,
              we’re here to make your experience unforgettable.
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-text">
            <h2>Join Us</h2>
            <p>
              We invite you to explore our selection of cakes and pastries, and to become part of our story.
              Follow us on social media to stay updated on our latest creations and promotions.
              We can’t wait to serve you!
            </p>
          </div>
          <div className="about-image-join">
            <img src="http://localhost:5000/images/Pastries/applepie.jpg" alt="Join Us" />
          </div>
        </div>
      </div>
    </>
  );
}
