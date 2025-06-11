function TipBox({ tip, tempTip }) {
  if (!tip && !tempTip) return null;

  return (
    <div className="mt-4 bg-white/10 p-3 rounded text-sm italic space-y-1">
      {tip && <p>{tip}</p>}
      {tempTip && <p>{tempTip}</p>}
    </div>
  );
}

export default TipBox;
