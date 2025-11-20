import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Instagram, Mail, Phone } from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await api.get('/api/config');
        setConfig(response.data);
        
        // A MÁGICA: Injeta as cores do banco de dados no CSS do navegador
        if(response.data) {
          document.documentElement.style.setProperty('--primary-color', response.data.corPrimaria);
          document.documentElement.style.setProperty('--secondary-color', response.data.corSecundaria || '#1e293b');
        }
      } catch (error) {
        console.error("Erro ao carregar site", error);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600"/></div>;

  // Se não tiver configuração ainda, mostra tela padrão
  if (!config) return <div className="text-center mt-20">Site em manutenção ou não configurado.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* 1. Navbar (Cabeçalho) */}
      <nav className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Se tiver Logo usa a imagem, se não usa o Texto */}
          {config.logoUrl ? (
            <img src={config.logoUrl} alt="Logo" className="h-12 object-contain" />
          ) : (
            <h1 className="text-2xl font-bold text-primary">{config.nomeEmpresa}</h1>
          )}
          
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-primary font-medium">
              Área do Cliente
            </button>
            <button onClick={() => navigate('/login')} className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 font-bold">
              Fazer Pedido
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section (A parte principal com a cor do cliente) */}
      <header className="bg-primary text-white py-20 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            {config.slogan || "Bem-vindo ao nosso site!"}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {config.metaDescricao || "A melhor qualidade e serviço você encontra aqui. Confira nossos produtos e entre em contato."}
          </p>
        </div>
      </header>

      {/* 3. Seção de Contato */}
      <section className="bg-gray-50 py-16 flex-grow">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Fale Conosco</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {config.emailContato && (
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <Mail className="mx-auto text-primary mb-4" size={32}/>
                <p className="text-gray-600">{config.emailContato}</p>
              </div>
            )}
            
            {config.telefoneWhatsApp && (
               <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <Phone className="mx-auto text-primary mb-4" size={32}/>
                <p className="text-gray-600">{config.telefoneWhatsApp}</p>
              </div>
            )}

            {config.linkInstagram && (
               <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <Instagram className="mx-auto text-primary mb-4" size={32}/>
                <p className="text-gray-600">@instagram</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 {config.nomeEmpresa}. Todos os direitos reservados.</p>
        <p className="text-gray-500 text-sm mt-2">Powered by Genesis Engine</p>
      </footer>

    </div>
  );
}