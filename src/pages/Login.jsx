import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/login', form);
      // En este caso, el token trae la info del usuario y auth context puede hacer fetch del perfil
      const token = data.access_token;

      // Llamada extra al /me para obtener perfil completo (foto) y pasarlo al context
      const profileRes = await api.get('/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      login(profileRes.data.user, token);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {/* Onda superior */}
      <svg className="auth-wave-top" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{height: '180px'}}>
        <defs>
          <linearGradient id="waveTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3730a3" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="waveTop2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path d="M0,0 L0,120 Q360,200 720,140 T1440,160 L1440,0 Z" fill="url(#waveTop)" />
        <path d="M0,0 L0,80 Q400,180 800,100 T1440,130 L1440,0 Z" fill="url(#waveTop2)" />
      </svg>

      {/* Onda inferior */}
      <svg className="auth-wave-bottom" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{height: '180px'}}>
        <defs>
          <linearGradient id="waveBot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3730a3" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="waveBot2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d="M0,220 L0,80 Q360,0 720,100 T1440,60 L1440,220 Z" fill="url(#waveBot)" />
        <path d="M0,220 L0,120 Q400,20 800,110 T1440,90 L1440,220 Z" fill="url(#waveBot2)" />
      </svg>

      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="auth-subtitle">Ingresa tus datos para continuar en la comunidad</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Tu alias o apodo"
                autoComplete="username"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="footer-link">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
};

export default Login;