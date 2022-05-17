import { Route, Routes } from 'react-router-dom';
import { Kids } from '../Kids/Kids';
import { Men } from '../Men/Men';
import Woman from '../Woman/Woman';
import { Navigation } from '../Navigation/Navigation';
import '../../App.css';
import ProductPage from '../ProductPage/ProductPage';
import Cart from '../Cart/Cart';

function App() {
  return (
    <Routes>
      <Route path="clouthes_store" element={<Navigation />}>
        <Route path="woman" element={<Woman />} />
        <Route path="men" element={<Men />} />
        <Route path="kids" element={<Kids />} />
        <Route path="info:id" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>
                Page Not Found
              </p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
