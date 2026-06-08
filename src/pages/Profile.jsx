import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, ChevronLeft } from 'lucide-react';
import Header from '../components/Header';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div className="feed-container" style={{display: 'flex', justifyContent: 'center', paddingTop: '100px'}}>Cargando perfil...</div>;
  }

  return (
    <div className="feed-container">
      <Header />
      
      <div className="feed-content" style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
        <div className="auth-card" style={{ maxWidth: '450px', width: '100%' }}>
          
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px'}}>
            <button type="button" className="btn-ghost" onClick={() => navigate(-1)} style={{padding: '0'}}>
              <ChevronLeft size={24} />
            </button>
            <h1 style={{margin: '0', fontSize: '24px', letterSpacing: '-0.5px'}}>Mi Perfil</h1>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px'}}>
            <div style={{position: 'relative', marginBottom: '16px'}}>
              {user.profile_picture ? (
                <img 
                  src={user.profile_picture} 
                  alt="Perfil" 
                  style={{width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: 'var(--shadow-sm)'}} 
                />
              ) : (
                <div style={{width: '120px', height: '120px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid white', boxShadow: 'var(--shadow-sm)'}}>
                  <User size={60} color="#64748b" />
                </div>
              )}
            </div>
            <h2 style={{fontSize: '22px', fontWeight: '700', color: 'var(--text-main)'}}>{user.name || 'Sin nombre'}</h2>
            <span style={{color: 'var(--text-muted)', fontSize: '15px'}}>@{user.username}</span>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.6)', borderRadius: '12px', border: '1px solid var(--border-subtle)'}}>
              <div style={{background: '#e0e7ff', padding: '10px', borderRadius: '10px', color: 'var(--primary)'}}>
                <Mail size={20} />
              </div>
              <div>
                <span style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Correo electrónico</span>
                <span style={{fontSize: '15px', color: 'var(--text-main)', fontWeight: '500'}}>{user.email}</span>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.6)', borderRadius: '12px', border: '1px solid var(--border-subtle)'}}>
              <div style={{background: '#fce7f3', padding: '10px', borderRadius: '10px', color: '#db2777'}}>
                <Calendar size={20} />
              </div>
              <div>
                <span style={{display: 'block', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Miembro desde</span>
                <span style={{fontSize: '15px', color: 'var(--text-main)', fontWeight: '500'}}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recientemente'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
