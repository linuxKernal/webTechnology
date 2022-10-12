const alertBox = document.getElementsByClassName("alertMain")[0];
function toggleAlert(){
    if(alertBox.style.display === "none"){
        alertBox.style.display = "flex";
    }
    else alertBox.style.display = "none";
    getCredentials()
}

let userData = []

function getCredentials(){
    fetch("http://localhost:8080/newclub/getuserdata").then(data=>{
        return data.json();
    })
    .then(info=>{
        userData = info
        showUser()
    })
}

const formData = (user="",passwd="",mail="")=>{
    const username = document.getElementById("username")
    const password = document.getElementById("password")
    const email = document.getElementById("email")
    username.value = user
    password.value = passwd
    email.value = mail
}

const table = document.getElementsByClassName("userTable")[0]
function showUser(){
    table.innerHTML = ""
    const title = ["ID","Username","Password","Email","Edit","Trash"]
    for(let i = 0;i < userData.length; i++){
        const tr = document.createElement('tr')
        if(i===0){
            const tr = document.createElement('tr')
            for(let i = 0;i<title.length    ;i++){
                const th = document.createElement('th')
                th.append(title[i])
                tr.append(th)
            }
            table.append(tr)
        }
        Object.keys(userData[i]).forEach(key => {
            const td = document.createElement('td')
            td.append(userData[i][key])
            tr.append(td)
        });
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const butn1 = document.createElement("button")
        butn1.append("Edit")
        butn1.classList.add("userButn")
        butn1.classList.add("editButn")
        butn1.addEventListener("click",()=>{
            const uid = document.getElementById("uid")
            const action = document.getElementById("action")
            const text = userData[i]["uid"];
            uid.value = text
            action.value = "update"
            formData(userData[i]["username"],userData[i]["password"],userData[i]["email"])
            toggleAlert()
        })
        td1.append(butn1)
        const butn2 = document.createElement("button")
        butn2.append("Trash")
        butn2.classList.add("userButn")
        butn2.classList.add("trashButn")
        td2.append(butn2)
        tr.append(td1)
        tr.append(td2)

        table.append(tr)

    }
}

const form = document.getElementById("userform")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(e.target.username);
    const formData = new FormData();
    formData.append("username",e.target.username.value)
    formData.append("password",e.target.password.value)
    formData.append("action",e.target.action.value)
    formData.append("uid",e.target.uid.value)
    console.log(e.target.username.value,e.target.password.value,e.target.action.value,e.target.uid.value);
    fetch("http://localhost:8080/newclub/newuser",{ // http://localhost:8080/newclub/newuser
        method:"POST",
        headers:{
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'text/plain'
        },
        body:formData
    })
    .then((res)=>{
        getCredentials()
        return res.text()
    })
    .then(text=>{
        console.log(text);
    })
})

getCredentials()

document.getElementById("createNew").addEventListener('click',()=>{
    const action = document.getElementById("action")
    action.value = "new"
    formData()
    toggleAlert()
})

function alertEsc(evt) {
    if (evt.code === 'Escape') {
     toggleAlert()
    }
}