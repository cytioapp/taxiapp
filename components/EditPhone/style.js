import { Dimensions, StyleSheet } from 'react-native';

const headerBackground = '#262626';
const yellow = '#E3C463';
const label = '#000';
const text = '#5C5C5C';
const textBackground = '#F3F3F3';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  keyboard: {
    height: window.height
  },
  fontText: {
    color: yellow,
    fontFamily: 'Nunito-Bold'
  },
  header: {
    backgroundColor: headerBackground
  },
  leftHeader: {
    flex: 1
  },
  bodyHeader: {
    alignItems: 'center',
    flex: 2
  },
  rightHeader: {
    flex: 1
  },
  menuIcon: {
    color: yellow
  },
  container: {
    flex: 1
  },
  darkFieldWrapper: {
    backgroundColor: textBackground,
    padding: 10
  },
  item: {
    alignItems: 'flex-start',
    flex: 1
  },
  label: {
    color: label,
    fontFamily: 'Nunito-Bold'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    color: text,
    fontFamily: 'Nunito-Bold',
    fontSize: 17,
    height: 50,
    width: '100%'
  },
  buttonWrapper: {
    margin: 40
  },
  button: {
    backgroundColor: yellow,
    borderRadius: 0
  },
  buttonDisabled: {
    backgroundColor: '#EADAA9',
    borderRadius: 0
  },
  buttonText: {
    color: label,
    fontFamily: 'Nunito-Bold',
    fontWeight: '500'
  },
  phoneInfo: {
    paddingHorizontal: 15,
    paddingTop: 10,
    marginLeft: 20,
  },
  phoneInfoText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    fontWeight: '300'
  }
})

export default styles;
