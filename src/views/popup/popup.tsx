import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { bMessenger } from 'src/shared/messages';
import styles from './popup.module.scss';

const logo = chrome.runtime.getURL('/icons/icon_production_128.png');
const demo = 'https://i.imgur.com/KHWxBan.mp4';

const Popup = () => {
    useEffect(() => {}, []);

    return (
        <div>
            <div className={styles.container}>
                <img className={styles.logo} src={logo} />
                <h1>RealTwit</h1>
            </div>
            <div className={styles.videoContainer}>
                <video className={styles.video} autoPlay loop muted playsInline src={demo} />
                <div className={styles.textContainer}>
                    <span className={styles.text}>See who&apos;s really verified</span>
                </div>
            </div>
            <div className={styles.textContainer}>
                <button
                    className={styles.button}
                    onClick={async () => {
                        await bMessenger.openNewTab({ url: 'https://twitter.com' });
                        window.close();
                    }}
                >
                    Try it out
                </button>
            </div>
        </div>
    );
};

render(<Popup />, document.getElementById('root'));
