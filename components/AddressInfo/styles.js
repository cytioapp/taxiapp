import {StyleSheet} from 'react-native';

const primaryColor = '#E3C463';
const secondaryColor = '#1F120D';
const terniaryColor = '#F6F6F6';

const styles = StyleSheet.create({
  container:{
    backgroundColor: terniaryColor,
    flex: 1,
  },
  body: {
    flex: 2
  },
  title: {
    paddingLeft: 0
  },
  cancelButtonWrapper: {
    flex: 1
  },
  cancelButton: {
    alignSelf: 'center'
  },
  cancelText: {
    color: terniaryColor,
    fontFamily: 'Nunito-Bold'
  },
  statusWrapper: {
    borderColor: secondaryColor,
    borderRadius: 30,
    borderWidth: 0.5,
    marginHorizontal: 110,
    marginVertical: 10
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  circleStatus: {
    borderRadius: 50,
    height: 20,
    width: 20
  },
  statusText: {
    color: secondaryColor,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 10
  },
  origin: {
    flexDirection: 'row',
    padding: 10
  },
  pinIcon: {
    color: secondaryColor,
    fontSize: 40
  },
  originText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    paddingLeft: 15,
    paddingRight: 20
  },
  driverCardWrapper: {
    marginTop: 10,
    padding: 10
  },
  driverCard: {
  },
  driverCardHeader: {
    flexDirection: 'row'
  },
  driverName: {
    color: secondaryColor,
    fontFamily: 'Nunito-Bold'
  },
  driverImageWrapper: {
    alignItems: 'center',
    padding: 10
  },
  driverImage: {
    borderRadius: 10,
    height: 60,
    width: 60
  },
  driverInfoBody: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  driverInfoWrapper: {
    flexDirection: 'row',
    marginBottom: 10
  },
  label: {
    fontFamily: 'Nunito-Italic'
  },
  driverInfo: {
    fontFamily: 'Nunito-Italic'
  },
  taxiIcon: {
    height: 25,
    width: 25
  },
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: terniaryColor,
    fontFamily: 'Nunito-Bold'
  },
  messageWrapper: {
    paddingBottom: 15
  },
  message: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  messageText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    paddingRight: 10,
    paddingLeft: 15,
    textAlign: 'right'
  },
  spinner: {
    marginRight: 15
  }
});

export default styles;
