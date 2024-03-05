// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let sharedPeopleData = null;

function randomName() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let name = '';
  for (var i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    name += chars.charAt(randomIndex);
  }
  return name;
}

function randomHobi() {
  // create random num between 0 - 4
  const randomIndex = Math.floor(Math.random() * 5)
  let result = 'A'
  switch (randomIndex) {
    case 0:
      result = 'A'
      break;
    case 1:
      result = 'B'
      break;
    case 2:
      result = 'C'
      break;
    case 3:
      result = 'D'
      break;
    case 4:
      result = 'E'
      break;
    default:
      result = 'A'
      break;
  }

  return result
}

function randomPerson() {
  const people = []

  for (let i = 0; i < 1000; i++) {
    // random num between 1 and 2
    const randomGender = Math.floor(Math.random() * 2 + 1)
    // random num with between 18-40 (inclusive) 
    const randomUmur = Math.floor(Math.random() * (40 - 18 + 1) + 18)

    const person = {
      Nama: randomName(),
      Gender: randomGender,
      Hobi: randomHobi(),
      Umur: randomUmur
    }
    people.push(person)
  }

  return people
}

function fillTable() {
  const people = randomPerson()

  // remove previous data
  $('.data').remove()

  $.each(people, function (index, person) {
    const row = '<tr class="data">' +
      '<td>' + person.Nama + '</td>' +
      '<td>' + person.Gender + '</td>' +
      '<td>' + person.Hobi + '</td>' +
      '<td>' + person.Umur + '</td>' +
      '</tr>'

    $('#peopleTable tbody').append(row)
  })
  // remove placeholder
  $('.placeholderRow').remove()

  // enable button submit
  $('#btn-submit').removeClass('disabled')
  $('#btn-submit').prop('disabled', false)

  // make sure the same data passed into a controller when submit button triggered
  sharedPeopleData = people
}

function sendDataToController() {
  const people = sharedPeopleData

  $.ajax({
    url: 'Home/InsertData',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(people),
    success: function (response) {
      if (response.success) {
        console.log(people)
        console.log('Data inserted successfully');
      } else {
        console.error('Error:', response.error);
      }
    },
    error: function (error) {
      console.error("Error:", error);
    }
  })

}





