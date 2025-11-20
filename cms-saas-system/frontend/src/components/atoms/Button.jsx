export default function Button({ children, loading, ...props }) {
  return (
    <button 
      className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all flex justify-center items-center disabled:opacity-50"
      disabled={loading}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}