document.querySelectorAll<HTMLInputElement>(".add").forEach(ele => {
    ele.addEventListener<"keydown">("keydown", function ({ key }) {
        if (key !== "Enter") return;

        const value = this.value!;
        const target_type = this.getAttribute("data-type")!;

        const appendResult = appendAddress(value, target_type);

        if (!appendResult) {
            return;
        }

        addListItem(value, target_type);

        this.value = "";
    });
});

document.body.addEventListener("click", ({ target }) => {
    if ((<HTMLSpanElement> target).classList.contains("remove")) {
        const id = (<HTMLSpanElement> target).getAttribute("data-id")!;
        const type = (<HTMLSpanElement> target).getAttribute("data-type")!;
        removeListItem(id);
        removeAddress(id, type);
    }
});

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

(() => {
    getAddresses("source").forEach(address => {
        addListItem(address, "source");
    });
    getAddresses("target").forEach(address => {
        addListItem(address, "target");
    });
})();