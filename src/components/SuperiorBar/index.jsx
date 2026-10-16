import { useEffect, useState } from "react";
import americanLogo from "../../assets/icones/AMERICA.svg"

export default function SuperiorBar() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    // Atualiza o estado a cada 1 segundo (1000ms)
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    // Limpa o intervalo se o componente sair da tela (evita vazamento de memória)
    return () => clearInterval(timer);
  }, []);

  // Formata para HH:MM:SS (ex: 14:35:09)
  const horaFormatada = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  // Opcional: Formata a data (ex: 15/10/2026)
  const diaMes = agora.toLocaleDateString("pt-BR", {
    day: "numeric",
  });

  const mesNome = agora.toLocaleDateString("pt-BR", {
    month: "short",
  });
  return (
    <div className="w-full grid grid-cols-3 items-center px-3">
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
        <span>ViniOS</span>
      </div>
    </div>
  )
}
