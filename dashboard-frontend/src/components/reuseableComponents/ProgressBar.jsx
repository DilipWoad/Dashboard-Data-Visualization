const ProgressBar = ({ value, colorClass,max=100 }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="flex items-center gap-2">
      <span className="min-w-6 text-sm text-slate-200">{value?.toFixed(1)}</span>
      <div className="w-15 h-1.5 bg-slate-700 rounded overflow-hidden">
        {/* We still use an inline style for the dynamic width percentage */}
        <div
          className={`h-full rounded ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
