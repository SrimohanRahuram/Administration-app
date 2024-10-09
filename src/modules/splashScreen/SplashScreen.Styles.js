import {StyleSheet, Dimensions} from 'react-native';
const imageAspectRatio = 1080 / 872;
// const SCREEN_WIDTH = Dimensions.get('window').width;
const scaledWidth = Dimensions.get('window').width;
const scaledHeight = scaledWidth / imageAspectRatio;
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor:Colors.white
  },
  image: {
    alignSelf: 'center',
    height: 250,
    width: 250,
  },
  largeImage: {
    width: scaledWidth,
    height: scaledHeight,
    position: 'absolute',
    bottom: 0,
  },
});

export default styles;
