import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

class Track {
  constructor(
    artistName,
    artistId,
    trackName,
    albumImage640,
    albumImage300,
    duration,
    playCount,
    rank
  ) {
    this.id = uuidv4()
    this.artistName = artistName
    this.artistId = artistId
    this.trackName = trackName
    this.albumImage640 = albumImage640
    this.albumImage300 = albumImage300
    this.duration = duration
    this.playCount = playCount
    this.rank = rank
  }
}

export default Track
