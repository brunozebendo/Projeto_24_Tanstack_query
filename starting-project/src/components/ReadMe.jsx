/**Esse é o projeto da seção 24 q vai ensinar Tanstack Query, uma biblioteca
 * de busca de dados com o backend, ela substitui com muito menos código
 * o que era feito pelo useEffect e Fetch, além de trabalhar com cache e outras
 * vantagens. para instalar: npm install @tanstack/react-query
 */
/**Incluir o código no componente onde for ser usado, aqui, NewEventsSection.jsx
 * Abaixo, foram chamados os parâmetros para atingir os dados: se o requerimento
 * está pendente, se houve erro (o que é determinado pelo código do fetchEvents) e,
 * se houve, qual foi, sendo possível chamar ainda outras funções como o refetch,
 * para fazer um novo fetch, por exemplo.
 * É preciso criar uma chave (queryKey) que é usada internamente
 * pelo Tanstack para fazer o cache das informação, também é preciso criar uma
 * função (queryFn) que chama outra função (fetchEvents) q está em outro componente,
 * util/http.js, pois o tanstack não vem com código para fazer o Http request, apenas
 * para lidar com o resultado dele. **/

import { useQuery } from '@tanstack/react-query'
export default function NewEventsSection() {
    const {data, isPending, isError, error} = useQuery({
       queryKey:['events'],
       queryFn: fetchEvents
     })};

/**Assim, se ainda estiver pendente, ele mostra o componente de carregamento */

if (isPending) {
    content = <LoadingIndicator />;
  }
