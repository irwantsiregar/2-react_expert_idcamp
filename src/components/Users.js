/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/*

# Memastikan Efek Dijalankan Satu Kali pada Strict Mode

Dari latihan di atas, kita belajar untuk selalu waspada dalam membuat interval atau subscription di dalam efek.
Jangan sampai Anda lupa menghapus subscription dengan memanfaatkan clean-up function.

Dalam kasus penggunaan nyata, fungsi efek tidak hanya digunakan untuk sekadar membuat subscription saja.
Seringkali kita melakukan operasi yang memang tidak perlu dihapus, seperti menampilkan pesan pada window.alert atau mendapatkan data via AJAX.

function Users() {
  const [users, setUsers] = React.useState([]);

  // how to make sure this effect is only run once, even in strict mode?
  React.useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="users">
      {users.map((user) => (<User key={user.id} {...user} />))}
    </div>
  );
}

Bagaimana cara agar memastikan efek dijalankan hanya satu kali jika mengaktifkan Strict Mode?

Strict Mode membuat efek pada komponen dijalankan dua kali, meski sudah diberikan nilai dependencies dengan array kosong.
Untuk memastikan efek hanya dijalankan satu kali, Anda bisa memanfaatkan nilai dari React reference.

React reference mirip seperti React state, ia merupakan sebuah nilai yang dapat bertahan dari fase render ke render berikutnya.
Bedanya, perubahan nilai reference tidak memicu komponen untuk me-render ulang.
React reference cocok untuk digunakan sebagai indikator sudah atau tidaknya efek berjalan.

Agar lebih jelas, berikut implementasinya.
*/

// function Users() {
//   const [users, setUsers] = React.useState([]);
//   const firstRun = React.useRef(true);

//   React.useEffect(() => {
//     // Now, we can make sure that the effect is only run once
//     if (firstRun.current) {
//       getAllUsers().then(setUsers);
//       firstRun.current = false;
//     }
//   }, []);

//   return (
//     <div className="users">
//       {users.map((user) => (<User key={user.id} {...user} />))}
//     </div>
//   );
// }

/*
Untuk membuat nilai reference, gunakanlah fungsi hooks React.useRef().
Fungsi tersebut menerima satu argumen yang merupakan nilai awal.
Selain itu, fungsi useRef() mengembalikan sebuah objek yang memiliki properti current, letak properti tersebut menampung nilai reference.
Untuk mengubah nilai current, cukup gunakan assignment operator layaknya mengubah variabel pada umumnya.
*/
