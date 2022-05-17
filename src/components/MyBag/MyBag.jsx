import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyBagItem from './MyBagItem';

const modalRoot = document.querySelector('#modal-root');

const MyBag = ({ onClick }) => {
  const hendleKeyDownEsc = e => {
    if (e.code === 'Escape') {
      onClick();
      window.removeEventListener('keydown', hendleKeyDownEsc);
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  window.addEventListener('keydown', hendleKeyDownEsc);

  const currency = useSelector(state => state.shopStore.currency);
  const [currentCurrency, setCurrentCurrency] = useState();
  const myBag = useSelector(state => state.shopStore.myBag);
  const navigate = useNavigate();

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

  let total = 0;
  let qty = 0;

  const sumQty = el => {
    return (qty += el);
  };

  const sumTotal = el => {
    return (total += el);
  };

  myBag.forEach(item => sumTotal(item[0].price * item.qty));
  myBag.forEach(item => sumQty(item.qty));

  const vievBag = () => {
    navigate('cart');
    onClick();
  };

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="myBag_container modal">
        <h3 className="myBag">
          My Bag:<span className="myBag_qty">{qty} items</span>
        </h3>
        <MyBagItem myBag={myBag} />
        <p className="myBag_total">
          Total:
          <span className="myBag_total-price">
            {total}
            {currentCurrency}
          </span>
        </p>
        <div className="myBag_buttons">
          <button className="myBag_btn btn" onClick={vievBag}>
            VIEW BAG
          </button>
          <button className="myBag_btn btn">CHECK OUT</button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default MyBag;
