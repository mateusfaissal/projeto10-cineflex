import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export default function SeatsPage({ buyerInfo, setBuyerInfo }) {

    const { idSessao } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState(undefined);
    const [movie, setMovie] = useState([]);
    const [infos, setInfos] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const numberSeats = [];

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);

        promise.then(res => {
            setSeats(res.data.seats);
            setMovie(res.data.movie);
            setInfos(res.data);
        })

        promise.catch(error => alert(error.message));
    }, []);

    function selectSeat(selecionado, id) {
        if(!selecionado){
            alert('Este assento não está disponível');
        }else if(selecionados.includes(id)){
            const index = selecionados.indexOf(id);
            selecionados.splice(index, 1);
            setSelecionados([...selecionados]);
        }else{
            setSelecionados([...selecionados, id]);
        }
    }

    function catchSeatNumber(seats, selecionados){
        

        seats.forEach(seat =>{
            if(selecionados.includes(seat.id)){
                numberSeats.push(seat.name)
            }
        })
    }

    function bookingSeats(e) {
        e.preventDefault();

        const bookingObj = {
            ids: selecionados,
            name: nome,
            cpf: cpf
        };

        const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', bookingObj);
        promise.then(res => {
            
            catchSeatNumber(seats, selecionados);

            const buyerObj = {
                nomeFilme: infos.movie.title,
                horario: infos.name,
                data: infos.day.date,
                assentos: numberSeats,
                nome,
                cpf
            };

            setBuyerInfo(buyerObj);
            console.log(buyerInfo);
            navigate('/sucesso');

        })

        promise.catch(res => alert(res.data.response.message));

    }

    if (seats === undefined) {
        return (
            <p> Loading ... </p>
        )
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map(seat => (
                     <SeatItem
                     key={seat.id} 
                     onClick={() => selectSeat(seat.isAvailable, seat.id)}
                     indisponivel = {!seat.isAvailable}
                     selected = {selecionados.includes(seat.id)}
                     data-test="seat"
                 >{seat.name}</SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle border={'#0E7D71'} color={'#1AAE9E'} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle border={'#7B8B99'} color={'#C3CFD9'} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle border={'#F7C52B'} color={'#FBE192'} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={bookingSeats}>
                    <label htmlFor="nome">Nome do Comprador:</label>
                    <input data-test="client-name" id="nome" name="nome" onChange={e => setNome(e.target.value)} value={nome} placeholder="Digite seu nome..."  required/>

                    <label htmlFor="cpf">CPF do Comprador:</label>
                    <input data-test="client-cpf" id="cpf" name="cpf" onChange={e => setCpf(e.target.value)} value={cpf} placeholder="Digite seu CPF..." required/>

                    <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt="movie" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{infos.day.weekday} - {infos.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};        
    background-color: ${props => props.color}; 
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid blue; 
    background-color: ${props => {
        if(props.selected){
            return '#0E7D71';
        }if(props.indisponivel){
            return '#F7C52B'
        }else{     
        return '#7B8B99'
        }
        }};
    background-color: ${props => {
        if(props.selected){
            return '#1AAE9E';
        }if(props.indisponivel){
            return '#FBE192'
        }else{     
        return '#C3CFD9'
        }
        }};         
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`