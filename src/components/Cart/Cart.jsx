import { createSlice } from '@reduxjs/toolkit';
import { useDebugValue, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/shopStore-action';

const Cart = () => {
  const currency = useSelector(state => state.shopStore.currency);
  const data = useSelector(state => state.shopStore.myBag);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const QTY = useSelector(state => state.shopStore.myBag[0].qty);

  const dispatch = useDispatch();

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

  const choseColor = e => {
    const elem = e.target.parentElement.children;
    console.log('elem', e.target.parentElement.id);

    for (let i = 0; i < elem.length; i += 1) {
      if (elem[i].className === 'cart_param_color-item color_active') {
        elem[i].className = 'cart_param_color-item';
      }
      if (elem[i].id === e.target.id) {
        elem[i].className = 'cart_param_color-item color_active';
        setColor(e.target.id);
      }
    }
  };

  const choseSize = e => {
    const elem = e.target.parentElement.children;

    for (let i = 0; i < elem.length; i += 1) {
      if (elem[i].className === 'cart_param_size-item size_active') {
        elem[i].className = 'cart_param_size-item';
      }
      if (elem[i].id === e.target.id) {
        elem[i].className = 'cart_param_size-item size_active';
        setSize(e.target.id);
      }
    }
  };

  const imgNext = e => {
    if (
      document.getElementById(e.target.id).style.left === '0px' ||
      !document.getElementById(e.target.id).style.left
    ) {
      document.getElementById(e.target.id).style.left = -200 + 'px';
      return;
    }
    if (document.getElementById(e.target.id).style.left === '-200px') {
      document.getElementById(e.target.id).style.left = -400 + 'px';
      return;
    }
    if (document.getElementById(e.target.id).style.left === '-400px') {
      document.getElementById(e.target.id).style.left = '0px';
      return;
    }
  };

  const imgPrevios = e => {
    if (
      document.getElementById(e.target.id).style.left === '0px' ||
      !document.getElementById(e.target.id).style.left
    ) {
      document.getElementById(e.target.id).style.left = -400 + 'px';
      return;
    }
    if (document.getElementById(e.target.id).style.left === '-400px') {
      document.getElementById(e.target.id).style.left = -200 + 'px';
      return;
    }
    if (document.getElementById(e.target.id).style.left === '-200px') {
      document.getElementById(e.target.id).style.left = '0px';
      return;
    }
  };

  let total = 0;
  let allQty = 0;

  const sumQty = el => {
    return (allQty += el);
  };

  const sumTotal = el => {
    return (total += el);
  };

  data.forEach(item => sumTotal(item[0].price * item.qty));
  data.forEach(item => sumQty(item.qty));

  const increment = () => {
    dispatch(actions.changeColor('grey'));
  };

  const decrement = () => {};

  return (
    <>
      <div className="cart_container">
        <h2 className="cart_container_title">CART</h2>
        {data.map(item => (
          <div className="cart_item">
            <div className="cart_info">
              <h4 className="cart_title">{item[0].Title.split(' ', 1)}</h4>
              <p className="cart_title_descr">{item[0].Title.split(' ').splice(1, 3)}</p>
              <p className="cart_price">
                {currentCurrency}
                {item[0].price}
              </p>
              <p className="cart_param">Size:</p>
              <div className="cart_param_size" id={item[0].id}>
                {item[0].size.map(it => (
                  <>
                    {item.chosedSize === it ? (
                      <p className="cart_param_size-item size_active" onClick={choseSize} id={it}>
                        {it}
                      </p>
                    ) : (
                      <p className="cart_param_size-item" onClick={choseSize} id={it}>
                        {it}
                      </p>
                    )}
                  </>
                ))}
              </div>
              <p className="cart_param">Color:</p>
              <div className="cart_param_color" id={item[0].id}>
                {item[0].color.map(it => (
                  <>
                    {item.chosedColor === it ? (
                      <p
                        className="cart_param_color-item color_active"
                        style={{ backgroundColor: it }}
                        onClick={choseColor}
                        id={it}
                      >
                        {' '}
                      </p>
                    ) : (
                      <p
                        className="cart_param_color-item"
                        style={{ backgroundColor: it }}
                        onClick={choseColor}
                        id={it}
                      >
                        {' '}
                      </p>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div className="cart_side">
              <div className="cart_qty_btns">
                <button className="cart_qty_button" onClick={increment}>
                  +
                </button>
                <p className="cart_qty_item">{item.qty}</p>
                <button className="cart_qty_button" onClick={decrement}>
                  -
                </button>
              </div>
              <div className="cart_img_block">
                <div className="cart_img_slider" id={item[0].id}>
                  {item[0].img.map(el => (
                    <img className="cart_img" src={el} alt={item[0].Title} />
                  ))}
                </div>
                <button className="cart_img_switcher previos" onClick={imgPrevios} id={item[0].id}>
                  &lt;
                </button>
                <button className="cart_img_switcher next" onClick={imgNext} id={item[0].id}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="results_container">
        <p className="results_text">
          Tax:<span className="results_price">{currentCurrency}15</span>
        </p>
        <p className="results_text">
          Qty:<span className="results_price">{allQty}</span>
        </p>
        <p className="results_total">
          Total:<span className="results_price">{total}</span>
        </p>
        <button className="results_order_btn">ORDER</button>
      </div>
    </>
  );
};

export default Cart;
