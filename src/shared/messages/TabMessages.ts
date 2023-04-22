/**
 * This is a type with all the message definitions that can be sent TO specific tabs
 */
export default interface TAB_MESSAGES {
    /** used to tell the tab that the page has updated and to reanalyze (useful for single page sites) */
    reAnalyzePage: (data: { url: string }) => void;
}
