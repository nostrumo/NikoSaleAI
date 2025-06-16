import React from 'react';
import { Trash2, User } from 'lucide-react';

const getColorByChar = (char) => {
  const colors = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500',
    'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-blue-500',
    'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500'
  ];
  const index = (char.charCodeAt(0) - 65) % colors.length;
  return colors[index];
};

const Avatar = ({ name }) => {
  const initial = name?.[0]?.toUpperCase() || '?';
  const bg = getColorByChar(initial);
  return (
    <div className={`flex items-center justify-center rounded-full w-8 h-8 text-white text-xs font-medium ${bg}`}>
      <User className="w-4 h-4" />
    </div>
  );
};

export const ManagerTable = ({ managers, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="p-6 text-muted-foreground text-sm">
        Загрузка списка менеджеров...
      </div>
    );
  }

  if (managers.length === 0) {
    return (
      <div className="p-6 text-muted-foreground text-sm">
        Пока нет менеджеров
      </div>
    );
  }

  return (
    <div className="rounded-2xl border overflow-x-auto bg-card shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/60 text-muted-foreground text-left">
          <tr>
            <th className="px-4 py-3 font-medium">Имя</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Роль</th>
            <th className="px-4 py-3 font-medium text-center">Действия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {managers.map((manager) => (
            <tr key={manager.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                <Avatar name={manager.name} />
                {manager.name}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{manager.email}</td>
              <td className="px-4 py-3 text-muted-foreground">{manager.role}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onDelete(manager.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Удалить менеджера"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
