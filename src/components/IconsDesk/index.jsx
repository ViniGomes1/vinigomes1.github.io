import { useEffect, useRef, useState } from "react";


export default function IconsDesk({
  id,
  position,
  onDrag,
  parentWidth,
  parentHeight,
  iconName,
  click,
  clickOpen,
  iconLogo
}) {
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [zindex, setZindex] = useState(3)

  const boxSize = useRef(null);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false); // Flag para diferenciar clique de arrasto
  const targetSlotCoords = useRef(null); // Guarda as coordenadas do slot se houver


  useEffect(() => {
    if (boxSize.current) {
      const rect = boxSize.current.getBoundingClientRect();
      setBoxWidth(rect.width);
      setBoxHeight(rect.height);
    }
  }, []);

  const handlePointerDown = (e) => {
    setZindex(4)
    isDragging.current = true;
    hasMoved.current = false;
    targetSlotCoords.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);

    // Distância do ponteiro até o canto superior esquerdo da div
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    hasMoved.current = true;

    let nextX = e.clientX - dragOffset.current.x;
    let nextY = e.clientY - dragOffset.current.y;

    const maxX = parentWidth - boxWidth;
    const maxY = parentHeight - boxHeight;

    nextX = Math.max(0, Math.min(nextX, maxX));
    nextY = Math.max(0, Math.min(nextY, maxY));

    onDrag(id, { x: nextX, y: nextY });

    // Ponto central do ícone para detecção do slot
    const centerX = e.clientX;
    const centerY = e.clientY;

    const elementsUnderPointer = document.elementsFromPoint(centerX, centerY);
    const isOverSlot = elementsUnderPointer.find((el) =>
      el.hasAttribute("data-grid-slot")
    );

    if (isOverSlot) {
      const slotRect = isOverSlot.getBoundingClientRect();
      const parentRect = boxSize.current.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 };

      // Converte coordenadas da tela para as coordenadas relativas ao container pai
      targetSlotCoords.current = {
        x: slotRect.left - parentRect.left,
        y: slotRect.top - parentRect.top,
      };
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    // Se foi apenas um clique e não arrastou, não altera a posição
    if (!hasMoved.current) {
      if (click) click();
      return;
    }

    // Se soltou em cima de um slot, encaixa no slot; senão, mantém onde soltou
    if (targetSlotCoords.current) {
      onDrag(id, {
        x: targetSlotCoords.current.x,
        y: targetSlotCoords.current.y,
      });
    }
    setZindex(3)
  };

  return (
    <div
      onDoubleClick={clickOpen}
      ref={boxSize}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        left: `${position.x + 5}px`,
        top: `${position.y + 5}px`,
        zIndex: zindex
      }}
      className="absolute w-[75px] h-[85px] bg-red-400/0 select-none touch-none p-2 rounded hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:backdrop-blur-[7px]"
    >
      <div className="flex justify-center flex-col items-center">
        <div className="pointer-events-none">
          {iconLogo}
          {/*<img src={iconLogo} className="w-[40px] h-[40px]" alt="" /> */}
        </div>
        <div className="pointer-events-none text-xs">{iconName}</div>
      </div>
    </div>
  );
}
