function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function showSessionExpire(){
    console.log("Activity-2: Session Expired at " + showTime());
}

console.log("Activity-1: Triggering Activity-2 at " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity-1: Triggered Activity-2 at " + showTime() + " will execute after 5 seconds");