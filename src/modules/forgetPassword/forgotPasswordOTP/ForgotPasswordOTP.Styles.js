import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  progressView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 5,
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: '10%',
  },

  segment: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  segmentFilled: {
    backgroundColor: Colors.red,
  },

  separator: {
    width: 5,
  },
  image: {
    alignSelf: 'center',
    height: 250,
    width: 250,
  },
  middleView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainText: {
    color: Colors.black,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  subText: {
    marginTop: 10,
    color: Colors.black,
    fontSize: 17,
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
  },

  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },

  underlineStyleBase: {
    width: 55,
    height: 50,
    borderWidth: 4,
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    color: Colors.gray,
    fontSize: 18,
    borderRadius: 5,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.black,
  },
});

export default styles;
