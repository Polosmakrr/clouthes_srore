import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/shopStore-action';

const MyBagItem = ({ myBag }) => {
  const currency = useSelector(state => state.shopStore.currency);
  const [currentCurrency, setCurrentCurrency] = useState();
  let data = [];

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

  const changeColor = (index, chosedColor) => {
    dispatch(actions.updateCart({ index, chosedColor }));
  };

  const changeSize = (index, chosedSize) => {
    dispatch(actions.updateCart({ index, chosedSize }));
  };

  const changeQty = (index, qty) => {
    dispatch(actions.updateCart({ index, qty }));
  };

  if (myBag.length === 1) {
    data = [myBag[0]];
  }
  if (myBag.length > 1) {
    data = [myBag[0], myBag[1]];
  }

  return (
    <>
      {data.map((item, index) => (
        <div className="myBag_item">
          <div className="myBag_info">
            <div>
              <h4 className="myBag_title">{item[0].Title.split(' ', 1)}</h4>
              <p className="myBag_title">{item[0].Title.split(' ').splice(1, 3)}</p>
              <p className="myBag_price">
                {currentCurrency}
                {item[0].price}
              </p>
              <p className="myBag_param">Size:</p>
              <div className="myBag_param_size">
                {item[0].size.map(it => (
                  <>
                    {item.chosedSize === it ? (
                      <p
                        className="myBag_param_size-item size_active"
                        onClick={() => changeSize(index, it)}
                        id={it}
                      >
                        {it}
                      </p>
                    ) : (
                      <p
                        className="myBag_param_size-item"
                        onClick={() => changeSize(index, it)}
                        id={it}
                      >
                        {it}
                      </p>
                    )}
                  </>
                ))}
              </div>
              <p className="myBag_param">Color:</p>
              <div className="myBag_param_color">
                {item[0].color.map(it => (
                  <>
                    {item.chosedColor === it ? (
                      <p
                        className="myBag_param_color-item color_active"
                        style={{ backgroundColor: it }}
                        onClick={() => changeColor(index, it)}
                        id={it}
                      >
                        {' '}
                      </p>
                    ) : (
                      <p
                        className="myBag_param_color-item"
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
            <div className="myBag_qty_btns">
              <button className="myBag_qty_batton" onClick={() => changeQty(index, item.qty + 1)}>
                +
              </button>
              <p className="myBag_qty_item">{item.qty}</p>
              <button
                className="myBag_qty_button"
                onClick={() => changeQty(index, item.qty - 1)}
                disabled={item.qty === 1}
              >
                -
              </button>
            </div>
          </div>
          <img
            className="myBag_img"
            src={item[0].Picture}
            alt={item[0].Title}
            width="121px"
            height="190px"
          />
        </div>
      ))}
    </>
  );
};

export default MyBagItem;
