import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react'; // Ícones
import api from '../services/api';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Chama o Java no /auth/login
      const response = await api.post('/auth/login', { login: email, senha });
      
      // Salva o Token no navegador
      localStorage.setItem('genesis_token', response.data.token);
      
      // Manda para o painel (vamos criar no próximo passo)
      navigate('/dashboard');
      
    } catch (error) {
      alert("Erro: Verifique e-mail e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Gênesis</h1>
          <p className="text-gray-500 mt-2">Entre para gerenciar seu sistema</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            icon={Mail} 
            type="email" 
            placeholder="E-mail de acesso" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          
          <Input 
            icon={Lock} 
            type="password" 
            placeholder="Sua senha" 
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />

          <Button type="submit" loading={loading}>
            Entrar no Sistema
          </Button>
        </form>

      </div>
    </div>
  );
}