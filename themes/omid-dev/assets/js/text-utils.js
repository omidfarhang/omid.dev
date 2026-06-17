export function decodeHtmlEntities(value) {
    const str = String(value || '');
    if (!str.includes('&')) return str;
    const doc = new DOMParser().parseFromString(`<!doctype html><body>${str}`, 'text/html');
    return doc.body.textContent || '';
}

export function stripHtml(value) {
    return String(value || '').replace(/<[^>]*>/g, '').trim();
}

export function prepareDisplayText(value) {
    return decodeHtmlEntities(stripHtml(value));
}

export function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
