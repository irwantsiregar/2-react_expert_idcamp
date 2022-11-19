/**
Dalam menghubungkan Redux di React, react-redux memanfaatkan teknologi React Context agar Redux store dapat diakses pada seluruh cakupan aplikasi.
Library ini menyediakan komponen Provider dan kita bisa memberikan Redux store pada komponen propertinya.

Agar store dapat diakses oleh seluruh cakupan aplikasi, Anda harus membungkus aplikasi dengan komponen Provider ini.
*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
/* 
Jika terjadi perubahan nilai state dalam store, komponen (pada cakupan aplikasi) yang mengakses nilai state dalam store akan secara otomatis di-render ulang.

Library react-redux juga menyediakan custom hooks untuk berinteraksi dengan store pada komponen React.
 Contohnya, untuk mengakses nilai state dalam store, Anda bisa gunakan fungsi hooks useSelector() seperti ini.
 */
import React from 'react';
import { useSelector } from 'react-redux';

function TodosList() {
  // states berisi todos dan goals
  const states = useSelector((states) => states);

  // ...
}

/* Hooks useSelector() menerima satu argumen, yaitu sebuah fungsi yang mengembalikan nilai state dalam store. 
Kode di atas adalah contoh cara mengakses seluruh state yang berada dalam store. Namun, jika komponen hanya membutuhkan salah satu state secara spesifik,
 Anda bisa menyesuaikan nilai yang dikembalikan oleh argumen fungsi useSelector(). 
 Contohnya, jika Anda hanya butuh state todos saja, Anda bisa menulis argumen fungsi seperti ini.
 */
import React from 'react';
import { useSelector } from 'react-redux';

function TodosList() {
  const todos = useSelector((states) => states.todos);

  // ...
}
Selain fungsi hooks useSelector(), ada juga fungsi hooks lain, yaitu useDispatch().Fungsi hooks ini digunakan untuk mengakses fungsi dispatch() dalam store.Jadi, kita bisa mengubah nilai state pada komponen React.

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function TodosList() {
  const todos = useSelector((states) => states.todos);
  const dispatch = useDispatch();

  function onAddTodo(text) {
    const id = `todo-${+ new Date()}`
    dispatch(addTodoActionCreator({ id, text }));
  }

  // ...
}