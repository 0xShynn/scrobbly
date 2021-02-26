import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

class Album {
  constructor(
    artistName,
    albumName,
    albumArt,
    releaseYear,
    totalTracks,
    totalTracksWord,
    playcount
  ) {
    this.id = uuidv4();
    this.artistName = artistName;
    this.albumName = albumName;
    this.albumArt = albumArt;
    this.releaseYear = releaseYear;
    this.totalTracks = totalTracks;
    this.totalTracksWord = totalTracksWord;
    this.playcount = playcount;
  }
}

export default Album;
