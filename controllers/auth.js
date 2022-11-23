//const router = require("../routes/pages");
const mysql = require ('mysql');
//const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');



const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
})

/*

exports.login = async (req, res, next) => {
    const { mail, passcode } = req.body;
  
    // 1) Check if email and password exist
    if (!mail || !passcode) {
      return res.status(400).render("login", {
        message: 'Please provide email and password'
      });
    }
  
    // 2) Check if user exists && password is correct
    db.query('SELECT * FROM users WHERE email = ?', [mail], async (error, results) => {
      console.log(results);
      console.log(passcode);
      const isMatch = await bcrypt.compare(passcode, results[0].password);
      console.log(isMatch);
      if(!results.length || !isMatch ) {
        return res.status(401).render("login", {
          message: 'Incorrect email or password'
        });
      } else {
        // 3) If everything ok, send token to client
        const id = results[0].id;
        console.log(id);
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });
  
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };
        res.cookie('jwt', token, cookieOptions);
  
        res.status(200).redirect("/");
      }
    });
}
*/


exports.login = async (req, res) => {

    const { userName, userID, password } = req.body;
    
        if (!userName || !userID || !password) {
            return res.status(400).render("login", {
                message: 'Please provide username, user_ID and your password !'
              });
        }
        db.query('SELECT User_ID FROM NewUsers WHERE username = ?', [userName], (err, results) => {
            if(err) throw (err);
            else {
                console.log("results");
            }
    
            if (userID == 'AD-605088' && password == 'admin@user-AD60' && userName == 'Admin') {
                //return res.redirect ('/Users');

                    db.query ('SELECT * FROM NewUsers ORDER BY Id ASC', (error, results) => {
                        
                        if (error) {
                            console.log (error);
                        }
                        else {
                            return res.render ('users', {results})
                        }
                    })
            
            }
            else if(userID == results[0].User_ID) {
                //return res.redirect ('/account');

                db.query ('SELECT Balance FROM NewUsers where username = ?', [userName], (error, results) => {
                        
                    if (error) {
                        console.log (error);
                    }
                    else {
                        //console.log(results);
                        return res.render ('account', {results})
                        //return res.redirect ('/account');
                    }
                })
            }
            else {
                return res.render ('login', {
                    message: "Wrong username ,user-ID or password !"
                })
            }
            
        })
}

exports.register = async (req, res) => {
    const {username, email, password, passwordConfirm} = req.body;

    db.query ('SELECT Username FROM NewUsers WHERE username = ?', [username], async (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!username || !email || !password || !passwordConfirm) {
            return res.render ('register', {
                message: "Fill in all the required fields !!"
            })
        }
        else if (results.length > 0) {
            return res.render ('register', {
                message: "That Username is already in use !"
            })
        }
        else if ( password !== passwordConfirm) {
            return res.render ('register', {
                message: "Passwords do not match !"
            })
        }


        let randomNo = Math.random()*10000000;
        let betterNo = Math.floor(randomNo);

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log (hashedPassword);

        db.query ('INSERT INTO NewUsers SET ?', {Username: username, Email: email, Password: hashedPassword, User_ID: betterNo}, (error, results)=> {
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
                return res.redirect ('/activation')
            }
        })
    })
}


exports.editbalance = async (req, res) => {
    console.log (req.body);

    const {email, balance} = req.body;

    db.query ('UPDATE NewUsers SET Balance = ? WHERE email = ?', [balance, email], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!email || !balance) {
            return res.status(400).render("balance", {
                message: 'Fill in the required fields !'
              });
        }
        else {
            return res.redirect ('/balance')
        }
    })
}

exports.userA = async (req, res) => {
    const {nameA, amountA } = req.body;
    console.log (req.body);

    db.query ('UPDATE deposits SET Name=?, Amount=? WHERE Id = "1"', [nameA, amountA], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameA|| !nameA) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-1 successfully updated'
            });
        }

    })
}

exports.userB = async (req, res) => {
    const {nameB, amountB } = req.body;
    console.log (req.body);

    db.query ('UPDATE deposits SET Name = ?, Amount = ? WHERE Id = "2" ', [nameB, amountB], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameB|| !amountB) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-2 successfully updated'
            });
        }

    })
}

exports.userC = async (req, res) => {
    const {nameC, amountC } = req.body;
    console.log (req.body);

    db.query ('UPDATE deposits SET Name = ?, Amount = ? WHERE Id = "3" ', [nameC, amountC], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameC|| !nameC) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-3 successfully updated'
            });
        }

    })
}

exports.userD = async (req, res) => {
    const {nameD, amountD } = req.body;
    console.log (req.body);

    db.query ('UPDATE deposits SET Name = ?, Amount = ? WHERE Id = "4" ', [nameD, amountD], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameD|| !nameD) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-4 successfully updated'
            });
        }

    })
}

exports.userE = async (req, res) => {
    const {nameE, amountE } = req.body;
    console.log (req.body);

    db.query ('UPDATE deposits SET Name = ?, Amount = ? WHERE Id = "5" ', [nameE, amountE], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameE || !nameE) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-5 successfully updated'
            });
        }

    })
}

exports.userF = async (req, res) => {
    const {nameF, amountF } = req.body;
    console.log (req.body);

    db.query ('UPDATE deposits SET Name = ?, Amount = ? WHERE Id = "6" ', [nameF, amountF], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameF|| !nameF) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-6 successfully updated'
            });
        }

    })
}

exports.userG = async (req, res) => {
    const {nameG, amountG } = req.body;
    console.log (req.body);

    db.query ('UPDATE withdrawals SET Name = ?, Amount = ? WHERE Id = "1" ', [nameG, amountG], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameG|| !nameG) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-7 successfully updated'
            });
        }

    })
}

exports.userH = async (req, res) => {
    const {nameH, amountH } = req.body;
    console.log (req.body);

    db.query ('UPDATE withdrawals SET Name = ?, Amount = ? WHERE Id = "2" ', [nameH, amountH], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameH|| !nameH) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-8 successfully updated'
            });
        }

    })
}

exports.userI = async (req, res) => {
    const {nameI, amountI } = req.body;
    console.log (req.body);

    db.query ('UPDATE withdrawals SET Name = ?, Amount = ? WHERE Id = "3" ', [nameI, amountI], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameI|| !nameI) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-9 successfully updated'
            });
        }

    })
}

exports.userJ = async (req, res) => {
    const {nameJ, amountJ } = req.body;
    console.log (req.body);

    db.query ('UPDATE withdrawals SET Name = ?, Amount = ? WHERE Id = "4" ', [nameJ, amountJ], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameJ|| !nameJ) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-10 successfully updated'
            });
        }

    })
}

exports.userK = async (req, res) => {
    const {nameK, amountK } = req.body;
    console.log (req.body);

    db.query ('UPDATE withdrawals SET Name = ?, Amount = ? WHERE Id = "5" ', [nameK, amountK], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameK|| !nameK) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-11 successfully updated'
            });
        }

    })
}

exports.userL = async (req, res) => {
    const {nameL, amountL } = req.body;
    console.log (req.body);

    db.query ('UPDATE withdrawals SET Name = ?, Amount = ? WHERE Id = "6" ', [nameL, amountL], (error, results) => {
        if (error) {
            console.log (error);
        }
        if (!nameL|| !nameL) {
            return res.status(400).render("history", {
                message: 'Fill in the required fields !'
            });
        }
        else {
            return res.status(400).render("history", {
                message2: 'user-12 successfully updated'
            });
        }

    })
}

