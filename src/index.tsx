import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Styles/index.css';
import App, { IAppProps } from './Components/App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const urlParams = new URLSearchParams(window.location.search);

const props: IAppProps = {
    place: urlParams.get('place'),
    placeLabel: urlParams.get('placeLabel'),
    dayShift: parseInt(urlParams.get('dayShift') || ''),
}

root.render(
  <React.StrictMode>
    <App {...props}/>
  </React.StrictMode>
);
