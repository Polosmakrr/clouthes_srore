import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/shopStore-action';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const currency = useSelector(state => state.shopStore.currency);
  const data = useSelector(state => state.shopStore.myBag);
  const [currentCurrency, setCurrentCurrency] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tax = 15;

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

  const changeColor = (index, chosedColor) => {
    dispatch(actions.updateCart({ index, chosedColor }));
  };

  const changeSize = (index, chosedSize) => {
    dispatch(actions.updateCart({ index, chosedSize }));
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

  const changeQty = (index, qty) => {
    dispatch(actions.updateCart({ index, qty }));
  };

  const getOrder = () => {
    dispatch(actions.clearMyBag([]));
  };

  const goToStore = () => {
    navigate('/clouthes_store/woman');
  };

  const onDelete = id => {
    console.log('length', data.length);
    if (data.length === 1) {
      goToStore();
    }
    dispatch(actions.onDelete(id));
  };

  const allQty = data.reduce((prev, item) => {
    return prev + item.qty;
  }, 0);

  const total = data.reduce((prev, item) => {
    return prev + item[0].price * item.qty;
  }, 0);

  return (
    <>
      {data.length === 0 ? (
        <>
          <div className="cart_container container">
            <h2 className="cart_container_title">CART</h2>
            <p className="text_alert">Thanks for the order!</p>
            <button className="go_to_store btn" onClick={goToStore}>
              Go to store
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cart_container container">
            <h2 className="cart_container_title">CART</h2>
            {data.map((item, index) => (
              <div className="cart_item">
                <div className="cart_info">
                  <h4 className="cart_title">{item[0].Title.split(' ', 1)}</h4>
                  <p className="cart_title_descr">{item[0].Title.split(' ').splice(1, 3)}</p>
                  <p className="cart_price">
                    {currentCurrency}
                    {item[0].price}
                  </p>
                  <p className="cart_param">Size:</p>
                  <div className="cart_param_size">
                    {item[0].size.map(it => (
                      <>
                        {item.chosedSize === it ? (
                          <p
                            className="cart_param_size-item size_active"
                            onClick={() => changeSize(index, it)}
                            id={it}
                          >
                            {it}
                          </p>
                        ) : (
                          <p
                            className="cart_param_size-item"
                            onClick={() => changeSize(index, it)}
                            id={it}
                          >
                            {it}
                          </p>
                        )}
                      </>
                    ))}
                  </div>
                  <p className="cart_param">Color:</p>
                  <div className="cart_param_color">
                    {item[0].color.map(it => (
                      <>
                        {item.chosedColor === it ? (
                          <p
                            className="cart_param_color-item color_active"
                            style={{ backgroundColor: it }}
                            onClick={() => changeColor(index, it)}
                            id={it}
                          >
                            {' '}
                          </p>
                        ) : (
                          <p
                            className="cart_param_color-item"
                            style={{ backgroundColor: it }}
                            onClick={() => changeColor(index, it)}
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
                    <button
                      className="cart_qty_button"
                      onClick={() => changeQty(index, item.qty + 1)}
                    >
                      +
                    </button>
                    <p className="cart_qty_item">{item.qty}</p>
                    <button
                      className="cart_qty_button"
                      onClick={() => changeQty(index, item.qty - 1)}
                      disabled={item.qty === 1}
                    >
                      -
                    </button>
                  </div>
                  <div className="cart_img_block">
                    <div className="cart_img_slider" id={item[0].id}>
                      {item[0].img.map(el => (
                        <img className="cart_img" src={el} alt={item[0].Title} />
                      ))}
                    </div>
                    <button
                      className="cart_img_switcher previos"
                      onClick={imgPrevios}
                      id={item[0].id}
                    >
                      &lt;
                    </button>
                    <button className="cart_img_switcher next" onClick={imgNext} id={item[0].id}>
                      &gt;
                    </button>
                  </div>
                </div>
                <button className="cart_delete" onClick={() => onDelete(item[0].id)}>
                  &#128473;
                </button>
              </div>
            ))}
          </div>
          <div className="results_container container">
            <p className="results_text">
              Tax:
              <span className="results_price">
                {currentCurrency}
                {tax}
              </span>
            </p>
            <p className="results_text">
              Qty:<span className="results_price"> {allQty}</span>
            </p>
            <p className="results_total">
              Total:
              <span className="results_price total">
                {' '}
                {total + tax}
                {currentCurrency}
              </span>
            </p>
            <button className="results_order_btn btn" onClick={getOrder}>
              ORDER
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
