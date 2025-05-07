const LoadingBubble = () => {
  return (
    <div className="m-2 w-[60px] h-[15px] flex justify-between animate-loading">
      <span className="w-[10px] h-[10px] bg-gray-700 rounded-full animate-bounce"></span>
      <span className="w-[10px] h-[10px] bg-gray-700 rounded-full animate-bounce delay-150"></span>
      <span className="w-[10px] h-[10px] bg-gray-700 rounded-full animate-bounce delay-300"></span>
    </div>
  );
};

export default LoadingBubble;
