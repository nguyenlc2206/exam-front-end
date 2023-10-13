import { useMemo, ReactNode } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';

// project import
import useConfig from '@package:src/common/hooks/useConfig';
import Palette from '@package:src/applications/themes/palette';
import Typography from '@package:src/applications/themes/typography';
import componentStyleOverrides from '@package:src/applications/themes/compStyleOverride';

import customShadows from '@package:src/applications/themes/shadows';

// types
import { CustomShadowProps } from '@package:src/common/types/default-theme';

interface Props {
    children: ReactNode;
}

const ThemeCustomization = ({ children }: Props) => {
    const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = useConfig();

    const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

    const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );

    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
        () => customShadows(navType, theme),
        [navType, theme]
    );

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            direction: rtlLayout ? 'rtl' : 'ltr',
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '16px',
                    '@media (min-width: 600px)': {
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [rtlLayout, theme, themeCustomShadows, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = useMemo(
        () => componentStyleOverrides(themes, borderRadius, outlinedFilled),
        [themes, borderRadius, outlinedFilled]
    );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeCustomization;
