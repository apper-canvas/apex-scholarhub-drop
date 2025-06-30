import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import NavItem from '@/components/molecules/NavItem'

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { to: '/', icon: 'LayoutDashboard', label: 'Dashboard' },
    { to: '/syllabus', icon: 'BookOpen', label: 'Syllabus' },
    { to: '/calendar', icon: 'Calendar', label: 'Calendar', badge: '3' },
    { to: '/results', icon: 'BarChart3', label: 'Results' },
    { to: '/profile', icon: 'User', label: 'Profile' }
  ]
  
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl border-r border-gray-200 lg:translate-x-0 lg:static lg:z-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display gradient-text">ScholarHub</h1>
                <p className="text-xs text-gray-500">Student Portal</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
              />
            ))}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="font-medium text-gray-900">Alex Johnson</p>
                  <p className="text-sm text-gray-500">Grade 10 - A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar