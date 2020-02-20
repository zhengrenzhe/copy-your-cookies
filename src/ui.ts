function removeListItem(address: string) {
    const ele = document.getElementById(address);
    ele?.remove();
}

function addListItem(address: string, target_type: string) {
    const tpl = document.getElementById("item-tpl")!.innerHTML;
    const htmlString = tpl
        .replace(/{{item_id}}/g, address)
        .replace(/{{value}}/g, address)
        .replace(/{{group_name}}/g, target_type);
    document.getElementById(target_type)!.innerHTML = document.getElementById(target_type)!.innerHTML + htmlString;
}

export { addListItem, removeListItem };