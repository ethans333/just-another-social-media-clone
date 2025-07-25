import { Copy } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <Copy size={40} className="text-primary mb-2" />
      <div className="text-2xl font-black">JASMC</div>
    </div>
  );
}
