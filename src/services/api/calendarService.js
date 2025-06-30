export const calendarService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "date" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } }
        ],
        orderBy: [{ fieldName: "date", sorttype: "ASC" }]
      }
      
      const response = await apperClient.fetchRecords('calendar_event', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return (response.data || []).map(event => ({
        Id: event.Id,
        title: event.title || event.Name,
        date: event.date,
        type: event.type || 'event',
        description: event.description || ''
      }))
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  },
  
  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "date" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } }
        ]
      }
      
      const response = await apperClient.getRecordById('calendar_event', parseInt(id), params)
      
      if (!response.success || !response.data) {
        return null
      }
      
      const event = response.data
      return {
        Id: event.Id,
        title: event.title || event.Name,
        date: event.date,
        type: event.type || 'event',
        description: event.description || ''
      }
    } catch (error) {
      console.error('Error fetching calendar event by ID:', error)
      return null
    }
  },
  
  getByDate: async (date) => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "date" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } }
        ],
        where: [
          { FieldName: "date", Operator: "EqualTo", Values: [date] }
        ]
      }
      
      const response = await apperClient.fetchRecords('calendar_event', params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return (response.data || []).map(event => ({
        Id: event.Id,
        title: event.title || event.Name,
        date: event.date,
        type: event.type || 'event',
        description: event.description || ''
      }))
    } catch (error) {
      console.error('Error fetching calendar events by date:', error)
      return []
    }
  }
}