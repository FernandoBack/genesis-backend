import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Loader2 } from 'lucide-react';
import api from '../services/api';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Estado inicial dos dados
  const [config, setConfig] = useState({
    nomeEmpresa: '',
    slogan: '',
    corPrimaria: '#000000',
    emailContato: ''
  });

  // 1. Ao carregar a tela, busca os dados no Java
  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/api/config');
        // Se o Java devolver dados vazios (primeira vez), não quebra
        if (response.data) {
          setConfig(response.data);
        }
      } catch (error) {
        alert("Erro de conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. Salvar no Java
  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/api/config', config);
      alert("Sucesso! Configurações atualizadas.");
    } catch (error) {
      alert("Erro ao salvar. Verifique se seu token expirou.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('genesis_token');
    navigate('/');
  }

  if (loading) return <div className="h-screen flex items-center justify-center">Carregando painel...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra do Topo */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Painel Gênesis</h1>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-2">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-lg font-semibold mb-6 text-gray-700 border-b pb-4">Identidade Visual</h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nome da Empresa</label>
              <Input 
                value={config.nomeEmpresa || ''}
                onChange={e => setConfig({...config, nomeEmpresa: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Slogan / Descrição</label>
              <Input 
                value={config.slogan || ''}
                onChange={e => setConfig({...config, slogan: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Cor do Site</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    className="h-12 w-20 p-1 border rounded cursor-pointer"
                    value={config.corPrimaria || '#000000'}
                    onChange={e => setConfig({...config, corPrimaria: e.target.value})}
                  />
                  <span className="text-gray-500 text-sm">{config.corPrimaria}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">E-mail de Contato</label>
                <Input 
                  value={config.emailContato || ''}
                  onChange={e => setConfig({...config, emailContato: e.target.value})}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2"><Save size={18}/> Salvar Alterações</span>}
              </Button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}