/**
 * html encode a string (e.g. to prevent xss attacks)
 * @param {String} str 
 * @returns html encoded string
 */
export function htmlEncode(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}