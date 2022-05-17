import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/shopStore-action';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const allCardInfo = useSelector(state => state.shopStore.storeData);
  const currency = useSelector(state => state.shopStore.currency);
  const myBag = useSelector(state => state.shopStore.myBag);
  const dispatch = useDispatch();

  const [currentCurrency, setCurrentCurrency] = useState();
  const [img, setImg] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();

  const cardInfo = allCardInfo.map(info => info.find(item => item.id === id));
  useEffect(() => {
    cardInfo.map(item => setImg(item.Picture));
  }, []);
  useEffect(() => {
    if (currency[0] === 'USD') {
      setCurrentCurrency(`$`);
    }
    if (currency[0] === 'EUR') {
      setCurrentCurrency(`€`);
    }
    if (currency[0] === 'JPY') {
      setCurrentCurrency(`¥`);
    }
    if (currency.length === 0) {
      setCurrentCurrency(`$`);
    }
  }, [currency]);

  const imgSwitcher = e => {
    setImg(e.target.currentSrc);
  };

  const choseColor = e => {
    if (document.querySelector('.color_active') !== null) {
      document.querySelector('.color_active').classList.remove('color_active');
    }
    setColor(e.target.id);
    e.target.className = 'productPage_info_color-item color_active';
  };

  const choseSize = e => {
    if (document.querySelector('.size_active') !== null) {
      document.querySelector('.size_active').classList.remove('size_active');
    }
    setSize(e.target.innerText);
    e.target.className = 'productPage_info_size-item size_active';
  };

  const addToCart = () => {
    if (myBag.find(item => item[0].id === id) === undefined) {
      if (size === undefined) {
        toast.error('Please chose the size');
        return;
      }
      if (color === undefined) {
        toast.error('Please chose the color');

        return;
      }
      dispatch(
        actions.addCard({
          ...cardInfo,
          chosedColor: color,
          chosedSize: size,
          qty: 1,
        }),
      );

      toast.success('Added to bag!');

      return;
    }
    toast.warn('Oops alredy in the bag!');
  };

  return (
    <>
      <div className="productPage_container">
        {cardInfo.map(item => (
          <>
            <ul className="productPage_img_list">
              {item.img.map(el => (
                <li className="productPage_img_item">
                  <img
                    className="productPage_img"
                    onClick={imgSwitcher}
                    src={el}
                    alt={item.Title}
                  />
                </li>
              ))}
            </ul>
            <div className="productPage_info_block">
              <img className="productPage_info_img" src={img} alt={item.Title} />
              <div className="productPage_info_side">
                <h3 className="productPage_info_title">{item.Title.split(' ', 1)}</h3>
                <p className="productPage_info_name"> {item.Title.split(' ').splice(1, 3)}</p>
                <p className="productPage_info_param">Size:</p>
                <div className="productPage_info_size">
                  {item.size.map(el => (
                    <p className="productPage_info_size-item" onClick={choseSize}>
                      {el}
                    </p>
                  ))}
                </div>
                <p className="productPage_info_param">Color:</p>
                <div className="productPage_info_color">
                  {item.color.map(el => (
                    <p
                      className="productPage_info_color-item"
                      onClick={choseColor}
                      style={{ backgroundColor: el }}
                      id={el}
                    ></p>
                  ))}
                </div>
                <p className="productPage_info_param">Price:</p>
                <p className="productPage_info_price">
                  {currentCurrency}
                  {item.price}
                </p>
                <button className="productPage_infi_btn btn" onClick={addToCart}>
                  ADD TO CART
                </button>
                <p className="productPage_info_description">{item.description}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default ProductPage;
