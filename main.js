import _ from 'lodash'
// import cube from './module.js'
// console.log(cube(2, 4))
// import { arrs , getName } from './module.js'
import * as R from './module.js'
import myData from './myData.json'
import axios from 'axios'

// console.log(myData)
// const user = {
//     name : 'junhee',
//     age : 20,
//     email : [
//         'audskd@gmail.com',
//         'audskd@naver.com'
//     ] 
// }
// console.log(user)
// const str = JSON.stringify(user)
// console.log(str)
// const obj = JSON.parse(str);
// console.log(obj)
// localStorage.setItem('user', JSON.stringify(user))
// console.log(localStorage.getItem('user'))
// console.log(JSON.parse(localStorage.getItem('user')))
// const str = localStorage.getItem('user');
// const obj = JSON.parse(str)
// obj.age = 30;
// console.log(obj)
// localStorage.setItem('user', JSON.stringify(obj))



// console.log(R.arrs);
// console.log(R.getName());

// const user = {
//     name : 'junhee',
//     age : 32,
//     email : ['audskd@gmail.com']
// }

// const copyUser = user;
// console.log(copyUser === user)
// user.age = 20;
// console.log(user);
// console.log(copyUser);

// const copyUser = Object.assign({}, user);
// console.log(user === copyUser)

// user.age = 20;
// console.log(user)
// console.log(copyUser)

// const copyUser = {...user};
// console.log(copyUser === user);
// user.age = 20;
// console.log(user);
// console.log(copyUser);

// user.email.push('audskd@naver.com');
// console.log(user.email === copyUser.email)
// console.log(user);
// console.log(copyUser);

// const copyUser = _.cloneDeep(user);
// console.log(copyUser === user);
// user.age = 20;
// console.log(user);
// console.log(copyUser);
// user.email.push('audskd@naver.com')
// console.log(user.email === copyUser.email);
// console.log(user);
// console.log(copyUser);

// const userA = [
//     {userId: '1', name: 'roh'},
//     {userId: '2', name: 'kim'}
// ]
// const userB = [
//     {userId: '3', name: 'roh'},
//     {userId: '4', name: 'lee'}
// ]
// const userC = userA.concat(userB);
// console.log(userC)
// console.log(_.uniqBy(userC, 'userId'))

// const userD = _.unionBy(userA, userB, 'userId')
// console.log(userD)

// const users = [
//     {userId: '1', name: 'roh'},
//     {userId: '2', name: 'kim'},
//     {userId: '3', name: 'lee'},
//     {userId: '4', name: 'park'}
// ]
// const foundUser = _.find(users, {name: 'lee'});
// console.log(foundUser)
// const foundUserIndex = _.findIndex(users, {name: 'lee'});
// console.log(foundUserIndex)
// _.remove(users, {name : 'kim'})
// console.log(users)

// let array = [1,2,3,4];
// let even = _.remove(array, function (n) {
//     return n % 2 === 0;
// })
// console.log(array)
// console.log(even)

// let friend = [
//     {name: 'kim', active: true},
//     {name: 'lee', active: true}
// ]

// console.log(_.every(friend, {name: 'kim', active: false}))
// console.log(_.every(friend, ['active', false]))
// console.log(_.every(friend, 'active'))

// let sister = [
//     {name: 'kim', age: 20, city: 'seoul'},
//     {name: 'lee', age: 22, city: 'daejeon'},
//     {name: 'park', age: 20, city: 'busan'},
//     {name: 'kim', age: 27, city: 'daejeon'}
// ]
// console.log(_.filter(sister, {age: 20, name: 'kim'}))
// console.log(_.filter(sister, sisters => sisters.age === 20))

function getMovies() {
    axios
    .get('https://www.omdbapi.com/?apikey=53941419&s=avengers')
    .then((response)=> {
        console.log(response);
        const h1El = document.querySelector("h1")
        const imgEl = document.querySelector("img")
        const year = document.getElementById('year')
        const type = document.getElementById('type')
        h1El.textContent = response.data.Search[1].Title;
        imgEl.src = response.data.Search[1].Poster;
        year.textContent = response.data.Search[1].Year;
        type.textContent = response.data.Search[1].Type;
    })
}
getMovies();


// 자전거 지도 만들기
const API_KEY = '706543746a6175643131375959775854';
async function getData() {
    const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/1/50/`;
    const response = await fetch(url);
    const data = await response.json();
    const locations = data.rentBikeStatus.row.map(spot => [spot.stationName, spot.stationLatitude, spot.stationLongitude])
    console.log(data)
    console.log("location",locations)
    drawMap(locations);
}
getData();

function drawMap(locations) {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(locations[0][1], locations[0][2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    })

    const infowindow = new google.maps.InfoWindow();
    locations.forEach((location, i) => {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(location[1], location[2]),
            map: map,
            title: location[3]
        })

        marker.addListener('click', () => {
            infowindow.setContent(location[3]);
            infowindow.open(map, marker);
        })
    });
}

