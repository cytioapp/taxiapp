import { StyleSheet } from 'react-native';

const headerBackground = '#262626';
const yellow = '#E3C463';
const label = '#000';
const text = '#5C5C5C';
const textBackground = '#F3F3F3';

const styles = StyleSheet.create({
  keyboard: {
    flex: 1
  },
  fontText: {
    color: yellow,
    fontFamily: 'Nunito-Bold'
  },
  header: {
    backgroundColor: headerBackground,
    flexDirection: 'column',
    height: 'auto'
  },
  headerTop: {
    flexDirection: 'row'
  },
  leftHeader: {
    flex: 1
  },
  rightHeader: {
    flex: 1
  },
  editButton: {
    padding: 0
  },
  menuIcon: {
    color: yellow,
    fontSize: 34,
    padding: 0
  },
  headerBottom: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15
  },
  profilePhotoWrapper: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 65,
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 65
  },
  profilePhoto: {
    alignSelf: 'center',
    borderRadius: 31,
    height: 62,
    width: 62
  },
  rowWrapper: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  driverInfoWrapper: {
    marginRight: 60
  },
  name: {
    color: 'white',
    fontFamily: 'Nunito-Bold',
    fontSize: 20
  },
  email: {
    color: 'white',
    fontFamily: 'Nunito',
    fontSize: 15
  },
  phoneNumber: {
    color: 'white',
    fontFamily: 'Nunito',
    fontSize: 15
  },
  container: {
    flex: 1
  },
  darkFieldWrapper: {
    backgroundColor: textBackground,
    padding: 10
  },
  fieldWrapper: {
    padding: 10
  },
  label: {
    color: label,
    fontFamily: 'Nunito-Bold'
  },
  text: {
    color: text,
    fontFamily: 'Nunito-Regular',
    marginVertical: 5
  },
  noTaxiMessageWrapper: {
    alignItems: 'center',
    marginVertical: 15
  }
});

export default styles;
