const basicHeaders = { 'Content-type': 'application/json charset=UTF-8' }

function requestOptionsBuilder(method, headers, body) {
    if (body) {
        return {
            method,
            headers: { ...basicHeaders, ...headers },
            body: JSON.stringify(body)
        }
    }

    return {
        method,
        headers: { ...basicHeaders, ...headers }
    }
}

const switchResponseStatus = (response) => {
    switch (response.status) {
        case 200: {
            return response.json().catch(error => {
                throw { type: 'JsonParserError', message: error.message ? error.message : error }
            });
        }
        case 201: {
            return response.json().catch(error => {
                throw { type: 'JsonParserError', message: error.message ? error.message : error }
            });
        }
        case 204: {
            return 'success';
        }
        default: {
            throw { type: 'TechnicalError', code: response.status }
        }
    }
}

export const call = (
    url,
    method,
    headers,
    resposeConverter,
    mock = null,
    requestData = null
) => mock ? mock() : fetch(url, requestOptionsBuilder(method, headers, requestData)).then(switchResponseStatus).then(resposeConverter);