import Image from "next/image";
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
      <div
        className="cursor-pointer flex flex-row gap-2"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Image
            src="/icons/upArrow.svg"
            alt="arrow up"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/icons/downArrow.svg"
            alt="arrow down"
            width={24}
            height={24}
          />
        )}
        {title}
      </div>
      {open && children}
    </div>
  );
};

export default ToggleContent;
