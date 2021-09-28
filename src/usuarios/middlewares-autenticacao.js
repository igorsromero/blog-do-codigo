const passport = require('passport');

module.exports = {
    local: (request, response, next) => {
        passport.authenticate('local', { session: false }, (erro, usuario, info) => {

            if (erro && erro.name === "InvalidArgumentError") {
                response.status(401).json({ erro: erro.message });
            }

            if (erro) {
                return response.status(500).json({ erro: erro.message });
            }

            if (!usuario) {
                return response.status(401).json();
            }

            request.user = usuario;
            return next();
        })(request, response, next);
    },

    bearer: (request, response, next) => {
        passport.authenticate(
            'bearer',
            { session: false },
            (erro, usuario, info) => {

                if (erro && erro.name === 'JsonWebTokenError') {
                    return response.status(401).json({ erro: erro.message });
                }

                if (erro && erro.name === 'TokenExpiredError') {
                    return response.status(401).json({ erro: erro.message, expiadoEm: erro.expiredAt });
                }

                if (erro) {
                    return response.status(500).json({ erro: erro.message });
                }

                if (!usuario) {
                    return response.status(401).json();
                }

                request.user = usuario;
                return next();
            }
        )(request, response, next)
    }
}