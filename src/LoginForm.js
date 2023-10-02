import React, { useState} from "react"
import { submitForm } from "./FormUtils"
// import './LoginForm.css'

var express = require("express");
var app =express()
app.listen(3000, () => {
    console.log("server running on port 3000")
})

const LoginForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [accessCode, setAccessCode] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await submitForm(phoneNumber, accessCode)
        localStorage.setItem('phoneNumber', phoneNumber)
    }

    return (
        <form class="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                type="text"
                name="accessCode"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm