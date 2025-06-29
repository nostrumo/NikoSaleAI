import React, {useState, useEffect, useRef} from 'react';
import {ChevronLeft} from 'lucide-react';
import {Send} from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import PlaceholderImage from '../assets/placeholder/select-user-from-list-placeholder.svg';

export function useChatSocket(selectedUser, onMessageReceived) {
    const wsRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;

        const ws = new WebSocket(`ws://localhost:8000/ws/${selectedUser.id}`);
        wsRef.current = ws;

        ws.onopen = () => console.log('🔌 WebSocket открыт для', selectedUser.name);
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessageReceived(data);
        };
        ws.onclose = () => console.log('🔌 WebSocket закрыт');

        return () => {
            ws.close();
        };
    }, [selectedUser]);

    const sendMessage = (toId, message) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.warn('🚫 WebSocket не открыт');
            return;
        }

        wsRef.current.send(JSON.stringify({to: toId, message}));
    };

    return {sendMessage};
}


const messages = [
    {
        id: 1,
        sender: 'user',
        text: 'Здравствуйте!',
        date: '2025-06-27 14:03',
    },
    {
        id: 2,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 3,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 4,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    },
    {
        id: 5,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 6,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 7,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    }, {
        id: 8,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 9,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 10,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    }, {
        id: 11,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 12,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 13,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    },
    {
        id: 14,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 15,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 16,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    }, {
        id: 17,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 18,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 19,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    }, {
        id: 20,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 21,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 22,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    }, {
        id: 23,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 24,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 25,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:06',
    }, {
        id: 26,
        sender: 'manager',
        text: 'Добрый день! Чем могу помочь?',
        date: '2025-06-27 14:04',
    },
    {
        id: 27,
        sender: 'bot',
        text: 'Автоматическая справка: наш график работы — с 9:00 до 21:00.',
        date: '2025-06-27 14:05',
    },
    {
        id: 28,
        sender: 'user',
        text: 'Мне нужна помощь с заказом.',
        date: '2025-06-27 14:68',
    },
];

const formatDateHeader = (isoString) => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return new Date(isoString).toLocaleDateString('ru-RU', options);
};


const getMessageStyle = (sender) => {
    const base = 'p-3 rounded shadow text-sm';
    if (sender === 'manager')
        return `${base} bg-blue-100 text-right ml-auto rounded-br-none`;
    if (sender === 'bot')
        return `${base} bg-gray-100 text-right ml-auto rounded-br-none`;
    if (sender === 'user')
        return `${base} bg-green-100 text-left mr-auto rounded-bl-none`;
    return base;
};


const users = [
    {id: 1, name: 'Иван Иванов'},
    {id: 2, name: 'Мария Смирнова'},
    {id: 3, name: 'Мария Смирнова'},
    {id: 4, name: 'Мария Смирнова'},
    {id: 5, name: 'Мария Смирнова'},
    {id: 6, name: 'Мария Смирнова'},
    {id: 7, name: 'Мария Смирнова'},
    {id: 8, name: 'Мария Смирнова'},
    {id: 9, name: 'Мария Смирнова'},
    {id: 10, name: 'Мария Смирнова'},
    {id: 11, name: 'Мария Смирнова'},
    {id: 12, name: 'Мария Смирнова'},
    {id: 13, name: 'Мария Смирнова'},
    {id: 14, name: 'Мария Смирнова'},
    {id: 15, name: 'Мария Смирнова'},
    {id: 16, name: 'Мария Смирнова'},
    {id: 17, name: 'Мария Смирнова'},
    {id: 18, name: 'Мария Смирнова'},
    {id: 19, name: 'Мария Смирнова'},
    {id: 20, name: 'Мария Смирнова'},
    {id: 21, name: 'Алексей Кузнецов'},
];

