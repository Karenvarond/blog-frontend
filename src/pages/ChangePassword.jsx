import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Key, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';

const ChangePassword = () => {
  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Za-z]/.test(pass) && /[0-9]/.test(pass)) score++; // Letras y números = media
    if (/[A-Z]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++; // Mayúscula y especial = segura
    return score;
  };
  const strengthScore = calculateStrength(form.new_password);
  const strengthClass = form.new_password.length === 0 ? '' : strengthScore <= 1 ? 'strength-weak' : strengthScore === 2 ? 'strength-medium' : 'strength-strong';
  const strengthLabel = form.new_password.length === 0 ? '' : strengthScore <= 1 ? 'Débil' : strengthScore === 2 ? 'Media' : 'Segura';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.new_password !== form.new_password_confirmation) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (form.new_password.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      await api.put('/change-password', {
        current_password: form.current_password,
        new_password: form.new_password,
        new_password_confirmation: form.new_password_confirmation
      });

      setSuccess('Contraseña cambiada exitosamente. Por seguridad, inicia sesión de nuevo.');
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feed-container">
      <Header />
      
      <div className="feed-content" style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
        <div className="auth-card" style={{ maxWidth: '450px', width: '100%' }}>
          <h1>Cambiar Contraseña</h1>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current_password">Contraseña actual</label>
            <div className="input-container">
              <Key className="input-icon" size={18} />
              <input
                id="current_password"
                type={showCurrent ? "text" : "password"}
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                placeholder="Tu contraseña actual"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowCurrent(!showCurrent)}>
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="new_password">Nueva contraseña</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="new_password"
                type={showNew ? "text" : "password"}
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowNew(!showNew)}>
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.new_password.length > 0 && (
              <div className="password-strength">
                <div className={`strength-bar ${strengthClass}`}></div>
              </div>
            )}
            <span className="strength-text" style={{color: strengthScore === 3 ? '#10b981' : '#64748b'}}>{strengthLabel}</span>
          </div>

          <div className="form-group">
            <label htmlFor="new_password_confirmation">Confirmar nueva contraseña</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="new_password_confirmation"
                type={showConfirm ? "text" : "password"}
                name="new_password_confirmation"
                value={form.new_password_confirmation}
                onChange={handleChange}
                placeholder="Repite la nueva contraseña"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Guardando...' : 'Cambiar contraseña'}
          </button>
        </form>
        
        <button type="button" className="btn-ghost" onClick={() => navigate('/feed')} style={{marginTop: '20px', width: '100%', justifyContent: 'center'}}>
          <ChevronLeft size={18} /> Volver al feed
        </button>
      </div>
      </div>
    </div>
  );
};

export default ChangePassword;