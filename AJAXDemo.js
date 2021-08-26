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

