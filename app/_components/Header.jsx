import React from 'react'
import Link from 'next/link'

const Header = () => {
  const navItems = [
    { name: 'Αρχική', href: '/' },
    { name: 'Υπηρεσίες', href: '#' },
    { name: 'Σχετικά με εμάς', href: '#' },
  ];

  return (
    <nav className="bg-white shadow-sm" style={{ borderColor: 'rgba(151, 78, 195, 0.1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={'/'}>
              <span style={{ color: '#313866' }} className="text-3xl font-bold transform hover:scale-105 transition-transform duration-200 cursor-pointer">
                ErgoHub
              </span>
            </Link>   
          </div>

          {/* Desktop menu */}
          <div className="ml-10 flex items-center space-x-6">
            
            <div className="md:flex hidden">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        style={{ color: '#504099' }}
                        className="px-3 py-2 rounded-md text-lg font-medium
                        relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                        hover:text-[#974EC3] after:bg-[#FE7BE5] after:transition-all after:duration-200 hover:after:w-full"
                    >
                        {item.name}
                    </a>
                    ))}
            </div>    
        
            <div className="flex items-center space-x-4">
              <Link href={'/login'}>
                <button 
                  className="bg-white border-2 px-4 py-2 rounded-xl 
                    text-lg font-medium transform hover:-translate-y-0.5 
                    transition-all duration-200 shadow-sm hover:bg-blue-100 hover:shadow-md"
                  style={{ 
                    borderColor: '#974EC3',
                    color: '#974EC3',
                  }}
                >
                  Βρες Ειδικούς
                </button>
              </Link>
              <Link href={'/professional/login'}>
                <button 
                  className="text-white px-4 py-2 rounded-xl text-lg font-light
                    transform hover:-translate-y-0.5 transition-all duration-200 
                    shadow-sm hover:shadow-md hover:opacity-90"
                  style={{ backgroundColor: '#974EC3' }}
                >
                  Γίνε Ειδικός
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header