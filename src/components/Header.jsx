import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Lock, LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="feed-header">
      <div 
        className="feed-brand" 
        style={{cursor: 'pointer'}} 
        onClick={() => navigate('/feed')}
      >
        <MessageSquare size={28} />
        <h1>Blog</h1>
      </div>
      
      <div className="user-widget">
        <div 
          className="user-profile" 
          onClick={() => navigate('/profile')}
          style={{cursor: 'pointer'}}
          title="Ver mi perfil"
        >
          {user?.profile_picture ? (
            <img src={user.profile_picture} alt="Perfil" />
          ) : (
            <User size={24} color="#64748b" />
          )}
          <span>{user?.name || user?.username || 'Usuario'}</span>
        </div>

        <div className="header-actions">
          <button className="btn-icon btn-change-pw" onClick={() => navigate('/change-password')}>
            <Lock size={16} /> Contraseña
          </button>
          <button className="btn-icon btn-logout" onClick={handleLogout}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
