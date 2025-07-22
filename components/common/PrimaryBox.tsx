import { ReactNode } from "react";

interface PrimaryBoxProps {
  children: ReactNode;
}

const PrimaryBox = ({ children }: PrimaryBoxProps) => {
  return (
    <div className="bg-secondary-light p-3 text-center mt-8">{children}</div>
  );
};

export default PrimaryBox;
