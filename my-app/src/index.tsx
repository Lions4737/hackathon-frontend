import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/auth/AuthContext'; // ✅ 追加

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ App全体をAuthContextでラップ */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
