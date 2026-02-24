"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, Download, Save } from "lucide-react";

export default function ReflectionGuidePage() {
    const [rating, setRating] = useState(0);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col relative">
            <header className="absolute top-0 w-full p-6 z-20 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                    <ArrowLeft className="w-4 h-4" /> Назад
                </Link>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-50">
                    Sunday Club Guide
                </div>
            </header>

            <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-24 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-glow">Reflection Guide</h1>
                    <p className="text-muted-foreground italic font-light max-w-xl mx-auto">
                        Заполните этот гайд во время или после прочтения книги, чтобы структурировать свои мысли перед встречей клуба.
                    </p>
                </div>

                <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl space-y-12">

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6 pb-12 border-b border-white/5">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Название книги</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20" placeholder="Например: Тайная история" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Автор</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20" placeholder="Донна Тартт" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Жанр</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20" placeholder="Академический триллер" />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">Даты чтения (Начало - Конец)</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20" placeholder="01.10.2025 - 15.10.2025" />
                            </div>
                        </div>
                    </div>

                    {/* Deep Questions */}
                    <div className="space-y-8">
                        <div>
                            <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                Какая самая спорная или дискуссионная тема поднимается в книге?
                            </label>
                            <textarea className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Ваши мысли..."></textarea>
                        </div>

                        <div>
                            <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                Какой один вопрос мы обязательно должны обсудить? (Сделайте его открытым!)
                            </label>
                            <textarea className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Ваш вопрос для клуба..."></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                    Какие чувства вызвала у вас эта книга?
                                </label>
                                <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Эмоции, переживания..."></textarea>
                            </div>
                            <div>
                                <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                    Напоминает ли эта книга другую книгу, историческое событие и т.д.?
                                </label>
                                <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Параллели и отсылки..."></textarea>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                Что вам понравилось в книге больше всего? И почему?
                            </label>
                            <textarea className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Ваши любимые моменты..."></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                    Каков главный посыл? (например, месть, любовь, классовое неравенство)
                                </label>
                                <textarea className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Идейное ядро..."></textarea>
                            </div>
                            <div>
                                <label className="text-xs font-serif font-bold text-primary-foreground block mb-3">
                                    Какой персонаж запомнится вам больше всего и почему?
                                </label>
                                <textarea className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-white/20" placeholder="Любимый или самый противоречивый герой..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Rating & Actions */}
                    <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-8">
                        <div className="text-center space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Общая оценка</label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`p-2 transition-all ${rating >= star ? 'text-accent scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'text-muted/50 hover:text-accent/50'}`}
                                    >
                                        <Star className="w-8 h-8 fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 w-full">
                            <button className="flex-1 max-w-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" /> Сохранить черновик
                            </button>
                            <button className="flex-1 max-w-xs bg-primary hover:bg-primary/90 text-primary-foreground border border-primary px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> Скачать в PDF
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
