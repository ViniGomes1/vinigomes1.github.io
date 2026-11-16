import { useEffect, useRef, useState } from "react";
import americanLogo from "../../assets/icones/AMERICA.svg";

export default function SuperiorBar() {
  const [agora, setAgora] = useState(new Date());
  const [abaixo, setAbaixo] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Ref no elemento que serve de âncora (o botão "ViniOS")
  const triggerRef = useRef(null);

  // Relógio
  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Atualiza a posição da âncora ao redimensionar
  useEffect(() => {
    const updatePosition = () => {

      if (abaixo && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom, // posiciona logo abaixo do botão
          left: rect.left
        });
      }
    };

    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [abaixo]);

  // Formatações
  const horaFormatada = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const diaMes = agora.toLocaleDateString("pt-BR", {
    day: "numeric"
  });

  const mesNome = agora.toLocaleDateString("pt-BR", {
    month: "short"
  });

  const handleBottom = () => {
    if (!abaixo && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      setCoords({
        top: rect.bottom,
        left: rect.left
      });
    }
    setAbaixo((prev) => !prev);
  };

  return (
    <div className="w-full grid grid-cols-3 items-center px-3 relative">
      {/* Esquerda */}
      <div className="flex items-center justify-start">
        <img src={americanLogo} className="w-[30px] h-[30px]" alt="" />
        <span className="ml-[5px]">Vinicius Megatrends</span>
      </div>

      {/* Centro exato */}
      <div className="flex justify-center space-x-1">
        <span>{diaMes}</span>
        <span>{mesNome}</span>
        <span>{horaFormatada}</span>
      </div>

      {/* Direita */}
      <div className="flex justify-end">
        <span
          ref={triggerRef}
          onClick={handleBottom}
          className="cursor-pointer select-none"
        >
          <i class="bi bi-clouds-fill"></i>
        </span>
      </div>

      {/* Menu / Dropdown */}
      {abaixo && (
        <div
          style={{
            position: "fixed", // "fixed" garante precisão em relação ao viewport/getBoundingClientRect
            top: coords.top + 10,
            left: Math.max(16, coords.left + (triggerRef.current?.offsetWidth || 0) - 300)
          }}
          className=" rounded-xl bg-white/30 backdrop-blur-[30px] z-5 w-[300px] h-[350px]"
        >
          algo
        </div>
      )}
    </div>
  );
}
