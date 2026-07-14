import { useState } from "react";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import Sponsor from "./Sponsor";


function App() {


  const [isAdminLogin, setIsAdminLogin] = useState(
    localStorage.getItem("admin")
      ? true
      : false
  );



  const path = window.location.pathname;





  // ADMIN ROUTE

  if (path === "/admin") {



    function logout() {


      localStorage.removeItem("admin");


      setIsAdminLogin(false);


    }






    if (isAdminLogin) {


      return (

        <Admin 
          logout={logout}
        />

      );


    }






    return (

      <AdminLogin
        setLogin={setIsAdminLogin}
      />

    );



  }







  // SPONSOR ROUTE

  return (

    <Sponsor />

  );


}



export default App;