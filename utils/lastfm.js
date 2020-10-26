export const baseUrl = 'https://ws.audioscrobbler.com/2.0/'
export const api_key = process.env.LASTFM_API_KEY
export const emptyImage =
  'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'

export const periods = [
  { duration: '7day', name: 'Last 7 days' },
  { duration: '1month', name: 'Last 1 month' },
  { duration: '3month', name: 'Last 3 months' },
  { duration: '6month', name: 'Last 6 months' },
  { duration: '12month', name: 'Last 12 months' },
  { duration: 'overall', name: 'All time' },
]
