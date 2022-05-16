import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MyBagItem = ({ myBag }) => {
  const currency = useSelector(state => state.shopStore.currency);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState();

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

  //     const choseColor = (e) => {
  //     if (document.querySelector('.color_active') !== null) {
  //         document.querySelector('.color_active').classList.remove('color_active');
  //     }
  //         setColor(e.target.id);
  //     e.target.className = 'myBag_param_color-item color_active';
  // }

  // const choseSize = (e) => {
  //     if (document.querySelector('.size_active') !== null) {
  //         document.querySelector('.size_active').classList.remove('size_active')
  //     }
  //     setSize(e.target.id);
  //     e.target.className='myBag_param_size-item size_active'
  // }

  const choseColor = e => {
    const elem = e.target.parentElement.children;

    for (let i = 0; i < elem.length; i += 1) {
      if (elem[i].className === 'myBag_param_color-item color_active') {
        elem[i].className = 'myBag_param_color-item';
      }
      if (elem[i].id === e.target.id) {
        elem[i].className = 'myBag_param_color-item color_active';
        setColor(e.target.id);
      }
    }
  };

  const choseSize = e => {
    const elem = e.target.parentElement.children;

    for (let i = 0; i < elem.length; i += 1) {
      if (elem[i].className === 'myBag_param_size-item size_active') {
        elem[i].className = 'myBag_param_size-item';
      }
      if (elem[i].id === e.target.id) {
        elem[i].className = 'myBag_param_size-item size_active';
        setColor(e.target.id);
      }
    }
  };

  let data = [];

  if (myBag.length === 1) {
    data = [myBag[0]];
  }
  if (myBag.length > 1) {
    data = [myBag[0], myBag[1]];
  }

  return (
    <>
      {data.map(item => (
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
                      <p className="myBag_param_size-item size_active" onClick={choseSize} id={it}>
                        {it}
                      </p>
                    ) : (
                      <p className="myBag_param_size-item" onClick={choseSize} id={it}>
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
                        onClick={choseColor}
                        id={it}
                      >
                        {' '}
                      </p>
                    ) : (
                      <p
                        className="myBag_param_color-item"
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
            <div className="myBag_qty_btns">
              <button className="myBag_qty_batton">+</button>
              <p className="myBag_qty_item">{item.qty}</p>
              <button className="myBag_qty_button">-</button>
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
