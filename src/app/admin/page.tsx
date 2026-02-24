"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users, BookOpen, BarChart3, Settings,
    CheckCircle2, XCircle, ExternalLink,
    Search, Filter, Plus, Clock, LayoutTemplate, Edit3, Trash2, Save, Loader2
} from "lucide-react";

import { useEffect } from "react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("registrations");
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const updateRegistrationStatus = async (id: string, status: string) => {
      try {
        const response = await fetch(`/api/admin/registrations/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) throw new Error('Failed to update registration');

        // Обновляем состояние локально
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

        // Удаляем из состояния
        setRegistrations(prev => prev.filter(reg => reg.id !== id));
      } catch (error) {
        console.error('Error deleting registration:', error);
      }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [regRes, bookRes] = await Promise.all([
                    fetch('/api/admin/registrations'),
                    fetch('/api/admin/books')
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
    }, []);

    return (
        <div className="flex h-screen bg-[#f8f9fa] dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card flex flex-col p-6 gap-8">
                <Link href="/" className="text-xl font-serif font-bold tracking-tight px-2">
                    Sunday Club<span className="text-primary">.</span>
                </Link>

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
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto p-4 rounded-2xl bg-muted/50 border border-border">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Доступ</p>
                    <p className="text-xs font-medium">Администратор Клуба</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-serif font-bold capitalize">
                            {activeTab === 'registrations' && 'Управление Заявками'}
                            {activeTab === 'books' && 'Книги и Встречи'}
                            {activeTab === 'content' && 'Управление Контентом'}
                            {activeTab === 'polls' && 'Опросы Участников'}
                            {activeTab === 'settings' && 'Настройки Системы'}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">Здесь вы можете управлять всеми аспектами работы клуба.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                className="bg-card border border-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                </header>

                {activeTab === "registrations" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-card border border-border rounded-full text-xs font-bold flex items-center gap-2 hover:bg-muted transition-colors">
                                    <Filter className="w-3 h-3" /> Все
                                </button>
                                <button className="px-4 py-2 bg-card border border-border rounded-full text-xs font-bold flex items-center gap-2 hover:bg-muted transition-colors">
                                    <Clock className="w-3 h-3 text-secondary" /> В ожидании
                                </button>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/50 border-b border-border">
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Участник</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Встреча</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Оплата (Чек)</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Статус</th>
                                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Действия</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                                    <p className="text-sm font-medium text-muted-foreground">Загрузка данных из Google Sheets...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground italic">
                                                Заявок пока нет.
                                            </td>
                                        </tr>
                                    ) : registrations.map((reg) => (
                                        <tr key={reg.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold">{reg.name}</div>
                                                <div className="text-xs text-muted-foreground">{reg.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium">{reg.meeting}</div>
                                                <div className="text-[10px] text-muted-foreground uppercase">{reg.date}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-secondary font-bold truncate max-w-[150px]" title={reg.paymentProof}>
                                                    {reg.paymentProof}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${reg.status === 'подтвержден'
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-secondary/10 text-secondary"
                                                    }`}>
                                                    {reg.status === 'подтвержден' ? 'Подтвержден' : 'Ожидает'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                      onClick={() => updateRegistrationStatus(reg.id, 'подтвержден')}
                                                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                      title="Подтвердить"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                      onClick={() => updateRegistrationStatus(reg.id, 'отклонен')}
                                                      className="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                                                      title="Отклонить"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                      onClick={() => deleteRegistration(reg.id)}
                                                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
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
                    <div className="space-y-8">
                        <div className="flex justify-end">
                            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
                                <Plus className="w-4 h-4" /> Добавить Книгу/Встречу
                            </button>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {books.map((book, i) => (
                                <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${book.status === 'Reading' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {book.status === 'Reading' ? 'Читаем сейчас' : (book.status === 'Read' ? 'Прочитано' : 'В планах')}
                                        </div>
                                        <Settings className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold leading-tight">{book.title}</h3>
                                    <p className="text-sm text-muted-foreground italic">автор: {book.author}</p>
                                    <div className="pt-4 border-t border-border mt-4 flex justify-between items-center text-xs font-medium text-muted-foreground">
                                        <span>Ред.: 20 фев. 2026</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "content" && (
                    <div className="space-y-12">
                        {/* Section 1: Hero Settings */}
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm space-y-6">
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <div>
                                    <h3 className="text-lg font-serif font-bold text-foreground">Главный Экран (Hero)</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Текст, который пользователи видят первым делом.</p>
                                </div>
                                <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                                    <Save className="w-3 h-3" /> Сохранить
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Главный заголовок</label>
                                    <input type="text" defaultValue="Для тех, кто влюблен в глубину слов." className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Подзаголовок</label>
                                    <textarea defaultValue="Раз в две недели мы собираемся в самом сердце города, чтобы обсудить истории, которые остаются с нами надолго после последней страницы." className="w-full h-24 resize-none bg-background border border-border rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: FAQ Settings */}
                        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm space-y-6">
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <div>
                                    <h3 className="text-lg font-serif font-bold text-foreground">Частые вопросы (FAQ)</h3>
                                    <p className="text-xs text-muted-foreground mt-1">Список вопросов и ответов на главной.</p>
                                </div>
                                <button className="text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
                                    <Plus className="w-3 h-3" /> Добавить вопрос
                                </button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { q: "Нужно ли успеть прочитать книгу до встречи?", a: "Да, обсуждение строится на впечатлениях о прочтении, и мы свободно обсуждаем сюжетные повороты, поэтому спойлеров не избежать." }
                                ].map((faq, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-background items-start">
                                        <div className="flex-1 space-y-3">
                                            <input type="text" defaultValue={faq.q} className="w-full bg-transparent border-b border-white/5 pb-2 text-sm font-bold focus:border-primary outline-none text-foreground" />
                                            <textarea defaultValue={faq.a} className="w-full bg-transparent h-16 resize-none text-xs text-muted-foreground focus:outline-none" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><Edit3 className="w-4 h-4" /></button>
                                            <button className="p-2 text-muted-foreground hover:text-secondary transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

                {(activeTab === "polls" || activeTab === "settings") && (
                    <div className="flex flex-col items-center justify-center py-20 bg-card border border-border border-dashed rounded-3xl opacity-60">
                        <Clock className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-serif">Раздел в разработке...</p>
                        <p className="text-sm text-muted-foreground">Функционал появится в ближайшем обновлении системы.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
