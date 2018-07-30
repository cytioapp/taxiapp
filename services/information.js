import Api from '../utils/api';

const getActiveTrip = () => {
  let response = {
    user: null,
    driver: null
  };

  return new Promise(async (resolve, reject) => {
    let active_trip = await Api.get('/users/active_trip');

    if (active_trip.data && active_trip.data.active) {
      let { id } = active_trip.data.trip;
      let trip = await Api.get(`/trips/${id}`);
      let { address_origin, status, created_at } = trip.data;
      if (address_origin) {
        response.user = {
          user_id: trip.data.user_id,
          trip_id: id,
          origin: address_origin,
          status,
          created_at
        };
      }
      if (trip.data.driver) {
        const { id } = trip.data.driver;
        const { license_plate, model, year, organization } = trip.data.vehicle;
        response.driver = {
          driver_name: trip.data.driver.user.full_name,
          driver_id: id,
          organization,
          license_plate,
          model,
          year,
        };
      }
      return resolve(response);
    }
  })
}

export { getActiveTrip };
