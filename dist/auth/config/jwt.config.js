"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRE_IN) || 86400,
    },
}));
//# sourceMappingURL=jwt.config.js.map