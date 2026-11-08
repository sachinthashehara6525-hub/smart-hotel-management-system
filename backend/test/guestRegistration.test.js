const test = require("node:test");
const assert = require("node:assert/strict");
const bcrypt = require("bcryptjs");
const db = require("../src/config/db");
const { registerGuest } = require("../src/controllers/authController");

function responseForTest() {
    const response = {
        statusCode: 200,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
    return response;
}

test("registers every public account as a guest regardless of requested role", async () => {
    const originalQuery = db.query;
    let queryParameters;
    db.query = async (query, parameters) => {
        queryParameters = { query, parameters };
        return [{}];
    };

    try {
        const response = responseForTest();
        await registerGuest({
            body: {
                email: "  NewGuest@example.com ",
                password: "correct horse battery staple",
                role: "admin"
            }
        }, response);

        assert.equal(response.statusCode, 201);
        assert.match(queryParameters.query, /VALUES \(\?, \?, 'guest'\)/);
        assert.equal(queryParameters.parameters[0], "newguest@example.com");
        assert.equal(await bcrypt.compare(
            "correct horse battery staple",
            queryParameters.parameters[1]
        ), true);
    } finally {
        db.query = originalQuery;
    }
});

test("rejects invalid guest registration input", async () => {
    const response = responseForTest();
    await registerGuest({
        body: {
            email: "not-an-email",
            password: "short"
        }
    }, response);

    assert.equal(response.statusCode, 400);
});

test("returns conflict when a guest email already exists", async () => {
    const originalQuery = db.query;
    db.query = async () => {
        const error = new Error("duplicate");
        error.code = "ER_DUP_ENTRY";
        throw error;
    };

    try {
        const response = responseForTest();
        await registerGuest({
            body: {
                email: "existing@example.com",
                password: "correct horse battery staple"
            }
        }, response);
        assert.equal(response.statusCode, 409);
    } finally {
        db.query = originalQuery;
    }
});
