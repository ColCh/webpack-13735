// this is index.js
import { myAppName } from './const/app-name';

console.log('app name is ', myAppName);

const iframe = document.createElement('iframe');
iframe.setAttribute('data-describe', 'chunk loading container');
document.body.appendChild(iframe);
iframe.contentDocument.open();
iframe.contentDocument.close();
const iframeWin = iframe.contentWindow;

iframeWin.DO_DYNAMIC_IMPORT = window.DO_DYNAMIC_IMPORT;
window.DO_DYNAMIC_IMPORT.target = iframeWin.document.body;

import(
    /* webpackChunkName: 'additional/logger' */
    './logger'
).then((logger) => {
    logger.log('log with logger FIRST TIME');

    // Just to show that logger chunk will be loaded ONLY ONCE
    import(
        /* webpackChunkName: 'additional/logger' */
        './logger'
    ).then((logger) => {
        logger.log('log with logger SECOND TIME, BUT CHUNK WAS NOT LOADED SECOND TIME');
    });
});


export {
    myAppName as name
};