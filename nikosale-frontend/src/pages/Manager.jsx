import React, { useState, useEffect } from 'react';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Plus } from 'lucide-react';
import { ManagerTable } from '../components/table';

const fetchManagers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Иван Петров', email: 'ivan@example.com', role: 'Менеджер' },
        { id: 2, name: 'Ольга Смирнова', email: 'olga@example.com', role: 'Менеджер' },
      ]);
    }, 1000);
  });
};

const Manager = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxManagers = 5;

  useEffect(() => {
    fetchManagers().then((data) => {
      setManagers(data);
      setLoading(false);
    });
  }, []);

  const handleInvite = () => {
    alert('Ссылка приглашения сгенерирована: https://example.com/invite/abc123');
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить этого менеджера?');
    if (confirmed) {
      setManagers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Менеджеры
          <Badge variant="outline">
            {managers.length} из {maxManagers}
          </Badge>
        </h2>
        <Button onClick={handleInvite} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Пригласить менеджера
        </Button>
      </div>

      <ManagerTable managers={managers} loading={loading} onDelete={handleDelete} />
    </div>
  );
};

export default Manager;