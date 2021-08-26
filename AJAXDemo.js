// UC1-Asynchronous example
{
function showTime()
{
    const date=new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Min:"+date.getSeconds()+"sec:";
}
function ShowSessionExpire()
{
    console.log("Activity B: Your session expired at "+showTime());
}
console.log("Activity A : triggering Activity  :"+showTime());
//it call the function after 5sec
setTimeout(ShowSessionExpire,5000);
console.log("Activity A triggered Activity B "+showTime()+" will be after 5 sec");
}
// UC2-AJAX Call back function
let XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
// call back function
function makeAJAXCall(methodType,url,callback,async=true,data=null)
{
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        console.log("State Changed Called. Ready State:"+xhr.readyState+" status:"+xhr.status);
        if(xhr.readyState==4)
        {
        if(xhr.status==200 || xhr.status==201)
        {
            callback(xhr.responseText);
        }
        else if(xhr.status>=400)
        {
            console.log("Handle error 400 or server error 500");
        }
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
}
// function to get the data from the server
const getURL="http://127.0.0.1:3000/employees/1";
function getUserDetails(data)
{
    console.log("Get user Data:"+data);
}
makeAJAXCall("GET",getURL,getUserDetails);

const deleteURL="http://127.0.0.1:3000/employees/9";
function deleteUserDetails(data)
{
    console.log("user Data Deleted:"+data);
}
makeAJAXCall("DELETE",deleteURL,deleteUserDetails);

const postURL="http://127.0.0.1:3000/employees";
const empData={ "name": "kings", "salary": 65000};
function postUserDetails(data)
{
    console.log("user Data Added:"+data);
}
makeAJAXCall("POST",postURL,postUserDetails,true,empData);