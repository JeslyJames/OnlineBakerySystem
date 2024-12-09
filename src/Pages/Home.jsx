import React from 'react'
import '../index.css'
import myImage from '../Components/Assets/bannerimage.jpg'
import cakes from '../Components/Assets/cakes.jpg'
import cupcakes from '../Components/Assets/cupcake.jpg'
import croissants from '../Components/Assets/cheesecake.jpg'
import tilde from '../Components/Assets/tilde.svg'
import '../index.css'
import { Link } from 'react-router-dom'
import Feature from '../Components/Feature/Feature'

const Home = () => {
  return (
    <div>
     <div className="hero">
        <img src={myImage} alt="cakes and cupcakes" />
        <div className="centered">Welcome to Cutiepie Cakes and Pasteries</div>
      </div>
      {/* why us */}
      <div className="categories mt-5">
        <div className="title position-relative">
          <h2 className="text-center mb-5 pb-lg-4">what makes us best</h2>
        </div>
      </div>
      <div className="whyus container mb-5">
        <div className="row justify-content-center large-gutters facts-row">
          <div className="col-lg-4">
            <div className="fact-box h-100 pt-4 pr-4 pb-4">
              <h3>
                <span className="text-highlight">
                Quality Ingredients<span></span>
                </span>
              </h3>
              <p className="mb-0">
              We prioritize fresh, high-quality ingredients in every product, ensuring that our baked goods taste amazing and are good for you.{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fact-box h-100 pt-4 pr-4 pb-4">
              <h3>
                <span className="text-highlight">
                Custom Orders<span></span>
                </span>
              </h3>
              <p className="mb-0">
              We specialize in personalized baked goods for special occasions, allowing customers to customize cakes, cupcakes, and other treats to suit their needs.{" "}
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fact-box h-100 pt-4 pr-4 pb-4">
              <h3>
                <span className="text-highlight">
                Cozy Atmosphere<span></span>
                </span>
              </h3>
              <p className="mb-0">Our bakery provides a warm and inviting environment, perfect for enjoying a delicious treat with friends or family.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Our Categories */}
      <div className="categories mt-4">
        <div className="title position-relative">
          <h2 className="text-center mb-5 pb-lg-4">Our Categories</h2>
        </div>
      </div>
      {/* Cakes */}
      <div className="container my-3">
        <div className="overlay-wrapper">
          <div className="row justify-content-start">
            <div className="col-lg-7">
              <div className="pr-lg-4">
                <img
                  width="700"
                  height="537"
                  src={cakes}
                  className="w-100"
                  alt="delicious cake"
                  decoding="async"
                  sizes="(max-width: 700px) 100vw, 700px"
                />
              </div>
            </div>
          </div>

          <div className="text-row row justify-content-end">
            <div className="spacer-col d-none d-lg-block col-lg-1"></div>
            <div className="col-lg-6">
              <div className="content-wrapper">
                <h3 className="h2 mb-0">Cakes</h3>
                <img src={tilde} alt="Wave Icon" />
                <div className="mt-3 mb-4 mb-last-0">
                  <p>
                    Our cakes are beautifully decorated, layered with rich,
                    creamy frosting and topped with vibrant sprinkles. And you
                    can ask for customization as well.
                  </p>
                </div>
                <a href="/Cakes/1" className="btn btn-viewmore d-inline-block">
                  View More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cupcakes */}

      <div className="container my-3">
        <div className="overlay-wrapper">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="pr-lg-4">
                <img
                  width="700"
                  height="537"
                  src={cupcakes}
                  className="w-100"
                  alt="fingerlicking cupcakes"
                  decoding="async"
                  sizes="(max-width: 700px) 100vw, 700px"
                />
              </div>
            </div>
          </div>

          <div className="text-row row justify-content-start">
            <div className="spacer-col d-none d-lg-block col-lg-1"></div>
            <div className="col-lg-6">
              <div className="content-wrapper">
                <h3 className="h2 mb-0">Cupcakes</h3>
                <img src={tilde} alt="Wave Icon" />
                <div className="mt-3 mb-4 mb-last-0">
                  <p>
                    This cupcakes are more than just a dessert—it's your go-to
                    treat whenever you need a little sweetness in your day! Its
                    soft texture and perfect frosting will bring a smile to your
                    face.
                  </p>
                </div>
                <Link to='/Cakes/5'>
                    <div className="btn btn-viewmore d-inline-block">View More</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cakes */}
      <div className="container my-3">
        <div className="overlay-wrapper">
          <div className="row justify-content-start">
            <div className="col-lg-7">
              <div className="pr-lg-4">
                <img
                  width="700"
                  height="537"
                  src={croissants}
                  className="w-100"
                  alt="mouthdrooling Croissants"
                  decoding="async"
                  sizes="(max-width: 700px) 100vw, 700px"
                />
              </div>
            </div>
          </div>

          <div className="text-row row justify-content-end">
            <div className="spacer-col d-none d-lg-block col-lg-1"></div>
            <div className="col-lg-6">
              <div className="content-wrapper">
                <h3 className="h2 mb-0">CheeseCakes</h3>
                <img src={tilde} alt="Wave Icon" />
                <div className="mt-3 mb-4 mb-last-0">
                  <p>
                  Indulge in the ultimate cheesecake experience! Crafted with the finest ingredients, our cheesecakes are rich, creamy, and irresistibly delicious. Perfect for any occasion, each slice is a testament to quality and flavor. Discover the joy of indulgence with the best cheesecakes that delight your taste buds every time!
                  </p>
                </div>
                <Link to='/Cakes/2'>
                    <div className="btn btn-viewmore d-inline-block">View More</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature products */}
      <div className="categories my-5">
        <div className="title position-relative">
          <h2 className="text-center mb-5 pb-lg-4">Feature products</h2>
        </div>
        <div>
          <Feature />
        </div>
      </div>
    </div>
  )
}

export default Home
