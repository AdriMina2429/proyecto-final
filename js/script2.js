
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
