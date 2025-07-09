interface Props {
  chipText: string;
  status: "success" | "error";
}

const ExampleStatusCard = ({ chipText, status }: Props) => {
  return (
    <div className="w-24 h-36 bg-black relative ">
      <div className="bg-white border-1 size-fit p-1 z-10">안전모</div>
      {status == "success" ? (
        <div
          className={`absolute w-full bottom-0 bg-green-700 text-white text-center`}
        >
          O
        </div>
      ) : (
        <div
          className={`absolute w-full bottom-0 bg-red-700 text-white text-center`}
        >
          X
        </div>
      )}
    </div>
  );
};

export default ExampleStatusCard;
