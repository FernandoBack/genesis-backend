import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../services/api';

// Importando nossos novos organismos
import Navbar from '../components/organisms/Navbar';
import Hero from '../components/organisms/Hero';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await api.get('/api/config');
        setConfig(response.data);
        
        // Injeta as cores
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

  return (
    <div className="min-h-screen font-sans text-gray-900">
      
      {/* Menu do Topo */}
      <Navbar config={config} />

      {/* Seção Principal */}
      <Hero config={config} />

      {/* Seção de Features (Estática por enquanto) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Alta Performance</h3>
              <p className="text-gray-500">Nossos serviços são otimizados para garantir a melhor experiência para seus clientes.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white py-12 text-center border-t border-gray-800">
        <p className="opacity-60">&copy; 2025 {config?.nomeEmpresa || "Genesis"}. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}