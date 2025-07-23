import { useState } from "react";

interface ToggleContentProps {
  title: string;
  defaultValue?: boolean;
  children: React.ReactNode;
}

const ToggleContent = ({
  title,
  defaultValue,
  children,
}: ToggleContentProps) => {
  const [open, setOpen] = useState(defaultValue);

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="font-bold cursor-pointer" onClick={() => setOpen(!open)}>
        {`${open ? "△" : "▽"} ${title}`}
      </div>
      {open && children}
    </div>
  );
};

export default ToggleContent;
