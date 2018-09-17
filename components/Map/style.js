import { Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');

const headerBackground = '#262626';
const yellow = '#E3C463';
const label = '#000';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  searchWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '98%'
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8
  },
  searchText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    textAlign: 'left',
    color: '#989898'
  },
  buttonMenuWrapper: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 0,
    backgroundColor: '#333333',
    height: 100,
    position: 'absolute',
    top: '35%',
    width: 26,
    zIndex: 1,
    justifyContent: 'center'
  },
  buttonMenuIcon: {
    alignSelf: 'center',
    color: '#E3C463',
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    marginBottom: 20,
    position: 'absolute',
    right: 0
  },
  button: {
    backgroundColor: '#E3C463',
    borderRadius: 0,
    shadowColor: '#1F120D',
    width: '90%',
    justifyContent: 'center',
    shadowOffset: {
      width: -1,
      height: 3
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  buttonText: {
    color: '#1F120D',
    fontFamily: 'Nunito-Bold',
  },
  marker: {
    color: '#1F120D',
    fontSize: 50
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  header: {
    backgroundColor: headerBackground
  },
  iconLocate: {
    position: 'absolute',
    right: 14,
    top: 14
  },
  errorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 22,
    textAlign: 'center'
  },
  menuIcon: {
    color: yellow
  },
  fontText: {
    color: yellow,
    fontFamily: 'Nunito-Bold'
  },
  keyboard: {
    height: window.height
  },
  confirmContainer: {
    flex: 1,
    padding: 15
  },
  label: {
    color: label,
    fontFamily: 'Nunito-Bold'
  },
  buttonContinue: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default styles;
