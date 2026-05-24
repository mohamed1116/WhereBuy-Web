import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3000';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Veuillez remplir tous les champs');
    setLoading(true);
    try {
      const route = isLogin ? '/login' : '/register';
      const res = await axios.post(URL + route, { username, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
      <p style={{ marginTop: 20 }}>
        {isLogin ? "Pas de compte ? " : "Déjà un compte ? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="auth-link"
        >
          {isLogin ? "S'inscrire" : "Se connecter"}
        </button>
      </p>
    </div>
  );
}