import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WomanItem = ({ data }) => {
  const currency = useSelector(state => state.shopStore.currency);
  const [currentCurrency, setCurrentCurrency] = useState();

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

  return (
    <ul className="main_list">
      {data.map(arr =>
        arr.map(item => (
          <NavLink className="main_list_card" to={`/clouthes_store/info${item.id}`} key={item.id}>
            <li className="main_list_item">
              <img className="main_item_img" src={item.Picture} alt={item.Title} />
              <div className="main_item_description">
                <p>{item.Title}</p>
                <p className="price">
                  {currentCurrency}
                  {item.price}
                </p>
              </div>
            </li>
          </NavLink>
        )),
      )}
    </ul>
  );
};

export default WomanItem;
