import { useEffect, useState } from "react";
import getFormattedWeatherData from "../services/weatherService";
import Forecast from "./Forecast";
import Inputs from "./Inputs";
import TempuratureAndDetails from "./TempuratureAndDetails";
import TimeAndLocation from "./TimeAndLocation";
import TopButton from "./TopButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Body = () => {

    const [query, setQuery] = useState({q: 'delhi'});
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);

    
    useEffect(() => {
        const fetchWeather = async () => {
            const message = query.q ? query.q : 'current location.'

            toast.info(' Fetching Weather for ' + message)

             await getFormattedWeatherData({...query, units}).then((data) => {
                toast.success(`Successfully Weather  for ${data.name}, ${data.country}`)

                setWeather(data);
            });
        }
    
        fetchWeather();
    }, [query, units])

    const formatBackground = () => {
        if(!weather) return 'from-cyan-700 to-blue-700'
        const threshold = units === 'metric' ? 20 : 60
        if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
        return 'from-yellow-700 to-orange-700'
    }

    return (
        <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
            <TopButton setQuery={setQuery}/>
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
            <div>
                <TimeAndLocation weather={weather}/>
                <TempuratureAndDetails weather={weather}/>
                <Forecast title="Hourly Forecast" items= {weather.hourly}/>
                <Forecast title="Daily Forecast" items= {weather.daily}/>
            </div>
        )}

            
        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true}  />   


        </div>
    )
}

export default Body;