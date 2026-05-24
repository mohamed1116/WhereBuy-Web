import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3000';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(storedUser));
    loadProducts();
  }, [navigate]);

  const loadProducts = async (term = '') => {
    try {
      const res = await axios.get(URL + '/products', { params: { search: term } });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = () => loadProducts(search);
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div>
      <div className="header-bar">
        <h1>WhereBuy - Taroudant</h1>
        <button className="btn-primary" onClick={handleLogout}>Déconnexion</button>
      </div>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={handleSearch}>Chercher</button>
      </div>

      {products.length === 0 && <p style={{ textAlign: 'center', marginTop: 40 }}>Aucun produit trouvé.</p>}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image && <img src={product.image} alt={product.name} className="product-image" />}
            <div className="product-content">
              <div className="product-title">{product.name}</div>
              {product.storeName && (
                <div className="product-detail"><strong>Magasin:</strong> {product.storeName}</div>
              )}
              {product.storeAddress && (
                <div className="product-detail"><strong>Adresse:</strong> {product.storeAddress}</div>
              )}
              {product.info && <div className="product-info">{product.info}</div>}
              <Link to={`/stores/${product.id}`} className="btn-view">Voir les magasins</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}