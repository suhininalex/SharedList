export const fetchListMock = () => {
    return new Promise((resolve, reject) => {
        let wait = setTimeout(()=> {
            clearTimeout(wait)
            resolve({
                id: '1',
                name: 'Тестовый список',
                items: [
                    {name: 'сок'},
                    {name: 'сахар'},
                    {name: 'мёд'},
                    {name: 'молоко'}
                ]
            })
        })
    })
}