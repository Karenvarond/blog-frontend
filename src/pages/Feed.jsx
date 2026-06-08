import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, User } from 'lucide-react';
import Header from '../components/Header';

const Feed = () => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchComments = async () => {
    try {
      const { data } = await api.get('/feed');
      setComments(data.data);
    } catch (err) {
      setError('Error al cargar los comentarios');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);

    try {
      await api.post('/feed', { content });
      setContent('');
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el comentario');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="feed-container">
      <Header />

      <div className="feed-content">
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué estás pensando hoy?"
            autoComplete="off"
            maxLength={1000}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <div className="comment-actions">
            <button type="submit" className="btn-publish" disabled={loading || !content.trim()}>
              <Send size={16} /> {loading ? 'Enviando...' : 'Publicar'}
            </button>
          </div>
        </form>

        <div className="comments-list">
          {comments.length === 0 ? (
            <div className="no-comments">
              <MessageSquare size={48} />
              <p>El muro está vacío. ¡Anímate a publicar el primer comentario!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  {comment.user.profile_picture ? (
                    <img src={comment.user.profile_picture} alt="Avatar" className="avatar" />
                  ) : (
                    <div className="avatar" style={{background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <User size={24} color="#64748b"/>
                    </div>
                  )}
                  <div className="comment-meta">
                    <span className="username">@{comment.user.username}</span>
                    <span className="date">
                      {new Date(comment.created_at).toLocaleString('es-ES', { 
                        year: 'numeric', month: 'short', day: 'numeric', 
                        hour: '2-digit', minute:'2-digit' 
                      })}
                    </span>
                  </div>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;