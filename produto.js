var xhr = new XMLHttpRequest();
const url = 'http://localhost:3000/produtos';

xhr.open('GET', url);

xhr.onload = function () {
    if (xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);
        const tableBody = document.querySelector('#list-table tbody');
        tableBody.innerHTML = '';

        products.forEach(objeto => {
            const row = document.createElement('tr');

            const nomeCell = document.createElement('td');
            nomeCell.textContent = objeto.nome;
            row.appendChild(nomeCell);

            const descricaoCell = document.createElement('td');
            descricaoCell.textContent = objeto.descricao;
            row.appendChild(descricaoCell);

            const valorCell = document.createElement('td');
            valorCell.textContent = objeto.valor;
            row.appendChild(valorCell);

            const disponibilidadeCell = document.createElement('td');
            disponibilidadeCell.textContent = objeto.disponibilidade;
            row.appendChild(disponibilidadeCell);

            tableBody.appendChild(row);
        });
    } else {
        console.log('Erro ao obter os dados.');
    }
};

xhr.send();

function cadastrar() {
    var nome = document.getElementById('nome').value;
    var valor = document.getElementById('valor').value;
    var descricao = document.getElementById('descricao').value;
    var radioSim = document.getElementById('radioSim').checked;

    var form = document.querySelector('form');

    var data = {
        nome: nome,
        valor: valor,
        descricao: descricao,
        disponibilidade: radioSim ? 'Sim' : 'Não'
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (response.ok) {
                var modal = document.getElementById('my-modal');
                var bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
                form.reset();
                onRefresh();
            } else {
                alert('Erro ao cadastrar. Tente novamente.');
            }
        })
        .catch(function (error) {
            console.log(error);
            alert('Erro ao cadastrar. Tente novamente.');
        });
}

function onRefresh() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tableBody = document.querySelector('#list-table tbody');
            tableBody.innerHTML = '';

            data.forEach(objeto => {
                const row = document.createElement('tr');

                const nomeCell = document.createElement('td');
                nomeCell.textContent = objeto.nome;
                row.appendChild(nomeCell);

                const descricaoCell = document.createElement('td');
                descricaoCell.textContent = objeto.descricao;
                row.appendChild(descricaoCell);

                const valorCell = document.createElement('td');
                valorCell.textContent = objeto.valor;
                row.appendChild(valorCell);

                const disponibilidadeCell = document.createElement('td');
                disponibilidadeCell.textContent = objeto.disponibilidade;
                row.appendChild(disponibilidadeCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            // Caso ocorra algum erro na requisição
            console.error('Erro:', error);
        });
}