import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const URL = 'http://localhost:3000'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return navigate('/auth')
    setUser(JSON.parse(storedUser))
    loadFavorites(JSON.parse(storedUser).id)
  }, [])

  const loadFavorites = async (userId) => {
    try {
      const res = await axios.get(URL + '/favorites/' + userId)
      setFavorites(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(URL + '/favorites/' + id)
      setFavorites(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <h2>Mes favoris</h2>
      {favorites.length === 0 && <p>Aucun favori.</p>}
      {favorites.map(fav => (
        <div key={fav.id} className="card">
          <h3>{fav.storeName}</h3>
          <button onClick={() => deleteFavorite(fav.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  )
}