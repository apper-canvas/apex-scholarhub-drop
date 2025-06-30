export const syllabusService = {
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
          { field: { Name: "code" } },
          { field: { Name: "teacher" } },
          { field: { Name: "syllabus" } },
          { field: { Name: "resources" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('syllabus_subject', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return (response.data || []).map(subject => ({
        Id: subject.Id,
        name: subject.Name,
        code: subject.code || '',
        teacher: subject.teacher || '',
        syllabus: subject.syllabus ? subject.syllabus.split('\n').filter(topic => topic.trim()) : [],
        resources: subject.resources ? subject.resources.split('\n').map(resource => {
          const parts = resource.split('|')
          return {
            name: parts[0] || resource,
            type: parts[1] || 'pdf'
          }
        }).filter(resource => resource.name.trim()) : []
      }))
    } catch (error) {
      console.error('Error fetching syllabus subjects:', error)
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
          { field: { Name: "code" } },
          { field: { Name: "teacher" } },
          { field: { Name: "syllabus" } },
          { field: { Name: "resources" } }
        ]
      }
      
      const response = await apperClient.getRecordById('syllabus_subject', parseInt(id), params)
      
      if (!response.success || !response.data) {
        return null
      }
      
      const subject = response.data
      return {
        Id: subject.Id,
        name: subject.Name,
        code: subject.code || '',
        teacher: subject.teacher || '',
        syllabus: subject.syllabus ? subject.syllabus.split('\n').filter(topic => topic.trim()) : [],
        resources: subject.resources ? subject.resources.split('\n').map(resource => {
          const parts = resource.split('|')
          return {
            name: parts[0] || resource,
            type: parts[1] || 'pdf'
          }
        }).filter(resource => resource.name.trim()) : []
      }
    } catch (error) {
      console.error('Error fetching syllabus subject by ID:', error)
      return null
    }
  }
}