import { useEffect, useRef, useState } from "react";
import IconsDesk from "../IconsDesk";
//conteudos nas janelas
import GitHubContent from "../Contents/GithubContent";
import CurriculoContent from "../Contents/CurriculoContent";

//logos dos icones
import githubLogo from "../../assets/icones/github.svg";
import terminal from "../../assets/icones/terminal.svg";



export default function DesktopContainer({ listaPrimeiros, listagemJanelas }) {
  const divRef = useRef(null);
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);
  const [positions, setPositions] = useState([]);

  // Inicializa posições quando listaPrimeiros estiver disponível (apenas uma vez)
  useEffect(() => {
    if (listaPrimeiros && listaPrimeiros[0] && positions.length === 0) {
      setPositions([
        {
          id: 0,
          box: "box1",
          atributos: {
            posicoes: {
              x: listaPrimeiros[0]?.x,
              y: listaPrimeiros[0]?.y,
            },
            iconName: "Curriculo",
            content: <CurriculoContent />,
            iconLogo: terminal
          },
        },
        {
          id: 1,
          box: "box2",
          atributos: {
            posicoes: {
              x: listaPrimeiros[1]?.x,
              y: listaPrimeiros[1]?.y,
            },
            iconName: "GitHub",
            content: <GitHubContent />,
            iconLogo: githubLogo
          },
        },
      ]);
    }
  }, [listaPrimeiros, positions.length]);

  // Observer/Listener apenas para as medidas do container
  useEffect(() => {
    const updateContainerSize = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        setDivWidth(rect.width);
        setDivHeight(rect.height);
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  const updatePosition = (id, newPos) => {
    setPositions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            atributos: {
              ...item.atributos,
              posicoes: newPos,
            },
          }
          : item
      )
    );
  };

  const clicked = (item) => {
    listagemJanelas((prev) => {
      const jaExiste = prev.some((janela) => janela.id === item.id);

      if (jaExiste) {
        // Se já existe, remove a janela
        return prev.filter((janela) => janela.id !== item.id);
      }

      // Se não existe, cria com o id fornecido
      const novaJanela = {
        id: item.id,
        titulo: item.atributos.iconName,
        aberta: true,
        content: item.atributos.content
      };

      return [...prev, novaJanela];
    });
  };

  return (
    <div
      ref={divRef}
      className="w-full h-full absolute overflow-hidden min-h-screen"
    >
      {positions.map((item) => (
        <IconsDesk
          key={item.id}
          id={item.id}
          iconName={item.atributos.iconName}
          onDrag={updatePosition}
          position={item.atributos.posicoes}
          parentWidth={divWidth}
          parentHeight={divHeight}
          click={updatePosition}
          clickOpen={() => clicked(item)}
          iconLogo={item.atributos.iconLogo}
        />
      ))}
    </div>
  );
}
