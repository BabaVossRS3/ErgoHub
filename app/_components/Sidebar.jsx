// components/Sidebar.js
import { User, ChevronDown, ChevronRight } from 'lucide-react';
import { jobCategories } from '../../data/jobCategories';
import { useState } from 'react';

const Sidebar = ({ setFilters, availableProfessions }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});

  // Filter categories that have matching professionals
  const filteredCategories = jobCategories.map(category => ({
    ...category,
    subCategories: category.subCategories.map(subCategory => ({
      ...subCategory,
      professions: subCategory.professions.filter(profession =>
        availableProfessions.includes(profession)
      )
    })).filter(subCategory => subCategory.professions.length > 0)
  })).filter(category => category.subCategories.length > 0);

  const handleProfessionClick = (profession) => {
    setFilters(prev => ({ ...prev, search: profession }));
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
    if (expandedCategories[categoryId]) {
      setExpandedSubCategories({});
    }
  };

  const toggleSubCategory = (subCategoryId) => {
    setExpandedSubCategories(prev => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId]
    }));
  };

  // If no categories have professionals, show a message
  if (filteredCategories.length === 0) {
    return (
      <div className="w-64 bg-white min-h-screen shadow-lg p-4 flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4 text-[#974dc6]">Κατηγορίες</h2>
        <p className="text-gray-500 text-sm">Δεν υπάρχουν διαθέσιμοι επαγγελματίες αυτή τη στιγμή.</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white min-h-screen shadow-lg p-4 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4 text-[#974dc6]">Κατηγορίες</h2>
      <div className="space-y-2">
        {filteredCategories.map((category) => (
          <div key={category.id}>
            <div
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between p-2 hover:bg-[#edecf4] rounded-lg cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[#974dc6]" />
                <span className="text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {expandedCategories[category.id] ? (
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#974dc6]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#974dc6]" />
                )}
              </div>
            </div>

            {expandedCategories[category.id] && (
              <div className="ml-6 space-y-1 transition-all duration-200">
                {category.subCategories.map((subCategory) => (
                  <div key={subCategory.id}>
                    <div
                      onClick={() => toggleSubCategory(subCategory.id)}
                      className="flex items-center justify-between text-sm text-gray-600 p-2 hover:bg-[#edecf4] rounded-lg cursor-pointer group"
                    >
                      <span>{subCategory.name}</span>
                      <div className="flex items-center space-x-2">
                        {expandedSubCategories[subCategory.id] ? (
                          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#974dc6]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#974dc6]" />
                        )}
                      </div>
                    </div>

                    {expandedSubCategories[subCategory.id] && (
                      <div className="ml-4 transition-all duration-200">
                        {subCategory.professions.map((profession) => (
                          <div
                            key={profession}
                            onClick={() => handleProfessionClick(profession)}
                            className="text-sm text-gray-500 p-2 hover:bg-[#edecf4] rounded-lg cursor-pointer pl-4"
                          >
                            {profession}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;