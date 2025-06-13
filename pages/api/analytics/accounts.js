export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const accessToken = req.cookies.ga_access_token
  if (!accessToken) {
    return res.status(401).json({ error: 'No access token found. Please authenticate first.' })
  }
  try {
    const accountsResponse = await fetch(
      'https://analyticsadmin.googleapis.com/v1beta/accounts',
      {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      }
    )
    if (!accountsResponse.ok) {
      throw new Error('Failed to fetch GA accounts')
    }
    const accountsData = await accountsResponse.json()
    res.json(accountsData.accounts || [])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}