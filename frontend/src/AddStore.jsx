import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const URL = 'http://localhost:3000'

export default function AddStore() {
  const { productId } = useParams()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) navigate('/auth')
    else setUser(JSON.parse(storedUser))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !address || !phone) return alert('Tous les champs sont requis')
    setLoading(true)
    try {
      await axios.post(URL + '/stores', { productId: parseInt(productId), name, address, phone, userId: user.id })
      alert('Magasin ajouté avec succès')
      navigate(`/stores/${productId}`)
    } catch (err) {
      alert('Erreur lors de l\'ajout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Ajouter un magasin</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom du magasin" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Adresse" value={address} onChange={e => setAddress(e.target.value)} />
        <input type="tel" placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? 'Enregistrement...' : 'Ajouter'}</button>
      </form>
    </div>
  )
}