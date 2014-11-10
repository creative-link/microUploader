microUploader
=========

Small Javascript Ajax file uploader.


Usage
--------------
 - Connect library

```html
    <script type="text/javascript" src="microuploader.js"></script>
```

 - Call **microUploader.attach** with parameters

```javascript
    var opts = {
        element: document.getElementById('your_element_id'),
        url: 'http://your_url.com/uploadLink/',
        beforeCb: function() {
            console.log('before callback');
        },
        doneCb: function(data) {
            console.log('done callback: '+data);
        },
        errorCb: function(error) {
            console.log(error);
        }
    };

    microUploader.attach(opts);
```