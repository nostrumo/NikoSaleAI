import { Pencil, Trash2 } from 'lucide-react';

export default function IntegrationCard({ integration, onEdit, onDelete }) {
  return (
    <div
      className="group flex items-center justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <img src={integration.logo} alt={integration.name} className="w-10 h-10" />
        <div>
          <div className="font-semibold">{integration.name}</div>
          <div className="text-sm text-gray-500">Ключ: {integration.apiKey}</div>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button onClick={() => onEdit(integration)}>
          <Pencil
            className={`
              w-5 h-5
              text-blue-600
              md:text-gray-400
              md:group-hover:text-blue-600
              transition
            `}
          />
        </button>
        <button onClick={() => onDelete(integration.id)}>
          <Trash2
            className={`
              w-5 h-5
              text-red-500
              md:text-gray-400
              md:group-hover:text-red-500
              transition
            `}
          />
        </button>
      </div>
    </div>
  );
}
