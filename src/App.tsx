import { FC, useEffect, useState } from 'react';

import Loader from '@package:src/applications/widgets/Loader';
import ThemeCustomization from '@package:src/applications/themes/index';
import Routes from '@package:src/applications/routes';
import Locales from '@package:src/applications/widgets/Locales';
import NavigationScroll from '@package:src/applications/journey/layouts/NavigationScroll';
import { JWTProvider as AuthProvider } from '@package:src/common/contexts/JWTContext';
import Notistack from '@package:src/applications/widgets/notifi/Notistack';
import Snackbar from '@package:src/applications/widgets/notifi/Snackbar';

// ==============================|| APP ||============================== //
const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);

    /** init useEffect */
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 3000);
    }, []);

    if (!loading) return <Loader />;

    return (
        <ThemeCustomization>
            <Locales>
                <NavigationScroll>
                    <AuthProvider>
                        <>
                            <Notistack>
                                <Routes />
                                <Snackbar />
                            </Notistack>
                        </>
                    </AuthProvider>
                </NavigationScroll>
            </Locales>
        </ThemeCustomization>
    );
};

export default App;
