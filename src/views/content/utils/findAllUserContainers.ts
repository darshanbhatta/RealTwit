export type UserContainer = {
    username: string;
    element: HTMLElement;
};

export default function findAllUserContainers(): UserContainer[] {
    const userContainers = [findFromTweets, findFromDM, findFromNotifications, findFromSearch, findFromHoverCard]
        .map(fn => fn())
        .flat();
    console.log('userContainers', userContainers);
    return userContainers;
}

function findFromTweets(): UserContainer[] {
    const userContainers = document.querySelectorAll('[data-testid="User-Name"]');
    const userContainer2 = document.querySelectorAll('[data-testid="UserName"]');
    return [...Array.from(userContainers), ...Array.from(userContainer2)]
        .map(element => {
            // find username in a tag with
            const aTag = element.querySelector('a');
            if (aTag) {
                const href = aTag?.getAttribute('href') || '';
                return { username: getUsernameFromString(href), element: aTag.parentElement?.parentElement };
            }

            // find username in span tag
            const spanTags = element.querySelectorAll('span');
            if (spanTags.length > 1) {
                // go through all the span and get the one that is trutjy fpr getUsernameFromString
                const username = Array.from(spanTags)
                    .map(span => getUsernameFromString(span.textContent || ''))
                    .filter(Boolean)[0];
                return { username, element: spanTags[0].parentElement?.parentElement };
            }

            return { username: '', element };
        })
        .filter(obj => obj.username && obj.element) as UserContainer[];
}

function findFromDM(): UserContainer[] {
    // use data-testid="conversation" then get the a tag and get the href then get the username container span (first one)
    const userContainers = document.querySelectorAll('[data-testid="conversation"]');
    return Array.from(userContainers)
        .map(element => {
            // find username in a tag
            const aTag = element.querySelector('a');
            if (!aTag) {
                // find username in span tag
                const spanTags = element.querySelectorAll('span');
                if (spanTags.length > 1) {
                    // go through all the span and get the one that is trutjy fpr getUsernameFromString
                    const username = Array.from(spanTags)
                        .map(span => getUsernameFromString(span.textContent || ''))
                        .filter(Boolean)[0];
                    return { username, element: spanTags[0].parentElement?.parentElement };
                }
            }
            const username = getUsernameFromString(aTag?.getAttribute('href') || '');
            if (username.startsWith('messages/')) return { username: '', element };
            // find username in span tag
            const spanTag = element.querySelector('span');
            if (spanTag) {
                return { username, element: spanTag.parentElement?.parentElement };
            }

            return { username: '', element };
        })
        .filter(obj => obj.username && obj.element) as UserContainer[];
}

function findFromNotifications(): UserContainer[] {
    if (!isInPage('/notifications')) return [];

    // find each container article role="article"
    const userContainers = document.querySelectorAll('article[role="article"]');
    return Array.from(userContainers)
        .map(element => {
            // find username in a tag
            const aTags = element.querySelectorAll('a');
            // find the one that has a span inside
            const aTag = Array.from(aTags).find(a => a.querySelector('span'));
            return {
                username: getUsernameFromString(aTag?.getAttribute('href') || ''),
                element: aTag,
            };
        })
        .filter(obj => obj.username && obj.element) as UserContainer[];
}

function findFromSearch(): UserContainer[] {
    const userContainers = document.querySelectorAll('[data-testid="UserCell"]');
    const typeaheadUserContainers = document.querySelectorAll('[data-testid="TypeaheadUser"]');
    return [...Array.from(userContainers), ...Array.from(typeaheadUserContainers)]
        .map(element => {
            // get last div in the element

            const lastDiv = (element.lastElementChild?.tagName === 'DIV' && element.lastElementChild) as HTMLElement;
            const queryElement = lastDiv?.textContent !== 'Promoted' ? lastDiv : element;
            // find username in span
            const spanTags = queryElement.querySelectorAll('span');
            if (spanTags.length > 1) {
                // go through all the span and get the one that is trutjy fpr getUsernameFromString
                const username = Array.from(spanTags)
                    .map(span => getUsernameFromString(span.textContent || ''))
                    .filter(Boolean)[0];
                return { username, element: spanTags[0].parentElement?.parentElement };
            }
            return { username: '', element };
        })
        .filter(obj => obj.username && obj.element) as UserContainer[];
}

function findFromHoverCard(): UserContainer[] {
    // find all HoverCard divs
    const userContainers = document.querySelectorAll('[data-testid="HoverCard"]');
    return Array.from(userContainers)
        .map(element => {
            // find username in a tag
            const aTags = element.querySelectorAll('a');
            // find the one that has a span inside
            const aTag = Array.from(aTags).find(a => a.querySelector('span'));
            return {
                username: getUsernameFromString(aTag?.getAttribute('href') || ''),
                element: aTag?.querySelector('div'),
            };
        })
        .filter(obj => obj.username && obj.element) as UserContainer[];
}

function getUsernameFromString(str: string): string {
    if (str.startsWith('/') || str.startsWith('@')) {
        return str.substring(1);
    }
    return '';
}

function isInPage(page: string): boolean {
    return window.location.pathname.includes(page);
}
