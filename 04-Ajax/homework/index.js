var URL = 'http://localhost:5000/amigos';

let showFriends = function() {

    $('#lista').empty();
    $.get(`${URL}`, function(friends) {
        console.log(friends);

        friends.forEach(e => {
            $('#lista').append(`<li id="${e.id}">${e.name}<button id="${e.id}" onclick="deleteFriend(${e.id})">X</button></li>`)
            //let li = document.createElement('li');
            //li.id = e.id;
            //li.innerHTML = e.name;
            //let list = document.getElementById('lista');
            //list.appendChild(li);
        })
         
    })
}



let buscarFriends = function() {

    let id = $('#input').val();
    
    if(id) {
        // get (http://localhost:5000/amigos/id)
        $.get(`${URL}/${id}`, function(friends) {
            console.log(friends);
            $('#amigo').text(`${friends.name} ${friends.age} ${friends.email}`);
            $('#input').val('');
        })
    } else {
        $('#amigo').text('Ingresa un valor ID')
    }
}

let deleteFriend = function(idSource) {

    if(typeof idSource === 'number') {
        id = idSource;
    } else {
        id = $('#inputDelete').val();
    }

    let friend;
    if(id) {
        $.get(`${URL}/${id}`, function(buscado) {
            friend = buscado;
        });
        // URL, type, success
        $.ajax({
            url: `${URL}/${id}`,
            type: 'DELETE',
            success: function() {
                $('#sucess').text(`Fue eliminado ${friend.name} con éxito`);
                $('#inputDelete').val('');
                showFriends();
            }
        })
    } else {
        $('#sucess').text(`Debes ingresar un dato correcto`);
    }
}

$('#boton').click(showFriends);
$('#search').click(buscarFriends);
$('#delete').click(deleteFriend);