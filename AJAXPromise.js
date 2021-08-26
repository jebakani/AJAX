let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Changed Called. Ready State:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            }
            else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType + " request sent to server");
    });
}
// calling promise call for GET method
const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true).then(responseText => {
    console.log("get user data:" + responseText)
}).catch(error => console.log("GET Error status:" + JSON.stringify(error)));

// calling promise call for delete method
const deleteURL = "http://127.0.0.1:3000/employees/13";
makePromiseCall("DELETE", deleteURL, true).then(responseText => {
    console.log("get deleted data:" + responseText)
}).catch(error => console.log("Delete Error status:" + JSON.stringify(error)));

// calling the promise call for post method
const postURL = "http://127.0.0.1:3000/employees";
const empData={ "name": "Harry", "salary": 65000};
makePromiseCall("POST", postURL, true, empData).then(responseText => {
    console.log("get Posted data:" + responseText)
}).catch(error => console.log("POST Error status:" + JSON.stringify(error)));