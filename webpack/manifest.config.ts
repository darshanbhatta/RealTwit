const NAME = 'RealTwit - See Real Twitter Blue Checkmarks';
const SHORT_NAME = 'realTwit';
const DESCRIPTION = "See who's really verified on Twitter";

/**
 * Creates a chrome extension manifest from the given version, mode, and
 * @param mode the build mode (development or production)
 * @param version a chrome extension version (not a semantic version)
 * @returns a chrome extension manifest
 */
export function getManifest(mode: Environment, browser: Browser, version: string): chrome.runtime.ManifestV3 {
    let name = mode === 'development' ? `${NAME} (dev)` : NAME;

    let manifest;

    if (browser === 'firefox' || browser === 'safari') {
        // possible to add safari support in the future
        throw new Error('Firefox and Safari are not supported');
    } else {
        manifest = {
            name,
            short_name: SHORT_NAME,
            description: DESCRIPTION,
            version,
            manifest_version: 3,
            // hardcode the key for development builds
            key: process.env.MANIFEST_KEY,
            permissions: ['storage', 'background'],
            host_permissions: ['https://*.twitter.com/*', 'https://realtwit.org/*'],
            background: {
                service_worker: 'static/js/background.js',
            },
            content_scripts: [
                {
                    matches: ['https://*.twitter.com/*', 'https://realtwit.org/*'],
                    css: ['/static/css/content.css'],
                    js: ['/static/js/content.js'],
                },
            ],
            web_accessible_resources: [
                {
                    resources: ['static/media/*', '*'],
                    matches: ['https://*.twitter.com/*', 'https://realtwit.com/*'],
                },
            ],
            icons: {
                128: `icons/icon_${mode}_128.png`,
            },
            action: {
                default_popup: 'popup.html',
            },
        } satisfies chrome.runtime.ManifestV3;
    }

    return manifest;
}
