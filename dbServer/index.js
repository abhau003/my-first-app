let express = require('express');
let bp = require('body-parser');
let cors = require('cors');
let fs = require('fs');
const contactDataFile = "contact.json";
const loginDataFile = "login.json";
const port = 5454;
let usernamtest = '';

fs.readFile(contactDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        libConactData = JSON.parse(data);
    }
});

fs.readFile(loginDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        loginData = JSON.parse(data);
    }
});

const saveContactDataAndRespond = (resp) => {
    fs.writeFile(contactDataFile, JSON.stringify(libConactData), (err) => {
        if (err) {
            console.log(err);
            resp.status(500);
            resp.end();

        } else {
            resp.status(200);
            resp.end();

        }
    })
}

const parseReqToContact = (req) => (
    {
        cid: req.body.cid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        mail: req.body.mail,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        group: req.body.group
    }    
);

const parseReqToLogin = (req) => (

    {
        usernamtest: req.body.username,
        passwordtest: req.body.password
    }    
);

let libServer = express();

libServer.use(bp.json());
libServer.use(bp.urlencoded({ extended: true }));
libServer.use(cors());

//default request
libServer.get('/', (req, resp) => {
    resp.send("Welcome to Lib Server");
});

libServer.get('/contacts', (req, resp) => {
    resp.send(libConactData.contacts);
});

libServer.get('/login', (req, resp) => {
    resp.send(loginData);
});

libServer.get('/contacts/:id', (req, resp) => {
    let contact = libConactData.contacts.find(b => b.cid == req.params.id);
    if (contact) {
        resp.send(contact);
    } else {
        resp.status(404);
        resp.end();
    }

});

libServer.post('/contacts', (req, resp) => {

    let contact = parseReqToContact(req);
    libConactData.contacts.push(contact);
    saveContactDataAndRespond(resp);

});


libServer.post('/login', (req, resp) => {

    let login = parseReqToLogin(req);
    /*login.username = 'abhau003'
    login.password = 'arun123'*/
   // saveContactDataAndRespond(resp);
    console.log("Hi"+login.usernamtest)
    //console.log(req.body.username)
    console.log(login.passwordtest)
    //console.log('Arindam'+JSON.stringify(loginData));

//    loginData.forEach(element => {
//     //    console.log("AAAA" +element.username)
//     //    console.log("BBBB" +login.usernamtest)
//     //    console.log(typeof element.username)
//     //    console.log(typeof login.usernamtest)
//       if(element.username==login.usernamtest && element.pass == login.passwordtest)
//        {
//           console.log("Good")
//           console.log("User is Valid!!!");
//           resp.send({"isValid":"True"});
//           resp.status(200);
//       }
//       else{
//           console.log("User is not Valid!!!");
//           resp.send({"isValid":"False"});
//           resp.status(500);
          
//       }
//       resp.end();
//     })
//   });

    
   if(loginData.filter(x=>x.username == login.usernamtest && x.pass == login.passwordtest).length>0)
   {

       console.log("User is Valid!!!");
       resp.send({"isValid":"True"});
       resp.status(200);
       resp.end();
   }
   else{
       console.log("User is not Valid!!!");
       resp.send({"isValid":"False"});
       resp.status(500);
       resp.end();
   }

});

libServer.put('/contacts', (req, resp) => {
    let contact = parseReqToContact(req);
    let index = libConactData.contacts.findIndex(b => b.cid == contact.cid);
    libConactData.contacts[index] = contact;
    saveContactDataAndRespond(resp);

});

libServer.delete('/contacts/:id', (req, resp) => {
    let index = libConactData.contacts.findIndex(b => b.cid == req.params.id);
    libConactData.contacts.splice(index, 1);
    saveContactDataAndRespond(resp);

});

libServer.listen(port, () => {
    console.log(`Server is ready at ${port}`)
});

