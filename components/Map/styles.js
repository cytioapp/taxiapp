import { StyleSheet } from 'react-native';

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
    paddingTop: 20,
    position: 'absolute',
    top: 0,
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
    backgroundColor: '#1F120D',
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
    backgroundColor: '#262626'
  }
});

export default styles;
