import './App.css';
import { TileLayer, MapContainer} from 'react-leaflet'
import { Resize, ResizeHorizon } from "react-resize-layout";
import React , { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import L from 'leaflet';

import Comp_Table from "./components/table";
import RoutingMachine from './components/routingMachine';

function App (props) {
    const [maxZoom , setMaxZoom] = useState(13);
    const [maxBounds , setMaxBounds] = useState([
      [-90, -180],
      [90, 180]
    ]);
    const coords = useSelector(state=>state.coords);
    const [bounds , setbounds] = useState([
      {
        lat: 53.100745405144245,
        lng: 24.510498046875
      },
      {
        lat: 53.100745405144245,
        lng: 36.48315429687501
      },
      {
        lat: 54.55916341529184,
        lng: 36.48315429687501
      },
      {
        lat: 54.55916341529184,
        lng: 24.510498046875
      }
    ]);
    const rMachine = useRef();
    const waypoints = [
      L.latLng(...coords.from),
      L.latLng(...coords.to)
    ]
    
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, []);

    useEffect(() => {
      if (rMachine.current) {
        rMachine.current.setWaypoints(waypoints);
      }
    }, [coords, rMachine]);
    
    return (
          <div className="App">
            <Resize>
              <ResizeHorizon
                width={"30%"}
                minWidth={"30%"}
                className={"containerLeft"}
              >
                <Comp_Table/>
              </ResizeHorizon>
              <ResizeHorizon
                width={"70%"}
                minWidth={"70%"}
                className={"containerCenter"}
              >
      
                  <MapContainer
                    className="simpleMap"
                    scrollWheelZoom={true}
                    bounds={bounds}
                    maxZoom={maxZoom}
                    style={{ height: '100vh', width: '100ww' }}
                    maxBounds={maxBounds}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                      attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
                    />
                    <RoutingMachine ref={rMachine}/>
                  </MapContainer>
              </ResizeHorizon>
            </Resize>
          </div>
        );
}

export default App;