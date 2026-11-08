const test = require("node:test");
const assert = require("node:assert/strict");
const { requireStaffOrAdmin } = require("../src/middleware/auth");

function checkRole(role) {
    let statusCode;
    let nextCalls = 0;

    const response = {
        status(code) {
            statusCode = code;
            return this;
        },
        json() {
            return this;
        }
    };

    const request = role ? { user: { role } } : {};

    requireStaffOrAdmin(request, response, () => {
        nextCalls++;
    });

    return { statusCode, nextCalls };
}

test("admin is allowed", () => {
    assert.equal(checkRole("admin").nextCalls, 1);
});

test("staff is allowed", () => {
    assert.equal(checkRole("staff").nextCalls, 1);
});

test("guest is denied", () => {
    assert.equal(checkRole("guest").statusCode, 403);
});

test("missing user is denied", () => {
    assert.equal(checkRole(null).statusCode, 403);
});