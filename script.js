let menu = document.getElementById("menu")
let sidebar = document.getElementsByClassName('side-bar')[0]
let k = 1
let item = document.querySelectorAll(".rows")
let menuItems = document.querySelectorAll(".menu-row")
let element = document.querySelectorAll('hr')
let ytvideo = document.querySelector(".video-wrapper")
Array.from(menuItems)
Array.from(item)
Array.from(element)
let chips = document.querySelectorAll(".topics")
let topbar = document.getElementsByClassName("top-bar")[0]
Array.from(chips)
// menu
menu.addEventListener('click', function (e) {
  ++k
  if (k % 2 == 0) {
    sidebar.style.fontSize = "10px"
    sidebar.style.top = "61px"
    for (let i = 4; i < item.length; i++) {
      item[i].style.display = "none"
    }
    element.forEach((e) => {
      e.style.visibility = "hidden"
    })
    menuItems.forEach((item) => {
      item.style.padding = "0px 0px"
    })
    item[0].style.backgroundColor = "transparent"
    item.forEach((e) => {
      e.style.marginLeft = "3px"
      e.style.flexDirection = "column"
      e.style.gap = "5px"
      e.style.width = "74px"
      e.style.padding = "15px 22px"
    })
    item[0].addEventListener('mouseover', function (e) {
      item[0].style.backgroundColor = "rgb(246, 243, 243)"
    })
    item[0].addEventListener('mouseout', function (e) {
      item[0].style.backgroundColor = "transparent"
    })
    topbar.style.left = "95px"
    topbar.style.width = "calc(100vw - 95px)"
    ytvideo.style.left = "95px"
    ytvideo.style.width = "calc(100vw - 95px)"
    ytvideo.style.gridTemplateColumns = "repeat(4,325px)"
    ytvideo.style.gridAutoRows = "320px"
  }
  else {
    sidebar.style.width = '245px'
    sidebar.style.top = "55px"
    sidebar.style.fontSize = "15px"
    for (let i = 4; i < item.length; i++) {
      item[i].style.display = "flex"
    }
    item[0].style.backgroundColor = "rgb(246, 243, 243)"
    element.forEach((e) => {
      e.style.visibility = "visible"
    })
    menuItems.forEach((item) => {
      item.style.padding = "15px 0px"
    })
    item.forEach((e) => {
      e.style.marginLeft = "15px"
      e.style.width = "205px"
      e.style.gap = "20px"
      e.style.flexDirection = "row"
      e.style.alignItems = "center"
      e.style.padding = "6px 10px"
    })
    item[0].addEventListener('mouseout', function (e) {
      item[0].style.backgroundColor = "rgb(246, 243, 243)"
    })
    topbar.style.left = "260px"
    topbar.style.width = "calc(100vw - 260px)"
    ytvideo.style.left = "260px"
    ytvideo.style.width = "calc(100vw - 260px)"
    ytvideo.style.gridTemplateColumns = "repeat(3,370px)"
    ytvideo.style.gridAutoRows = "345px"
  }
})
// Topbar-chips
chips.forEach((chip) => {
  chip.addEventListener('click', (evt) => {
    chips.forEach((topic) => {
      topic.classList.remove('clicked')
    });
    chip.classList.add('clicked')
  })
})

//  Api-fetch for videos
let Api_Key = "AIzaSyD8dpm_gWILCgygujIiMyn2xT1WgnWh0OA";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
const videoCardContainer = document.querySelector(".video-wrapper");

fetch(
  video_http + new URLSearchParams({
    part: "snippet,contentDetails,statistics,player",
    chart: "mostPopular",
    maxResults: 20,
    regionCode: "IN",
    key: Api_Key,
  })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));
const getChannelIcon = (video_data) => {
  fetch(
    channel_http + new URLSearchParams({
      key: Api_Key,
      part: "snippet",
      id: video_data.snippet.channelId,
    })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    })
};
const playVideo = (embedHtml) => {
  sessionStorage.setItem("videoEmbedHtml", embedHtml);
  window.location.href = "video-page.html"
}
const makeVideoCard = (data) => {
  const videoCard = document.createElement("div");
  videoCard.classList.add("video");
  videoCard.innerHTML = `
    <img src="${data.snippet.thumbnails.high.url}" alt="thbm" class="thumbnail">
    <div class="video-details">
       <div class="video-info">
           <img src="${data.channelThumbnail}" alt="chanlogo" class="chan-logo">
           <div class="details">
           <h3 class="title">${data.snippet.title}</h3>
           <p class="chan-name">${data.snippet.channelTitle}</p>
          
           </div>
       </div>
    </div>`;
  videoCard.addEventListener('click', () => {
    playVideo(data.player.embedHtml);
  });

  videoCardContainer.appendChild(videoCard);
};
