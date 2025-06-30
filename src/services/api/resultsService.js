export const resultsService = {
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
          { field: { Name: "exam_name" } },
          { field: { Name: "date" } },
          { field: { Name: "total_marks" } },
          { field: { Name: "grade" } },
          { field: { Name: "subjects" } }
        ],
        orderBy: [{ fieldName: "date", sorttype: "DESC" }]
      }
      
      const response = await apperClient.fetchRecords('result', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return (response.data || []).map(result => ({
        Id: result.Id,
        examName: result.exam_name || result.Name,
        date: result.date,
        totalMarks: result.total_marks || 0,
        grade: result.grade || '',
        subjects: result.subjects ? JSON.parse(result.subjects) : []
      }))
    } catch (error) {
      console.error('Error fetching results:', error)
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
          { field: { Name: "exam_name" } },
          { field: { Name: "date" } },
          { field: { Name: "total_marks" } },
          { field: { Name: "grade" } },
          { field: { Name: "subjects" } }
        ]
      }
      
      const response = await apperClient.getRecordById('result', parseInt(id), params)
      
      if (!response.success || !response.data) {
        return null
      }
      
      const result = response.data
      return {
        Id: result.Id,
        examName: result.exam_name || result.Name,
        date: result.date,
        totalMarks: result.total_marks || 0,
        grade: result.grade || '',
        subjects: result.subjects ? JSON.parse(result.subjects) : []
      }
    } catch (error) {
      console.error('Error fetching result by ID:', error)
      return null
    }
  },
  
  getByExamName: async (examName) => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "exam_name" } },
          { field: { Name: "date" } },
          { field: { Name: "total_marks" } },
          { field: { Name: "grade" } },
          { field: { Name: "subjects" } }
        ],
        where: [
          { FieldName: "exam_name", Operator: "Contains", Values: [examName] }
        ]
      }
      
      const response = await apperClient.fetchRecords('result', params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return (response.data || []).map(result => ({
        Id: result.Id,
        examName: result.exam_name || result.Name,
        date: result.date,
        totalMarks: result.total_marks || 0,
        grade: result.grade || '',
        subjects: result.subjects ? JSON.parse(result.subjects) : []
      }))
    } catch (error) {
      console.error('Error fetching results by exam name:', error)
      return []
    }
  }
}