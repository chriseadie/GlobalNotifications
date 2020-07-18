(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    window.CustomEvent = CustomEvent;
})();

function DJNotify(params) {
    this.container = null;
    this.allEvents = [];
    this.timeout = params.timeout;
}
DJNotify.prototype.init = function () {
    var messageContainer = document.createElement("div");
    messageContainer.setAttribute("id", "messenges")
    var messages = this.allEvents;
    var timeout = this.timeout;
    this.container = messageContainer
    document.querySelector("body").insertBefore(messageContainer, document.querySelector("body").children[0])
    this.container.addEventListener("addMessage", function (e) {
        messages.push(e)
        DJNotify.prototype.renderMessages(messageContainer, messages);
        DJNotify.prototype.messageDisplayTimeout(messageContainer, messages, timeout)
    })
}

DJNotify.prototype.Notify = function (params) {
    const event = new CustomEvent("addMessage", {
        bubbles: true,
        detail: {
            type: params.type,
            text: params.text
        }
    });
    this.container.dispatchEvent(event);
}

DJNotify.prototype.renderMessages = function (container, messages) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    messages.forEach(function (item) {
        var para = document.createElement("div")
        para.classList.add("alert")
        para.classList.add("alert-" + item.detail.type)
        para.textContent = item.detail.text;
        container.appendChild(para)
    })
}

DJNotify.prototype.messageDisplayTimeout = function (container, messages, time) {
    setTimeout(function () {
        messages.splice(0, 1)
        DJNotify.prototype.renderMessages(container, messages)
    }, time)
}
