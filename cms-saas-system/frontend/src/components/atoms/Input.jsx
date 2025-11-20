export default function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative mb-4">
      {Icon && (
        <div className="absolute left-3 top-3 text-gray-400">
          <Icon size={20} />
        </div>
      )}
      <input 
        className={`w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary outline-none transition-all ${Icon ? 'pl-10' : ''}`}
        {...props}
      />
    </div>
  );
}