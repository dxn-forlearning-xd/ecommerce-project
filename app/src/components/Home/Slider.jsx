import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import styles from './Slider.module.css';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      offer: 'Limited-Time Offer: 30% Off',
      title: 'Experience Pure Sound',
      img: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp',
      alt: 'Headphones',
      onClick: () => navigate('/product/101'),
    },
    {
      id: 2,
      offer: 'Limited-Time Offer: 10% Off',
      title: 'MacBook — Get Yours First with Exclusive Discounts!',
      img: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp',
      alt: 'MacBook',
      onClick: () => navigate('/product/78'),
    },
    {
      id: 3,
      offer: 'Autumn Home Décor Sale',
      title: 'Refresh Your Home Style',
      img: 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp',
      alt: 'Decoration',
      onClick: () => navigate('/category/home-decoration'),
    },
  ];

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        const clear = () => clearTimeout(timeout);

        const next = () => {
          clear();
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), 5000);
        };

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clear();
          });

          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            next();
          });

          next();
        });

        slider.on('dragStarted', clear);
        slider.on('animationEnded', next);
        slider.on('updated', next);
      },
    ],
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide) => (
            <div key={slide.id} className="keen-slider__slide">
              <div className={styles.slideContent}>
                <div className={styles.textArea}>
                  <span className={styles.offerText}>{slide.offer}</span>

                  <h2 className={styles.title}>{slide.title}</h2>

                  <div className={styles.buttonGroup}>
                    <button onClick={slide.onClick} className={styles.buyBtn}>
                      View Details
                    </button>

                    <span className={styles.moreBtn}>View Details</span>
                  </div>
                </div>

                <div className={styles.imageArea}>
                  <img src={slide.img} alt={slide.alt} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Slider;
