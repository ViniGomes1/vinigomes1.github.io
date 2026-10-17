import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import BlackContainer from './components/FullContainer'
import DesktopContainer from './components/DesktopContainer'
import GridDesktopContainer from './components/GridDesktopContainer'
import WindowContainer from './components/WindowContainer'
import PopoverApps from './components/PopoverApps'

function App() {
  const [count, setCount] = useState(0)

  const [listaPrimeiros, setListaPrimeiros] = useState([])
  const [listaWindow, setListaWindow] = useState([])

const onExitFunc = (item) => {
  setListaWindow((prev) => prev.filter((janela) => janela.id !== item.id));
};

  return (
    <BlackContainer>
      {listaWindow.map((lista) => (
        <WindowContainer key={lista.id} window={lista} content={lista.content} onExit={onExitFunc} tamanho={lista.tamanho}/>
      ))}
      <DesktopContainer listaPrimeiros={listaPrimeiros} listagemJanelas={setListaWindow} />
      <GridDesktopContainer listaPrimeiros={setListaPrimeiros} />
    </BlackContainer>
  )
}

export default App
