const $toggleMenu = document.querySelector('#toggleMenu');
const $search = document.querySelector('#search');
const $closeBtn = document.querySelector('#closeBtn');
const $menus = document.querySelector('#menus');
const $searchArea = document.querySelector('#searchArea');
const $articles = document.querySelector('#articles');
const $categories = document.querySelectorAll('#menus .category');
const $searchInput = document.querySelector('#searchInput');
const $searchBtn = document.querySelector('#searchBtn');

let news = [];
let url;
let category;
let search;

/*
1. 사이드 메뉴
- 웹사이트 버전에서는 웹사이트 타이틀 하단에 카테고리 메뉴 존재
- 모바일 버전시 카테고리 메뉴는 사라지고 햄버거 메뉴가 나온다.
	[O] mediaquery사용
		[O] 모바일 사이즈에서 menu부분을 position:fixed & top:0 & left:0으로 설정
- 햄버거 메뉴를 누르면 사이드메뉴가 나온다.
*/

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
  result = news.map(item => {
    return `<div class="row news">
		 	<div class="col-lg-4">
		 		<img class="news-img" src="${item.urlToImage}" alt="">
		 	</div>
		 	<div class="col-lg-8">
		 		<h2>${item.title}</h2>
		 		<p>${item.description}</p>
		 		<div>
		 			${item.author ? item.author : ''} - ${item.publishedAt}
		 		</div>
			</div>
		</div>`;
  });
  $articles.innerHTML = result.join('');
};

// Get Date (format: YYYY-MM-DD)
function dateFormat() {
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getHours();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return `${today.getFullYear()}-${month}-${day}`;
}

// After Input, clear & focus
const searchInputFunc = () => {
  $searchInput.value = '';
  $searchInput.focus();
};

const getNews = async () => {
  let req = new URL(url);
  let response = await fetch(req);
  // console.log(response);
  let data = await response.json();
  // console.log(data);

  try {
    // 에러 핸들링 1. 받은 api데이터가 0개라면 화면에 No matches for your search 라는 메세지를 화면
    if (data.totalResults == 0) {
      throw new Error('No matches for your search');
    }
    // api데이터가 1개 이상 & 에러 코드 200이면
    else if (response.status == 200) {
      news = data.articles;
      render();
    } else {
      // 에러 핸들링 2. 받은 응답의 코드가 200이 아니라면, (400,401,402 등 ) 받은 에러메세지를 화면에 보여주기
      throw new Error(
        `Error Status is "${response.status}" & ${data.message}!`
      );
    }
  } catch (err) {
    $articles.innerHTML = `<div class="alert alert-danger text-center" role="alert">
			${err.message}
			</div>`;
  }
};

const getLatestNews = () => {
  url =
    'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    `from=${dateFormat()}&` +
    'sortBy=popularity&' +
    'apiKey=2431d4c166fb4546a136e11ab9ca36ed';

  getNews();
};
getLatestNews();

const getNewsByCategory = e => {
  category = e.target.textContent.toLowerCase();
  url = `
		https://newsapi.org/v2/top-headlines
		?country=kr
		&from=${dateFormat()}
		&category=${category}
		&apiKey=2431d4c166fb4546a136e11ab9ca36ed`;

  getNews();
};

const getNewsBySearch = () => {
  search = $searchInput.value.trim();
  url =
    'https://newsapi.org/v2/everything?' +
    `q=${search}&` +
    `from=${dateFormat()}&` +
    'sortBy=popularity&' +
    'apiKey=2431d4c166fb4546a136e11ab9ca36ed';

  getNews();
  searchInputFunc();
};

// menus 버튼을 누르면 카테고리별로 뉴스 보여주기
$categories.forEach(item => {
  item.addEventListener('click', e => {
    getNewsByCategory(e);
  });
});

$searchBtn.addEventListener('click', getNewsBySearch);
$searchInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    getNewsBySearch();
  }
});
