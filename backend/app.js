import {check, validationResult} from 'express-validator'
import User from "./schemas/user.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'
import {authMiddleware} from "./middleware/auth.middleware.js";

const app = express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true})

app.post('/register', [
    check('email', 'Некоректные данные при регистрации').isEmail(),
    check('password', 'Некоректные данные при регистрации').exists()
], async (req, res) => {
    //Валидация
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Некорректные данные', errors})
    }


    const {email, password, firstName, lastName} = req.body
    if (!req.body) {
        res.status(401)
        console.log(req.body)
        return res.send('Ошибка регистрации')
    }
    const candidate = await User.findOne({email})
    if (candidate) {
        return res.status(500).json({message: "Такой пользователь уже существует"})
    }

    const hashedPass = await bcrypt.hash(password, 8)
    const newUser = {
        email,
        password: hashedPass,
        firstName,
        lastName
    }
    const user = new User(newUser)
    user.save().then(() => {
        res.status(200)
        return res.send('Регистрация прошла успешно')
    })
        .catch((err) => {
            res.status(301)
            res.send(err)
        })
})

app.post('/login', [
        check('email', 'Некоректные данные при входе').exists().isEmail(),
        check('password', 'Некоректные данные при входе').exists()
    ],
    async (req, res) => {
        //Валидация
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Некорректные данные', errors})
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "Пользователь не найден"})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Ошибка при входе, пароль неверный'})
            }

            const token = jwt.sign(
                {userID: user.id},
                'jwtSecret',
                {expiresIn: '1h'}
            )
            return res.json({token, userId: user.id})

        } catch (e) {
            return res.status(400).json({e, message: 'Ошибка в кетч попала'})
        }
    })

app.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({id: req.user.userId})
            const token = jwt.sign(
                {userID: user.id},
                'jwtSecret',
                {expiresIn: '1h'}
            )
            return res.json({
                token, user: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })

        } catch (e) {
            return res.status(400).json({e, message: 'Ошибка в кетч попала'})
        }
    })


app.listen(3000, () => {
    console.log('server was started at ' +
        3000 + ' port')
})