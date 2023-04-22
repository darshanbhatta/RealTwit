import React, { useEffect } from 'react';
import './Main.scss';
import ReactDOMServer from 'react-dom/server';
import { bMessenger } from 'src/shared/messages';
import { useTabMessage } from 'src/views/hooks/useTabMessage';
import findAllUserContainers, { UserContainer } from '../../utils/findAllUserContainers';
import startObserver from '../../utils/startObserver';
import BlueCheck from '../BlueCheck/BlueCheck';
import PaidCheck from '../PaidCheck/Paid';

/** cache of previously found containers to prevent duplicate processing */
let containers: UserContainer[] = [];

/**
 *
 */
export function Main(): JSX.Element {
    // fires whenever the user navigates to a new page, twitter is a single page app so this is needed
    useTabMessage('reAnalyzePage', () => {
        console.log('reAnalyzePage');
        containers = [];
        setTimeout(() => {
            callback(findAllUserContainers());
        }, 500);
    });

    /**
     * Callback for newly found containers. We can use this to inject our blue check or paid check
     * @param foundContainers - newly found containers
     */
    async function callback(foundContainers: UserContainer[]) {
        // looking for new containers that we haven't processed yet
        const newContainers = foundContainers.filter(
            newContainer => !containers.some(container => container.element.isEqualNode(newContainer.element))
        );

        console.log('new containers', newContainers);

        // finding out who is verified in the list of new containers
        const usernameMap = await bMessenger.isVerifiedUserBulk({
            usernames: newContainers.map(container => container.username),
        });

        // in every new container inject the blue check
        newContainers.forEach(container => {
            // check if the container already has a blue check data-testid="icon-verified"
            const hasBlueCheck = container.element.querySelector('[data-testid="icon-verified"]');

            // used for edge case with Twitter accounts that have organization badges
            const blueCheckParent = hasBlueCheck?.parentElement;

            // if they have a blue check, we need to remove it to inject our own
            if (hasBlueCheck) {
                hasBlueCheck.remove();
            }

            const legacyBlueCheck = usernameMap[container.username];

            // if they are not verified in any way, don't inject anything (i.e no twitter blue or legacy blue)
            if (!legacyBlueCheck && !hasBlueCheck) {
                return;
            }

            // check if we already injected our own blue check and remove it
            const oldBlueCheck = container.element.querySelector('.realtwit-blue-check');
            if (oldBlueCheck) {
                oldBlueCheck.remove();
                console.log('removed old blue check', oldBlueCheck);
            }

            // create a div with our blue/paid check
            const blueCheck = document.createElement('div');
            blueCheck.className = 'realtwit-blue-check';
            blueCheck.innerHTML = ReactDOMServer.renderToString(legacyBlueCheck ? <BlueCheck /> : <PaidCheck />);

            if (blueCheckParent) {
                blueCheckParent.insertAdjacentHTML('afterbegin', blueCheck.outerHTML);
            } else {
                container.element.appendChild(blueCheck);
            }
        });

        // add the new containers to the cache
        containers = [...containers, ...newContainers];
    }

    useEffect(() => {
        // on start to find all the containers and process them
        callback(findAllUserContainers());

        // start observing the dom for changes for new lazy loaded containers
        const observer = startObserver(callback);

        return () => {
            observer.disconnect();
        };
    }, []);

    return <div />;
}
