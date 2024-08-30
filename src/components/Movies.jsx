import Movie from './Movie.jsx'
export function ListOfMovies({ movies }) {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <Movie key={movie.id} movie={movie} />
                ))
            }
        </ul>
    )
}

export function NoResults() {
    return <p>No se encontraron resultados</p>
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        <main>
            {
                hasMovies ? <ListOfMovies movies={movies} /> : <NoResults />
            }
        </main>
    )
}