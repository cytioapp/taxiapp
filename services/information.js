import Api from '../utils/api';

const getActiveTrip = () => {
  let response = {
    user: null,
    driver: null
  };

  return new Promise(async (resolve, reject) => {
    try {
      let active_trip = await Api.get('/users/active_trip');

      if (active_trip.data && active_trip.data.active) {
        let { trip } = active_trip.data;
        let { id, address_origin, status, created_at, user_id } = trip;
        if (address_origin) {
          response.user = {
            user_id,
            trip_id: id,
            origin: address_origin,
            status,
            created_at
          };
        }
        if (trip.driver) {
          const { license_plate, model, year, organization } = trip.vehicle;
          response.driver = {
            driver_name: trip.driver.user.full_name,
            driver_id: trip.driver.id,
            organization,
            license_plate,
            model,
            year,
            phone_number: trip.driver.phone_number
          };
        }
        return resolve(response);
      }
    } catch (err) {
      return reject(err);
    }
  });
};

const parseTrip = tripInfo => {
  let trip = {
    driver_name: '',
    driver_id: null,
    organization: '',
    license_plate: '',
    model: '',
    year: '',
    phone_number: ''
  };

  if (tripInfo.driver) {
    let { driver, vehicle } = tripInfo;
    let { user, id, phone_number } = driver;
    let { organization, model, year, license_plate } = vehicle;
    trip = {
      driver_name: user.full_name,
      driver_id: id,
      organization,
      license_plate,
      model,
      year,
      phone_number
    };
  }
  let { status } = tripInfo;

  return { status, ...trip };
};

export { getActiveTrip, parseTrip };
