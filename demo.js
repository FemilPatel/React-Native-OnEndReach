import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const demo = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);

  useEffect(() => {
    setisLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    const apiUrl =
      'https://jsonplaceholder.typicode.com/photos?-limit=10&_page=1' +
      pageCurrent;

    fetch(apiUrl)
      .then(res => res.json())
      .then(resJson => {
        // setdata(resJson);
        setdata(data.concat(resJson));
        setisLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemRow}>
        <Image source={{uri: item.url}} style={styles.itemImage} />
        <Text style={styles.itenText}>{item.title}</Text>
        <Text style={styles.itenText}>{item.id}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setpageCurrent(pageCurrent + 1);
    setisLoading(true);
  };

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itenText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
