module.exports = (cargosObrigatorios) => (request, response, next) => {
    request.user.cargo = 'admin';
    // request.user.cargo = 'assinante';

    if (cargosObrigatorios.indexOf(request.user.cargo) === -1) {
        return response.sendStatus(403);
    }

    next();
}