import { useState } from "react";
import axios from "axios";


function AdminLogin({setLogin}){


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");



function login(){


axios.post(
"http://127.0.0.1:8000/admin/login",
{
email: email,
password: password
}

)

.then((response)=>{


console.log(response.data);


if(response.data.message === "Login Successful"){


localStorage.setItem(
"admin",
response.data.admin
);


setLogin(true);


}

else{


alert(response.data.message);


}


})


.catch(()=>{

alert("Server Error");

});


}




return(

<div
style={{
minHeight:"100vh",
background:"#f5f9ff",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>


<div

style={{
background:"white",
padding:"40px",
borderRadius:"20px",
width:"350px",
textAlign:"center",
boxShadow:"0 10px 30px rgba(0,0,0,0.1)"
}}

>


<h1 style={{color:"#004aad"}}>
Admin Login
</h1>


<input

placeholder="Admin Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

style={{
width:"90%",
padding:"12px",
margin:"10px"
}}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

style={{
width:"90%",
padding:"12px",
margin:"10px"
}}

/>



<button

onClick={login}

style={{
background:"#004aad",
color:"white",
padding:"12px 40px",
border:"none",
borderRadius:"10px",
cursor:"pointer"
}}

>

Login

</button>



</div>


</div>

)

}


export default AdminLogin;