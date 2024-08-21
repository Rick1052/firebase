import { useState, useEffect } from "react";

import { db, auth} from './firebaseConnection';

import { 
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { set } from "firebase/database";

function App(){
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState(""); 
  const [idPost, setIdPost] = useState(""); 

  // const [email, setEmail] = useState("");
  // const [senha, setSanha] = useState("");

  const [post, setPosts] = useState({});  
  
  // const [usuario, setUsuario] = useState("");
  // const [detalhesUsuario, setDetalhesUsuario] = useState("");



  useEffect(() => {
    async function carregarPosts(){
      const dados = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc)=>{
          listaPost.push({
            id: doc.id,
            titulo: doc.data(),
            autor: doc.data().autor,
          });
        });
        setPosts(listaPost);
      });
    }
    carregarPosts();
  }, []);

  async function adicionarPosts(){
    await addDoc(collection (db, "posts"), {
      titulo: titulo,
      autor: autor,
    }).then(()=>{
      console.log("Cadastro realizado com sucesso!")
      setAutor("");
      setTitulo("");
    }).catch((error) => {
      console.log("ERRO " + error);
    })
  }

  async function buscarPost(){
    const dados = collection(db, "posts");

    await getDocs(dados)
    .then((snapshot)=>{
      
      let listaPost = [];

        snapshot.forEach((doc)=>{
          listaPost.push({
            id: doc.id,
            titulo: doc.data(),
            autor: doc.data().autor,
          });
        });
        setPosts(listaPost);
    }).catch((error)=>{
      console.log("Erro " + error);
    })
  }

  async function editarPost(){
    const postEditado = doc(db, "posts", idPost);

    await updateDoc(postEditado, {
      titulo: titulo,
      autor: autor
    }).then(()=>{
      console.log("Post editado com sucesso!");
      setIdPost("");
      setTitulo("");
      setAutor("");
    }).catch((error)=>{
      console.log("Erro: " + error)
    })
  }

  async function excluirPost(id){

    const postExcluido = doc(db, "post", id);

    await deleteDoc(postExcluido).then(
      alert("Post excluido com sucesso!")
    ).catch((error)=>{
      console.log("Error: " + error)
    })

  }

  return(
    <div>
      <h2>POSTS</h2>
      <label>ID do Post: </label>
      <input placeholder="ID do Post" value={idPost} onChange={(e) => setIdPost(e.target.value)}></input>
      <br/>

      <label>Titulo: </label>
      <input placeholder="Titulo" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
      <br/>

      <label>Autor: </label>
      <input placeholder="Autor" type="text" value={autor} onChange={(e) => setAutor(e.target.value)}></input>
      
      <button onClick={adicionarPosts}>Adicionar</button>

      <button onClick={buscarPost}>Buscar</button>

      <button onClick={editarPost}>Editar</button>

      <ul>
        {post.map((post)=>{

          return(
            <li key={post.id}>
              <strong>ID: {post.id}</strong><br/>
              <strong>Titulo: {post.titulo}</strong><br/>
              <strong>Autor: {post.autor}</strong><br/>

              <button onClick={() => excluirPost(post.id)}>Excluir</button>

            </li>
          );

        })}
      </ul>

    </div>
  );

}
export default App;