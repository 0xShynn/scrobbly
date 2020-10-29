import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

class Artist {
  constructor(artistName, artistImage640, artistImage300, playCount) {
    this.id = uuidv4()
    this.artistName = artistName
    this.artistImage640 = artistImage640
    this.artistImage300 = artistImage300
    this.playCount = playCount
  }
}

export default Artist
