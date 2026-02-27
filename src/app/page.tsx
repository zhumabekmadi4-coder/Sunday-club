import { Book as BookIcon, Calendar, MapPin, ArrowRight, BookOpen, Dices, Library } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getMeetings } from "@/lib/googleSheets";

// Force server-side rendering on every request (prevents static build from calling Google Sheets API)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const allMeetings = await getMeetings();

  const nextMeeting = allMeetings.find(m => m.status === 'Reading Now') || {
    date: "TBD",
    time: "TBD",
    location: "Секретная локация",
    bookTitle: "Название книги",
    bookAuthor: "Автор",
    bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
  };

  const upcomingMeetings = allMeetings
    .filter(m => m.status === 'Upcoming')
    .map(m => ({ date: m.date, book: m.bookTitle, author: m.bookAuthor }));

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
    <div className="flex flex-col min-h-screen text-foreground selection:bg-primary/30">
      {/* Навигация */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12 backdrop-blur-sm border-b border-border/10 sticky top-0 z-[100]">
        <div className="text-2xl font-serif font-bold tracking-tighter text-glow flex items-center gap-2">
          <span className="bg-primary/20 p-1 rounded text-primary border border-primary/20">SC</span>
          SUNDAY CLUB<span className="text-primary italic">.</span>
        </div>
        <div className="flex gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link href="/archive" className="hover:text-primary transition-colors">Архив</Link>
          <Link href="/planned" className="hover:text-primary transition-colors">Планы</Link>
          <Link href="/admin" className="opacity-40 hover:opacity-100 transition-opacity">Админ</Link>
        </div>
      </nav>

      <main className="flex-1 relative">
        {/* Hero Секция */}
        <section className="px-6 py-24 md:px-12 md:py-40 max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-7 space-y-10 order-2 md:order-1">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-primary/40"></span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Established 2024</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-serif font-bold leading-none text-glow">
                Для тех, <br />
                <span className="italic font-normal text-primary">кто влюблен</span> <br />
                в глубину слов.
              </h1>
            </div>

            <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed font-light font-serif italic">
              Раз в две недели мы собираемся в самом сердце города, чтобы обсудить истории, которые остаются с нами надолго после последней страницы.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link
                href="/register"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-sm font-bold flex items-center justify-center gap-3 transition-all shadow-premium text-xs uppercase tracking-widest border border-primary/20"
              >
                Присоединиться <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/archive"
                className="bg-white/5 backdrop-blur-md px-10 py-5 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-[10px] uppercase tracking-[0.2em] border border-border/10"
              >
                Посмотреть архив
              </Link>
            </div>
          </div>

          {/* Текущая книга - Floating Card */}
          <div className="md:col-span-5 order-1 md:order-2 w-full max-w-md md:max-w-none mx-auto">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-all"></div>
              <div className="relative bg-card/60 backdrop-blur-xl border border-border/20 p-8 rounded-2xl shadow-premium overflow-hidden paper-texture">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60">Reading Now</span>
                  <div className="p-2 rounded-full bg-primary/10 text-primary animate-pulse">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative w-40 mx-auto aspect-[2/3] mb-8 group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-black/40 blur-xl scale-90 translate-y-4 translate-x-4 group-hover:translate-y-6 transition-all"></div>
                  <Image
                    src={nextMeeting.bookCover}
                    alt={nextMeeting.bookTitle}
                    fill
                    className="object-cover rounded-sm shadow-2xl relative z-10 grayscale-[0.2] group-hover:grayscale-0 transition-all "
                  />
                </div>

                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-serif font-bold">{nextMeeting.bookTitle}</h2>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    — {nextMeeting.bookAuthor} —
                  </p>
                  <p className="text-[13px] text-muted-foreground/80 leading-relaxed mt-4 italic max-w-[280px] mx-auto border-t border-border/10 pt-4">
                    &quot;Книга, которая возвращает нас к классике, обнажая тени современного академического мира.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Сетка информации о встречах */}
        <section className="px-6 py-24 md:px-12 bg-white/[0.02] border-y border-border/5">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Ближайшая встреча */}
            <div className="bg-card/40 backdrop-blur-lg border border-border/10 rounded-3xl p-10 paper-texture group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif font-bold">Ближайшая встреча</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-8 rounded-2xl border border-border/10 hover:border-primary/20 transition-all">
                  <div className="flex flex-col gap-1 mb-4">
                    <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">{nextMeeting.date}</span>
                    <span className="text-muted-foreground text-[10px] uppercase font-bold">at {nextMeeting.time}</span>
                  </div>
                  <h4 className="text-2xl font-serif font-bold mb-1">{nextMeeting.bookTitle}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-6">{nextMeeting.bookAuthor}</p>

                  <div className="flex items-center gap-3 text-xs text-primary/60 italic pt-6 border-t border-border/5">
                    <MapPin className="w-4 h-4 opacity-70" /> {nextMeeting.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Планы на сезон */}
            <div className="bg-card/40 backdrop-blur-lg border border-border/10 rounded-3xl p-10 paper-texture flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <BookIcon className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif font-bold">Планы на сезон</h3>
              </div>

              <div className="space-y-4 flex-1">
                {upcomingMeetings.map((mtg, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-border/5 hover:border-primary/20 transition-all group cursor-default">
                    <div>
                      <h4 className="font-serif font-bold text-lg group-hover:text-primary transition-colors">{mtg.book}</h4>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em]">{mtg.author}</p>
                    </div>
                    <div className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/10 px-4 py-2 rounded-full uppercase tracking-widest translate-x-2 group-hover:translate-x-0 transition-transform">
                      {mtg.date.split(',')[0]}
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/archive" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all mt-8">
                Полный архив <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Инструменты участников */}
        <section className="px-6 py-24 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-glow">Инструменты</h3>
            <p className="text-muted-foreground italic font-light font-serif">Материалы для глубокого погружения в чтение.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ToolCard
              href="/guide"
              title="Reflection Guide"
              desc="Интерактивный дневник для фиксации мыслей и подготовки к обсуждению."
              icon={<BookOpen className="w-6 h-6" />}
            />
            <ToolCard
              href="/roulette"
              title="Рулетка Вопросов"
              desc="Генератор вопросов для неожиданных поворотов в наших беседах."
              icon={<Dices className="w-6 h-6" />}
            />
            <ToolCard
              href="#"
              title="Digital Library"
              desc="Закрытая библиотека дополнительных материалов и статей."
              icon={<Library className="w-6 h-6" />}
              isLocked
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-24 md:px-12 max-w-4xl mx-auto border-t border-border/10">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-serif font-bold">Частые вопросы</h3>
            <p className="text-muted-foreground italic font-light font-serif">Всё, что нужно знать перед тем, как присоединиться.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-card/40 backdrop-blur-md rounded-2xl border border-border/10 overflow-hidden paper-texture shadow-sm select-none">
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <h4 className="text-[17px] font-serif font-bold pr-6 group-open:text-primary transition-colors">{faq.q}</h4>
                  <div className="w-6 h-6 rounded-full border border-border/20 flex items-center justify-center group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-3 h-3 rotate-90" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-[15px] text-muted-foreground/90 leading-relaxed font-light">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/10 py-16 px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="text-xl font-serif font-bold tracking-tighter text-glow opacity-80">
            SUNDAY CLUB<span className="text-primary italic">.</span>
          </div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.5em] font-bold opacity-60 italic">
            &copy; 2026 Sunday Club. По любви к литературе.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ToolCard({ href, title, desc, icon, isLocked = false }: { href: string, title: string, desc: string, icon: React.ReactNode, isLocked?: boolean }) {
  const content = (
    <>
      {isLocked && <div className="absolute top-6 right-6 bg-primary/20 text-primary text-[8px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm border border-primary/20 backdrop-blur-md">Скоро</div>}
      <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-primary/10 shadow-glow">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-serif font-bold">{title}</h4>
        <p className="text-[13px] text-muted-foreground leading-relaxed font-light">{desc}</p>
      </div>
      {!isLocked && (
        <div className="opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          Открыть <ArrowRight className="w-3 h-3" />
        </div>
      )}
    </>
  );

  return isLocked ? (
    <div className="relative group bg-card/20 backdrop-blur-md rounded-3xl p-10 border border-border/5 opacity-50 flex flex-col items-center text-center gap-8 cursor-not-allowed paper-texture grayscale">
      {content}
    </div>
  ) : (
    <Link href={href} className="relative group bg-card/60 backdrop-blur-xl rounded-3xl p-10 border border-border/10 hover:border-primary/40 transition-all flex flex-col items-center text-center gap-8 shadow-premium paper-texture hover:-translate-y-1 duration-500">
      {content}
    </Link>
  );
}