const getColorFromChar = (char) => {
    const colors = [
        'bg-red-500', 'bg-green-500', 'bg-blue-500',
        'bg-yellow-500', 'bg-indigo-500', 'bg-purple-500',
        'bg-pink-500', 'bg-orange-500', 'bg-emerald-500'
    ];
    const index = char.toUpperCase().charCodeAt(0) % colors.length;
    return colors[index];
};

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [unreadByUser, setUnreadByUser] = useState({});
    const [isMobile, setIsMobile] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const wsRef = useRef(null);
    const {sendMessage} = useChatSocket(selectedUser, (data) => {
        console.log('📨 Получено сообщение:', data);

        if (selectedUser && data.from === selectedUser.id) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    sender: 'manager', // или определить по логике
                    text: data.message,
                    date: new Date().toISOString(),
                },
            ]);
        } else {
            setUnreadByUser((prev) => ({
                ...prev,
                [data.from]: (prev[data.from] || 0) + 1,
            }));
            setHasNewMessage(true);
        }
    });

    useEffect(() => {
        if (isNearBottom()) {
            scrollToBottom('smooth');
        } else {
            setHasNewMessage(true);
        }
    }, [messages]);

    const handleSend = () => {
        if (message.trim() === '') return;

        // Если WebSocket подключён — отправляем
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && selectedUser) {
            wsRef.current.send(JSON.stringify({
                to: selectedUser.id,   // ID получателя
                message: message.trim() // Текст сообщения
            }));
        } else {
            console.warn('WebSocket не подключён или пользователь не выбран');
        }

        setMessage(''); // очистка поля
    };


    useEffect(() => {
        const updateSize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    useEffect(() => {
        if (isNearBottom()) {
            scrollToBottom('smooth');
        }
    }, [messages]);
    useEffect(() => {
        if (selectedUser) {
            setUnreadByUser(prev => {
                const copy = {...prev};
                delete copy[selectedUser.id];
                return copy;
            });
        }
    }, [selectedUser]);


    useEffect(() => {
        if (selectedUser) {
            setLoadingMessages(true);

            // Эмуляция загрузки (например, как будто fetch)
            const timeout = setTimeout(() => {
                setLoadingMessages(false);
            }, 500); // 0.5 сек (или замени на await fetch и .finally)

            return () => clearTimeout(timeout); // очистка на случай быстрого переключения
        }
    }, [selectedUser]);

    // На мобильных: если не выбран пользователь — показываем список
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const [isAutoScrollLocked, setIsAutoScrollLocked] = useState(false);
    const [inputHeight, setInputHeight] = useState(0);
    const scrollContainerRef = useRef(null);
    useEffect(() => {
        const checkHeight = () => {
            if (inputRef.current) {
                const newHeight = inputRef.current.offsetHeight;
                setInputHeight((prevHeight) => {
                    if (newHeight !== prevHeight) {
                        console.log('[checkHeight] Height changed:', prevHeight, '→', newHeight);

                        if (isNearBottom()) {
                            console.log('[checkHeight] Near bottom, triggering scroll');
                            scrollToBottom('smooth');
                        } else {
                            console.log('[checkHeight] Not near bottom, no scroll');
                        }

                        return newHeight;
                    }
                    return prevHeight;
                });
            }
        };

        const interval = setInterval(checkHeight, 200);
        console.log('[checkHeight] Interval started');
        return () => {
            clearInterval(interval);
            console.log('[checkHeight] Interval cleared');
        };
    }, []);


    useEffect(() => {
        if (selectedUser) {
            setTimeout(() => {
                requestAnimationFrame(() => scrollToBottom('auto'));
            }, 0);
        }
    }, [selectedUser]);

    const scrollToBottom = (behavior = 'auto') => {
        if (!bottomRef.current || isAutoScrollLocked) return;
        bottomRef.current.scrollIntoView({behavior});
    };


    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;
            const el = scrollContainerRef.current;
            const threshold = 120;
            const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

            setIsAutoScrollLocked(!isAtBottom);
            if (isAtBottom) {
                setHasNewMessage(false);
            }
        };

        const el = scrollContainerRef.current;
        if (el) el.addEventListener('scroll', handleScroll);

        return () => {
            if (el) el.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const isNearBottom = () => {
        const el = scrollContainerRef.current;
        if (!el) return false;
        const threshold = 100;
        return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    };
    if (isMobile) {
        return (
            <div className="relative bg-white overflow-y-auto" style={{height: 'calc(100vh - 57px)'}}>
                {/* Экран: список пользователей */}
                <div
                    className={`absolute top-0 left-0 w-full transition-transform duration-300 ${
                        selectedUser ? '-translate-x-full' : 'translate-x-0'
                    }`}
                >
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Выберите пользователя</h2>
                        <ul className="space-y-2">
                            {users.map((user) => {
                                const initial = user.name[0];
                                const color = getColorFromChar(initial);
                                return (
                                    <li
                                        key={user.id}
                                        onClick={() => setSelectedUser(user)}
                                        className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition"
                                    >
                                        <div
                                            className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold ${color}`}
                                        >
                                            {initial}
                                        </div>
                                        <span className="text-sm font-medium flex items-center gap-2">
    {user.name}
                                            {unreadByUser[user.id] && (
                                                <span
                                                    className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadByUser[user.id]}
        </span>
                                            )}
</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Экран: окно чата */}
                {selectedUser && (
                    <div className="flex flex-col bg-white h-full max-h-full relative"
                         style={{height: 'calc(100vh - 57px)'}}>
                        {/* Заголовок */}
                        <div className="flex items-center border-b px-4 py-3 bg-white">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="mr-2 p-1 text-blue-500 hover:bg-blue-50 rounded-full"
                            >
                                <ChevronLeft className="w-6 h-6"/>
                            </button>
                            <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                        </div>

                        {/* Контейнер сообщений */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto p-6 pb-0 space-y-4 bg-gray-50"
                            style={{paddingBottom: `${16}px`}}
                        >
                            {hasNewMessage && (
                                <div
                                    className="absolute top-[calc(57px+10px)] left-1/2 transform -translate-x-1/2 z-20">
                                    <button
                                        onClick={() => {
                                            scrollToBottom('smooth');
                                            setHasNewMessage(false);
                                        }}
                                        className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-full shadow-lg hover:bg-blue-600 transition"
                                    >
                                        Новые сообщения
                                    </button>
                                </div>
                            )}
                            {(() => {
                                let lastDate = null;
                                return messages.map((msg, idx) => {
                                    const msgDate = new Date(msg.date).toDateString();
                                    const isNewDate = msgDate !== lastDate;
                                    lastDate = msgDate;

                                    return (
                                        <React.Fragment key={msg.id + idx}>
                                            {isNewDate && (
                                                <div
                                                    className="text-center text-xs text-gray-500 my-4 uppercase tracking-wide">
                                                    {formatDateHeader(msg.date)}
                                                </div>
                                            )}
                                            <div className="flex">
                                                <div className={`max-w-[80%] ${getMessageStyle(msg.sender)}`}>
                                                    <div className="text-base">{msg.text}</div>
                                                    <div className="text-xs text-gray-400 text-right">
                                                        {msg.date.slice(11, 16)}
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                });
                            })()}
                            <div ref={bottomRef}/>
                        </div>

                        {/* Поле ввода — больше не fixed */}
                        <div
                            ref={inputRef}
                            className="px-4 py-2 bg-white border-t"
                        >
                            <div className="flex items-center gap-2">
                                <TextareaAutosize
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    maxRows={3}
                                    minRows={1}
                                    placeholder="Написать сообщение..."
                                    className="w-full resize-none border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSend}
                                    className="group p-3 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition-all duration-200 active:scale-95"
                                    title="Отправить"
                                >
                                    <Send className="w-5 h-5 text-white"/>
                                </button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        );
    }

    // Планшеты и десктоп — двухпанельный режим
    return (
        <div className="flex bg-white " style={{height: 'calc(100vh - 4rem - 3rem)'}}>
            {/* Сайдбар */}
            <aside className="w-64 border-r border-gray-200 p-4 h-full overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Пользователи</h2>
                <ul className="space-y-2">
                    {users.map((user) => {
                        const initial = user.name[0];
                        const color = getColorFromChar(initial);
                        return (
                            <li
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={`flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition ${
                                    selectedUser && user.id === selectedUser.id ? 'bg-gray-100' : ''
                                }`}
                            >
                                <div
                                    className={`w-9 h-9 flex items-center justify-center rounded-full text-white font-semibold ${color}`}
                                >
                                    {initial}
                                </div>
                                <span className="text-sm font-medium">{user.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </aside>
            {/* Чат */}

            {selectedUser ? (
                <main className="relative flex flex-col flex-1 h-full overflow-hidden">
                    <div className="border-b px-6 py-4 text-lg font-semibold bg-white">
                        {selectedUser.name}
                    </div>

                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4"
                            style={{paddingBottom: `${16}px`}}
                        >
                            {hasNewMessage && (
                                <div className="absolute top-[57px+10px] left-1/2 transform -translate-x-1/2 z-20">
                                    <button
                                        onClick={() => {
                                            scrollToBottom('smooth');
                                            setHasNewMessage(false);
                                        }}
                                        className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-full shadow-lg hover:bg-blue-600 transition"
                                    >
                                        Новые сообщения
                                    </button>
                                </div>
                            )}

                            {messages.map((msg) => (
                                <div key={msg.id} className="flex">
                                    <div className={`max-w-[80%] ${getMessageStyle(msg.sender)}`}>
                                        <div className="text-base">{msg.text}</div>
                                        <div className="text-xs text-gray-400 text-right">{msg.date.slice(11, 16)}</div>
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef}/>
                        </div>

                        <div
                            ref={inputRef}
                            className="border-t px-4 py-3 bg-white"
                        >
                            <div className="flex items-end gap-2">
                                <TextareaAutosize
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    maxRows={3}
                                    minRows={1}
                                    placeholder="Написать сообщение..."
                                    className="w-full resize-none border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSend}
                                    className="group p-3 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md transition-all duration-200 active:scale-95"
                                    title="Отправить"
                                >
                                    <Send className="w-5 h-5 text-white"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>


            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                    <img
                        src={PlaceholderImage} // <-- замените на путь к своей картинке
                        alt="Выберите пользователя"
                        className="w-64 h-auto opacity-80 mb-4"
                    />
                    <p className="text-gray-500 text-lg">Выберите пользователя, чтобы начать общение</p>
                </div>
            )
            }
        </div>
    );
}