/**aqui, usando o isError para caso seja true, atingir o código abaixo */
  if (isError) {
    content = (
      <ErrorBlock
       title="An error occurred"
       message={error.info?.message || 'failed to fetch events.'} />
    );
  }
  /**também é preciso fazer um wrap no App.js */
  import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

  const queryClient = new QueryClient();

  function App() {
    return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>);
  }
  /**Na aula 392 explica que o tanstack automaticamente acumula os dados no cache
   * o que já mostra os dados ao recarregar, usando o key para saber quais os dados
   * em cache deve acessar, mas ao mesmo tempo, também faz um novo fetch para saber
   * se houve atualizações.
   * Pode-se ainda controlar o tempo entre novas consultas com o staleTime e o
   * tempo de recolher com o gargabe colector gcTime
   */

  staleTime: 5000,
    //gcTime: 1000

    /**Aula 393 inclui a lógica para uma barra de pesquisa, como dito acima
     * a função tem que ser escrita em outro local, aqui sempre está no http.js
     * e só chamada no useQuery. Abaixo a função com a lógica para a pesquisa.
     * O searchTerm está sendo controlado por um useState no FindEventSection
     * dentro de um handleSubmit para quando o formulário for submetido 
     * o termo procurado seja passado junto o fetch. No entanto, só será passado
     * se houver um termo digitado no input de busca, por isso a lógica
     * do url abaixo que, pelo que entendi, leva a outro endpoint '?search' e
     *  * 
     */ 
    export async function fetchEvents({ signal, searchTerm, max }) {
      console.log(searchTerm);
      let url = 'http://localhost:3000/events';
    /**Aula 406, no backend é esperado um max para mostrar somente os
     * eventos mais atuais, definido como 3 no NewEventsSection.jsx,
     * então, abaixo é feita a lógica para caso haja o preenchimento do searchterm
     * e o número máximo.
     */
      if (searchTerm && max) {
        url += '?search=' + searchTerm + '&max' + max;
      } else if (searchTerm) {
        url += '?search=' + searchTerm;
      } else if (max) {
        url += '?max=' + max
      }

     /*Já no componenteFindEventSection.jsx*/
    import { useQuery } from '@tanstack/react-query';
    import {fetchEvents} from '../../util/http';


    export default function FindEventSection() {
      //o useRef para capturar o valor do input
      const searchElement = useRef();
      const [searchTerm, setSearchTerm ] = useState();
    
      const { data, isLoading, isError, error } = useQuery({
        /**a queryKey foi setada com um segundo termo para que se diferencie
         * da que é acionada quando se inclui um novo evento. Esse search é
         * usado para criar uma queryKey dinamicamente o que permite o cacheamento
         * e reuso de diferentes dados para diferente chaves com base na mesma query.
         * Foi usado um useState para capturar o valor, ao invés do useRef, pois é preciso
         * re renderizar o componente
         * Já o signal no TanStack Query é usado para cancelar uma consulta (query) antes que
         * ela seja concluída. Quando você faz uma consulta com o useQuery, pode fornecer um
         * objeto de opções que inclui uma propriedade signal. Essa propriedade é um
         * AbortSignal, que pode ser usado para cancelar a consulta em andamento.
         * Por exemplo, se o usuário navegar para outra página ou sair da tela antes que
         * a consulta termine, você pode cancelá-la usando o signal.
         * Isso ajuda a economizar recursos e evitar que consultas desnecessárias
         * sejam executadas. Aqui ele é incluído na função e passado para no http.js
         * porque estava sendo feita uma chamada para um endereço inexistente
         * pois a chamada estava sendo feita duas vezes, já que o fetchEvents
         * também é chamado pelo NewEvent. */
        queryKey: ['events', {search: searchTerm}],
        queryFn: ({signal}) => fetchEvents({signal, searchTerm}),
        //essa função built in é para controlar o envio ou não do requerimento, nesse caso,
        // evitar que a função seja enviada se não houver nenhum termo de busca, para isso
        //a condição inicial do useState foi definida como undefined e não '' 
        enabled: searchTerm !== undefined
      });
    
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
//criada uma variável para controle do que será mostrado, no content q está no return
  let content = <p>Please enter a search term and to find events.</p>;
//se estiver carregando, o content mostra o componente indicado
  if (isLoading) {
    content = <LoadingIndicator />
  }
//se houver erro é mostrado o componente customizado, mostrando se houver mensagem
// correspondente ou || a mensagem abaixo
  if (isError) {
    content = <ErrorBlock title="An error ocurred"
    message={error.info?.message || 'Failed to fetch events'} />
  }
/**lógica para mostrar somente o evento cuja key corresponda àquela procurada */
  if (data) {
    content = <ul className='events-list'>
      {data.map(event => <li key={event.id}>
        <EventItem event={event} />
        </li>)}
    </ul>
  }
/**mais abaixo, no return, o input e o {content} */
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
</header>
{content}

/**Aula 396 vai inserir a lógica para mandar dados para o backend. No componente
 * NewEvent.js é importado o useMutation q é otimizado para enviar posts*/
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../util/http.js';
import { queryClient } from '../../util/http.js';

//como nos outros querys, as funções do query são para mostrar diferentes partes
//a depender do q está acontecendo, mas não vou copiar tudo aqui.
/**aula 398: foi usado o onSuccess ao invés do navigate puro para que modal só feche
 * e a página só seja redirecionada se o query der certo. já o queryclient é um
 * método do Query para invalidar o request anterior e forçar um novo de todos
 * os componentes que incluam aquela key, aqui, quando um novo evento é incluído
 * ele deve aparecer imediatamente na página. Para ele funcionar, no http.js 
 * (para que pudesse ser acessado por vários componentes)
 * foi incluída a linha export const queryClient = new QueryClient();
 */
const {mutate, isPending, isError, error} = useMutation({
  mutationFn: createNewEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['events']});
    navigate('/events');
  }
})
/**o mutate garante q a função só vai ser chamada no submit do form */
function handleSubmit(formData) {
  mutate({event: formData});
}
/**Já no http essa é a função correspondente */
export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  /**Aula 397 ensina a obter as imagens que são selecionadas no formulário.
   * esse é o código que está no http.js para atingir as imagens que estão no 
   * backend*/

  export async function fetchSelectableImages({ signal }) {
    const response = await fetch(`http://localhost:3000/events/images`, { signal });
  
    if (!response.ok) {
      const error = new Error('An error occurred while fetching the images');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { images } = await response.json();
  
    return images;
  }
  
  /* já no EventForm.jsx o useQuery bem padrão
   */
  import { useQuery } from '@tanstack/react-query';
  import { fetchSelectableImages } from '../../util/http.js';

  const {data, isPending, isError} = useQuery({
    queryKey: ['events-images'],
    queryFn: fetchSelectableImages
  })
  /**assim, as informações obtidas pelo query são usadas novamente para mostrar
   * condicionalmente os componentes abaixo*/
  {isPending && <p>Loading images...</p>}
      {isError && <ErrorBlock title="Failed to load selectable images"
       message="Please, try again later."/>}
      {data && (<div className="control">
        <ImagePicker
          images={data}
          onSelect={handleSelectImage}
          selectedImage={selectedImage}
        />
</div>
/**Aula 400 insere a lógica para mostrar os detalhes quando o evento for clicado,
 * está no EventDetails.jsx e é basicamente a mesma coisa já falada aqui, adicionando
 * apenas uma lógica para acessar o id do componente q será mostrado. Também
 * é inserida a lógica para o delete do evento usando o mutation e usando
 * uma função no http que manda um delete para o backend, não vou copiar tudo aqui.
 * A novidade aqui é o refetchType(aula 401) que evita um novo requerimento imediato
 * do invalidateQueries, gerando um erro no network 
 */

const {data, isPending, isError, error} = useQuery({
  queryKey:['events', params.id],
  queryFn: ({signal}) => fetchEvent({signal, id: params.id})
});

const {mutate,
   isPending: isPendingDeletion,
    isError: isErrorDeleting,
     error: deleteError} = useMutation({
  mutationFn: deleteEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['events'],
      refetchType: 'none'
    });
    navigate('/events');
  }
});
/**aula 402 insere a lógica no EventDetails.jsx  para abrir um modal de confirmação
 * do comando de delete usando useState.
 * aula 403, a lógica para editar o evento no componente EditEvent.jsx usando
 * useQuery, a função fetchEvent, o useParams para obter o id 
 * Aula 404 vai incluir o código para o botão do update que finaliza o modal do
 * edit mandando os dados para o backend através do mutation e de uma função
 * post no http.
 * Aula 405 fala sobre optmistic uptading que é atualizar a UI antes do retorno do 
 * backend, para isso se usa onMutate que atualiza os dados cacheados*/

