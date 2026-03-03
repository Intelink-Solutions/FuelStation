import { Menu, Bell, Search, User } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
  title: string;
}

export default function TopBar({ onMenuClick, title }: TopBarProps) {
  return (
    <header className="h-16 glass-gradient border-b border-border/80 flex items-center justify-between px-3 sm:px-4 lg:px-6 sticky top-0 z-20 card-shadow">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-base sm:text-lg font-semibold text-foreground truncate max-w-[45vw] sm:max-w-none">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105 hidden sm:flex">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-secondary/80 transition-all duration-300 hover:scale-105 relative">
          <Bell className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>
        <div className="flex items-center gap-2 ml-1 sm:ml-2 pl-2 sm:pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center shadow-md shadow-primary/30">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
