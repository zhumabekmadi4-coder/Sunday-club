import Link from "next/link";
import Image from "next/image";
import { Book as BookIcon, Calendar, MapPin, ArrowRight, BookOpen, Dices, Library } from "lucide-react";

export default function Home() {
  // Статические данные для демо. В будущем — из Supabase.
  const nextMeeting = {
    date: "10 мая, 2026",
    time: "18:00",
    location: "Секретная локация, Алматы",
    bookTitle: "Таинственный сад",
    bookAuthor: "Фрэнсис Бернетт",
    bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  };

  const upcomingMeetings = [
    { date: "10 мая, 2026", book: "Таинственный сад", author: "Фрэнсис Бернетт" },
    { date: "24 мая, 2026", book: "Скотный двор", author: "Джордж Оруэлл" },
    { date: "7 июня, 2026", book: "Превращение", author: "Франц Кафка" },
  ];

  const faqs = [
    {
      q: "Нужно ли успеть прочитать книгу до встречи?",
      a: "Да, обсуждение строится на впечатлениях о прочтении, и мы свободно обсуждаем сюжетные повороты, поэтому спойлеров не избежать."
    },
    {
      q: "Как проходят встречи?",
      a: "Мы встречаемся в уютной обстановке, используем Reflection Guide с вопросами и обмениваемся мнениями. Никаких лекций, только живое обсуждение."
    },
    {
      q: "Где проходят встречи?",
      a: "Точная локация отправляется на почту после регистрации. Мы выбираем тихие атмосферные места в центре города."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12">
        <div className="text-2xl font-serif font-bold tracking-tighter text-glow">
          SUNDAY CLUB<span className="text-primary italic">.</span>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
          <Link href="/archive" className="hover:text-primary transition-colors">Архив</Link>
          <Link href="/planned" className="hover:text-primary transition-colors">Планы</Link>
          <Link href="/admin" className="opacity-40 hover:opacity-100 transition-opacity">Админ</Link>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        {/* Hero Секция */}
        <section className="px-6 py-20 md:px-12 md:py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">Осн. 2024</span>
              <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[0.9] text-glow">
                Для тех, <br />
                <span className="italic font-normal serif text-secondary">кто влюблен</span> <br />
                в глубину слов.
              </h1>
            </div>

            <p className="text-muted-foreground text-lg max-w-md leading-relaxed font-light">
              Раз в две недели мы собираемся в самом сердце города, чтобы обсудить истории, которые остаются с нами надолго после последней страницы.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                Присоединиться <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/archive"
                className="border border-border/20 backdrop-blur-sm px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
              >
                Посмотреть архив
              </Link>
            </div>
          </div>

          {/* Текущая книга */}
          <div className="relative aspect-square md:aspect-[4/5] bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden animate-in fade-in slide-in-from-right duration-1000 p-8 flex flex-col justify-center border border-white/5 group shadow-2xl">
            <div className="absolute top-0 right-0 p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Сейчас читаем</span>
            </div>

            <div className="flex flex-col gap-8">
              <div className="relative w-48 mx-auto aspect-[2/3] shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2">
                <Image
                  src={nextMeeting.bookCover}
                  alt={nextMeeting.bookTitle}
                  fill
                  className="object-cover rounded shadow-2xl"
                />
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold">{nextMeeting.bookTitle}</h2>
                <div className="text-sm font-medium italic text-muted-foreground uppercase tracking-widest">
                  автор {nextMeeting.bookAuthor}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 italic px-8">
                  &quot;Книга, которая возвращает нас к классике, обнажая тени современного академического мира.&quot;
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-widest mt-4 group-hover:gap-2 transition-all">
                  Читать синопсис <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Сетка информации о встречах */}
        <section className="px-6 py-20 md:px-12 grid md:grid-cols-2 gap-12 max-w-7xl mx-auto border-t border-border/10 mt-20">
          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-10 border border-white/5 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary border border-primary/20">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif font-bold">Ближайшая встреча</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-2">
              <p className="text-primary text-sm uppercase tracking-widest font-bold">{nextMeeting.date} @ {nextMeeting.time}</p>
              <h4 className="text-xl font-serif font-bold">{nextMeeting.bookTitle}</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{nextMeeting.bookAuthor}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground italic mt-4 pt-4 border-t border-white/5">
                <MapPin className="w-3 h-3" /> {nextMeeting.location}
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-10 border border-white/5 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary border border-primary/20">
              <BookIcon className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif font-bold">Планы на сезон</h3>
            <div className="space-y-4 flex-1">
              {upcomingMeetings.map((mtg, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                  <div>
                    <h4 className="font-serif font-bold text-lg">{mtg.book}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{mtg.author}</p>
                  </div>
                  <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {mtg.date.split(',')[0]}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/archive" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-bold mt-2">
              Весь список <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* Инструменты участников */}
        <section className="px-6 py-20 md:px-12 max-w-7xl mx-auto border-t border-border/10 mt-10">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-serif font-bold">Инструменты</h3>
            <p className="text-muted-foreground italic font-light">Эксклюзивные материалы для глубокого погружения в чтение.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/guide" className="group bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-primary/50 transition-all flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold mb-2">Reflection Guide</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Интерактивный дневник для фиксации мыслей и подготовки к обсуждению.</p>
              </div>
            </Link>

            <Link href="/roulette" className="group bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-primary/50 transition-all flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Dices className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold mb-2">Рулетка Вопросов</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Генератор случайных вопросов для случайных поворотов в наших беседах.</p>
              </div>
            </Link>

            <div className="group bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/5 opacity-50 flex flex-col items-center text-center gap-6 relative overflow-hidden cursor-not-allowed">
              <div className="absolute top-4 right-4 bg-primary/20 text-primary text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded">Скоро</div>
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                <Library className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold mb-2">Digital Library</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Закрытая библиотека дополнительных материалов и статей.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-20 md:px-12 max-w-4xl mx-auto border-t border-border/10 mt-10">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-serif font-bold">Частые вопросы</h3>
            <p className="text-muted-foreground italic font-light">Всё, что нужно знать перед тем, как присоединиться к клубу.</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/5">
                <h4 className="text-lg font-serif font-bold mb-3 text-primary-foreground">{faq.q}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 mt-32 py-12 px-6 text-center text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 italic">
        <p>&copy; 2026 Sunday Club. По любви к литературе.</p>
      </footer>
    </div>
  );
}
