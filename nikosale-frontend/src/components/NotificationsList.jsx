import {MessageCircle, Share2, Star, UserCheck} from 'lucide-react';

export default function NotificationsList() {
    const notifications = [
        {
            icon: <MessageCircle className="w-5 h-5 text-blue-500"/>,
            text: 'Новое сообщение от клиента',
        },
        {
            icon: <Share2 className="w-5 h-5 text-green-500"/>,
            text: 'Сообщение передано менеджеру',
        },
        {
            icon: <Star className="w-5 h-5 text-yellow-500"/>,
            text: 'Ура! Новый отзыв от покупателя',
        },
        {
            icon: <UserCheck className="w-5 h-5 text-purple-500"/>,
            text: 'Менеджер принял приглашение',
        },
    ];

    return (
        <div className="w-72 max-h-96 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 px-2">Уведомления</h3>
            <ul className="divide-y divide-gray-100">
                {notifications.map((n, idx) => (
                    <li key={idx} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition">
                        <div className="mt-0.5">{n.icon}</div>
                        <p className="text-sm text-gray-700">{n.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}