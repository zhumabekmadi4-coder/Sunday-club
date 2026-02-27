"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Users, BookOpen, BarChart3, Settings,
    CheckCircle2, XCircle, Search, Filter, Plus, Clock,
    LayoutTemplate, Edit3, Trash2, Save, Loader2, Sparkles, Lock, ShieldCheck, LogOut, Star
} from "lucide-react";

const BigDipper = () => {
    // Stars of Ursa Major (Big Dipper)
    // Coordinates based on a 500x300 viewbox
    const stars = [
        { id: 'alkaid', x: 450, y: 150, name: 'Alkaid' },
        { id: 'mizar', x: 400, y: 140, name: 'Mizar' },
        { id: 'alioth', x: 340, y: 135, name: 'Alioth' },
        { id: 'megrez', x: 280, y: 145, name: 'Megrez' },
        { id: 'phad', x: 270, y: 220, name: 'Phad' },
        { id: 'merak', x: 190, y: 230, name: 'Merak' },
        { id: 'dubhe', x: 180, y: 140, name: 'Dubhe' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <svg viewBox="0 0 500 300" className="w-full h-full preserve-3d">
                {/* Connecting Lines */}
                <path
                    d="M 450 150 L 400 140 L 340 135 L 280 145 L 270 220 L 190 230 L 180 140 L 280 145"
                    fill="none"
                    stroke="rgba(251, 191, 36, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="animate-[dash_20s_linear_infinite]"
                />

                {/* Stars */}
                {stars.map((star) => (
                    <g key={star.id} className="animate-pulse" style={{ animationDelay: `${Math.random() * 3}s` }}>
                        {/* Star Glow */}
                        <circle cx={star.x} cy={star.y} r="4" className="fill-amber-400/20 blur-[2px]" />
                        {/* Main Star Body */}
                        <circle cx={star.x} cy={star.y} r="1.5" className="fill-amber-400" />
                        {/* Optional Star Diamond effect */}
                        <path
                            d={`M ${star.x} ${star.y - 4} L ${star.x + 1} ${star.y} L ${star.x} ${star.y + 4} L ${star.x - 1} ${star.y} Z`}
                            className="fill-amber-200/40"
                        />
                        <path
                            d={`M ${star.x - 4} ${star.y} L ${star.x} ${star.y - 1} L ${star.x + 4} ${star.y} L ${star.x} ${star.y + 1} Z`}
                            className="fill-amber-200/40"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default function AdminDashboard() {
    // --- Authentication ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // --- State ---
    const [activeTab, setActiveTab] = useState("registrations");
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- Auth Logic ---
    useEffect(() => {
        const checkAuth = () => {
            const authStatus = localStorage.getItem("sunday_admin_auth");
            if (authStatus === "true") {
                setIsAuthenticated(true);
            }
            setIsCheckingAuth(false);
        };
        checkAuth();
        setIsMounted(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "danatheteacher") {
            setIsAuthenticated(true);
            localStorage.setItem("sunday_admin_auth", "true");
            setAuthError("");
        } else {
            setAuthError("Неверный ключ доступа к созвездию");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("sunday_admin_auth");
    };

    // --- Data Fetching ---
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [regRes, bookRes] = await Promise.all([
                    fetch('/api/admin/registrations'),
                    fetch('/api/meetings')
                ]);

                if (regRes.ok) {
                    const regData = await regRes.json();
                    setRegistrations(regData);
                }

                if (bookRes.ok) {
                    const bookData = await bookRes.json();
                    setBooks(bookData);
                }
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    // --- Actions ---
    const updateRegistrationStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/registrations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) throw new Error('Failed to update registration');

            setRegistrations(prev => prev.map(reg =>
                reg.id === id ? { ...reg, status } : reg
            ));
        } catch (error) {
            console.error('Error updating registration:', error);
        }
    };

    const deleteRegistration = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/registrations/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete registration');

            setRegistrations(prev => prev.filter(reg => reg.id !== id));
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center p-4 overflow-hidden relative">
                {/* Background Stardust */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <BigDipper />
                    {isMounted && [...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 2 + 1}px`,
                                height: `${Math.random() * 2 + 1}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                opacity: Math.random() * 0.5 + 0.2
                            }}
                        />
                    ))}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-900/20 blur-[120px] rounded-full" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl space-y-8">
                        <div className="text-center space-y-2">
                            <div className="inline-flex p-4 bg-amber-400/10 rounded-2xl mb-4">
                                <ShieldCheck className="w-8 h-8 text-amber-400" />
                            </div>
                            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Вход в Созвездие</h1>
                            <p className="text-zinc-400 text-sm">Введите ключ доступа к Большой Медведице</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Пароль</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400/50 transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {authError && <p className="text-red-400 text-xs mt-2 ml-4">{authError}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-400 hover:bg-amber-300 text-[#0a0b1e] font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-400/10 active:scale-[0.98]"
                            >
                                Войти в админ-панель
                            </button>
                        </form>
                    </div>

                    <Link href="/" className="flex items-center justify-center gap-2 mt-8 text-zinc-500 hover:text-white transition-colors text-sm">
                        <span>Вернуться на сайт</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0a0b1e] text-zinc-100 overflow-hidden">
            {/* Sidebar with "Ursa Major" theme */}
            <aside className="w-72 border-r border-white/5 bg-[#0a0b1e] flex flex-col p-8 gap-10 relative">
                {/* Subtle Sidebar Constellation Effect */}
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-amber-400/10 to-transparent" />

                <div className="flex items-center gap-3 px-2">
                    <div className="p-2 bg-amber-400 rounded-lg">
                        <Star className="w-5 h-5 text-[#0a0b1e] fill-current" />
                    </div>
                    <div>
                        <Link href="/" className="text-xl font-serif font-bold tracking-tight">
                            Sunday Club<span className="text-amber-400">.</span>
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/50 -mt-1">Admin Space</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    {[
                        { id: "registrations", icon: Users, label: "Заявки" },
                        { id: "books", icon: BookOpen, label: "Книги и Встречи" },
                        { id: "content", icon: LayoutTemplate, label: "Контент (Сайт)" },
                        { id: "polls", icon: BarChart3, label: "Опросы" },
                        { id: "settings", icon: Settings, label: "Настройки" }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-medium transition-all group ${activeTab === item.id
                                ? "bg-amber-400 text-[#0a0b1e] shadow-lg shadow-amber-400/10"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${activeTab === item.id ? "text-current" : "text-zinc-500"}`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto space-y-4">
                    <div className="p-5 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-20 transition-opacity group-hover:opacity-40">
                            <Sparkles className="w-6 h-6 text-amber-400" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Доступ</p>
                        <p className="text-xs font-medium text-white">Администратор Клуба</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-xs font-bold text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Выйти
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-10 lg:p-16 relative">
                <BigDipper />
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] rounded-full -mr-64 -mt-64" />

                <header className="flex items-center justify-between mb-16 relative z-10">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-white tracking-tight">
                            {activeTab === 'registrations' && 'Управление Заявками'}
                            {activeTab === 'books' && 'Книги и Встречи'}
                            {activeTab === 'content' && 'Управление Контентом'}
                            {activeTab === 'polls' && 'Опросы Участников'}
                            {activeTab === 'settings' && 'Настройки Системы'}
                        </h1>
                        <p className="text-zinc-500 text-sm mt-2 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                            Здесь вы управляете энергией Клуба.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Поиск среди звезд..."
                                className="bg-white/5 border border-white/10 text-white rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400/50 w-72 transition-all"
                            />
                        </div>
                    </div>
                </header>

                <div className="relative z-10">
                    {activeTab === "registrations" && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <button className="px-5 py-2.5 bg-amber-400 text-[#0a0b1e] rounded-full text-xs font-bold flex items-center gap-2 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/5">
                                        <Filter className="w-3 h-3" /> Все
                                    </button>
                                    <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-colors text-zinc-400">
                                        <Clock className="w-3 h-3" /> В ожидании
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/10">
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Участник</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Встреча</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Оплата (Чек)</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Статус</th>
                                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-24 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
                                                        <p className="text-sm font-medium text-zinc-500 italic">Считываем данные из созвездий...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : registrations.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-24 text-center text-zinc-600 italic">
                                                    Небо чисто. Заявок пока нет.
                                                </td>
                                            </tr>
                                        ) : registrations.map((reg) => (
                                            <tr key={reg.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-white group-hover:text-amber-400 transition-colors">{reg.name}</div>
                                                    <div className="text-xs text-zinc-500">{reg.email}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-sm font-medium text-zinc-300">{reg.meeting}</div>
                                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{reg.date}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-xs text-amber-400 font-bold truncate max-w-[150px] opacity-70 group-hover:opacity-100 transition-opacity" title={reg.paymentProof}>
                                                        {reg.paymentProof}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reg.status === 'подтвержден'
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-amber-400/10 text-amber-400"
                                                        }`}>
                                                        {reg.status === 'подтвержден' ? 'Подтвержден' : 'Ожидает'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => updateRegistrationStatus(reg.id, 'подтвержден')}
                                                            className="p-2.5 text-emerald-400 hover:bg-emerald-400/10 rounded-xl transition-all"
                                                            title="Подтвердить"
                                                        >
                                                            <CheckCircle2 className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateRegistrationStatus(reg.id, 'отклонен')}
                                                            className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                                            title="Отклонить"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteRegistration(reg.id)}
                                                            className="p-2.5 text-zinc-600 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                                            title="Удалить"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "books" && (
                        <div className="space-y-12">
                            <div className="flex justify-end">
                                <button className="bg-amber-400 text-[#0a0b1e] px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/5 active:scale-95">
                                    <Star className="w-4 h-4 fill-current" /> Новое проишествие
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {books.map((book, i) => (
                                    <div key={i} className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] shadow-xl hover:border-amber-400/30 transition-all hover:-translate-y-1">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${book.status === 'Reading' ? 'bg-amber-400 text-[#0a0b1e]' : 'bg-white/10 text-zinc-400'
                                                }`}>
                                                {book.status === 'Reading' ? 'Сияет сейчас' : (book.status === 'Read' ? 'Пройдено' : 'На горизонте')}
                                            </div>
                                            <button className="text-zinc-600 hover:text-white transition-colors">
                                                <Settings className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white leading-tight mb-2 group-hover:text-amber-400 transition-colors truncate">{book.title}</h3>
                                        <p className="text-zinc-500 italic text-sm">автор: {book.author}</p>

                                        <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                                            <span className="flex items-center gap-2"> <Clock className="w-3 h-3" /> Обновлено недавно</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "content" && (
                        <div className="space-y-12 max-w-4xl">
                            {/* Section 1: Hero Settings */}
                            <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <LayoutTemplate className="w-32 h-32" />
                                </div>

                                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-white tracking-tight">Главный Экран</h3>
                                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">Hero Section Content</p>
                                    </div>
                                    <button className="bg-white/10 hover:bg-amber-400 hover:text-[#0a0b1e] text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all cursor-pointer">
                                        <Save className="w-4 h-4" /> Сохранить
                                    </button>
                                </div>

                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/60 block ml-1">Главный заголовок</label>
                                        <input type="text" defaultValue="Для тех, кто влюблен в глубину слов." className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/60 block ml-1">Подзаголовок</label>
                                        <textarea defaultValue="Раз в две недели мы собираемся в самом сердце города, чтобы обсудить истории, которые остаются с нами надолго после последней страницы." className="w-full h-32 resize-none bg-black/20 border border-white/5 rounded-2xl p-4 text-white placeholder:text-zinc-700 focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            {/* Additional content sections could go here */}
                        </div>
                    )}

                    {(activeTab === "polls" || activeTab === "settings") && (
                        <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-white/5 border-dashed rounded-[3rem] text-center">
                            <div className="w-20 h-20 bg-amber-400/5 rounded-full flex items-center justify-center mb-8 animate-pulse">
                                <Clock className="w-10 h-10 text-amber-400/40" />
                            </div>
                            <p className="text-3xl font-serif font-bold text-white mb-4 italic">Вне зоны видимости телескопа</p>
                            <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">Система калибруется. Функционал будет доступен при следующем сближении созвездий.</p>

                            <div className="mt-12 flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-amber-400/20" />
                                <div className="w-2 h-2 rounded-full bg-amber-400/40" />
                                <div className="w-2 h-2 rounded-full bg-amber-400/20" />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
