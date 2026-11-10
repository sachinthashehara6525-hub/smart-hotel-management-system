const test = require("node:test");
const assert = require("node:assert/strict");
const {
    SESSION_TTL_MS,
    createSessionToken,
    getSessionExpiry,
    hashSessionToken,
    normalizeEmail,
    validateEmail,
    validatePassword
} = require("../src/services/authService");

test("normalizes email addresses before account lookup", () => {
    assert.equal(normalizeEmail("  ADMIN@Example.COM "), "admin@example.com");
    assert.equal(normalizeEmail(undefined), "");
});

test("enforces a strong bounded password length", () => {
    assert.equal(validatePassword("short"), false);
    assert.equal(validatePassword("six789"), true);
    assert.equal(validatePassword("correct horse battery staple"), true);
    assert.equal(validatePassword("a".repeat(129)), false);
});

test("validates normalized email addresses", () => {
    assert.equal(validateEmail(normalizeEmail(" Guest@Example.com ")), true);
    assert.equal(validateEmail("not-an-email"), false);
});

test("creates unpredictable, one-way session token identifiers", () => {
    const token = createSessionToken();
    assert.equal(typeof token, "string");
    assert.equal(token.length >= 40, true);
    assert.notEqual(hashSessionToken(token), token);
    assert.notEqual(createSessionToken(), token);
});

test("sets session expiry to the configured session lifetime", () => {
    const before = Date.now() + SESSION_TTL_MS;
    const expiry = getSessionExpiry().getTime();
    const after = Date.now() + SESSION_TTL_MS;
    assert.equal(expiry >= before && expiry <= after, true);
});
