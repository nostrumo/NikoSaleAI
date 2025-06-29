import React, { useState } from 'react';
import { Label } from '../components/label';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';
import { Button } from '../components/button';

const PromtSetup = () => {
  const [config, setConfig] = useState({
    role: '',
    tone: 'нейтральный',
    goals: '',
    restrictions: '',
    example: '',
  });

  const handleChange = (field) => (e) =>
    setConfig((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    // здесь можно отправить на сервер или в localStorage
    alert('Настройки сохранены!');
    console.log('Saved config:', config);
  };

  return (
    <div className="max-w-2xl py-4 px-6">
      <h1 className="text-2xl font-semibold">Настройка ИИ-ассистента</h1>

      <div className="space-y-2">
        <Label htmlFor="role">Роль ассистента</Label>
        <Input
          id="role"
          value={config.role}
          onChange={handleChange('role')}
          placeholder="Например: эксперт по маркетингу, техническая поддержка..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone">Тон общения</Label>
        <select
          id="tone"
          className="w-full border rounded-md px-3 py-2 text-sm"
          value={config.tone}
          onChange={handleChange('tone')}
        >
          <option value="нейтральный">Нейтральный</option>
          <option value="дружелюбный">Дружелюбный</option>
          <option value="формальный">Формальный</option>
          <option value="ироничный">Ироничный</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">Цели и задачи</Label>
        <Textarea
          id="goals"
          rows={3}
          value={config.goals}
          onChange={handleChange('goals')}
          placeholder="Например: помогать пользователю разобраться в товаре, давать советы, поддерживать диалог..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="restrictions">Ограничения</Label>
        <Textarea
          id="restrictions"
          rows={3}
          value={config.restrictions}
          onChange={handleChange('restrictions')}
          placeholder="Например: не обсуждать политику, не выдавать юридические рекомендации, не создавать код для продакшена..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="example">Пример диалога</Label>
        <Textarea
          id="example"
          rows={4}
          value={config.example}
          onChange={handleChange('example')}
          placeholder={`Пользователь: Как выбрать платформу для сайта?\nИИ: Всё зависит от ваших целей. Вот популярные варианты...`}
        />
      </div>

      <Button onClick={handleSave} className="mt-4">
        Сохранить настройки
      </Button>
    </div>
  );
};

export default PromtSetup;
