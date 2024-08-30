
export default function Movie({ movie }) {
    return (
        <li key={movie.id} className='movie'>
            <img src={movie.poster} alt={movie.title} style={{ width: '200px', height: '300px' }} />
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
        </li>
    )
}
