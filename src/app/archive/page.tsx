import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Book, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ArchivePage() {
    const pastBooks = [
        { title: "Таинственный сад", author: "Фрэнсис Бернетт", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f", date: "фев 2026", progress: 100 },
        { title: "Скотный двор", author: "Джордж Оруэлл", cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e", date: "янв 2026", progress: 90 },
        { title: "Превращение", author: "Франц Кафка", cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19", date: "янв 2026", progress: 65 },
        { title: "Чайка по имени Джонатан Ливингстон", author: "Ричард Бах", cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d", date: "дек 2025", progress: 100 },
        { title: "О мышах и людях", author: "Джон Стейнбек", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794", date: "ноя 2025", progress: 40 },
        { title: "Посторонний", author: "Альбер Камю", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765", date: "окт 2025", progress: 100 },
        { title: "Исповедь неполноценного человека", author: "Осаму Дадзай", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646", date: "сен 2025", progress: 20 },
        { title: "Сказать жизни 'Да!'", author: "Виктор Франкл", cover: "https://images.unsplash.com/photo-1510172951991-83c92131bf42", date: "авг 2025", progress: 85 },
        { title: "Маленький принц", author: "Антуан де Сент-Экзюпери", cover: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a", date: "июл 2025", progress: 100 },
        { title: "Своя комната", author: "Вирджиния Вулф", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f", date: "июн 2025", progress: 50 },
        { title: "Франкенштейн", author: "Мэри Шелли", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646", date: "май 2025", progress: 10 },
        { title: "О дивный новый мир", author: "Олдос Хаксли", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794", date: "апр 2025", progress: 0 },
        { title: "Дракула", author: "Брэм Стокер", cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19", date: "мар 2025", progress: 0 },
        { title: "Жемчужина", author: "Джон Стейнбек", cover: "https://images.unsplash.com/photo-1506466010722-395aa2bef877", date: "фев 2025", progress: 0 },
        { title: "Пока кофе не остыл", author: "Тосикадзу Кавагути", cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d", date: "янв 2025", progress: 0 },
        { title: "Старик и море", author: "Эрнест Хемингуэй", cover: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a", date: "дек 2024", progress: 0 },
        { title: "Общество мертвых поэтов", author: "Н. Х. Клейнбаум", cover: "https://images.unsplash.com/photo-1510172951991-83c92131bf42", date: "ноя 2024", progress: 0 },
        { title: "Завтрак у Тиффани", author: "Трумен Капоте", cover: "https://images.unsplash.com/photo-1589998059171-988d887df646", date: "окт 2024", progress: 0 },
        { title: "Океан в конце дороги", author: "Нил Гейман", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794", date: "сен 2024", progress: 0 },
        { title: "Коллекционер", author: "Джон Фаулз", cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19", date: "авг 2024", progress: 0 }
    ];

    return (
        <div className="flex flex-col">
            <nav className="flex items-center justify-between px-6 py-8 md:px-12">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> На главную
                </Link>
            </nav>

            <main className="flex-1 px-6 md:px-12 pb-24 max-w-7xl mx-auto w-full">
                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Архив</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl font-light">
                        Коллекция миров, которые мы исследовали вместе. От современной прозы до вечной классики.
                    </p>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    {pastBooks.map((book, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[2/3] relative rounded-xl overflow-hidden border border-border/10 bg-black/40 mb-4 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                                <Image
                                    src={book.cover}
                                    alt={book.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                                    <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2">
                                        <ArrowRight className="w-3 h-3" /> Детали
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-serif font-bold text-lg group-hover:text-primary transition-colors leading-tight line-clamp-1">{book.title}</h3>
                                <p className="text-[10px] text-muted-foreground italic uppercase tracking-wider line-clamp-1">{book.author}</p>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground">Прогресс чтения</span>
                                    <span className="text-[10px] font-bold text-primary">{book.progress}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-1000 ease-out"
                                        style={{ width: `${book.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-1">
                                    <Book className="w-3 h-3 text-primary" /> {book.date}
                                </div>
                                {book.progress === 100 && (
                                    <span className="text-accent flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Готово
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-6 text-center text-muted-foreground text-[10px] uppercase tracking-widest opacity-40 italic">
                <p>&copy; 2026 Sunday Club. По любви к литературе.</p>
            </footer>
        </div>
    );
}
