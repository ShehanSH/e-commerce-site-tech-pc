import { useGeolocated } from "react-geolocated";
import Weather from './Weather';
import WeatherForcast from "./WeatherForcast";


 const HomePage = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
      useGeolocated({
          positionOptions: {
              enableHighAccuracy: false,
          },
          userDecisionTimeout: 5000,
      });

  return !isGeolocationAvailable ? (
      <div className="flex justify-center font-lexendG mt-10">Your browser does not support Geolocation
      </div>

  ) : !isGeolocationEnabled ? (
      <div className="flex justify-center font-lexendG mt-10">Geolocation is not enabled
      </div>

  ) : coords ? (

    <div className="bg-cyan-600 justify-center flex flex-col font-lexendG">
      <Weather latitude={coords.latitude} longitude={coords.longitude} />
      <div className="flex justify-center"> <p className="justify-center flex"> latitude: {coords.latitude} , longtitude = {coords.longitude}</p>
      </div>

      <WeatherForcast latitude={coords.latitude} longitude={coords.longitude}/>
      </div>

  ) : (

      <div className="flex justify-center font-lexendG mt-10">Getting the location data&hellip; </div>
  );
};

export default HomePage;
