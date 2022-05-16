import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreData } from '../../redux/shopStore-operation';
import WomanItem from './WomanItem';

const Woman = () => {
  const data = useSelector(state => state.shopStore.storeData);
  const dispatch = useDispatch();

  const onFetch = () => {
    dispatch(fetchStoreData());
  };

  useEffect(() => {
    onFetch();
  }, []);

  return (
    <div className="main_container">
      <h2 className="main_title">Woman</h2>
      <WomanItem data={data} />
    </div>
  );
};

export default Woman;
