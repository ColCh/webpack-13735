// https://webpack.js.org/api/module-variables/#__webpack_chunk_load__-webpack-specific
const origChunkLoad = __webpack_chunk_load__;

// incercept mapping from webpackConfig.output.chunkFilename
__webpack_chunk_load__ = (chunkId) => {
    // uncomment for debug:
    // console.log(
    //     '__webpack_chunk_load__: '+
    //     `chunkId is -> "${chunkId}" and chunkFilename is "${__webpack_get_script_filename__(chunkId)}"`
    // );

    // we are using webpack getChunkScriptFilename here
    // https://github.com/webpack/webpack/blob/c181294865dca01b28e6e316636fef5f2aad4eb6/lib/RuntimeGlobals.js#L191
    // it's exported to runtime via __webpack_get_script_filename__
    // https://github.com/webpack/webpack/blob/c181294865dca01b28e6e316636fef5f2aad4eb6/lib/APIPlugin.js#L78-L83
    window.DO_DYNAMIC_IMPORT.chunkIdToFilename[chunkId] = __webpack_get_script_filename__(chunkId);
    window.DO_DYNAMIC_IMPORT.chunkFilenameToId[__webpack_get_script_filename__(chunkId)] = chunkId;

    return origChunkLoad(chunkId);
};

// this is webpackConfig.output.globalObject
window.DO_DYNAMIC_IMPORT = (chunkRelPath) => {
    const scriptEl = document.createElement('script');

    // e.g. './foo/bar.js' -> 'foo/bar.js'
    const chunkFilename = chunkRelPath.replace(/^\.\//, '');

    const chunkId = window.DO_DYNAMIC_IMPORT.chunkFilenameToId[chunkFilename];
    console.assert(Boolean(chunkId), 'chunkId should be defined');

    window.DO_DYNAMIC_IMPORT.scriptsToChunkIds[chunkId] = scriptEl;

    scriptEl.src = __webpack_public_path__ + chunkRelPath;

    scriptEl.setAttribute('data-chunkPath', chunkRelPath);
    scriptEl.setAttribute('data-chunkId', chunkId);

    window.DO_DYNAMIC_IMPORT.target.appendChild(scriptEl);

    return new Promise((resolve, reject) => {
        scriptEl.onload = () => {
            // as for polyfill,
            // https://github.com/GoogleChromeLabs/dynamic-import-polyfill/blob/5ae321654a96c5e99b23b7cdabe10bc6159caaaa/initialize.mjs#L51-L52
            // and
            // https://github.com/GoogleChromeLabs/dynamic-import-polyfill/blob/5ae321654a96c5e99b23b7cdabe10bc6159caaaa/initialize.mjs#L63
            resolve(scriptEl.exports);
        };
        scriptEl.onerror = () => {
            reject();
        };
    });
};
window.DO_DYNAMIC_IMPORT.target = document.head;

window.DO_DYNAMIC_IMPORT.modules = {};

window.DO_DYNAMIC_IMPORT.scriptsToChunkIds = {};
window.DO_DYNAMIC_IMPORT.chunkIdToFilename = {};
window.DO_DYNAMIC_IMPORT.chunkFilenameToId = {};

// used by webpackConfig.output.chunkLoadingGlobal
// Source: https://github.com/webpack/webpack/blob/c181294865dca01b28e6e316636fef5f2aad4eb6/lib/javascript/ArrayPushCallbackChunkFormatPlugin.js#L72-L80
window.DO_DYNAMIC_IMPORT.modules.push = (data) => {
    const [chunkIds, modules] = data;

    console.assert(chunkIds.length === 1, 'chunkIds > 1 is not handled');

    const [ chunkId ] = chunkIds;
    const chunkScript = window.DO_DYNAMIC_IMPORT.scriptsToChunkIds[chunkId];
    console.assert(Boolean(chunkScript), 'chunkScript should be defined');

    // import() expects that for resolve()
    // https://github.com/webpack/webpack/blob/f7766875bc22b2869f8c23900b98ac21361711e7/lib/esm/ModuleChunkLoadingRuntimeModule.js#L144
    chunkScript.exports = {
        ids: chunkIds,
        modules,
    };
};