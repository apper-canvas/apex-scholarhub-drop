import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const NavItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${
          isActive
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            size={20} 
            className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'} 
          />
          <span className="ml-3 font-medium">{label}</span>
          
          {badge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto bg-accent-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center"
            >
              {badge}
            </motion.span>
          )}
          
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl -z-10"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default NavItem