let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType,url,callback,async=true,data=null)
{
    return new Promise(function(resolve,reject){
        let xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            console.log("State Changed Called. Ready State:"+xhr.readyState+" status:"+xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$'))
            {
                resolve(xhr.responseText);
            }
            else if(xhr.status.toString().match('^[4,5][0-9]{2}$'))
            {
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType,url,async);
        if(data)
        {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType+" request sent to server");
    });
}
const getURL="http://127.0.0.1:3000/employees/1";
makePromiseCall("GET",getURL,true).then(responseText=>
    {
        console.log("get user data:"+responseText)
    }).catch(error=> console.log("GET Error status:"+JSON.stringify(error)));