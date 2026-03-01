const MetrixCard = ({title,value}) => {
  return (
    <div className="bg-slate-800 text-white p-1 flex flex-1 rounded-lg">
      <div className="flex flex-col  items-center w-full">
        <p className="font-semibold">{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default MetrixCard;
