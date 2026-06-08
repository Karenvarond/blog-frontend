import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Lock, Eye, EyeOff, UploadCloud, CheckCircle2, UserCircle } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Za-z]/.test(pass) && /[0-9]/.test(pass)) score++; // Letras y números = media
    if (/[A-Z]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++; // Mayúscula y especial = segura
    return score;
  };

  const strengthScore = calculateStrength(form.password);
  const strengthClass = form.password.length === 0 ? '' : strengthScore <= 1 ? 'strength-weak' : strengthScore === 2 ? 'strength-medium' : 'strength-strong';
  const strengthLabel = form.password.length === 0 ? '' : strengthScore <= 1 ? 'Débil' : strengthScore === 2 ? 'Media' : 'Segura';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('username', form.username);
      formData.append('password', form.password);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      await api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {/* Onda superior */}
      <svg className="auth-wave-top" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{height: '180px'}}>
        <defs>
          <linearGradient id="rwTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3730a3" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="rwTop2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path d="M0,0 L0,120 Q360,200 720,140 T1440,160 L1440,0 Z" fill="url(#rwTop)" />
        <path d="M0,0 L0,80 Q400,180 800,100 T1440,130 L1440,0 Z" fill="url(#rwTop2)" />
      </svg>

      {/* Onda inferior */}
      <svg className="auth-wave-bottom" viewBox="0 0 1440 220" preserveAspectRatio="none" style={{height: '180px'}}>
        <defs>
          <linearGradient id="rwBot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3730a3" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="rwBot2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path d="M0,220 L0,80 Q360,0 720,100 T1440,60 L1440,220 Z" fill="url(#rwBot)" />
        <path d="M0,220 L0,120 Q400,20 800,110 T1440,90 L1440,220 Z" fill="url(#rwBot2)" />
      </svg>

      <div className="auth-card" style={{ maxWidth: '480px' }}>
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">Regístrate para unirte a la comunidad</p>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <div className="input-container">
              <UserCircle className="input-icon" size={18} />
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <div className="input-container">
              <User className="input-icon" size={18} />
              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Tu alias o apodo"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-container">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Foto de Perfil</label>
            <div className={`upload-area ${previewUrl ? 'has-file' : ''}`} onClick={triggerFileInput}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <div className="upload-content">
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" />
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Imagen seleccionada
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={32} />
                    <span>Haz clic para subir tu foto</span>
                  </>
                )}
              </div>
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
                placeholder="Mínimo 8 caracteres, números y letras"
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
            {form.password.length > 0 && (
              <div className="password-strength">
                <div className={`strength-bar ${strengthClass}`}></div>
              </div>
            )}
            <span className="strength-text" style={{ color: strengthScore === 3 ? '#10b981' : '#64748b' }}>{strengthLabel}</span>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>
        <p className="footer-link">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;