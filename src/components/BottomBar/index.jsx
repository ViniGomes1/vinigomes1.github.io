import ButtonAppsBottom from "../ButtonAppsBottom";

export default function BottomBar() {
  return (
    <div className="flex justify-between shadow-[0_4px_30px_rgba(0,0,0,0.8) bg-white/10 backdrop-blur-[7px]  rounded-xl p-[8px] mb-5">
      <ButtonAppsBottom />
      <ButtonAppsBottom />
    </div>
  )
}
