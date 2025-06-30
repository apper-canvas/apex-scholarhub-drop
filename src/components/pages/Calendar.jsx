import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { calendarService } from '@/services/api/calendarService'

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [filterType, setFilterType] = useState('all')
  
  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await calendarService.getAll()
      setEvents(data)
    } catch (err) {
      setError('Failed to load calendar events. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadEvents()
  }, [])
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return isSameDay(eventDate, date)
    })
  }
  
  const filteredEvents = events.filter(event => {
    if (filterType === 'all') return true
    return event.type === filterType
  })
  
  const getEventTypeColor = (type) => {
    switch (type) {
      case 'exam':
        return 'bg-red-500'
      case 'assignment':
        return 'bg-yellow-500'
      case 'holiday':
        return 'bg-green-500'
      case 'event':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }
  
  const getEventTypeBadge = (type) => {
    switch (type) {
      case 'exam':
        return 'error'
      case 'assignment':
        return 'warning'
      case 'holiday':
        return 'success'
      case 'event':
        return 'info'
      default:
        return 'default'
    }
  }
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }
  
  const eventTypes = [
    { value: 'all', label: 'All Events', count: events.length },
    { value: 'exam', label: 'Exams', count: events.filter(e => e.type === 'exam').length },
    { value: 'assignment', label: 'Assignments', count: events.filter(e => e.type === 'assignment').length },
    { value: 'holiday', label: 'Holidays', count: events.filter(e => e.type === 'holiday').length },
    { value: 'event', label: 'Events', count: events.filter(e => e.type === 'event').length }
  ]
  
  if (loading) return <Loading type="calendar" />
  if (error) return <Error message={error} onRetry={loadEvents} />
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-gray-900">Academic Calendar</h1>
          <p className="text-gray-600 mt-1">View upcoming events, exams, and important dates</p>
        </div>
        
        {/* Event Type Filters */}
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type.value}
              variant={filterType === type.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterType(type.value)}
              className="text-sm"
            >
              {type.label} ({type.count})
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-Bold font-display text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="ChevronLeft"
                  onClick={() => navigateMonth(-1)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="ChevronRight"
                  onClick={() => navigateMonth(1)}
                />
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div className="p-6">
              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day)
                  const isCurrentMonth = isSameMonth(day, currentDate)
                  const isSelected = isSameDay(day, selectedDate)
                  const isCurrentDay = isToday(day)
                  
                  return (
                    <motion.div
                      key={day.toString()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className={`
                        min-h-[80px] p-2 rounded-lg cursor-pointer transition-all duration-200 border-2
                        ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-transparent'}
                        ${isCurrentDay ? 'bg-gradient-to-r from-primary-100 to-secondary-100' : ''}
                        ${isCurrentMonth ? 'hover:bg-gray-50' : 'text-gray-400'}
                      `}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`
                        text-sm font-medium mb-1
                        ${isCurrentDay ? 'text-primary-700' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                      `}>
                        {format(day, 'd')}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.Id}
                            className={`w-full h-2 rounded-full ${getEventTypeColor(event.type)}`}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Events List */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              
              {getEventsForDate(selectedDate).length === 0 ? (
                <Empty 
                  title="No events today"
                  description="There are no events scheduled for this date."
                  icon="Calendar"
                />
              ) : (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => (
                    <motion.div
                      key={event.Id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                          <div>
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.description}</p>
                          </div>
                        </div>
                        <Badge variant={getEventTypeBadge(event.type)} size="sm">
                          {event.type}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          
          {/* Upcoming Events */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold font-display text-gray-900 mb-4">
                Upcoming Events
              </h3>
              
              {filteredEvents.length === 0 ? (
                <Empty 
                  title="No upcoming events"
                  description="No events match your current filter."
                  icon="Calendar"
                />
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {filteredEvents.slice(0, 10).map((event, index) => (
                    <motion.div
                      key={event.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                          <div>
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(event.date), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getEventTypeBadge(event.type)} size="sm">
                          {event.type}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar