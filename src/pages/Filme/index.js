import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify';

function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'bb6168befc0d7650e970a25df83eee12',
                    language: 'pt-BR',
                }
            })
            .then((response) =>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {                
                navigate('/', {replace: true});
                return;
            })
        }
        loadFilme();
        
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || [];  // || (ou inicializa com um array vazio) 

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id); // verifica se já tem na lista

        if(hasFilme){
            toast.warn('Este filme já está na sua lista!');
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>  
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    {/* target=blank (serve para abrir em outra aba do navegador) */}
                    <a target='blank' rel='external' href={`https://youtube.com./results?search_query=${filme.title} Trailer`}> 
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;