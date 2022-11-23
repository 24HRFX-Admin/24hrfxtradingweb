const express = require ('express');
const mysql = require ('mysql');

const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
})


const router = express.Router();

router.get ('/', (req, res) => {
    res.render ('index')
})


/*

router.get ('/', (req, res) => {

    db.query ('SELECT * FROM deposits ORDER BY Id ASC', (error, results) => {
                        
        if (error) {
            console.log (error);
        }
        else {
            return res.render ('index', {results})
        }
    })


    db.query ('SELECT * FROM withdrawals ORDER BY Id ASC', (error, data) => {
                        
        if (error) {
            console.log (error);
        }
        else {
            return res.render ('index', {data})
        }
    })
  
    //res.render ('index')
})
*/

router.get ('/register', (req, res) => {
    res.render ('register')
})

router.get ('/login', (req, res) => {
    res.render ('login')
})

router.get ('/aboutb', (req, res) => {
    res.render ('aboutb')
})

router.get ('/about', (req, res) => {
    res.render ('about')
})

router.get ('/faq2', (req, res) => {
    res.render ('faq2')
})

router.get ('/faq', (req, res) => {
    res.render ('faq')
})

router.get ('/account', (req, res) => {
    res.render ('account')
})

router.get ('/packages', (req, res) => {
    res.render ('packages')
})

router.get ('/packages2', (req, res) => {
    res.render ('packages2')
})

router.get ('/terms', (req, res) => {
    res.render ('terms')
})

router.get ('/admin', (req, res) => {
    res.render ('admin')
})

router.get ('/page1', (req, res) => {
    res.render ('page1')
})

router.get ('/history', (req, res) => {
    res.render ('history')
})

router.get ('/activation', (req, res) => {
    res.render ('activation')
})

router.get ('/email2', (req, res) => {
    res.render ('email2')
})

router.get ('/balance', (req, res) => {
    res.render ('balance')
})


router.get ('/users', (req, res) => {
    db.query ('SELECT * FROM NewUsers ORDER BY Id ASC', async function (error, results) {

            if (error) {
                console.log(error);
            }
            else {
                return res.render('users', { results });
            }
        })
})

module.exports = router;