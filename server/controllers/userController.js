
const mysql = require('mysql2');
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'Sidak123#&',
  database: 'userManagementSystem'
})
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('CONNECTED SUCCESSFULLY');
  console.log('CONNECTED AS ID' + connection.threadId);
})
const db = pool.promise();

// VIEW USERS
exports.view = (req, res, next) => {
  // CONNECT TO DATABASE
  db.execute('SELECT * FROM USER WHERE STATUS="active"')
    .then(([rows, columns]) => {
      res.render('home', { rows });
      console.log('hey i am home');
      console.log('DATA FROM USERS: ' + rows);
    })
    .catch(err => console.log(err));
}

exports.find = (req, res, next) => {
  let searchTerm = req.body.search;
  console.log('Someone is searching: ' + searchTerm);
  db.execute(` SELECT * FROM USER WHERE first_name LIKE '%${searchTerm}%' OR last_name LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%' OR phone LIKE '%${searchTerm}%' OR status LIKE '%${searchTerm}%'`)
    .then(([rows, columns]) => {
      res.render('home', { rows });
      console.log(rows);
    })
    .catch(err => console.log(err));
}

exports.form = (req, res, next) => {
  res.render('add-user');
}
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  db.execute(`INSERT INTO USER (first_name,last_name,email,comments,phone) VALUES ('${first_name}','${last_name}','${email}','${comments}','${phone}')`)
    .then(response => {
      res.render('add-user', { alert: 'User Added Successfully' });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.editUser = (req, res) => {
  const userId = req.params.id;
  db.execute(`SELECT * FROM USER WHERE id=${userId}`)
    .then(([rows, columns]) => {
      console.log(rows);
      res.render('edit-user', { rows });
    })
    .catch(err => console.log(err));
}
exports.update = (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, email, phone, comments } = req.body;
  db.execute(`UPDATE USER SET first_name = '${first_name}',last_name ='${last_name}' ,email = '${email}',comments ='${comments}' ,phone = '${phone}' WHERE id = ${userId}`)
    .then(([rows, columns]) => {
      res.render('edit-user', { alert: `${first_name} Updated !!` });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.delete = (req, res) => {
  //   DELETE FROM `usermanagementsystem`.`USER` WHERE (`id` = '6');
  // INSERT INTO `usermanagementsystem`.`USER` (`id`) VALUES ('6');
  userId = req.params.id;
  db.execute(`DELETE FROM USER WHERE id = ${userId}`)
  .then(res.redirect('/')
  .catch(err=>{
    console.log(err);
  })
  );
}
exports.viewUser=(req,res,next)=>{
  userId = req.params.id;
  db.execute(`SELECT * FROM USER WHERE id = ${userId}`)
  .then(([rows,columns])=>{
  res.render('user',{rows});
  console.log(rows);
  });

}