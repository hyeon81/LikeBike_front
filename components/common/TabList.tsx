const TabList = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) => {
  return active ? (
    <div
      onClick={onClick}
      className={`flex-1 py-4 text-center font-bold bg-secondary-light rounded-t-3xl  cursor-pointer`}
    >
      {children}
    </div>
  ) : (
    <div
      onClick={onClick}
      className={`flex-1 py-4 text-center text-gray-medium font-bold bg-gray-lightest rounded-t-3xl cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default TabList;
