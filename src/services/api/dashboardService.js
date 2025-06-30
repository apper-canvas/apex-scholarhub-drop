export const dashboardService = {
  getDashboardData: async () => {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Get dashboard stats
      const statsParams = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "total_subjects" } },
          { field: { Name: "upcoming_events" } },
          { field: { Name: "overall_grade" } },
          { field: { Name: "attendance" } }
        ]
      }
      
      const statsResponse = await apperClient.fetchRecords('dashboard_stats', statsParams)
      
      // Get recent results
      const resultsParams = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "subject" } },
          { field: { Name: "exam_name" } },
          { field: { Name: "grade" } },
          { field: { Name: "marks" } },
          { field: { Name: "total_marks" } },
          { field: { Name: "date" } }
        ],
        orderBy: [{ fieldName: "date", sorttype: "DESC" }],
        pagingInfo: { limit: 4, offset: 0 }
      }
      
      const resultsResponse = await apperClient.fetchRecords('recent_result', resultsParams)
      
      // Get upcoming events
      const eventsParams = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "date" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } }
        ],
        orderBy: [{ fieldName: "date", sorttype: "ASC" }],
        pagingInfo: { limit: 5, offset: 0 }
      }
      
      const eventsResponse = await apperClient.fetchRecords('upcoming_event', eventsParams)
      
      // Process responses
      const stats = statsResponse.success && statsResponse.data?.length > 0 ? statsResponse.data[0] : {}
      const recentResults = resultsResponse.success ? resultsResponse.data || [] : []
      const upcomingEvents = eventsResponse.success ? eventsResponse.data || [] : []
      
      return {
        student: {
          Id: 1,
          name: "Student",
          grade: "10",
          section: "A",
          rollNumber: "2024001",
          email: "student@school.edu",
          photoUrl: ""
        },
        stats: {
          totalSubjects: stats.total_subjects || 8,
          upcomingEvents: stats.upcoming_events || upcomingEvents.length,
          overallGrade: stats.overall_grade || "A",
          attendance: stats.attendance || 92
        },
        recentResults: recentResults.map(result => ({
          Id: result.Id,
          subject: result.subject || result.Name,
          examName: result.exam_name || 'Exam',
          grade: result.grade || 'A',
          marks: result.marks || 0,
          totalMarks: result.total_marks || 100,
          date: result.date || new Date().toISOString().split('T')[0]
        })),
        upcomingEvents: upcomingEvents.map(event => ({
          Id: event.Id,
          title: event.title || event.Name,
          date: event.date || new Date().toISOString().split('T')[0],
          type: event.type || 'event',
          description: event.description || ''
        }))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }
}