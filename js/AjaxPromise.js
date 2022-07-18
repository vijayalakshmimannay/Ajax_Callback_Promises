let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
           // console.log(methodType+ "Status Changed Called at: "+ showTime() +" Ready State: " +
            //  xhr.readyState +" Status: " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201){
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
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
    });

}
const getURL ="http://127.0.0.1:3000/Employee/8";

makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " +showTime() + "Details:"+ responseText)
    })
    .catch(error => console.log("GET Error Status: "+ JSON.stringify(error)));
console.log("Made GET AJAX Promise Call to Server at "+showTime());

const deleteURL ="http://localhost:3000/Employee/14";
makePromiseCall("DELETE", deleteURL, true)
    .then(responseText => {
        console.log("User Deleted at: " +showTime() + "Details:"+ responseText)
    })
    .catch(error => console.log("DELETE Error Status: "+ JSON.stringify(error)));
console.log("Made DELETE AJAX Call to Server at "+showTime());


const postURL ="http://localhost:3000/Employee";
const empData = {"name": "Akash", "salary": "40000"};
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added at: " +showTime() + "Details:"+ responseText)
    })
    .catch(error => console.log("POST Error Status: "+ JSON.stringify(error)));
console.log("Made POST AJAX Call to Server at "+showTime());