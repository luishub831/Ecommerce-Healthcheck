export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get access token from cookie
  const accessToken = req.cookies.ga_access_token
  console.log("accessToken ", accessToken)
  const { accountName } = req.query
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token found. Please authenticate first.' })
  }

  try {
    
    
    // Get first account's properties
    const propertiesResponse = await fetch(
      `https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:${accountName}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    const propertiesData = await propertiesResponse.json()
    console.log("propertiesData ", propertiesData) 
    //  console.log("propertiesData ", propertiesData) 
    if (!propertiesData.properties || propertiesData.properties.length === 0) {
      return res.status(404).json({ error: 'No GA4 properties found' })
    }

    // Use the first property
    const propertyId = propertiesData.properties[0].name.split('/')[1]
    console.log("propertyId ", propertyId) 

    // Calculate date range (last 90 days)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 90)

    const formatDate = (date) => {
      return date.toISOString().split('T')[0]
    }

    // Fetch analytics data using GA4 Data API
    const analyticsResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [
            {
              startDate: formatDate(startDate),
              endDate: formatDate(endDate),
            },
          ],
          metrics: [
            { name: 'sessions' },
            { name: 'conversions' },
            { name: 'totalRevenue' },
            { name: 'transactions' },
          ],
        }),
      }
    )
    console.log("analyticsResponse ", analyticsResponse)
    if (!analyticsResponse.ok) {
      throw new Error('Failed to fetch analytics data')
    }

    const analyticsData = await analyticsResponse.json()

    // Process the data
    let sessions = 0
    let conversions = 0
    let totalRevenue = 0
    let transactions = 0

    if (analyticsData.rows && analyticsData.rows.length > 0) {
      const row = analyticsData.rows[0]
      sessions = parseInt(row.metricValues[0].value) || 0
      conversions = parseInt(row.metricValues[1].value) || 0
      totalRevenue = parseFloat(row.metricValues[2].value) || 0
      transactions = parseInt(row.metricValues[3].value) || 0
    }

    // Calculate metrics
    const conversionRate = sessions > 0 ? ((conversions / sessions) * 100).toFixed(2) : '0.00'
    const averageOrderValue = transactions > 0 ? Math.round(totalRevenue / transactions) : 0

    res.json({
      conversionRate: parseFloat(conversionRate),
      averageOrderValue: averageOrderValue,
      sessions: sessions,
      conversions: conversions,
      totalRevenue: totalRevenue,
      transactions: transactions,
      dateRange: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    res.status(500).json({ 
      error: 'Failed to fetch analytics data',
      details: error.message 
    })
  }
}