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
        password: admin
    })
    await newUser.save()
})

test("one use initially", async () => {
    const users = await api.get("/api/users")
                            .expect(200)
    expect(users.body.length).toBe(1)
})

describe("posting invalid user returns 400 and does not post", () => {
    test("duplicate username", async () => {
        const invalidUser = {
            name: "New User",
            userName: "root",
            password: "pass"
        }
        await api.post("/api/users")
                 .send(invalidUser)
                 .expect(400)
        const users = await api.get("/api/users")
                               .expect(200)
        expect(users.body.length).toBe(1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})