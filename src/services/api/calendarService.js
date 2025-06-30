import { calendarData } from '@/services/mockData/calendarData'

export const calendarService = {
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350))
    
    return [...calendarData]
  },
  
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return calendarData.find(event => event.Id === parseInt(id))
  },
  
  getByDate: async (date) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return calendarData.filter(event => {
      const eventDate = new Date(event.date)
      const targetDate = new Date(date)
      return eventDate.toDateString() === targetDate.toDateString()
    })
  }
}