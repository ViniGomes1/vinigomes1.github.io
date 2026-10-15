import { useEffect, useRef, useState } from "react";

export default function WindowContainer({ window, content }) {
  const [isMounted, setIsMounted] = useState(false);

  // Posição relativa ao ponto central inicial (0, 0)
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);

    // Guarda o ponto inicial do clique descontando o que já foi movido antes
    startPos.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  useEffect(() => {
    // Ativa o efeito logo após o componente ser renderizado na tela
    setIsMounted(true);
  }, []);

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const newX = e.clientX - startPos.current.x;
    const newY = e.clientY - startPos.current.y;
    console.log(newX)
    setOffset({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      className={`z-10 rounded-lg overflow-hidden absolute w-[500px] h-[350px] top-0 bottom-0 left-0 right-0 m-auto backdrop-blur bg-black/50 text-white
       transition-transform duration-700 ease-out ${isMounted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="bg-white pl-[4px] select-none touch-none h-[30px] items-center flex justify-between cursor-grab active:cursor-grabbing">
        <div className="flex justify-between w-[50px]">
          <div className="bg-red-400 w-[15px] h-[15px] rounded-full">
          </div>
          <div className="bg-orange-400 w-[15px] h-[15px] rounded-full">
          </div>
          <div className="bg-green-400 w-[15px] h-[15px] rounded-full">
          </div>
        </div>
        <p class="text-blue-600 dark:text-sky-400">{window.titulo}</p>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}
