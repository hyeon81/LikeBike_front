const BubbleChat = ({ text }: { text: string }) => {
  return (
    <div className="relative flex justify-center z-20 mb-7">
      <div className="bg-text-primary rounded-4xl px-6 py-2 text-white shadow-md max-w-md absolute top-0 left-0">
        {text}
        <span className="absolute left-10 -bottom-4 w-0 h-0 border-l-[16px] border-l-transparent  border-r-transparent border-t-[16px] border-t-text-primary"></span>
      </div>
    </div>
  );
};

export default BubbleChat;
