import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { name: 'Total Revenue', value: 'Rs. 13,569,567.00', change: '+20.1%', icon: DollarSign },
    { name: 'Active Products', value: '24', change: '+3', icon: Package },
    { name: 'Total Orders', value: '1,234', change: '+12.5%', icon: TrendingUp },
    { name: 'Unique Customers', value: '892', change: '+18.2%', icon: Users },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-white tracking-widest uppercase mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#16171d] border border-[#2e303a] p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">{stat.name}</h3>
                <div className="p-2 bg-[#1f2028] rounded-lg">
                  <Icon className="h-5 w-5 text-[#d4af37]" />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm font-medium text-green-400">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for charts or recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-[#16171d] border border-[#2e303a] rounded-xl p-6 h-96">
          <h3 className="text-white font-medium mb-4">Revenue Overview</h3>
          <div className="h-full flex items-center justify-center text-gray-500 border border-dashed border-[#2e303a] rounded">
            Chart Component Placeholder
          </div>
        </div>
        <div className="bg-[#16171d] border border-[#2e303a] rounded-xl p-6 h-96">
          <h3 className="text-white font-medium mb-4">Recent Products Added</h3>
          <div className="h-full flex items-center justify-center text-gray-500 border border-dashed border-[#2e303a] rounded">
            Recent Activity List Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
