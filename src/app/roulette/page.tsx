"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Dices } from "lucide-react";

const QUESTIONS = [
    "Какой поступок главного героя вызвал у вас наибольшее отторжение?",
    "Если бы вы могли изменить финал, каким бы он был?",
    "Кто из второстепенных персонажей заслуживает своей отдельной книги?",
    "Какая цитата или мысль из книги запомнилась больше всего?",
    "С кем из героев вы бы хотели выпить кофе и о чем бы поговорили?",
    "Как название книги отражает ее истинный смысл?",
    "Был ли в сюжете момент, когда вы хотели бросить читать?",
    "Оправдывает ли цель средства в контексте этой истории?",
    "Если описывать книгу одним цветом, какой это цвет и почему?",
    "Кому бы вы точно НЕ посоветовали читать этот роман?"
];

export default function RoulettePage() {
    const [currentQuestion, setCurrentQuestion] = useState<string>("Нажмите на кубики, чтобы получить вопрос");
    const [isSpinning, setIsSpinning] = useState(false);

    const spinRoulette = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Эффект "рулетки" - быстрая смена вопросов перед остановкой
        let iterations = 0;
        const interval = setInterval(() => {
            setCurrentQuestion(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
            iterations++;

            if (iterations > 15) {
                clearInterval(interval);
                setIsSpinning(false);
                // Финальный вопрос
                setCurrentQuestion(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
            }
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
            <header className="absolute top-0 w-full p-6 z-20 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                    <ArrowLeft className="w-4 h-4" /> Назад
                </Link>
                <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-50">
                    Sunday Club Roulette
                </div>
            </header>

            <main className="relative z-10 p-6 flex flex-col items-center w-full max-w-2xl text-center">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-glow mb-4">Рулетка Вопросов</h1>
                    <p className="text-muted-foreground italic font-light">Доверьте ход дискуссии случаю.</p>
                </div>

                <div className="w-full relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 min-h-[300px] flex items-center justify-center relative shadow-2xl transition-all">
                        <p className={`text-2xl md:text-4xl font-serif leading-relaxed transition-opacity duration-200 ${isSpinning ? 'opacity-50 blur-[1px]' : 'opacity-100'}`}>
                            {currentQuestion}
                        </p>
                    </div>
                </div>

                <button
                    onClick={spinRoulette}
                    disabled={isSpinning}
                    className="mt-12 group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white uppercase tracking-widest text-sm bg-primary/80 backdrop-blur-md border border-primary/50 overflow-hidden rounded-full hover:bg-primary transition-all disabled:opacity-50"
                >
                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                    <span className="relative flex items-center gap-3">
                        <Dices className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                        Случайный вопрос
                    </span>
                </button>
            </main>
        </div>
    );
}
