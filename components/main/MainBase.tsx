import { useRouter } from "next/navigation";
import ScoreLabel from "./ScoreLabel";

const MainBase = ({
  title,
  chipTitle,
  bgcolor,
  path,
}: {
  title: string;
  chipTitle: string;
  bgcolor: string;
  path: string;
}) => {
  const router = useRouter();

  return (
    <div
      className="rounded-[30px] flex-1 cursor-pointer flex flex-col justify-center items-center min-h-[100px] relative"
      style={{ backgroundColor: bgcolor }}
      onClick={() => router.push(path)}
    >
      <ScoreLabel />
      <div className="bg-white px-3 py-1 rounded-[30px] text-xs">
        {chipTitle}
      </div>
      <div className="text-[20px] font-bold text-white">{title}</div>
    </div>
  );
};

export default MainBase;
