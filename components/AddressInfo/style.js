import { StyleSheet } from 'react-native';

const primaryColor = '#E3C463';
const secondaryColor = '#1F120D';
const terniaryColor = '#F6F6F6';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 2
  },
  header: {
    backgroundColor: '#262626'
  },
  menuIcon: {
    fontSize: 34
  },
  title: {
    paddingLeft: 0,
    color: '#e3c463'
  },
  cancelButtonWrapper: {
    flex: 1
  },
  cancelButton: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 30
  },
  cancelText: {
    color: '#fb000c',
    textDecorationLine: 'underline',
    fontFamily: 'Nunito-Bold'
  },
  statusWrapper: {
    borderColor: secondaryColor,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
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
    paddingRight: 20,
    backgroundColor: '#f3f3f3'
  },
  pinIcon: {
    color: '#5c5c5c',
    fontSize: 40
  },
  originText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontWeight: '600',
    color: '#5c5c5c',
    paddingRight: 20
  },
  driverCardWrapper: {
    marginTop: 10,
    padding: 10
  },
  driverCard: {},
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
    paddingHorizontal: 40
  },
  vehicleCol: {
    flex: 1
  },
  vehicleLabel: {
    fontFamily: 'Nunito-Bold',
    color: '#383738',
    textAlign: 'center'
  },
  vehicleText: {
    fontFamily: 'Nunito-Regular',
    color: '#818181',
    textAlign: 'center'
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
    fontFamily: 'Nunito-Bold'
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
    alignItems: 'center'
  },
  mainMessageText: {
    flex: 1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    paddingRight: 50,
    paddingLeft: 50,
    textAlign: 'center'
  },
  message: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 10
  },
  messageText: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    paddingRight: 10,
    paddingLeft: 15,
    textAlign: 'center'
  },
  spinner: {
    marginRight: 15
  },
  newServiceWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  newServiceButton: {
    borderRadius: 0,
    width: '90%',
    justifyContent: 'center'
  },
  newServiceText: {
    fontFamily: 'Nunito-Bold'
  },
  waitingTaxiImg: {
    height: 200,
    width: 300
  }
});

export default styles;
