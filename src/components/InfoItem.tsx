interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="info-item">
      <h2>{label}</h2>
      <p>{value}</p>
    </div>
  );
}

export default InfoItem;