const { mutate } = useMutation({
  mutationFn: updateEvent,

  onMutate: async (data) => {
    /**essa linha captura os novos dados */
    const newEvent = data.event;
    /**essa linha cancela as queries de todas as keys iguais*/
    await queryClient.cancelQueries({queryKey: ['events', params.id]});
    /**essa linha guarda os dados anteriores, cacheados, para garantir
     * caso falte algum dado ou dê erro, ele é retornado abaixo*/
    const previousEvent = queryClient.getQueryData(['events', params.id]);
  /*/essa linha captura os dados cacheados, usando os dois argumentos,
   [os dados em cache] e o novo dado, que foi acima passado*/
    queryClient.setQueryData(['events', params.id], newEvent);
    //esse return é necessário pois fornece o contexto para o onError abaixo
    return { previousEvent }
  },
  /**caso dê erro, voltam os dados anteriores */
  onError: (error, data, context) => {
    queryClient.setQueryData(['events', params.id], context.previousEvent);
  },
  /**essa linha vai ser chamada independente do resultado para assegurar que
   * o frontend e o backend tenham os mesmos dados*/
  onSettled: () => {
    queryClient.invalidateQueries(['events', params.id]);
  }
});
/**Na aula 407 é inserido um código utilizando o react router dom em
 * conjunto com o query para carregar os dados e fazer as requisições usando
 * as actions e loaders, não vou escrever aqui, acho q vai confundir já que é uma
 * opção extra, mas é por isso que parte do código está comentado.
*/