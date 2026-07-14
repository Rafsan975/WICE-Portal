import { useEffect, useState } from "react";
import axios from "axios";


function Sponsor(){


const [page,setPage] = useState(1);


const [expenses,setExpenses] = useState([]);





function loadData(){


axios.get(
https://wice-portal-backend-hweq.onrender.com
)

.then(res=>{

setExpenses(res.data);

});


}






useEffect(()=>{

loadData();

},[]);








return(


<div

style={{

minHeight:"100vh",

background:"#f4f8ff",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontFamily:"Arial"

}}

>


<div

style={{

width:"950px",

background:"white",

padding:"40px",

borderRadius:"20px",

boxShadow:"0 10px 30px rgba(0,0,0,0.1)"

}}

>




{

page===1 &&

<>


<h1

style={{

textAlign:"center",

color:"#004aad",

fontSize:"40px"

}}

>

Welcome To Sponsor Portal

</h1>




<div

style={{

background:"#f4f8ff",

padding:"25px",

borderRadius:"15px",

textAlign:"center",

marginTop:"30px"

}}

>


<h2>
WICE 2026
</h2>


<p>

Environmental Drone Project

</p>


<p>

Representing Bangladesh at International Round

</p>


</div>




<h3

style={{

textAlign:"center",

marginTop:"30px"

}}

>

Supported By Anvir Bashundhara Group

</h3>





<div

style={{

textAlign:"center"

}}

>


<button

onClick={()=>setPage(2)}

style={buttonStyle}

>

Next

</button>


</div>


</>

}









{

page===2 &&


<>


<h1

style={{

textAlign:"center",

color:"#004aad"

}}

>

Thank You For Your Support

</h1>




<p

style={{

textAlign:"center",

fontSize:"18px"

}}

>

Your support helps us represent Bangladesh at WICE 2026.

</p>





<div

style={{

textAlign:"center"

}}

>


<button

onClick={()=>setPage(3)}

style={buttonStyle}

>

View Schedule

</button>


</div>


</>

}









{

page===3 &&


<>


<h1

style={{

color:"#004aad",

textAlign:"center"

}}

>

Sponsor Schedule

</h1>






<table

style={{

width:"100%",

borderCollapse:"collapse",

marginTop:"30px",

background:"white"

}}

>


<thead>


<tr

style={{

background:"#004aad",

color:"white"

}}

>


<th style={thStyle}>
SL
</th>


<th style={thStyle}>
Requirement
</th>


<th style={thStyle}>
Description
</th>


<th style={thStyle}>
Amount
</th>


<th style={thStyle}>
Required Date
</th>


<th style={thStyle}>
Status
</th>


<th style={thStyle}>
Approved Info
</th>



</tr>


</thead>





<tbody>



{

expenses.map((item,index)=>(


<tr key={item.id}>


<td style={tdStyle}>
{index+1}
</td>



<td style={tdStyle}>
{item.name}
</td>




<td style={tdStyle}>
{item.description}
</td>





<td style={tdStyle}>
৳{item.amount}
</td>





<td style={tdStyle}>
{item.required_date}
</td>






<td style={tdStyle}>


<StatusBadge status={item.status}/>


</td>






<td style={tdStyle}>


{

item.status==="Approved"

?


<>

<p>

Approved By: {item.approved_by || "Admin"}

</p>


<p>

Date: {item.approved_date || "N/A"}

</p>


</>


:

"-"


}



</td>





</tr>


))

}



</tbody>



</table>





{

expenses.length===0 &&

<p

style={{

textAlign:"center",

marginTop:"30px"

}}

>

No Requirement Available

</p>

}



</>

}



</div>


</div>


);


}










function StatusBadge({status}){


let background="";

let color="";



if(status==="Approved"){

background="#d4edda";

color="green";

}

else if(status==="Rejected"){

background="#f8d7da";

color="red";

}

else{

background="#fff3cd";

color="orange";

}




return(

<span

style={{

background,

color,

padding:"8px 15px",

borderRadius:"20px",

fontWeight:"bold"

}}

>

{status}

</span>


);


}









const buttonStyle={


background:"#004aad",

color:"white",

padding:"15px 40px",

border:"none",

borderRadius:"10px",

fontSize:"18px",

cursor:"pointer"


};






const thStyle={

padding:"15px",

border:"1px solid #ddd"

};




const tdStyle={

padding:"15px",

border:"1px solid #ddd",

textAlign:"center"

};




export default Sponsor;