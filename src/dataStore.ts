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

function updateSelected(address: string | null, target_type: string) {
    if (!address) {
        localStorage.removeItem(`select-${ target_type }`);
    } else {
        localStorage.setItem(`select-${ target_type }`, address);
    }
}

function getSelected(target_type: string) {
    return localStorage.getItem(`select-${ target_type }`);
}

export { getAddresses, appendAddress, removeAddress, updateSelected, getSelected };