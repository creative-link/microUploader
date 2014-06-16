microUploader
=========

Small Javascript Ajax file uploader.


Usage
--------------
 - Connect library

```html
    <script type="text/javascript" src="microuploader.js"></script>
```

 - Call **createUploader** with parameters

```javascript
    var params = {
        elementId: 'your_element_id',
        url: 'http://your_url.com/uploadLink/',
        onBeforeSend: function() { 
            console.log('before callback'); 
        },
        onComplete: function(data) { 
            console.log('done callback: '+data); 
        },
        onError: function(error) { 
            console.log(error); 
        }
    }
    
    createUploader(params);
```