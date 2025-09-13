import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import styles from './Slider.module.css';
import { useState, useEffect } from 'react';
import { fetchWithTimeoutAndFallback } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  const navigate = useNavigate();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slideChanged() {},
    },
    [
      function AutoplayPlugin(slider) {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  const [products, setProductes] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchWithTimeoutAndFallback(
        'https://api.example.com/products'
      );
    }
    loadProducts();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div ref={sliderRef} className="keen-slider">
            <div className="keen-slider__slide">
              <div className={styles.slideContent}>
                <div className={styles.textArea}>
                  <span className={styles.offerText}>限时特惠7折</span>
                  <h2 className={styles.title}>享受纯净音质</h2>
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => navigate('/product/101')}
                      className={styles.buyBtn}
                    >
                      {' '}
                      查看详情
                    </button>
                    <text className={styles.moreBtn}>查看详情</text>
                  </div>
                </div>
                <div className={styles.imageArea}>
                  <img
                    src="https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp"
                    alt="Headphones"
                  />
                </div>
              </div>
            </div>

            <div className="keen-slider__slide">
              <div className={styles.slideContent}>
                <div className={styles.textArea}>
                  <span className={styles.offerText}>限时特惠9折</span>
                  <h2 className={styles.title}>
                    抢先入手 MacBook
                    <br />
                    享受专属折扣！
                  </h2>
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => navigate('/product/78')}
                      className={styles.buyBtn}
                    >
                      {' '}
                      查看详情
                    </button>
                    <text className={styles.moreBtn}>查看详情</text>
                  </div>
                </div>
                <div className={styles.imageArea}>
                  <img
                    src="https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp"
                    alt="macbook"
                  />
                </div>
              </div>
            </div>

            <div className="keen-slider__slide">
              <div className={styles.slideContent}>
                <div className={styles.textArea}>
                  <span className={styles.offerText}>家居装饰秋季特惠</span>
                  <h2 className={styles.title}>焕新家居风格</h2>
                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => navigate('/category/home-decoration')}
                      className={styles.buyBtn}
                    >
                      {' '}
                      查看详情
                    </button>
                    <text className={styles.moreBtn}>查看详情</text>
                  </div>
                </div>
                <div className={styles.imageArea}>
                  <img
                    src="https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp"
                    alt="decoration"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
