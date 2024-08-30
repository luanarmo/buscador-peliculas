const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    if (search) {
        try {
            const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${search}`)
            const data = await response.json()

            const movies = data.Search

            return movies?.map(movie => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }))
        } catch (error) {
            throw new Error('Error al buscar las películas')
        }
    }

}