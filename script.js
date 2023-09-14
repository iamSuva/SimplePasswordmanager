// console.log("hiii");
let btn=document.querySelector(".btn");
console.log(btn);
function encryptPwd(txt)
{
    let str="";
   for(let i=0;i<txt.length;i++)
   {
    str+="*";
   }
    // alert(str);
    return str;
}
function textCopy(text)
{
   // alert("insd")
    navigator.clipboard.writeText(text)
    .then(()=>{
        alert("copied");
        document.getElementById("cpy_icon").style.display="inline";
        setTimeout(()=>{
            document.getElementById("cpy_icon").style.display="none";
           
        },2000);
    },
    ()=>{
       alert("not copied")
    }
    )
}
const deletePassword=(website)=>{
     //one website has one password
     const data=JSON.parse(localStorage.getItem("passwords"));
     let newarr=data.filter((ele)=>{
        if(ele.website!=website)
        {
            return ele;
        }
     })
     localStorage.setItem("passwords",JSON.stringify(newarr));
     alert("password is deleted");
     showTable();
}

const showTable=()=>{
    let table=document.querySelector("table");
    const data=localStorage.getItem("passwords");
    console.log(data);
    if(data==null || data.length==0)
    {
        // alert("ff")
        table.innerHTML="<h4> NO password  found</h4>";

    }
    else{
        let dataarray=JSON.parse(data);

        table.innerHTML=` <tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
        </tr> `;
          let str="";
          dataarray.forEach((ele)=>{
            str+=`<tr>
               <td>${ele.website}<i onclick="textCopy('${ele.website}')" class="fa-solid fa-copy"></i></td>
               <td>${ele.username}<i onclick="textCopy('${ele.username}')" class="fa-solid fa-copy"></i></td>
               <td>${encryptPwd(ele.password)}<i onclick="textCopy('${ele.password}') "class="fa-solid fa-copy"></i></td>
               <td><button class="delbtn" onclick="deletePassword('${ele.website}')">delete</button></td>
            
            </tr>`
          })
          table.innerHTML+=str;
    }
}

showTable();

btn.onclick=(e)=>{
    e.preventDefault();
    if(website.value==""||username.value==""|| password.value=="")
    {
        alert("input filed is empty ");
    }
    // alert("hello");
    //id.value is used to get value of input field
    else{
     let obj={
        website:website.value,
        username:username.value,
        password:password.value
        
     };
     console.log(obj);
     let data=localStorage.getItem("passwords");
     if(data==null)
     {
        let jsondata=[];
        jsondata.push(obj);
        alert("password is saved");
        localStorage.setItem("passwords",JSON.stringify(jsondata));
    }
    else{
        let jsondata=JSON.parse(localStorage.getItem("passwords"));
        console.log(jsondata)
        jsondata.push(obj);
        alert("password is saved");
        localStorage.setItem("passwords",JSON.stringify(jsondata));
     }
   document.querySelector("form").reset();
// window.location.reload();
showTable();
    }

}