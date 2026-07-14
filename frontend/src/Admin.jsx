import { useEffect, useState } from "react";
import axios from "axios";


function Admin({ logout }) {


  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);


  const [showForm, setShowForm] = useState(false);


  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");



  const [form, setForm] = useState({

    name:"",
    description:"",
    amount:"",
    required_date:""

  });





  function loadData(){


   axios.get
   "https://wice-portal-backend-hweq.onrender.com/pending-expenses"
    
    .then(res=>{
      setPending(res.data);
    });



    axios.get(
      "http://wice-portal-backend-hweq.onrender.com/approved-expenses"
    )
    .then(res=>{
      setApproved(res.data);
    });



    axios.get(
      "http://wice-portal-backend-hweq.onrender.com/rejected-expenses"
    )
    .then(res=>{
      setRejected(res.data);
    });


  }





  useEffect(()=>{

    loadData();

  },[]);







  function addExpense(){


    axios.post(

      "http://127.0.0.1:8000/expenses",

      form

    )
    .then(()=>{


      setShowForm(false);


      setForm({

        name:"",
        description:"",
        amount:"",
        required_date:""

      });


      loadData();


    });


  }






  function approve(id){


    axios.put(

      `http://127.0.0.1:8000/approve/${id}`

    )
    .then(()=>{

      loadData();

    });


  }






  function reject(id){


    axios.put(

      `http://127.0.0.1:8000/reject/${id}`

    )
    .then(()=>{

      loadData();

    });


  }






  const allExpenses=[

    ...pending.map(item=>({

      ...item,

      currentStatus:"Pending"

    })),



    ...approved.map(item=>({

      ...item,

      currentStatus:"Approved"

    })),



    ...rejected.map(item=>({

      ...item,

      currentStatus:"Rejected"

    }))

  ];






  const filteredExpenses = allExpenses.filter(item=>{


    const searchMatch =
    item.name
    .toLowerCase()
    .includes(
      search.toLowerCase()
    );



    const filterMatch =

    filter==="All"

    ?

    true

    :

    item.currentStatus===filter;



    return searchMatch && filterMatch;


  });








