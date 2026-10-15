import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import BlackContainer from './components/FullContainer'
import DesktopContainer from './components/DesktopContainer'
import GridDesktopContainer from './components/GridDesktopContainer'
import WindowContainer from './components/WindowContainer'

function App() {
  const [count, setCount] = useState(0)

  const [listaPrimeiros, setListaPrimeiros] = useState([])
  const [listaWindow, setListaWindow] = useState([])

  return (
    <BlackContainer>
      {listaWindow.map((lista) => (
        <WindowContainer key={lista.id} window={lista} content={lista.content}/>
      ))}
      <DesktopContainer listaPrimeiros={listaPrimeiros} listagemJanelas={setListaWindow} />
      <GridDesktopContainer listaPrimeiros={setListaPrimeiros} />
    </BlackContainer>
  )
}

export default App
