const jwt = require('jsonwebtoken');
const allowlistRefreshToken = require('../../redis/allowlist-refresh-token');
const crypto = require('crypto');
const moment = require('moment');
const blocklistAcessToken = require('../../redis/blocklist-access-token');

function criaTokenJWT(id, [tempoQuantidade, tempoUnidade]) {
    const payload = { id };
    const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: tempoQuantidade + tempoUnidade });
    return token;
}

function verificaTokenJWT(token) {
    await verificaTokenNaBlocklist(token);
    const payload = jwt.verify(token, process.env.CHAVE_JWT);
}

async function verificaTokenNaBlocklist(token) {
    const tokenNaBlocklist = await blocklistAcessToken.contemToken(token);
    if (tokenNaBlocklist) {
        throw new jwt.JsonWebTokenError('Token inválido por logout!');
    }
}

async function criaTokenOpaco(id, [tempoQuantidade, tempoUnidade], allowlist) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex');
    const dataExpiracao = moment().add(tempoQuantidade, tempoUnidade).unix();
    await allowlist.adiciona(tokenOpaco, id, dataExpiracao);
    return tokenOpaco;
}

module.exports = {
    access: {
        expiracao: [15, 'm'],
        cria(id) {
            return criaTokenJWT(id, this.expiracao);
        },
        verifica(token) {
            return verificaTokenJWT(token);
        }
    },
    refresh: {
        lista: allowlistRefreshToken,
        expiracao: [5, 'd'],
        cria(id) {
            return criaTokenOpaco(id, this.lista);
        },
        verifica(token) {
            return verificaTokenOpaco(token);
        }
    }
}