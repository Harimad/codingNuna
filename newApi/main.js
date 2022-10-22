// 한달에 50번 다 써서 못씀.
// let news = [];
// const getLatestNews = async () => {
// let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
// let header = new Headers({
//   'x-api-key': 'NHhmhsswltAdCYsRqKQaOZX_5XgKzCsxreKYRce6-Oo',
// });
// let response = await fetch(url, { headers: header });
// let data = await response.json(); // 역시 서버에서 데이터를 뽑아야 하기때문에 await이 필요함.
// news = data;
// };
// getLatestNews();

let news = [];
const getNews = async () => {
  var url =
    'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2022-10-21&' +
    'sortBy=popularity&' +
    'apiKey=2431d4c166fb4546a136e11ab9ca36ed';

  let req = new Request(url);
  let response = await fetch(req);
  let data = await response.json();
  news = data.articles;
  render();
  console.log(news);
};
getNews();

/*
1. 사이드 메뉴
- 웹사이트 버전에서는 웹사이트 타이틀 하단에 카테고리 메뉴 존재
- 모바일 버전시 카테고리 메뉴는 사라지고 햄버거 메뉴가 나온다.
	[O] mediaquery사용
		[O] 모바일 사이즈에서 menu부분을 position:fixed & top:0 & left:0으로 설정
- 햄버거 메뉴를 누르면 사이드메뉴가 나온다.
*/

const $toggleMenu = document.querySelector('#toggleMenu');
const $search = document.querySelector('#search');
const $closeBtn = document.querySelector('#closeBtn');
const $menus = document.querySelector('#menus');
const $searchArea = document.querySelector('#searchArea');
const $articles = document.querySelector('#articles');

$toggleMenu.addEventListener('click', e => {
  $menus.style.width = '250px';
});

$closeBtn.addEventListener('click', e => {
  $menus.style.width = '0px';
});

window.addEventListener('resize', e => {
  if (e.target.innerWidth > 576) {
    $menus.style.width = '100%';
  } else {
    $menus.style.width = '0px';
  }
});

// 2. 검색창 보이고 숨기기
// - 왼쪽 상단에 검색 아이콘을 붙인다
// - 검색 아이콘을 누르면 검색창이 나오고 다시 누르면 사라진다

$search.addEventListener('click', e => {
  if ($searchArea.style.display == 'flex') {
    $searchArea.style.display = '';
  } else {
    $searchArea.style.display = 'flex';
  }
});

// 3. 현재 console에서만 보이는 news 데이터들을 UI에 그려보기
// - todo리스트에서 했던 render함수와 비슷함

let result = '';
const render = () => {
  // FOREACH (Map 써도됨)
  news.forEach(item => {
    result += `<div class="row news">
  	<div class="col-lg-4">
  		<img class="news-img" src="${item.urlToImage}" alt="">
  	</div>
  	<div class="col-lg-8">
  		<h2>${item.title}</h2>
  		<p>${item.description}</p>
  		<div>
  			${item.author} - ${item.publishedAt}
  		</div>
  	</div>
  </div>`;
  });
  $articles.innerHTML = result;
};
