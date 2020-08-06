

const verifyURL = (url) => {
    re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    if (re.test(url)){
        if (! url.includes('http://') && url.includes('www.')){
            return 'http://' + url
        } else {
            return url
        }
    }
    return false
    
}

let a = 'http://www.thing.com'
console.log(verifyURL(a))