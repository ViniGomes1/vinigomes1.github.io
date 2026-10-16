import imagemFundo from '../../assets/background/walpaper.jpg'

export default function BlackContainer({ children }) {
  //bg-slate-500
  return (
    <div className="bg-violet-500 min-h-screen min-w-screen overflow-hidden ">
      <img className="w-full h-full absolute object-cover" src={imagemFundo} alt="" />
      {children}
    </div>
  )
}
