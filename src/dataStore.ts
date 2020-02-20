function appendAddress(address: string, target_type: string) {
    const data = getAddresses(target_type);
    if (data.includes(address) || address.length === 0) return false;
    data.push(address);
    localStorage.setItem(target_type, JSON.stringify(data));
    return true;
}

function removeAddress(address: string, target_type: string) {
    const data = getAddresses(target_type);
    const index = data.findIndex(addr => addr === address);
    if (index !== -1) data.splice(index, 1);
    localStorage.setItem(target_type, JSON.stringify(data));
}

function getAddresses(target_type: string): string[] {
    try {
        return JSON.parse(localStorage.getItem(target_type)! || "[]");
    } catch (_) {
        return [];
    }
}

export { getAddresses, appendAddress, removeAddress };