<template>
    <div>
      <h1>{{ greeting }}</h1>
      <button @click="incrementCounter">Logout!</button>
      <p>Counter: {{ counter }}</p>
    </div>
  </template>
  
  <script setup>
import router from '../router/router';

  const greeting = "Hallo Welt!";
  let counter = 0;
  
  const incrementCounter = () => {
    localStorage.removeItem('token');
    router.push({path: "/"})
  };
  </script>
  
  <style scoped>
  /* Stile speziell für diese Komponente */
  h1 {
    color: blue;
  }
  button {
    background-color: lightblue;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  p {
    font-weight: bold;
  }
  </style>
  