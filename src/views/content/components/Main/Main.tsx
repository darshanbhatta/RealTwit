import React, { useEffect } from 'react';
import './Main.scss';
import ReactDOMServer from 'react-dom/server';
import { bMessenger } from 'src/shared/messages';
import { useTabMessage } from 'src/views/hooks/useTabMessage';
import findAllUserContainers, { UserContainer } from '../../utils/findAllUserContainers';
import startObserver from '../../utils/startObserver';
import BlueCheck from '../BlueCheck/BlueCheck';
import PaidCheck from '../PaidCheck/Paid';

let containers: UserContainer[] = [];
/**
 *
 */
export function Main(): JSX.Element {
    useTabMessage('reAnalyzePage', () => {
        console.log('reAnalyzePage');
        containers = [];
        setTimeout(() => {
            callback(findAllUserContainers());
        }, 500);
    });

    async function callback(foundContainers: UserContainer[]) {
        // check which containers are new by equality check on element
        // if new, add to state otherwise do nothing
        const newContainers = foundContainers.filter(
            newContainer => !containers.some(container => container.element.isEqualNode(newContainer.element))
        );

        console.log('new containers', newContainers);

        const usernameMap = await bMessenger.isVerifiedUserBulk({
            usernames: newContainers.map(container => container.username),
        });

        // in every new container inject the blue check
        newContainers.forEach(container => {
            // check if the container already has a blue check data-testid="icon-verified"
            const hasBlueCheck = container.element.querySelector('[data-testid="icon-verified"]');
            console.log(container.username, hasBlueCheck);
            const blueCheckParent = hasBlueCheck?.parentElement;
            if (hasBlueCheck) {
                // remove the blue check to add our own
                hasBlueCheck.remove();
            }
            const legacyBlueCheck = usernameMap[container.username];
            if (!legacyBlueCheck && !hasBlueCheck) {
                return;
            }

            // check if there is a div with class realtwit-blue-check and delete it
            const oldBlueCheck = container.element.querySelector('.realtwit-blue-check');
            if (oldBlueCheck) {
                oldBlueCheck.remove();
                console.log('removed old blue check', oldBlueCheck);
            }

            const blueCheck = document.createElement('div');
            blueCheck.className = 'realtwit-blue-check';
            blueCheck.innerHTML = ReactDOMServer.renderToString(legacyBlueCheck ? <BlueCheck /> : <PaidCheck />);
            if (blueCheckParent) blueCheckParent.insertAdjacentHTML('afterbegin', blueCheck.outerHTML);
            else container.element.appendChild(blueCheck);
        });

        containers = [...containers, ...newContainers];
    }

    useEffect(() => {
        // time to test the messenger
        callback(findAllUserContainers());
        const observer = startObserver(callback);

        return () => {
            observer.disconnect();
        };
    }, []);

    return <div />;
}
