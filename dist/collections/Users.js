"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var PrimaryActionEmail_1 = require("../components/emails/PrimaryActionEmail");
var adminsAndUser = function (_a) {
    var user = _a.req.user;
    if (user.role === "admin")
        return true;
    return {
        id: {
            equals: user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return (0, PrimaryActionEmail_1.PrimaryActionEmailHtml)({
                    actionLabel: "Verify your account",
                    buttonText: "Verify account",
                    href: "".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token),
                });
            },
        },
    },
    access: {
        create: function () { return true; },
        read: adminsAndUser,
        update: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        delete: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
    },
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return user.role !== "admin";
        },
        defaultColumns: ["id"],
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "role",
            required: true,
            defaultValue: "user",
            // admin: {
            //   condition: ({ req }) => req.user.role === "admin",
            // },
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
        },
    ],
};
