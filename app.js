const SUPABASE_URL = "https://kkbnekygfwizviapvcfo.supabase.co";
const SUPABASE_KEY = "sb_publishable_3Fi7MWfPTdKXOVAF_AxkGw_1QT4xTKm";

const client = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let contatoEditando = null;

async function listarContatos(){

  const { data } = await client
    .from("contato")
    .select("*")
    .order("id", { ascending: true });

  const lista = document.getElementById("listaContatos");

  lista.innerHTML = "";

  data.forEach(contato => {

    lista.innerHTML += `
      <tr>

        <td>${contato.nome}</td>
        <td>${contato.telefone}</td>
        <td>${contato.email}</td>

        <td>

          <button onclick="editarContato(${contato.id}, '${contato.nome}', '${contato.telefone}', '${contato.email}')">
            ✏
          </button>

          <button onclick="excluirContato(${contato.id})">
            🗑
          </button>

        </td>

      </tr>
    `;
  });
}

async function salvarContato(){

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;

  if(contatoEditando){

    await client
      .from("contato")
      .update({
        nome,
        telefone,
        email
      })
      .eq("id", contatoEditando);

  }else{

    await client
      .from("contato")
      .insert([
        {
          nome,
          telefone,
          email
        }
      ]);
  }

  limparFormulario();

  listarContatos();
}

function editarContato(id, nome, telefone, email){

  contatoEditando = id;

  document.getElementById("nome").value = nome;
  document.getElementById("telefone").value = telefone;
  document.getElementById("email").value = email;
}

async function excluirContato(id){

  const confirmar = confirm("Deseja excluir?");

  if(confirmar){

    await client
      .from("contato")
      .delete()
      .eq("id", id);

    listarContatos();
  }
}

function limparFormulario(){

  contatoEditando = null;

  document.getElementById("nome").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("email").value = "";
}

listarContatos();