import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

class Scrobble {
  constructor(
    artistName,
    trackName,
    albumName,
    albumArt,
    isNowPlaying,
    playcount,
    date
  ) {
    this.id = uuidv4()
    this.artistName = artistName
    this.trackName = trackName
    this.albumName = albumName
    this.albumArt = albumArt
    this.isNowPlaying = isNowPlaying
    this.playcount = playcount
    this.date = date
  }
}

export default Scrobble
