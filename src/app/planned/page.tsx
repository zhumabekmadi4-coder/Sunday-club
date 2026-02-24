import Link from "next/link";
import { Calendar, ArrowLeft, BookOpen } from "lucide-react";

export default function PlannedPage() {
    const upcomingBooks = [
        { title: "1984", author: "Джордж Оруэлл", date: "март 2026" },
        { title: "Улисс", author: "Джеймс Джойс", date: "апрель 2026" },
        { title: "Братья Карамазовы", author: "Фёдор Достоевский", date: "май 2026" },
        { title: "Война и мир", author: "Лев Толстой", date: "июнь 2026" },
        { title: "Сто лет одиночества", author: "Габриэль Гарсиа Маркес", date: "июль 2026" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="flex items-center justify-between px-6 py-8 md:px-12">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> На главную
                </Link>
            </nav>

            <main className="flex-1 px-6 md:px-12 pb-24 max-w-4xl mx-auto w-full">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Планы на будущее</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl font-light">
                        Книги, которые мы планируем прочитать в ближайшие месяцы. Присоединяйтесь к обсуждениям!
                    </p>
                </header>

                <div className="space-y-8">
                    {upcomingBooks.map((book, i) => (
                        <div key={i} className="border border-border/30 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-2xl font-serif font-bold mb-2">{book.title}</h3>
                                    <p className="text-muted-foreground mb-4">Автор: {book.author}</p>
                                    <div className="flex items-center gap-2 text-sm text-primary">
                                        <Calendar className="w-4 h-4" />
                                        <span>Планируемая дата: {book.date}</span>
                                    </div>
                                </div>
                                <BookOpen className="w-12 h-12 text-primary/20" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10">
                    <h2 className="text-2xl font-serif font-bold mb-4">Хотите предложить книгу?</h2>
                    <p className="text-muted-foreground mb-6">
                        Мы всегда открыты для новых идей! Если у вас есть предложение по следующей книге для клуба,
                        напишите нам в Telegram или оставьте отзыв на странице регистрации.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Присоединиться к клубу
                    </Link>
                </div>
            </main>
        </div>
    );
}