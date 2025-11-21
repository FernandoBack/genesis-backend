import { useState } from 'react';
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

export default function ImageUpload({ label, value, onUploadSuccess }) {
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Preparar o formulário de dados (FormData é nativo do JS)
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      // Envia para o nosso Backend Java
      const response = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // O Java devolve: { "url": "http://..." }
      const newImageUrl = response.data.url;
      
      // Avisa o componente pai (Dashboard) que a imagem mudou
      onUploadSuccess(newImageUrl);
      
    } catch (error) {
      alert("Erro ao enviar imagem. Tente uma menor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      
      <div className="flex items-center gap-4">
        {/* Preview da Imagem */}
        <div className="h-20 w-20 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden relative">
          {loading ? (
            <Loader2 className="animate-spin text-primary" />
          ) : value ? (
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="text-gray-400" />
          )}
        </div>

        {/* Botão de Upload (Input escondido + Label estilizado) */}
        <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 shadow-sm">
          <Upload size={16} />
          <span className="text-sm font-medium">Escolher Arquivo</span>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
}