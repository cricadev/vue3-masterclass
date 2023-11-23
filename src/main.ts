import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/config/firebase.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
initializeApp(firebaseConfig);
const app = createApp(App)

app.use(createPinia())
app.use(router)


const components = import.meta.glob('./components/App*.vue', { eager: true });
Object.keys(components).forEach((path) => {
  const name = path.match(/\.\/components\/(.*)\.vue$/)[1];
  const component = components[path].default;
  app.component(name, component);
});


app.mount('#app')
