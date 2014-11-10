/**
 * Small Javascript Ajax file uploader.
 * @author Babykin Vadim <creativelink@ya.ru>
 */
var microUploader = (function(uploader) {
    'use strict';

    /**
     * Help function. Fast set attributes for element
     * @param el - element
     * @param attrs - attributes object
     */
    var setAttributes = function(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    };

    /**
     * Function for creating hidden IFRAME
     * @param uid - iframe unique id
     * @returns {HTMLElement} - new iframe element
     */
    var createFrame = function(uid) {
        var iframe = document.createElement('iframe');
        setAttributes(iframe, { "name": uid, "style": "display:none;" });
        return iframe;
    };

    /**
     * Creating hidden file input
     * @returns {HTMLElement} - new file input element
     */
    var createFileInput = function() {
        var fileInput =  document.createElement('input');
        setAttributes(fileInput, { "name": "file[]", "type": "file", "multiple": true });
        return fileInput;
    };

    /**
     * Creating hidden form with multipart content
     * @param uid - form unique id
     * @param url - url for POST-data
     * @returns {HTMLElement} - new FORM element
     */
    var createForm = function(uid, url) {
        var form = document.createElement('form');
        setAttributes(form, {
            "action": url,
            "method": "POST",
            "enctype": "multipart/form-data",
            "target": uid
        });
        return form;
    };

    /**
     * Creating hidden submit button element
     * @returns {HTMLElement} - submit element
     */
    var createSubmitButton = function() {
        var submit = document.createElement('input');
        submit.type = "submit";
        return submit;
    };

    /**
     * Binding function
     * @param params
     */
    uploader.attach = function(params) {
        var elem = params.element,
            url = params.url;
        var cbBefore = typeof(params.beforeCb) === "function" ? params.beforeCb : function() {};
        var cbDone = typeof(params.doneCb) === "function" ? params.doneCb : function() {};
        var cbError = typeof(params.errorCb) === "function" ? params.errorCb : function() {};
        var uid = (new Date().getTime()).toString(16);
        // Creating frame
        var iframe = createFrame(uid);
        // Creating new input field
        var fileInput =  createFileInput();
        // Creating submit button
        var submit = createSubmitButton();
        //Creating form and binding elements
        var form = createForm(uid, url);
        form.appendChild(fileInput).appendChild(submit);
        // Attach form to iframe
        iframe.appendChild(form);
        // Attach iframe to element
        elem.appendChild(iframe);

        // Bind events
        elem.addEventListener("click", function() { fileInput.click(); }, true);
        fileInput.addEventListener("change", function () {
            cbBefore();
            form.submit();
        }, true);

        iframe.addEventListener("load", function () {
            fileInput.value = '';
            var iframeContents = '';
            try {
                iframeContents = this.contentWindow.document.body.innerHTML;
            } catch(e) {
                cbError(e);
            }
            cbDone([iframeContents]);
        }, true);
    };
    return uploader;
})(microUploader || {});