return (


<div

style={{

display:"flex",

minHeight:"100vh",

background:"#f4f8ff",

fontFamily:"Arial"

}}

>





<div

style={{

width:"240px",

background:"#004aad",

color:"white",

padding:"30px"

}}

>


<h2>
WICE Portal
</h2>


<p>
Admin Panel
</p>


<hr/>


<p>
🏠 Dashboard
</p>


<p>
📋 Requirements
</p>


<p>
✅ Approved
</p>


<p>
❌ Rejected
</p>




<button

onClick={logout}

style={{

marginTop:"50px",

background:"white",

color:"#004aad",

padding:"12px 25px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

}}

>

Logout

</button>



</div>








<div

style={{

flex:1,

padding:"30px"

}}

>





<div

style={{

background:"#004aad",

color:"white",

padding:"25px",

borderRadius:"15px",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>


<div>

<h1>

WICE Sponsorship Dashboard

</h1>


<p>
Admin Management System
</p>


</div>




<button

onClick={()=>setShowForm(true)}

style={{

background:"#00a651",

color:"white",

padding:"12px 20px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

}}

>

+ Add Requirement

</button>



</div>






<div

style={{

background:"white",

padding:"20px",

marginTop:"25px",

borderRadius:"15px"

}}

>


<input

placeholder="Search Requirement..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={{

padding:"12px",

width:"60%",

border:"1px solid #ccc",

borderRadius:"8px"

}}

/>





<select

value={filter}

onChange={(e)=>setFilter(e.target.value)}

style={{

padding:"12px",

marginLeft:"20px",

borderRadius:"8px"

}}

>


<option>
All
</option>


<option>
Pending
</option>


<option>
Approved
</option>


<option>
Rejected
</option>


</select>



</div>
     


{/* ADD FORM */}

{

showForm &&


<div

style={cardStyle}

>


<h2>
Add New Requirement
</h2>



<input

placeholder="Requirement Name"

value={form.name}

onChange={(e)=>setForm({

...form,

name:e.target.value

})}

style={inputStyle}

/>




<input

placeholder="Description"

value={form.description}

onChange={(e)=>setForm({

...form,

description:e.target.value

})}

style={inputStyle}

/>





<input

placeholder="Amount"

type="number"

value={form.amount}

onChange={(e)=>setForm({

...form,

amount:e.target.value

})}

style={inputStyle}

/>





<input

placeholder="Required Date"

value={form.required_date}

onChange={(e)=>setForm({

...form,

required_date:e.target.value

})}

style={inputStyle}

/>




<button

onClick={addExpense}

style={buttonStyle}

>

Submit Requirement

</button>



<button

onClick={()=>setShowForm(false)}

style={cancelStyle}

>

Cancel

</button>



</div>


}







{/* SUMMARY CARDS */}



<div

style={{

display:"flex",

gap:"20px",

marginTop:"30px"

}}

>


<Card

title="Total"

value={allExpenses.length}

/>



<Card

title="Pending"

value={pending.length}

/>



<Card

title="Approved"

value={approved.length}

/>



<Card

title="Rejected"

value={rejected.length}

/>



</div>









{/* TABLE */}



<h2>

Requirements

</h2>



<table

style={{

width:"100%",

background:"white",

borderCollapse:"collapse",

marginTop:"20px"

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
Name
</th>


<th style={thStyle}>
Amount
</th>


<th style={thStyle}>
Date
</th>


<th style={thStyle}>
Status
</th>


<th style={thStyle}>
Action
</th>


</tr>


</thead>





<tbody>


{

filteredExpenses.map(item=>(


<tr key={item.id}>


<td style={tdStyle}>
{item.id}
</td>



<td style={tdStyle}>
{item.name}
</td>



<td style={tdStyle}>
৳{item.amount}
</td>



<td style={tdStyle}>
{item.required_date}
</td>



<td style={tdStyle}>


<span

style={{

padding:"7px 15px",

borderRadius:"20px",

background:

item.currentStatus==="Approved"

?

"#d4edda"

:

item.currentStatus==="Rejected"

?

"#f8d7da"

:

"#fff3cd",


color:

item.currentStatus==="Approved"

?

"green"

:

item.currentStatus==="Rejected"

?

"red"

:

"orange"

}}

>

{item.currentStatus}

</span>


</td>





<td style={tdStyle}>


{

item.currentStatus==="Pending" &&

<>


<button

onClick={()=>approve(item.id)}

style={{

background:"green",

color:"white",

border:"none",

padding:"8px 15px",

borderRadius:"8px"

}}

>

Approve

</button>




<button

onClick={()=>reject(item.id)}

style={{

background:"red",

color:"white",

border:"none",

padding:"8px 15px",

borderRadius:"8px",

marginLeft:"10px"

}}

>

Reject

</button>


</>


}



</td>


</tr>


))


}


</tbody>



</table>








{/* APPROVED */}



<h2>
Approved Requests
</h2>



{

approved.map(item=>(


<div

key={item.id}

style={cardStyle}

>


🟢 <b>{item.name}</b>


<br/>

Amount: ৳{item.amount}


<br/>

Approved By: {item.approved_by || "Admin"}


<br/>

Approved Date: {item.approved_date || "N/A"}



</div>


))


}








{/* REJECTED */}



<h2>
Rejected Requests
</h2>




{

rejected.map(item=>(


<div

key={item.id}

style={cardStyle}

>


🔴 <b>{item.name}</b>


<br/>

Amount: ৳{item.amount}



</div>


))


}




</div>



</div>


);


}









function Card({title,value}){


return(

<div

style={{

background:"white",

padding:"20px",

width:"170px",

borderRadius:"15px",

boxShadow:"0 5px 15px rgba(0,0,0,0.08)"

}}

>


<h3>
{title}
</h3>


<h1

style={{

color:"#004aad"

}}

>

{value}

</h1>


</div>


);


}







const cardStyle={

background:"white",

padding:"25px",

marginTop:"25px",

borderRadius:"15px",

boxShadow:"0 5px 15px rgba(0,0,0,0.08)"

};




const inputStyle={

display:"block",

width:"90%",

padding:"12px",

margin:"10px",

border:"1px solid #ccc",

borderRadius:"8px"

};




const buttonStyle={

background:"#004aad",

color:"white",

padding:"12px 30px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

};




const cancelStyle={

background:"gray",

color:"white",

padding:"12px 25px",

border:"none",

borderRadius:"10px",

marginLeft:"15px",

cursor:"pointer"

};




const thStyle={

padding:"15px"

};




const tdStyle={

padding:"15px",

textAlign:"center"

};




export default Admin;