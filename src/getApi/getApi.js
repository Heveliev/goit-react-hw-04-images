
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33000305-b629afd170357acb9b33609ec';

export function getApi(val, page) {
    return fetch(`${BASE_URL}?key=${KEY}&q=${val}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    }
                    
                    return Promise.reject(new Error(`${val} value is not found`))
                })
    
}