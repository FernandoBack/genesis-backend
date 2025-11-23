import { ArrowRight } from 'lucide-react';

export default function Hero({ config }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Fundo com gradiente dinâmico usando a cor do cliente */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-gray-50 to-gray-50"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
          Novidade 🚀
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
          {config?.slogan || "Transforme sua ideia em realidade digital."}
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          {config?.metaDescricao || "Somos especialistas em entregar as melhores soluções para o seu negócio crescer com tecnologia e design."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2">
            Começar Agora <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
            Saber Mais
          </button>
        </div>

      </div>
    </section>
  );
}