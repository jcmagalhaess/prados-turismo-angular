export function removeNulls(obj: any): any {
    const isArray = obj instanceof Array;
    for (const k in obj) {
        const valueField = obj[k];
        if (valueField instanceof File) {
            continue;
        }
        if (valueField === null || valueField === undefined || valueField === '') {
            isArray ? obj.splice(k as any, 1) : delete obj[k];
        } else if (typeof valueField === 'object') {
            removeNulls(valueField);
        }
    }
    return obj;
}