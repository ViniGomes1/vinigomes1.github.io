import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SuperiorBar from "../SuperiorBar";
import BottomBar from "../BottomBar";

export default function GridDesktopContainer({ listaPrimeiros }) {
  const slotRefs = useRef([]);
  const divRef = useRef(null);

  // Inicia com 0 ou 1 para evitar overflow falso na montagem
  const [cols, setCols] = useState(0);
  const ROWS = 5;

  // 1. Atualiza a quantidade de colunas quando a tela redimensionar
  useEffect(() => {
    const updateContainerSize = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const availableWidth = rect.width - 32;
        const calculatedCols = Math.floor(availableWidth / 105);
        setCols(Math.max(1, calculatedCols));
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);

  const pegarPrimeiros = () => {
    const rects = {};
    [0, 1].forEach((idx) => {
      const el = slotRefs.current[idx];
      if (el) {
        rects[idx] = el.getBoundingClientRect();
      }
    });

    if (listaPrimeiros && rects[0]) {
      listaPrimeiros(rects);
    }
  };

  // 2. Mede os slots somente depois que o grid recalcular o layout com as novas colunas
  useLayoutEffect(() => {
    if (cols === 0) return;

    // Aguarda o próximo frame de pintura para garantir que o justify-center assentou
    const frameId = requestAnimationFrame(() => {
      pegarPrimeiros();
    });

    return () => cancelAnimationFrame(frameId);
  }, [cols]);

  const totalSlots = ROWS * cols;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="backdrop-blur-md h-10 bg-slate-800/10 flex items-center justify-items-start text-white">
        <SuperiorBar />
      </div>

      <div
        ref={divRef}
        className="flex-1 p-4 grid justify-center grid-flow-col grid-rows-5 auto-cols-[85px] gap-5 overflow-hidden"
      >
        {Array.from({ length: totalSlots }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              slotRefs.current[index] = el;
            }}
            data-grid-slot={index}
            className="bg-red-200/0 opacity-100 w-[85px] h-[95px]"
          />
        ))}
      </div>

      <div className="z-4 h-[90px] bg-slate-800/0 flex items-center justify-center text-white">
        <BottomBar />
      </div>
    </div>
  );
}
