export default function PopoverApps({ appName }) {

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-col items-center">
        <div className="inline-block shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-white/10 backdrop-blur-[7px] rounded-full pl-2 pr-2 pt-1 pb-1">
          <p>{appName}</p>
        </div>
        <div className="triangle w-[20px] h-[10px] top-[-2px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-white/10 backdrop-blur-[7px]"></div>
      </div>
    </div>
  )
}
