class Track {
  constructor(
    artistName,
    trackName,
    albumImage640,
    albumImage300,
    duration,
    playCount
  ) {
    this.artistName = artistName
    this.trackName = trackName
    this.albumImage640 = albumImage640
    this.albumImage300 = albumImage300
    this.duration = duration
    this.playCount = playCount
  }
}

export default Track
