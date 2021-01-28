
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

import ErrorHandler from './ErrorHandler.js';
import * as PACKAGE from '../package.json';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

if(env === 'prod' && window.location.host === 'app.xgqfrms.com') {
    // 仅用于 prod 环境
    Sentry.init({
        environment: `${env === 'prod' ? '生产环境' : '测试环境'}`,
        ignoreErrors: ['ResizeObserver loop limit exceeded'],
        release: `${PACKAGE.name}@${PACKAGE.version}`,
        dsn: 'https://10101010101010101010@sentry.xgqfrms.com//2020',
        integrations: [new VueIntegration({Vue, attachProps: true, logErrors: true})],
    });
}

const errorHandler = new ErrorHandler('vue_error');

Vue.config.errorHandler = (err, vm, info) => errorHandler.onError(err, vm, info);

