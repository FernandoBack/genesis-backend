import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function Login() {
  const navigate = useNavigate();
  // Mantemos o nome da variável visual como 'email' para facilitar
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 👇 O SEGREDO ESTÁ AQUI 👇
      // O Java espera "login", então enviamos { login: email }
      const response = await api.post('/auth/login', { 
        login: email, 
        password: password 
      });

      // Se chegou aqui, o login funcionou!
      const token = response.data.token;
      
      // 1. Salva o token no navegador
      localStorage.setItem('genesis_token', token);
      
      // 2. Avisa o Axios para usar esse token em todas as próximas requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 3. Redireciona para o painel
      navigate('/dashboard');

    } catch (error) {
      console.error("Erro no login:", error);
      alert('Login falhou! Verifique se digitou o e-mail e senha corretos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Acesso ao Painel</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <Input 
              type="email" 
              placeholder="admin@genesis.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <Input 
              type="password" 
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
}