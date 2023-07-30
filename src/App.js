import { useState } from 'react';
import './App.css';
import { Timer } from './components/timer';
import { LengthControl } from './components/length-control';
import {
  AppWrapper,
  LengthWrapper,
  MainWrapper,
  OverlayWrapper,
} from './styled';

import TimerContext from './timer-context';
import Navbar from './components/navbar';
import { appData } from './context/data';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { themes } from './themes/theme';
import { SpotifyEmbed } from './components/spotifyEmbed';

function App() {
  
  const { t } = useTranslation();
  const [data, setData] = useState(appData);
  const backgroundImage = themes.find(
    (theme) => theme.id === data.currentTheme.value
  )?.backgroundImage;

  const updateData = (newData) => {
    setData(newData);
  };
  return (
    <ThemeProvider
      theme={themes.find((theme) => theme.id === data.currentTheme.value)}
    >
      <TimerContext.Provider value={{ data, updateData }}>
        <AppWrapper backgroundImage={backgroundImage}>
          <Navbar />
          <MainWrapper>
            <LengthWrapper>
              <LengthControl title={t('sessionLength')} type="session" />
              <LengthControl title={t('breakLength')} type="break" />
            </LengthWrapper>
            <Timer />
          </MainWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: -20,
              zIndex: 3,
              position: 'relative',
            }}
          >
            <SpotifyEmbed />
          </div>
          <OverlayWrapper />
        </AppWrapper>
      </TimerContext.Provider>
    </ThemeProvider>
  );
}

export default App;
