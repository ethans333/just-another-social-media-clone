import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBox() {
  return (
    <div className="flex items-center space-x-3">
      <Input type="text" placeholder="Search users..." />
      <Button variant="outline" className="cursor-pointer">
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}
