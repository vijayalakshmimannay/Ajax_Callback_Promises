let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { //event listener
        //console.log(methodType+ "Status Changed Called at: "+ showTime() +" Ready State: " +
        //    xhr.readyState +" Status: " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType+" Request sent to the server at: "+ showTime());
}

const getURL ="http://127.0.0.1:3000/Employee/6";
function getUserDetails(data) {
    console.log("Get User Data at:" + showTime() + " Data: "+ data)
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at "+showTime());

const deleteURL ="http://localhost:3000/Employee/7";
function userDeleted(data) {
    console.log("User Deleted at:" + showTime() + " Data: "+ data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX Call to Server at "+showTime());

const postURL ="http://localhost:3000/Employee";
const empData = {"name": "Lokesh", "salary": "30000"};
function userAdded(data) {
    console.log("User Added at:" + showTime() + " Data: "+ data)
}
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("Made POST AJAX Call to Server at "+showTime());