// components/Sidebar.js
import { User } from 'lucide-react';
import { jobCategories } from '../../data/jobCategories';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white min-h-screen shadow-lg p-4 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4 text-[#974dc6]">Κατηγορίες</h2>
      <div className="space-y-2">
        {jobCategories.map((category) => (
          <div key={category.id}>
            <div className="flex items-center space-x-2 p-2 hover:bg-[#edecf4] rounded-lg cursor-pointer">
              <User className="w-5 h-5 text-[#974dc6]" />
              <span className="text-gray-700">{category.name}</span>
            </div>
            <div className="ml-6 space-y-1">
              {category.subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className="text-sm text-gray-600 p-2 hover:bg-[#edecf4] rounded-lg cursor-pointer"
                >
                  {subCategory.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;