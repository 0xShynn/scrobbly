import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

class Album {
  constructor(artistName, albumName, albumArt640, albumArt300, playCount) {
    this.id = uuidv4()
    this.artistName = artistName
    this.albumName = albumName
    this.albumArt640 = albumArt640
    this.albumArt300 = albumArt300
    this.playCount = playCount
  }
}

export default Album
