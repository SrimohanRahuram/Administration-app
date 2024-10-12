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

  input: {
    height: 60,
    marginTop: 20,
    width: '90%',
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderRadius:1,
    borderColor:Colors.black
  },

  button: {
    marginTop: 30,
    width: '90%',
    height: 60,
    backgroundColor: Colors.black,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
