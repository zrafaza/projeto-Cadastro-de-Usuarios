import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }


    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {


    await prisma.user.update({
        where: {
            id: req.params.id

        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
})

app.listen(3000)

/*
    L:  usersrc
    S:  KK2QGGnXdIkBoYoW
*/