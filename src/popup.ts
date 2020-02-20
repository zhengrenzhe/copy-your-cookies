import { appendAddress, getAddresses, getSelected, removeAddress, updateSelected } from "./dataStore";
import { addListItem, removeListItem, updateState } from "./ui";

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
        updateSelected(null, type);
        updateState(getSelected("source"), getSelected("target"));
    }
});

document.body.addEventListener("change", ({ target }) => {
    if ((<HTMLInputElement> target).type === "radio") {
        const id = (<HTMLSpanElement> target).getAttribute("data-value")!;
        const type = (<HTMLSpanElement> target).getAttribute("name")!;
        updateSelected(id, type);
        updateState(getSelected("source"), getSelected("target"));
    }
});

const sourceSelected = getSelected("source");
const targetSelected = getSelected("target");


getAddresses("source").forEach(address => {
    addListItem(address, "source", address === sourceSelected);
});

getAddresses("target").forEach(address => {
    addListItem(address, "target", address === targetSelected);
});

updateState(sourceSelected, targetSelected);