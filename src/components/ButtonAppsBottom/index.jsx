import PopoverApps from "../PopoverApps";

export default function ButtonAppsBottom({buttonAttr}) {
  return (
    <div className="relative group inline-block mr-1 ml-1">
      {/* Botão que se move no hover */}
      <div className="relative bg-amber-300 rounded-xl w-[70px] h-[70px]
      transition delay-50 duration-300 ease-in-out hover:-translate-y-4 hover:scale-110 flex
      items-center justify-center cursor-pointer active:scale-100 active:duration-100">

        {/* Popover dentro da div animada: acompanha o movimento automaticamente */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block pointer-events-none">
          <PopoverApps appName={buttonAttr.hovername}/>
        </div>
        <i className="text-black text-[35px] bi bi-cart-dash-fill"></i>
      </div>
    </div>
  );
}
