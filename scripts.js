let index = 0;

function changeData(array, dataIndex) {
    let modalContent =
        `
        <img class="modal-img" src="${array[dataIndex].image}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${array[dataIndex].firstName} ${array[dataIndex].lastName}</h3>
        <p class="modal-text">${array[dataIndex].email}</p>
        <p class="modal-text cap">${array[dataIndex].city}</p>
        <hr>
        <p class="modal-text">${array[dataIndex].number}</p>
        <p class="modal-text" style = "text-transform: capitalize">${array[dataIndex].street}., ${array[dataIndex].city}, ${array[dataIndex].state} ${array[dataIndex].zip}</p>
        <p class="modal-text">Birthday: ${array[dataIndex].birthday.substr(5,5)}-${array[dataIndex].birthday.substr(0,4)}</p>
    `
    $('.modal-info-container').html(modalContent);
    $('.modal-container').show();
}

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        var results = [];
        for (let i = 0; i < myJson.results.length; i++) {
            var result = {
                firstName: myJson.results[i].name.first,
                lastName: myJson.results[i].name.last,
                image: myJson.results[i].picture.large,
                email: myJson.results[i].email,
                city: myJson.results[i].location.city,
                state: myJson.results[i].location.state,
                number: myJson.results[i].cell,
                street: myJson.results[i].location.street,
                zip: myJson.results[i].location.postcode,
                birthday: myJson.results[i].dob.date
            }
            results.push(result);
        }
        console.log(results);
        return results;
    }).then(function (results) {
        var html = '';
        for (var i = 0; i < results.length; i++) {
            var card = `
                        <div class="card" data-index = ${i}> 
                            <div class = "card-img-container">
                                <img class = "card-img" src = "${results[i].image}" alt = "profile picture">
                            </div> 
                            <div class = "card-info-container">
                                <h3 id = "name" class = "card-name cap"> ${results[i].firstName} ${results[i].lastName} </h3> 
                                <p class = "card-text" > ${results[i].email} </p> 
                                <p class = "card-text cap" > ${results[i].city}, ${results[i].state} </p> 
                            </div> 
                        </div>
                        `;
            html += card;
        }
        $('#gallery').html(html);
        $('.search-container').html(`
                                    <form action="#" method="get">
                                        <input type="search" id="search-input" class="search-input" placeholder="Search...">
                                        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                                    </form>
                                    `);
        return results;
    }).then(function (results) {
        var modal =
            `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
            `
        $('#gallery').append(modal);
        $('.modal-container').hide();
        return results;
    }).then(function (results) {
        $('.card').click(function (e) {
            index = $(this).data('index');
            if (index == 11) {
                $('#modal-next').hide();
            } else if (index == 0) {
                $('#modal-prev').hide();
            } else {
                $('#modal-next').show();
                $('#modal-prev').show();
            }
            changeData(results, index);
        })
        $('#modal-close-btn').click(function () {
            $('.modal-container').hide();
        })
        $('#modal-prev').click(function () {
            if (index > 0) {
                index--;
                changeData(results, index);
                $('#modal-next').show();
            }
            if (index == 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
        $('#modal-next').click(function () {
            if (index < 11) {
                index++;
                changeData(results, index)
                $('#modal-prev').show();
            }
            if (index == 11) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
        $('#search-input').keyup(function(e){
            let names = $('.card .card-info-container h3');
            for(let i = 0; i < names.length; i++){
                if($(this).val().toLowerCase() == names[i].textContent.substring(1, $(this).val().length+1).toLowerCase()){
                    names[i].parentElement.parentElement.style.display = 'block';
                } else {
                    names[i].parentElement.parentElement.style.display = 'none';
                }
            }
        })
    })