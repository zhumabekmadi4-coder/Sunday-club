"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle2, Loader2 } from "lucide-react";

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            // Для MVP передаем просто инфо о загрузке, так как хранилища пока нет
            payment_proof: 'Успешно загружен (в разработке)',
            meeting: 'Тайная история (9 марта)',
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Ошибка при отправке');

            setIsSuccess(true);
        } catch (err) {
            setError('Не удалось отправить заявку. Пожалуйста, попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl">
                <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500 bg-card p-12 rounded-3xl border border-white/5 shadow-2xl">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold">Заявка принята</h1>
                    <p className="text-muted-foreground leading-relaxed font-light">
                        Спасибо за регистрацию! Наш админ проверит ваш платеж вручную и скоро пришлет подтверждение на почту.
                        Готовьте книгу и до встречи!
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all uppercase tracking-widest text-xs"
                    >
                        На главную
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <nav className="flex items-center justify-between px-6 py-8 md:px-12">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest text-xs">
                    <ArrowLeft className="w-4 h-4" /> Назад
                </Link>
            </nav>

            <main className="flex-1 px-6 md:px-12 pb-24 max-w-2xl mx-auto w-full">
                <header className="mb-12">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">Регистрация на встречу</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Занять свое место</h1>
                    <p className="text-muted-foreground text-lg italic">
                        Обсуждение книги &quot;Тайная история&quot; — 9 марта, 2026.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8 bg-black/40 backdrop-blur-md p-10 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">ФИО</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                placeholder="Джулиан Морроу"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Email адрес</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                placeholder="julian@example.com"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Подтверждение оплаты (скриншот)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="payment_proof"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    required
                                />
                                <div className="border border-dashed border-white/20 group-hover:border-primary/50 group-hover:bg-primary/5 rounded-xl p-10 text-center transition-all bg-white/5">
                                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
                                    <p className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest">Нажмите для загрузки или перетащите файл</p>
                                    <p className="text-[10px] text-muted-foreground mt-2 opacity-60">PNG, JPG до 5MB</p>
                                </div>
                            </div>
                            <p className="text-[10px] text-muted-foreground italic mt-3 leading-relaxed">
                                * Пожалуйста, переведите взнос на счет клуба и загрузите чек здесь.
                            </p>
                        </div>
                    </div>

                    {error && (
                        <p className="text-destructive text-xs font-medium bg-destructive/10 p-3 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all font-serif text-xl"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Обработка...
                            </>
                        ) : (
                            "Отправить заявку"
                        )}
                    </button>
                </form>
            </main>

            <footer className="py-12 px-6 text-center text-muted-foreground text-[8px] uppercase tracking-[0.4em] font-serif opacity-30">
                Sunday Club Confidential
            </footer>
        </div>
    );
}
