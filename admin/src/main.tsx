import '~/assets/less/global.less';
import '~/services/i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import App from '~/App';
import {BrowserRouter as Router} from "react-router-dom";

// import { config } from 'dotenv';


const rootDiv = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
ReactDOM.createRoot(rootDiv).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
