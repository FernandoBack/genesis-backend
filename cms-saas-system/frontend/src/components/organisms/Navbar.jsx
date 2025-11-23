import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

export default function Navbar({ config }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo ou Nome da Empresa */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          {config?.logoUrl ? (
            <img src={config.logoUrl} alt="Logo" className="h-10 object-contain" />
          ) : (
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              {config?.nomeEmpresa || "Carregando..."}
            </h1>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')} 
            className="text-gray-600 hover:text-primary font-medium transition-colors"
          >
            Área do Cliente
          </button>
          <div className="w-32">
            <Button onClick={() => navigate('/login')}>
              Entrar
            </Button>
          </div>
        </div>

      </div>
    </nav>
  );
}