import { Home, Settings, User, Snail, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppSidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen min-w-[325px] text-white flex flex-col space-y-4 z-50 border-r border-muted">
      <div className="mb-6 flex flex-col items-center border-b border-muted py-7">
        <Snail size={40} className="text-primary mb-2" />
        <div className="text-2xl font-black">JASMC</div>
      </div>
      <div className="flex flex-col space-y-2 px-4 text-lg font-semibold">
        <Link
          to="/"
          className="flex items-center space-x-3 hover:bg-muted p-4 rounded"
        >
          <Home size={22} />
          <p>Home</p>
        </Link>
        <Link
          to="/profile"
          className="flex items-center space-x-3 hover:bg-muted p-4 rounded"
        >
          <User size={22} />
          <p>Profile</p>
        </Link>
        <Link
          to="/settings"
          className="flex items-center space-x-3 hover:bg-muted p-4 rounded"
        >
          <Settings size={22} />
          <p>Settings</p>
        </Link>
      </div>
      <div className="mt-auto px-4 pb-6 text-lg font-semibold">
        <button
          className="flex items-center space-x-3 hover:bg-muted p-4 rounded text-left w-full cursor-pointer"
          onClick={() => {
            // Add your logout logic here, e.g., clearing tokens and redirecting
          }}
        >
          <LogOut size={22} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
}
