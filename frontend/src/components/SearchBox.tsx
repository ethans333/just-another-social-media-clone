import { Input } from "@/components/ui/input";
import { Snail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBox() {
  return (
    <div className="flex items-center space-x-3">
      <Input type="text" placeholder="Search users..." />
      <Button variant="outline" className="cursor-pointer">
        <Snail className="w-4 h-4" />
      </Button>
    </div>
  );
}
