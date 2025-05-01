import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer', 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          ville: 'Paris', // You may want to add this field
      })
      ,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de l\'inscription');
      }

      localStorage.setItem('userType', data.user.role);
      login(data.token);

      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.user.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/customer-dashboard');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <h1>Créer un compte</h1>
          <p>Rejoignez SkillBridge pour trouver ou offrir des services.</p>

          {error && <div className="error-message">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom complet"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Votre email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Créer un mot de passe"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirmez votre mot de passe"
              />
            </div>

            <div className="form-group">
              <label>Je veux :</label>
              <div className="role-selection">
                <div className="role-option">
                  <input
                    type="radio"
                    id="customer"
                    name="role"
                    value="customer"
                    checked={formData.role === 'customer'}
                    onChange={handleChange}
                  />
                  <label htmlFor="customer">Rechercher des prestataires</label>
                </div>
                <div className="role-option">
                  <input
                    type="radio"
                    id="provider"
                    name="role"
                    value="provider"
                    checked={formData.role === 'provider'}
                    onChange={handleChange}
                  />
                  <label htmlFor="provider">Proposer mes services</label>
                </div>
              </div>
            </div>

            <div className="form-agreement">
              <input type="checkbox" id="agreement" required />
              <label htmlFor="agreement">
                J'accepte les <a href="/terms">Conditions d'utilisation</a> et la <a href="/privacy">Politique de confidentialité</a>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Création du compte...' : 'Créer un compte'}
            </button>
          </form>

          <div className="auth-links">
            <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
          </div>
        </div>

        <div className="auth-image">
          <div className="auth-image-overlay">
            <h2>Rejoignez notre communauté</h2>
            <p>Connectez-vous avec des professionnels qualifiés ou proposez vos services à des milliers de clients.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
