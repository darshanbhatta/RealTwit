import findAllUserContainers, { UserContainer } from './findAllUserContainers';

// use to not update too often
let debounceTimeout: NodeJS.Timeout | null = null;

export default function startObserver(callback: (foundContainers: UserContainer[]) => void): MutationObserver {
    const observer = new MutationObserver(mutations => {
        try {
            // look for new added nodes cellInnerDiv dataset testId
            let shouldUpdate = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node instanceof HTMLElement) {
                            // console.log('node', node);
                            // most containers have this
                            if (node.dataset.testid === 'cellInnerDiv') {
                                shouldUpdate = true;
                            }

                            // search results
                            if (node.dataset.testid === 'typeaheadResult') {
                                shouldUpdate = true;
                            }

                            // search dropdown
                            if (node.id === 'typeaheadDropdown-1' || node.id === 'typeaheadDropdown-2') {
                                shouldUpdate = true;
                            }

                            if (node.getAttribute('aria-label') === 'Who to follow') {
                                shouldUpdate = true;
                            }
                        }
                    });

                    if (!shouldUpdate) {
                        // look for HoverCard
                        shouldUpdate = (mutation.target as HTMLElement)?.id === 'layers';
                    }
                }
            });

            if (shouldUpdate) {
                if (debounceTimeout) clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    console.log('mutation detected, updating');
                    callback(findAllUserContainers());
                }, 100);
            }
        } catch (error) {
            console.error('encountered a mutation error', error);
        }
    });
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: false,
    });

    return observer;
}
