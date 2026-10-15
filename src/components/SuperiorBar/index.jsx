import { useEffect, useState } from "react";

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
    <div className="w-[100%] flex justify-between">
      <div>
        <span className="mr-[5px]">Arquivo</span>
        <span className="mr-[5px]">Editar</span>
        <span className="mr-[5px]">Exibir</span>
        <span className="mr-[5px]">Ajuda</span>
      </div>
      <div>
        <span className="mr-[5px]">{diaMes}</span>
        <span className="mr-[5px]">{mesNome}</span>
        <span className="mr-[5px]">{horaFormatada}</span>
      </div>

    </div>
  )
}
