uploader = function() {} 

uploader.prototype.setAttributes = function(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

uploader.prototype.createFrame = function(uid) {
   var iframe = document.createElement('iframe');
   this.setAttributes(iframe, { "name": uid, "style": "display:none;" })
   return iframe;
}

uploader.prototype.createFileInput = function() {
   var fileInput =  document.createElement('input');
   this.setAttributes(fileInput, { "name": "file[]", "type": "file", "multiple": true });
   return fileInput;
}

uploader.prototype.createForm = function(uid, url) {
   var form = document.createElement('form');
   this.setAttributes(form, { "action": url, "method": "POST", "enctype": "multipart/form-data", "target": uid });
   return form;
}

uploader.prototype.createSubmitButton = function() {
   var submit = document.createElement('input');  
   submit.type = "submit";
   return submit;
}

uploader.prototype.setUploader = function (elem, url, beforeCallback, doneCallback, errorCallback) {
    var cbBefore = typeof(beforeCallback) === "function" ? beforeCallback : function() {};
    var cbDone = typeof(doneCallback) === "function" ? doneCallback : function() {};
    var cbError = typeof(errorCallback) === "function" ? errorCallback : function() {};
    var uid = (new Date().getTime()).toString(16);
    // Создаем фрейм
    var iframe = this.createFrame(uid); 
    // Создаем файловый инпут
    var fileInput =  this.createFileInput();
    // Создаем кнопку сабмита
    var submit = this.createSubmitButton();
    // Создаем форму и прявязываем к ней элементы
    var form = this.createForm(uid, url);
    form.appendChild(fileInput).appendChild(submit);
    // Помещаем форму в iframe
    iframe.appendChild(form);
    // добавляем iframe к элементу
    elem.appendChild(iframe);
    
    // Привязываем события
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
}

createUploader = function(p) {
    p.elementId = document.getElementById(p.elementId);
    if (p.elementId === "undefined")
        throw('Element not found!');
    if (p.url === "undefined" || p.url == "")
        throw('Url is not valid!');
    var _uploader = new uploader();
    _uploader.setUploader(p.elementId, p.url, p.onBeforeSend, p.onComplete, p.onError);
}