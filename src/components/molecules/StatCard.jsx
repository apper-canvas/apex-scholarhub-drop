import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  onClick,
  className = ''
}) => {
  const colors = {
    primary: {
      bg: 'from-primary-500 to-primary-600',
      text: 'text-primary-600',
      icon: 'bg-primary-100 text-primary-600'
    },
    secondary: {
      bg: 'from-secondary-500 to-secondary-600',
      text: 'text-secondary-600',
      icon: 'bg-secondary-100 text-secondary-600'
    },
    accent: {
      bg: 'from-accent-500 to-accent-600',
      text: 'text-accent-600',
      icon: 'bg-accent-100 text-accent-600'
    },
    success: {
      bg: 'from-green-500 to-green-600',
      text: 'text-green-600',
      icon: 'bg-green-100 text-green-600'
    }
  }
  
  const colorScheme = colors[color]
  
  return (
    <Card 
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      hover={true}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold font-display text-gray-900">{value}</p>
          
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <ApperIcon 
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={trend === 'up' ? 'text-green-500' : 'text-red-500'} 
              />
              <span className={`text-sm font-medium ml-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorScheme.icon}`}>
          <ApperIcon name={icon} size={24} />
        </div>
      </div>
    </Card>
  )
}

export default StatCard