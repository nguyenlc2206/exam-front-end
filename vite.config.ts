import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    if (command === 'serve') {
        return {
            // dev specific config
            plugins: [react({ include: '**/*.tsx' })],
            resolve: {
                alias: [{ find: '@package:src', replacement: path.resolve(__dirname, 'src') }]
            },
            define: {
                'process.env.APP_API_URL': JSON.stringify(env.APP_API_URL)
            }
        };
    } else {
        // command === 'build'
        return {
            // build specific config
            plugins: [react({ include: '**/*.tsx' })],
            resolve: {
                alias: [{ find: '@package:src', replacement: path.resolve(__dirname, 'src') }]
            }
        };
    }
});
