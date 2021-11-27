class DataManager {

    static createList(name) {
        return fetchJson("/api/lists/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name
            })
        })
    }

    static removeItem(listId, itemId) {
        return fetchJson(`/api/lists/${listId}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    }

    static addItem(listId, name) {
        return fetchJson(`/api/lists/${listId}/items`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name
            })
        })
    }

    static getList(id) {
        return fetchJson(`/api/lists/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
    }
}

function fetchJson(url, options) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json().catch(() => Promise.resolve({}))
            } else {
                return Promise.reject(response.status)
            }
        })
}

function parseGetParameter(name) {
    let url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    let results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}