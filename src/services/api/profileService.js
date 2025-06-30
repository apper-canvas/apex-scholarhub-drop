export const profileService = {
  getProfile: async () => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "date_of_birth" } },
          { field: { Name: "address" } },
          { field: { Name: "roll_number" } },
          { field: { Name: "grade" } },
          { field: { Name: "section" } },
          { field: { Name: "academic_year" } },
          { field: { Name: "admission_date" } },
          { field: { Name: "house" } },
          { field: { Name: "guardian_name" } },
          { field: { Name: "guardian_phone" } },
          { field: { Name: "guardian_email" } },
          { field: { Name: "guardian_relation" } },
          { field: { Name: "total_subjects" } },
          { field: { Name: "attendance" } },
          { field: { Name: "overall_grade" } },
          { field: { Name: "class_rank" } },
          { field: { Name: "total_credits" } },
          { field: { Name: "gpa" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('profile', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (!response.data || response.data.length === 0) {
        return null
      }
      
      const profileRecord = response.data[0]
      
      return {
        Id: profileRecord.Id,
        name: profileRecord.Name || '',
        email: profileRecord.email || '',
        phone: profileRecord.phone || '',
        dateOfBirth: profileRecord.date_of_birth || '',
        address: profileRecord.address || '',
        rollNumber: profileRecord.roll_number || '',
        grade: profileRecord.grade || '',
        section: profileRecord.section || '',
        academicYear: profileRecord.academic_year || '',
        admissionDate: profileRecord.admission_date || '',
        house: profileRecord.house || '',
        guardianName: profileRecord.guardian_name || '',
        guardianPhone: profileRecord.guardian_phone || '',
        guardianEmail: profileRecord.guardian_email || '',
        guardianRelation: profileRecord.guardian_relation || '',
        stats: {
          totalSubjects: profileRecord.total_subjects || 0,
          attendance: profileRecord.attendance || 0,
          overallGrade: profileRecord.overall_grade || '',
          classRank: profileRecord.class_rank || 0,
          totalCredits: profileRecord.total_credits || 0,
          gpa: profileRecord.gpa || 0
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  },
  
  updateProfile: async (updatedData) => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const updateRecord = {
        Id: updatedData.Id,
        Name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        date_of_birth: updatedData.dateOfBirth,
        address: updatedData.address,
        guardian_name: updatedData.guardianName,
        guardian_phone: updatedData.guardianPhone,
        guardian_email: updatedData.guardianEmail
      }
      
      const params = {
        records: [updateRecord]
      }
      
      const response = await apperClient.updateRecord('profile', params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          throw new Error('Failed to update profile')
        }
        
        return response.results[0].data
      }
      
      return updatedData
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }
}