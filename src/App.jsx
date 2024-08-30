import './App.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError("No se puede buscar una película vacía")
      return
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar película por número")
      return
    }

    if (search.length < 3) {
      setError("Por favor, escribe al menos 3 caracteres")
      return
    }

    setError(null)

  }, [search])

  return { search, setSearch, error }

}

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => getMovies({ search }), 500), [getMovies])


  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix ...' />
          <button>Buscar</button>
        </form>
        <label htmlFor="">Ordenar por titulo</label>
        <input type="checkbox" onChange={handleSort} value={sort} />
        {error && <p>{error}</p>}
      </header>
      {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
    </div >
  )
}

export default App
