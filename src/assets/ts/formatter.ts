export const formatLocaleString = (v: string, collection: string) =>
    `${collection}${(parseInt(v.replace(/[^0-9]/g, ''), 10) || 0).toLocaleString()}`;
export const parseLocaleString = (v: string) =>
    (parseInt(v.replace(/[^0-9]/g, ''), 10) || 0).toString();
