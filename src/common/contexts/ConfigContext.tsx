import { createContext, FC, ReactNode } from 'react';

// project import
import defaultConfig from '@package:src/config';
import useLocalStorage from '@package:src/common/hooks/useLocalStorage';

// types
// import { PaletteMode } from '@mui/material';
import { CustomizationProps } from '@package:src/common/types/config';

// initial state
const initialState: CustomizationProps = {
    ...defaultConfig,
    onChangeLocale: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
    children: ReactNode;
};

const ConfigProvider = ({ children }: ConfigProviderProps) => {
    const [config, setConfig] = useLocalStorage('quiz-system-config-ts', {
        layout: initialState.layout,
        drawerType: initialState.drawerType,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        presetColor: initialState.presetColor,
        locale: initialState.locale,
        rtlLayout: initialState.rtlLayout
    });

    const onChangeLocale = (locale: string) => {
        setConfig({
            ...config,
            locale
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeLocale
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};

export { ConfigProvider, ConfigContext };
