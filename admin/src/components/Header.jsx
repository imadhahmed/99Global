import { Menu, Bell, User, LogOut } from 'lucide-react';

export default function Header({ toggleSidebar, onLogout }) {
  return (
    <header className="h-20 bg-[#16171d] border-b border-[#2e303a] flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-medium text-white hidden md:block">Admin Portal</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-px bg-[#2e303a] mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-gray-300 hidden md:block">Admin User</span>
        </div>
        
        <button 
          onClick={onLogout}
          className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
