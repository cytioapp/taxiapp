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
  header: {
    backgroundColor: '#262626'
  },
  title: {
    paddingLeft: 0,
    color: '#e3c463'
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
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusText: {
    color: secondaryColor,
    fontWeight: '700',
    fontFamily: 'Nunito-Regular',
    paddingLeft: 10
  },
  origin: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f3f3f3'
  },
  pinIcon: {
    color: '#5c5c5c',
    fontSize: 40,
  },
  originText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontWeight: '600',
    color: '#5c5c5c',
    paddingRight: 20,
    textAlign: 'center'
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
  driverImageWrapper: {
    alignItems: 'center',
    padding: 10
  },
  driverImage: {
    borderRadius: 60,
    height: 120,
    width: 120
  },
  driverLabel: {
    fontFamily: 'Nunito-Bold',
    color: '#5c5c5c',
    marginTop: 5
  },
  driverName: {
    fontFamily: 'Nunito-Regular',
    color: '#5c5c5c'
  },
  vehicleWrapper: {
    flexDirection: 'row',
    paddingLeft: 40,
    paddingRight: 40
  },
  vehicleCol: {
    flex: 1
  },
  vehicleLabel: {
    fontFamily: 'Nunito-Bold',
    color: '#383738'
  },
  vehicleText: {
    fontFamily: 'Nunito-Regular',
    color: '#818181'
  },
  callDriverWrapper: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  callDriverButton: {
    width: '90%',
    marginTop: 30,
    backgroundColor: '#73b639',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 0
  },
  callText: {
    fontFamily: 'Nunito-Bold',
  },
  phoneIcon: {
    marginRight: 0
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
