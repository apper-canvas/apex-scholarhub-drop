import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatCard from '@/components/molecules/StatCard'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { dashboardService } from '@/services/api/dashboardService'

const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const dashboardData = await dashboardService.getDashboardData()
      setData(dashboardData)
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])
  
  if (loading) return <Loading type="dashboard" />
  if (error) return <Error message={error} onRetry={loadData} />
  if (!data) return null
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">
              Welcome back, {data.student.name}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              Grade {data.student.grade} • Section {data.student.section} • Roll No: {data.student.rollNumber}
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-primary-100 text-sm">Current Semester</p>
              <p className="text-xl font-bold">Fall 2024</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Subjects"
          value={data.stats.totalSubjects}
          icon="BookOpen"
          color="primary"
          onClick={() => navigate('/syllabus')}
        />
        <StatCard
          title="Upcoming Events"
          value={data.stats.upcomingEvents}
          icon="Calendar"
          color="secondary"
          onClick={() => navigate('/calendar')}
        />
        <StatCard
          title="Overall Grade"
          value={data.stats.overallGrade}
          icon="Award"
          color="accent"
          onClick={() => navigate('/results')}
        />
        <StatCard
          title="Attendance"
          value={`${data.stats.attendance}%`}
          icon="Clock"
          color="success"
          trend="up"
          trendValue="+2%"
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Results */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-display text-gray-900">Recent Results</h2>
            <Button
              variant="ghost"
              size="sm"
              icon="ExternalLink"
              onClick={() => navigate('/results')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.recentResults.map((result, index) => (
              <motion.div
                key={result.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                    <ApperIcon name="FileText" size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{result.subject}</p>
                    <p className="text-sm text-gray-500">{result.examName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={result.grade === 'A+' || result.grade === 'A' ? 'success' : 'primary'}>
                    {result.grade}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">{result.marks}/{result.totalMarks}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        
        {/* Upcoming Events */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-display text-gray-900">Upcoming Events</h2>
            <Button
              variant="ghost"
              size="sm"
              icon="ExternalLink"
              onClick={() => navigate('/calendar')}
            >
              View Calendar
            </Button>
          </div>
          
          <div className="space-y-4">
            {data.upcomingEvents.map((event, index) => (
              <motion.div
                key={event.Id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'exam' ? 'bg-red-500' :
                  event.type === 'assignment' ? 'bg-yellow-500' :
                  event.type === 'holiday' ? 'bg-green-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.date}</p>
                </div>
                <Badge variant={
                  event.type === 'exam' ? 'error' :
                  event.type === 'assignment' ? 'warning' :
                  event.type === 'holiday' ? 'success' :
                  'info'
                }>
                  {event.type}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-bold font-display text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            size="lg"
            icon="BookOpen"
            onClick={() => navigate('/syllabus')}
            className="justify-start"
          >
            View Syllabus
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon="Calendar"
            onClick={() => navigate('/calendar')}
            className="justify-start"
          >
            Check Calendar
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon="BarChart3"
            onClick={() => navigate('/results')}
            className="justify-start"
          >
            View Results
          </Button>
          <Button
            variant="outline"
            size="lg"
            icon="User"
            onClick={() => navigate('/profile')}
            className="justify-start"
          >
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Dashboard