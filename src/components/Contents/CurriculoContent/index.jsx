import { useState, useEffect } from 'react';

export default function Terminal() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [typedCommand, setTypedCommand] = useState('');
  const [showContent, setShowContent] = useState(false);

  const commandText = " curriculo --show";

  useEffect(() => {
    // Mostra o prompt inicial
    const tPrompt = setTimeout(() => setShowPrompt(true), 400);

    // Começa a digitar após 800ms
    const tTypingStart = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setTypedCommand(commandText.slice(0, index + 1));
        index++;

        if (index === commandText.length) {
          clearInterval(interval);
          // Mostra a saída logo após terminar a digitação
          setTimeout(() => setShowContent(true), 400);
        }
      }, 70); // Velocidade de digitação de cada letra (em ms)
    }, 800);

    return () => {
      clearTimeout(tPrompt);
      clearTimeout(tTypingStart);
    };
  }, []);

  return (
    <div className="w-full h-full font-dotgothic font-light text-white p-4 overflow-auto">
      {showPrompt && (
        <span className="text-green-600">computador@DESKTOP-Q0DGCCF:~$</span>
      )}

      <span>{typedCommand}</span>

      {/* Cursor piscante enquanto digita ou espera o conteúdo */}
      {showPrompt && !showContent && (
        <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse align-middle" />
      )}

      {showContent && (
        <>
          <p className="mt-1 text-lg font-bold text-gray-300">Vinicius Gomes dos Santos</p>
          <p className="mt-2 text-gray-300">Desenvolvedor React</p>
          <p className="mt-1 text-gray-300">Rio de Janeiro, RJ, Brasil - Copacabana · Disponível para remoto e presencial</p>
          <p className="mt-2 text-lg font-bold text-gray-300">Resumo</p>
          <p className="mt-1 text-gray-300">Estudante de Ciência da Computação com sólida base em lógica de programação, Programação Orientada a Objetos (POO),
            desenvolvimento web (HTML, CSS, JavaScript, React) e bancos de dados relacionais. Experiência prática na criação e
            consumo de APIs REST, controle de versão com Git e atuação em ambiente corporativo de TI. Buscando oportunidade de
            estágio para apoiar a equipe na manutenção, correção de bugs e evolução de sistemas corporativos.
          </p>
          <p className="mt-2 text-lg font-bold text-gray-300">Experiência Profissional</p>
          <p className="mt-2 text-md font-medium text-gray-400">Shopping Nova América/Ancar </p>
          <p className=" text-gray-300">Aprendiz de TI. · Rio de Janeiro, RJ · 06/2025 - 10/2026 </p>
          <p className="italic text-gray-300">Suportar e assegurar que os recursos de informática sejam utilizados de acordo com as normas da empresa,
            orientando os usuários quando necessário. Atender os chamados de TI nos tempos acordados utilizando a ferramenta  Freshdesk, administrar ativos de TI através do NCentral. Administrar, gerenciar e suportar infraestrutura de rede garantindo o funcionamento adequado dos recursos. Criar, manter e atualizar procedimentos utilizados na unidade. Garantir a integridade do Backup da unidade. Executar atividades obedecendo as políticas, normas e procedimentos internos relacionados principalmente a qualidade, meio ambiente, higiene, saúde e segurança do trabalho, assegurando sua
            integridade física e os padrões definidos pela empresa. </p>
          <p className="mt-2 text-lg font-bold text-gray-300">Projetos</p>
          <p className="text-md font-medium text-green-300">Site de E-Commerce (projeto front-end)</p>
          <p className="text-xs font-medium text-gray-400">github.com/ViniGomes1/move-ecommerce-react / <a target="_blank" href="https://move-ecommerce.vercel.app">move-ecommerce.vercel.app </a></p>
          <div className="text-sm font-medium text-slate-300">
            <ul className='list-disc'>
              <li>Construído um site para E-Commerce com React + Vite.</li>
              <li>Desenvolvimento de interface responsiva.</li>
              <li>Feito deploy no Vercel ficando disponível globalmente.</li>
              <li>O projeto foi feito em colaboração com um colega de curso.</li>
            </ul>
          </div>
          <p className="text-md font-medium text-green-300">Bot de mensagens do Telegram + Web scraping (projeto back-end/automação)</p>
          <p className="text-xs font-medium text-gray-400">github.com/ViniGomes1/bot_telegram_lua</p>
          <div className="text-sm font-medium text-slate-300">
            <ul className='list-disc'>
              <li>Desenvolvimento de scraper para monitoramento de preços na Amazon e Mercado Livre </li>
              <li>Integração com API do Telegram via webhooks</li>
              <li>Conteinerização da aplicação com Docker para deploy contínuo no Render.</li>
            </ul>
          </div>
          <p className="mt-2 text-lg font-bold text-gray-300">Formação </p>
          <p className="text-md font-medium text-gray-400">Universidade Estácio de Sá · Rio de Janeiro, RJ · 02/2024 - 12/2027 (em andamento)</p>
          <p className="mt-2 text-lg font-bold text-gray-300">Habilidades</p>
          <p className="text-md font-medium text-green-200">Linguagens: <span className='text-gray-300'>Java, JavaScript, Lua, Python, VBA.</span></p>
          <p className="text-md font-medium text-green-200">Back-End: <span className='text-gray-300'>Spring e Laravel.</span></p>
          <p className="text-md font-medium text-green-200">Front-End: <span className='text-gray-300'>React, HTML, CSS.</span></p>
          <p className="text-md font-medium text-green-200">Banco de Dados:  <span className='text-gray-300'>MySQL.</span></p>
          <p className="text-md font-medium text-green-200">Ferramentas:  <span className='text-gray-300'> Git, GitHub, Docker, Postman.</span></p>

        </>
      )}

    </div>
  );
}
