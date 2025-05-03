import Image from "next/image";
import { StaggerItem } from "../animation";

export type FeatureWithIconProps = {
  icon: string;
  title: string;
  description?: string;
  className?: string;
};

const FeatureWithIcon = ({ icon, title, description, className }: FeatureWithIconProps) => (
  <StaggerItem
    className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/40 min-w-[120px] ${
      className || ""
    }`}
    role="group"
    aria-label={title}
    tabIndex={0}
  >
    <div className="bg-card rounded-lg p-2">
      <Image src={icon} alt={title} width={40} height={40} sizes=" 40px" />
    </div>
    <span className="text-sm text-primary text-center md:max-w-40">{title}</span>
    {description && (
      <span className="text-xs text-muted-foreground text-center">{description}</span>
    )}
  </StaggerItem>
);

export default FeatureWithIcon;
