
   const firebaseConfig = {
    apiKey: "AIzaSyBYnq1DDJBF71i6rOORP-UIkytWCyDNz-U",
    authDomain: "proyecto-final-db1ad.firebaseapp.com",
    projectId: "proyecto-final-db1ad",
    storageBucket: "proyecto-final-db1ad.appspot.com",
    messagingSenderId: "328779684923",
    appId: "1:328779684923:web:a876e4c5f51813f382101e",
    measurementId: "G-HGXZL79BDP"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const fs = firebase.firestore();
 
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
      window.location.href = "./contenido2.html";

    });
  });
  // Login with Google
const googleButton = document.querySelector("#btn-login-google");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  ingresoformulario.reset();


  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("Iniciado con tu cuenta Google");
    window.location.href = "./contenido2.html";

  })
  .catch(err => {
    console.log(err);
  })
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

//Inicializar servicio de la bd Firestore
const db = firebase.firestore();
//Publicar un nuevo estado
$("#btnSendPost").click(function(e){
    e.preventDefault();
    let postText = $("#postText").val();
    let date = new Date();
    db.collection("posts").add({
        post: postText,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    })
    .then((docRef)=>{
        alert("Estado publicado");
        $("#status-text").val('');
        readPosts();
    })
    .catch((error) =>{
        alert(error);
    })
})

function readPosts(){
    db.collection("posts").get().then((posts)=>{
        listPosts(posts.docs);
    })
}

function listPosts(data){
    var divContent = $("#post-feed");
    divContent.empty(); 
    if(data.length > 0){
        let content = "";
        data.forEach(document => {
            let doc = document.data();
            const divPost = `
                <div style='border:solid 2px;'>
                    <p>${doc.post}</p><br>
                    <textarea style='display: none;'></textarea>
                    <button data-id="${document.id}" style='display: none;'>Guardar</button>
                    <span>Publicado el: ${doc.day}/${doc.month}/${doc.year}</span>
                    <button data-id="${document.id}" class="btn btn-warning edit">Editar</button>
                    <button data-id="${document.id}" class="btn btn-danger delete">Eliminar</button>
                </div>
                <hr>
            `;
            content += divPost;
        });
        divContent.append(content);
        //Agregar listener a btn-delete
        const btnDelete = document.querySelectorAll(".delete");
        btnDelete.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                const id = e.target.dataset.id;
                DeletePost(id);
            })
        })
        const btnEdit = document.querySelectorAll(".edit");
        btnEdit.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                const id = e.target.dataset.id;
                OpenEdit(id,btn);
            })
        })
    }
}

function OpenEdit(id,button){
    let parent = button.parentNode;
    let textEdit = $(parent).children().eq(2);
    let btnEdit = $(parent).children().eq(3);
    textEdit.show();
    btnEdit.show();
    btnEdit.on("click",function(e){
        SaveUpdate(e,id,textEdit.val())
    });
}

function DeletePost(id){
    db.collection("posts").doc(id).delete().then(() => {
        alert("Se ha eliminado correctamente");
        readPosts();
    }).catch((error) => {
        console.error("Detalle del Error: ", error);
    });
}


function SaveUpdate(e,id_post,text_new){
    e.preventDefault();
    db.collection("posts").doc(id_post).update({
        post: text_new,
    }).then(()=>{
        alert("Post actualizado");
        readPosts();
    })
    .catch((error)=>{
        alert("Error:",error);
    })
}


  
