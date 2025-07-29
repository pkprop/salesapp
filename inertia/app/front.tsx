/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/front/app.css';

import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = 'Porperty Xpo'

createInertiaApp({
  progress: { color: '#f29620' },
  title: (title) => `${title} | ${appName}`,
  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx'),
    )
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
});