import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as actions from '../../redux/shopStore-action';
import emptyCart from '../../picture/svg/emptyCart.svg';
import logo from '../../picture/svg/logo.svg';
import MyBag from '../MyBag/MyBag';

export const Navigation = () => {
  const myBag = useSelector(state => state.shopStore.myBag);
  const currentCurrency = useSelector(state => state.shopStore.currency);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let qty = 0;

  const changingCurrency = e => {
    dispatch(actions.changeCurrency(e.currentTarget.value));
  };

  if (toggle === false) {
    document.body.style.overflow = 'visible';
  } else {
    document.body.style.overflow = 'hidden';
  }

  const onClick = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const options = document.querySelector('.currency_list').options;
    for (let i = 0; i < options.length; i += 1) {
      if (options[i].value === currentCurrency[0]) {
        options[i].selected = true;
      }
    }

    if (location.pathname === '/clouthes_store') {
      navigate('/clouthes_store/woman');
    }
    if (myBag.length === 0) {
      document.querySelector('.qty').style.display = 'none';
    }
    if (myBag.length !== 0) {
      document.querySelector('.qty').style.display = 'flex';
    }

    dispatch(actions.switchShowModal(toggle));
  }, [dispatch, location.pathname, myBag.length, navigate, toggle]);

  const sumQty = el => {
    return (qty += el);
  };
  myBag.forEach(item => sumQty(item.qty));

  return (
    <>
      <nav>
        <div className="nav_container container">
          <div className="nav_link">
            <NavLink className="nav_link_item" to="woman">
              Woman
            </NavLink>

            <NavLink className="nav_link_item" to="men">
              Men
            </NavLink>

            <NavLink className="nav_link_item" to="kids">
              Kids
            </NavLink>
          </div>
          <img className="logo" src={logo} alt="logo"></img>
          <div className="nav_elements">
            <select className="currency_list" onChange={changingCurrency}>
              <option className="currency_item" value="USD">
                &#36; USD{' '}
              </option>
              <option className="currency_item" value="EUR">
                &euro; EUR
              </option>
              <option className="currency_item" value="JPY">
                &yen; JPY
              </option>
            </select>
            <button className="nav_btn" onClick={onClick} disabled={myBag.length === 0}>
              <img className="emptyCart" src={emptyCart} alt="cart"></img>
              <p className="qty">{qty}</p>
            </button>
          </div>
        </div>
        {toggle && <MyBag onClick={onClick} />}
      </nav>

      <Outlet />
    </>
  );
};
