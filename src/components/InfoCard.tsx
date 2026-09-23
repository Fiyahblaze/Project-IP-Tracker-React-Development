import type { IpData } from "../types/ip";
import InfoItem from "./InfoItem";

interface InfoCardProps {
  ipData: IpData;
}

function InfoCard({ ipData }: InfoCardProps) {
  const location = [
    ipData.location.city,
    ipData.location.region,
    ipData.location.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const information = [
    {
      label: "IP Address",
      value: ipData.ip,
    },
    {
      label: "Location",
      value: location || "Not available",
    },
    {
      label: "Timezone",
      value: `UTC ${ipData.location.timezone}`,
    },
    {
      label: "ISP",
      value: ipData.isp || "Not available",
    },
  ];

  return (
    <section
      className="info-card"
      aria-label="IP address information"
    >
      {information.map((item) => (
        <InfoItem
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </section>
  );
}

export default InfoCard;