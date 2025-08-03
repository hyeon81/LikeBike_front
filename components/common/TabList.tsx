const TabList = ({
  onClick,
  active,
  isRed,
  children,
}: {
  onClick: () => void
  active: boolean
  isRed?: boolean // Optional prop to indicate if the tab should be red
  children: React.ReactNode
}) => {
  return active ? (
    <div
      className={`flex-1 default-border py-4 text-center font-bold ${isRed ? 'bg-contrast' : 'bg-secondary-light'} rounded-t-3xl  cursor-pointer text-lg`}
      onClick={onClick}
    >
      {children}
    </div>
  ) : (
    <div
      className="flex-1 py-4 default-border text-center text-gray-medium font-bold bg-gray-lightest rounded-t-3xl cursor-pointer text-lg"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default TabList
