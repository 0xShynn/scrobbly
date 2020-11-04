import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

class Album {
  constructor(artistName, albumName, albumArt, playCount) {
    this.id = uuidv4()
    this.artistName = artistName
    this.albumName = albumName
    this.albumArt = albumArt
    this.playCount = playCount
  }
}

export default Album
