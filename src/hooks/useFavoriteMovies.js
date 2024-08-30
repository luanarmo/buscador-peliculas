import { useState, useEffect } from 'react'


export function useFavoriteMovies() {

    const [favorite, setFavorite] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        setFavorite(favorites)
        setLoading(false)
    }, [])

    const addFavorite = (movie) => {
        const newFavorite = [...favorite, movie]
        setFavorite(newFavorite)
        localStorage.setItem('favoriteMovies', JSON.stringify(newFavorite))
    }

    const removeFavorite = (movie) => {
        const newFavorite = favorite.filter(fav => fav.id !== movie.id)
        setFavorite(newFavorite)
        localStorage.setItem('favoriteMovies', JSON.stringify(newFavorite))
    }


    return { favorite, addFavorite, removeFavorite, loading }

}