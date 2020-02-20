function removeListItem(address: string) {
    const ele = document.getElementById(address);
    ele?.remove();
}

function addListItem(address: string, target_type: string, selected = false) {
    const tpl = document.getElementById("item-tpl")!.innerHTML;
    const htmlString = tpl
        .replace(/{{item_id}}/g, address)
        .replace(/{{value}}/g, address)
        .replace(/{{group_name}}/g, target_type)
        .replace(/{{checked}}/, selected ? `checked="checked"` : "");
    document.getElementById(target_type)!.innerHTML = document.getElementById(target_type)!.innerHTML + htmlString;
}

function updateState(source: string | null, target: string | null) {
    if (source && target) {
        document.getElementById("state")!.innerHTML = `(°∀°)ﾉ ${ target } 发送的请求会携带 ${ source } 相同API的Cookies`;
    } else {
        document.getElementById("state")!.innerHTML = `ヽ(\`Д´)ﾉ 缺少Cookies来源选项或目标选项`;
    }
}

export { addListItem, removeListItem, updateState };