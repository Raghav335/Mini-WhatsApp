var firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
databaseURL: "https://YOUR_PROJECT.firebaseio.com",
projectId: "YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();

let username="";

function startChat(){

username=document.getElementById("username").value;

if(username===""){
alert("Enter your name");
return;
}

document.getElementById("login").style.display="none";

loadMessages();
}

function sendMessage(){

let msg=document.getElementById("msg").value;

if(msg==="") return;

let time=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

db.ref("messages").push({
user:username,
text:msg,
time:time
});

document.getElementById("msg").value="";
}

function loadMessages(){

db.ref("messages").on("child_added",function(snapshot){

let data=snapshot.val();

let div=document.createElement("div");

div.classList.add("message");

if(data.user===username){
div.classList.add("me");
}

div.innerHTML=`<b>${data.user}</b><br>${data.text}<br><small>${data.time}</small>`;

document.getElementById("messages").appendChild(div);

});
}