module.exports = (cargosObrigatorios) => (request, response, next) => {

    if (cargosObrigatorios.indexOf(request.user.cargo) === -1) {
        return response.sendStatus(403);
    }

    next();
}