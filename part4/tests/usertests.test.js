const supertest = require('supertest')
const User = require("../models/user.js")
const app = require("../app.js")
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const newUser = new User({
        name: "root",
        userName: "rootuser",
        password: "admin"
    })
    await newUser.save()
})

test("one blog initially", async () => {
    const users = await api.get("/api/users")
                            .expect(200)
    expect(users.body.length).toBe(1)
}, 100000)

describe("posting invalid user returns 400 and does not post", () => {
    test("duplicate username", async () => {
        const invalidUser = {
            name: "root2",
            userName: "rootuser",
            password: "pass"
        }
        await api.post("/api/users")
                 .send(invalidUser)
                 .expect(400)
        const users = await api.get("/api/users")
                               .expect(200)
        expect(users.body.length).toBe(1)
    }, 100000)
})

afterAll(() => {
    mongoose.connection.close()
})