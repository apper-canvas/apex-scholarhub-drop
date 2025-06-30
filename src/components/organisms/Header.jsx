import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { AuthContext } from '../../App'

const Header = ({ onMenuClick, title = 'Dashboard' }) => {
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  
  const handleLogout = async () => {
    await logout()
  }
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMenuClick}
            className="lg:hidden"
          />
          
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {isAuthenticated && user ? user.firstName || user.name || 'Student' : 'Student'}!
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Bell" size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </span>
          </motion.button>
          
          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ApperIcon name="Search" size={20} className="text-gray-600" />
          </motion.button>
          
          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            icon="LogOut"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Logout
          </Button>
        </div>
      </div>
</motion.header>
  )
}

export default Header