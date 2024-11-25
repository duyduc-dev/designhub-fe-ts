import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import { Bounce, ToastContainer } from 'react-toastify';

import i18n from '@/locale';
import RootRouter from '@/routes/index.jsx';

ClassNameGenerator.configure((componentName) =>
  componentName.replace('Mui', 'DesignHub'),
);

const App = () => {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID}
    >
      <I18nextProvider i18n={i18n}>
        <RootRouter />
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { direction: 'rtl' } }}
        />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </I18nextProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
