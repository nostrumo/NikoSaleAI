
export default function NotificationsList({items}) {
    const notifications = items || [];

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