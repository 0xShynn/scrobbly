import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from "@react-navigation/native";
import * as scrobblesActions from "../store/scrobblesActions";

import ListItemCover from "../components/ListItemCover";
import FlatListItemsCover from "../components/FlatListItemsCover";
import PeriodSelector from "../components/PeriodSelector";
import CustomHeaderTitle from "../components/CustomHeaderTitle";
import LoadingContainer from "../components/UI/LoadingContainer";
import ErrorContainer from "../components/UI/ErrorContainer";

import { periods } from "../utils/lastfm";

const TopAlbumsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [periodSelected, setPeriodSelected] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const topAlbums = useSelector((state) => state.scrobbles.topAlbums);
  const flatListRef = useRef();

  const getTopAlbumsHandler = useCallback(
    async (period) => {
      setIsLoading(true);
      setError(null);
      try {
        await dispatch(scrobblesActions.fetchUserTopAlbums(period, "30"));
      } catch (error) {
        setError(error.message);
      }
      setPeriodSelected(period);
      setIsLoading(false);
    },
    [dispatch]
  );

  const periodSelectorHandler = () => {
    return <PeriodSelector onSelect={getTopAlbumsHandler} />;
  };

  useEffect(() => {
    setIsFirstLoading(true);
    getTopAlbumsHandler(periods[0]).then(() => {
      setIsFirstLoading(false);
    });
  }, []);

  useScrollToTop(flatListRef);

  // Set the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <CustomHeaderTitle
          title="Top Albums"
          periodSelected={periodSelected.name}
          isRefreshing={isRefreshing}
          isLoading={isLoading}
        />
      ),
      headerRight: periodSelectorHandler,
    });
  }, [navigation, periodSelected, isLoading, isRefreshing]);

  const itemSelectHandler = useCallback(
    (artistName, albumName, albumArt, playcount) => {
      navigation.navigate("Album Details", {
        artistName,
        albumArt,
        albumName,
        topPlaycount: playcount,
      });
    },
    []
  );

  const listItem = ({ item }) => {
    return (
      <ListItemCover
        image={item.albumArt}
        title={item.albumName}
        subtitle={item.artistName}
        playcount={item.playcount}
        onSelect={() => {
          itemSelectHandler(
            item.artistName,
            item.albumName,
            item.albumArt,
            item.playcount
          );
        }}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
      />
    );
  };

  const onRefreshHandler = () => {
    setIsRefreshing(true);
    getTopAlbumsHandler(periodSelected).then(() => {
      setIsRefreshing(false);
    });
  };

  if (isFirstLoading) {
    return <LoadingContainer />;
  }

  if (error) {
    return <ErrorContainer error={error} />;
  }

  return (
    <FlatListItemsCover
      ref={flatListRef}
      data={topAlbums}
      renderItem={listItem}
      onRefresh={onRefreshHandler}
      isRefreshing={isRefreshing}
    />
  );
};

TopAlbumsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TopAlbumsScreen;
