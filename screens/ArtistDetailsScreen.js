import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { TextH5, TitleH2 } from '../components/UI/Typography'
import { LinearGradient } from 'expo-linear-gradient'
import myColors from '../constants/myColors'
import { getArtistInfo, getTrackInfo } from '../utils/lastfm'
import { useSelector } from 'react-redux'

const ArtistDetailsScreen = ({ navigation, route }) => {
  const { artistName, artistImage } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [artistInfo, setArtistInfo] = useState()
  const username = useSelector((state) => state.auth.username)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await getArtistInfo(username, artistName)
        setArtistInfo(response)
      } catch (error) {
        // setError(error)
        setIsLoading(false)
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${artistName}`,
    })
  }, [navigation])

  return (
    // <ScrollView>
    //   <ImageBackground
    //     source={{ uri: artistImage }}
    //     style={styles.imageBackground}
    //   >
    //     <View style={styles.artistTitle}>
    //       <LinearGradient
    //         colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
    //         style={styles.itemGradientInfo}
    //       />
    //       <TitleH2 style={{ color: 'white' }}>{artistName}</TitleH2>
    //     </View>
    //   </ImageBackground>
    // </ScrollView>
    <View style={{ backgroundColor: myColors.dark_gray }}>
      <TextH5>ICI</TextH5>
    </View>
  )
}

export default ArtistDetailsScreen

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: 280,
  },
  artistTitle: {
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  itemGradientInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
    flex: 1,
  },
})
