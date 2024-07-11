function apiCall(URL) {
  const promise = fetch(URL);
  return promise;
}

function searchSong() {
  let input = document.getElementById("search").value;
  console.log(input);
  let searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    let searchURL = `https://itunes.apple.com/search?term=${input}&limit=5`;
    const promise = apiCall(searchURL);
    promise
      .then(function (songData) {
        const pr = songData.json();
        pr.then(function (songData) {
          console.log(songData.results);
          let songArray = songData.results;

          localStorage.setItem("songArray", JSON.stringify(songArray));

          printSong(songArray);
        }).catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

function printSong(songList) {
  let songListArray = document.getElementById("songList");
  songListArray.innerHTML = "";
  for (let i = 0; i < songList.length; i++) {
    console.log(songList[i].trackName);
    songListArray.innerHTML += `<div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${songList[i].trackName}</h5>
                                <small>${songList[i].artistName}</small>
                        </div>
                        <img src="${songList[i].artworkUrl30}" class="img-thumbnail" alt="...">
                        <span>
                                <button type="button" class="btn btn-outline-light" id="play-${i}" onclick="playSong()">Play</button>
                                <button type="button" class="btn btn-outline-light" id="add-${i}" onclick="addToPlaylist()">Add to Playlist</button>
                        </span>
                </a>
        </div>`;
    console.log(i);
  }
}
function playSong() {
  let playButtons = document.querySelectorAll("[id^='play-']");
  let audio = document.getElementById("audio");
  playButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      let songArray = JSON.parse(localStorage.getItem("songArray"));
      audio.src = songArray[index].previewUrl;
      audio.play();
      console.log("Button Clicked");
    });
  });
}
