const express = require('express')
const router = express.router()
const db = require('./db')


async function insertAccessCode(phoneNumber, accessCode) {
    const sql = 'INSERT INTO access_codes (phone_number, access_code) VALUES (?,?)'
    const values = [phoneNumber, accessCode]
    const result = await db.query(sql, values)
    return result
}

async function getAccessCodeByPhoneNumber(phoneNumber) {
    const sql = 'SELECT access_code FROM access_code WHERE phone_number= ?'
    const values = [phoneNumber]
    const result = await db.query(sql, values)
    return result.rows[0]?.accessCode
}

async function updateAccessCode(phoneNumber, accessCode) {
    const sql = 'UPDATE access_code SET access_code = ? WHERE phone_number = ?'
    const values = [accessCode, phoneNumber]
    const result = await db.query(sql, values)
    return result
}

router.post('/create-new-access-code', async (req, res) => {
    const phoneNumber = req.body.phoneNumber
    const accessCode = Math.floor(Math.random() * 1000000) + 100000

    await db.insertAccessCode({ phoneNumber, accessCode})
    res.send(accessCode)
})

router.post('/validate-access-code', async (req, res) => {
    const accessCode = req.body.accessCode
    const phoneNumber = req.body.phoneNumber
    const existingAccessCode = await db.getAccessCodeByPhoneNumber(phoneNumber)

    if (existingAccessCode === accessCode) {
        res.send({ success: true})
        await db.updateAccessCode({ phoneNumber, accessCode: ''})
    } else {
        res.status(400).send('Invalid access code')
    }
})

const app = express()
app.use(router)

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})