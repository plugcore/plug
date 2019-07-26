import { ServerOptions } from 'fastify';

export type TFastifySupportedOptions = Pick<ServerOptions, 
'caseSensitive' | 'ignoreTrailingSlash' | 'bodyLimit' | 'pluginTimeout' | 'disableRequestLogging' |
'onProtoPoisoning' | 'trustProxy' | 'maxParamLength' | 'modifyCoreObjects'>;

/**
 * Plug framework configuration file
 */
export interface IWebConfiguration {
    web?: TFastifySupportedOptions & {
        port?: number;
    };
}
