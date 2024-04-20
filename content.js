chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "detectInfoBox") {
        const infoBoxes = document.querySelectorAll("th.infobox-label");
        const infoBoxContent = Array.from(infoBoxes).map(th => {
            const td = th.nextElementSibling;
            return {
                label: th.textContent,
                data: td ? td.textContent : ""
            };
        });
        sendResponse(infoBoxContent);
    }
});
