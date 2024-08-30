import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const previusSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {

        if (previusSearch.current === search) return

        setLoading(true)
        previusSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
        setLoading(false)
    }, [])

    const sortedMovies = useMemo(() => {
        return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
    }, [movies, sort])

    return { movies: sortedMovies, getMovies, loading }
}
