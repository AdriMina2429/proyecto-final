const registroformulario= document.querySelector("#registro-formulario");
const ingresoformulario= document.querySelector("#ingreso-formulario");

//registro
registroformulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = registroformulario["mail-new"].value;
    const password = registroformulario["pass-new"].value;
  console.log(email,password);
    // Authenticate the User
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // clear the form
        registroformulario.reset();
        // close the modal
        $("#registro").modal("hide");
        console.log("registrado");
      });
  });
  //Ingreso

ingresoformulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = ingresoformulario["mail"].value;
      const password = ingresoformulario["pass"].value;
  
    // Authenticate the User
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
      // clear the form
      ingresoformulario.reset();
      console.log("logeado");
    });
  });
  // evento: cambio de estado de autentificacion
  const btnSalir =document.querySelector("#logout");
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("logeado");
      
      btnSalir.style.display="block";
     //formularioPost.style.display="block";
    } else {
      console.log("no has ingresado");
     
     //formularioPost.style.display="none";
      btnSalir.style.display="none";
    }
  });

//Salir

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("salistes de tu cuenta");
  });
});

  
