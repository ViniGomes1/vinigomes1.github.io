export default function BlackContainer({ children }) {
  //bg-slate-500
  return (
    <div className="bg-violet-500 min-h-screen min-w-screen overflow-hidden ">
      <img className="w-full h-full absolute object-cover" src="public\Background\walpaper.jpg" alt="" />
      {children}
    </div>
  )
}
