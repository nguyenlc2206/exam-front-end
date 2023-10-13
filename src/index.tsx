import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import App from '@package:src/App';
import { BASE_PATH } from '@package:src/config';
import { Provider } from 'react-redux';
import { persister, store } from '@package:src/common/redux/store';
import { ConfigProvider } from '@package:src/common/contexts/ConfigContext';

// style + assets
import '@package:src/assets/scss/style.scss';
import reportWebVitals from '@package:src/reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <ConfigProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
