
   const firebaseConfig = {
    apiKey: "AIzaSyAJ7-8Xka7KJC1td3S8847y62evPj-2LNA",
    authDomain: "proyecto-pancho-chancho-prueba.firebaseapp.com",
    projectId: "proyecto-pancho-chancho-prueba",
    storageBucket: "proyecto-pancho-chancho-prueba.appspot.com",
    messagingSenderId: "144688252808",
    appId: "1:144688252808:web:f2b71d17dec2d211685c3d",
    measurementId: "G-29VPCXCKR7"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const post = firebase.firestore();



// Al enviar el Post con el boton Postear

const  post_Form = document.getElementById("postForm")
    

post_Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mensaje = post_Form['postText'];
  
  await savePost(mensaje.value);
  console.log("Post Guardado")
  post_Form.reset();
  mensaje.focus();

});

// Guardar post
var date = new Date();
const savePost = (mensaje) =>
  post.collection("posts").add({
    description: mensaje,
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
     minutes: date.getMinutes(),
    seconds: date.getSeconds(),

  });

  // Al cargar la Pagina, listar los post.
  window.addEventListener('DOMContentLoaded', async (e) => {
    const querySnapshot = await getPosts();

    

    querySnapshot.forEach(doc => {
      
      const post = doc.data();

      PostList.innerHTML += `
        
        <div class="card card-body mt-2 border-primary">
        <h5>${post.description}</h5>
        <div>
            <button class="btn btn-primary">Delete</button>
            <button class="btn btn-secundary">Editar</button>
        </div>
        </div>
      `
    })

  })
// Obtener Post
const getPosts = ()=> post.collection('posts').get();

// Cunado se obtienen las tareas
//const onGetPosts = (callback)=> post.collection('posts').onSnapshot(callback);
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


  
