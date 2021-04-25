import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Text,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const DATA = [1, 2, 3, 4, 5, 6];

let CarouselLoop;

const Item = (props) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => Alert.alert('clickity')}>
        <Image
          style={styles.image}
          source={{
            uri: `https://picsum.photos/1440/2842?random=${props.title}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const Carousel = () => {
  const flatListRef = React.useRef({ scrollToIndex: () => {} });

  const renderItem = ({ item }) => {
    return <Item title={item} key={item} />;
  };

  let i = 0;

  const [state, setState] = React.useState(i);

  function scrollToIndex() {
    setState((prev) => (prev + 1) % DATA.length);
    /* global variable i is used because using state is sometimes not looping the carousel and sometimes loops it 30x a second */
    i = (i + 1) % DATA.length;
    flatListRef.current.scrollToIndex({ animated: true, index: i });
  }

  function enableAutoLoop() {
    CarouselLoop = setInterval(scrollToIndex, 1400);
    console.log(CarouselLoop);
  }

  function disableAutoLoop() {
    console.log(CarouselLoop);
    clearInterval(CarouselLoop);
  }

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          ref={flatListRef}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {DATA.map((item) => {
          if (item - 1 == state) {
            return <Icon name="dot-single" size={30} color="#000000" />;
          } else {
            return <Icon name="dot-single" size={30} color="#A9A9A9" />;
          }
        })}
      </View>
      <View>
        <Button
          onPress={enableAutoLoop}
          title="Enable Auto Loop"
          accessibilityLabel="Auto Loops Carousel - made just for you, you the person needing Aria Label"
        />
        <Button
          onPress={disableAutoLoop}
          title="Disable Auto Loop"
          color="#841584"
          accessibilityLabel="Disables auto looping"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: 28,
    marginHorizontal: 28,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 180,
    height: 246,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
