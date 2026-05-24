import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const URL = 'http://localhost:3000'

export default function Stores() {
  const { productId } = useParams()
  const [stores, setStores] = useState([])
  const [product, setProduct] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return navigate('/auth')
    setUser(JSON.parse(storedUser))
    loadProductAndStores()
  }, [productId])

  const loadProductAndStores = async () => {
    try {
      const resProducts = await axios.get(URL + '/products')
      const found = resProducts.data.find(p => p.id === parseInt(productId))
      setProduct(found)
      const resStores = await axios.get(URL + '/stores/' + productId)
      setStores(resStores.data)
    } catch (err) {
      console.error(err)
    }
  }

  const rateStore = async (storeId, rating) => {
    try {
      const res = await axios.put(URL + '/stores/' + storeId + '/rate', { rating })
      setStores(prev => prev.map(s => s.id === storeId ? res.data : s))
    } catch (err) {
      alert('Erreur lors de la notation')
    }
  }

  const addFavorite = async (store) => {
    try {
      await axios.post(URL + '/favorites', { userId: user.id, storeId: store.id, storeName: store.name })
      alert('Ajouté aux favoris')
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur')
    }
  }

  if (!product) return <div>Chargement monsieurr attend</div>

  return (
    <div>
      <h2>{product.name}</h2>
      {product.image && <img src={product.image} alt={product.name} style={{ maxWidth: '300px', borderRadius: '8px' }} />}
      <p><strong>Magasin principal:</strong> {product.storeName}</p>
      <p><strong>Adresse:</strong> {product.storeAddress}</p>
      <p>{product.info}</p>
      <hr />
      <h3>Magasins disponibles</h3>
      {stores.length === 0 && <p>Aucun magasin pour ce produit.</p>}
      {stores.map(store => (
        <div key={store.id} className="card">
          <h4>{store.name}</h4>
          <p>Adresse : {store.address}</p>
          <p>Téléphone : {store.phone}</p>
          <p>Note : {store.rating} / 5 ({store.ratings.length} avis)</p>
          <div>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => rateStore(store.id, n)} style={{ fontSize: '20px', marginRight: '5px' }}>
                {n <= Math.round(store.rating) ? '★' : '☆'}
              </button>
            ))}
          </div>
          <button onClick={() => addFavorite(store)}>Ajouter aux favoris</button>
        </div>
      ))}
      <button onClick={() => navigate(`/add-store/${productId}`)} style={{ marginTop: '20px' }}>+ Ajouter un magasin</button>
    </div>
  )
}