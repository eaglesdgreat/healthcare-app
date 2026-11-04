/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import path from 'path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg?react',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/auth': {
          target: env.VITE_API_GATEWAY_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/test/setup.ts',
            css: true,
            include: ['src/**/*.test.{ts,tsx}'],
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
          },
        },
      ],
    },
  }
})
