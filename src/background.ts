import { getSelected } from "./dataStore";

function getCookies(domain: string): Promise<string> {
    return new Promise<string>(resolve => {
        chrome.cookies.getAll({ domain }, cookies => {
            resolve(Object.values(cookies).map(c => `${ c.name }=${ c.value }`).join(";"));
        });
    });
}

(() => {
    let cookies = "";
    let source = getSelected("source");
    let target = getSelected("target");

    function beforeSendHeaders(details: any) {
        details.requestHeaders.push({
            name: "Cookie",
            value: cookies,
        });
        return { requestHeaders: details.requestHeaders };
        console.log(`%cRequest ${ details.url } has been with cookie: ${ cookies }`, "color: green;");
    }

    function headersReceived(details: any) {
        details.responseHeaders.push({
            name: "Access-Control-Allow-Origin",
            value: "*",
        });
        getCookies(source || "").then(ck => {
            console.log(`%cUpdated domain(${ source }) cookies`, "color: blue;");
            cookies = ck;
        });
        return { responseHeaders: details.responseHeaders };
    }

    async function applyRequestModifier() {
        clearRequestModifier();

        source = getSelected("source");
        target = getSelected("target");

        if (!source || !target) return;

        cookies = await getCookies(source);

        chrome.webRequest.onBeforeSendHeaders.addListener(
            beforeSendHeaders,
            { urls: [`http://${ target }/*`, `https://${ target }/*`] },
            ["blocking", "requestHeaders", "extraHeaders"],
        );

        chrome.webRequest.onHeadersReceived.addListener(
            headersReceived,
            { urls: [`http://${ target }/*`, `https://${ target }/*`] },
            ["blocking", "responseHeaders", "extraHeaders"],
        );

        console.log(`%cNew applyRequestModifier is working! from '${ source }' to '${ target }'`, "color: green;");
    }

    function clearRequestModifier() {
        chrome.webRequest.onBeforeSendHeaders.removeListener(beforeSendHeaders);
        chrome.webRequest.onHeadersReceived.removeListener(headersReceived);
    }

    window.addEventListener("storage", () => {
        console.log(`%cStorage data has been updated`, "color: blue;");
        applyRequestModifier();
    });

    applyRequestModifier();
})();