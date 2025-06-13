export default function handler(req, res) {
  // This endpoint receives the OAuth callback
  // The actual token exchange happens on the frontend
  const { code, error } = req.query
  
  if (error) {
    return res.redirect('/?error=' + encodeURIComponent(error))
  }
  
  if (code) {
    return res.redirect('/?code=' + encodeURIComponent(code))
  }
  
  res.redirect('/?error=no_code_received')
}