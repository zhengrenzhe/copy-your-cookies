import { appendAddress, getAddresses, removeAddress } from "./dataStore";
import { addListItem, removeListItem } from "./ui";

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


getAddresses("source").forEach(address => {
    addListItem(address, "source");
});

getAddresses("target").forEach(address => {
    addListItem(address, "target");
});
