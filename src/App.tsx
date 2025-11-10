import { useMemo, useState } from "react";

type ImgItem = { src: string; label: "ai" | "real" };

const pool: ImgItem[] = [
  { src: "/images/real1.jpg", label: "real" },
  { src: "/images/real2.jpg", label: "real" },
  { src: "/images/ai1.jpg", label: "ai" },
];

export default function App() {
  const [picked, setPicked] = useState<number | null>(null);
  const round = useMemo(() => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!shuffled.some(i => i.label === "ai")) shuffled[0] = { src: "/images/ai1.jpg", label: "ai" };
    return shuffled;
  }, []);

  const correctIndex = useMemo(() => round.findIndex(i => i.label === "ai"), [round]);
  const handlePick = (i: number) => setPicked(i);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Spot the AI</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-5xl">
        {round.map((img, i) => (
          <button
            key={i}
            onClick={() => handlePick(i)}
            className={`rounded-2xl overflow-hidden border p-2 ${picked === i ? "border-emerald-400" : "border-zinc-800"}`}
          >
            <img src={img.src} alt={`candidate-${i + 1}`} className="w-full h-64 object-cover rounded-xl" />
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="text-lg">
          {picked === correctIndex ? "Doğru" : "Yanlış"}  
          {" "}AI olan görsel {correctIndex + 1}. sıradaydı
        </p>
      )}
    </main>
  );
}
