const $toggleMenu = document.querySelector('#toggleMenu');
const $search = document.querySelector('#search');
const $closeBtn = document.querySelector('#closeBtn');
const $menus = document.querySelector('#menus');
const $searchArea = document.querySelector('#searchArea');
const $articles = document.querySelector('#articles');
const $categories = document.querySelectorAll('#menus .category');
const $searchInput = document.querySelector('#searchInput');
const $searchBtn = document.querySelector('#searchBtn');
const $pagination = document.querySelector('#pagination');

let news = [];
// let url = new URL(
//   `https://newsapi.org/v2/top-headlines?country=kr&apiKey=b6bbde9962c04a399eba8cf8535ae9aa`
// );
let url = ``;
let category;
let search;

// pagination을 위한 변수
let totalPage = 1;
let page = 1;

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
  try {
    let req = new URL(`${url}&page=${page}`);
    let response = await fetch(req);
    let data = await response.json();

    // 에러 핸들링 1. 받은 api데이터가 0개라면 화면에 No matches for your search 라는 메세지를 화면
    if (data.totalResults == 0) {
      throw new Error('No matches for your search');
    }
    // api데이터가 1개 이상 & 에러 코드 200이면
    else if (response.status == 200) {
      news = data.articles;
      totalPage = data.totalResults;
      console.log(`totalPage : ${totalPage}`);
      render();
      renderPagination();
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
  page = 1; // 9. 새로운거 search마다 1로 리셋
  url = `
	https://newsapi.org/v2/top-headlines?
	&country=kr
	&category=business
	&pageSize=10
	&apiKey=b6bbde9962c04a399eba8cf8535ae9aa`;

  getNews();
};
getLatestNews();

const getNewsByCategory = e => {
  page = 1; // 9. 새로운거 search마다 1로 리셋
  category = e.target.textContent.toLowerCase();
  url = `
		https://newsapi.org/v2/top-headlines?
		&country=kr
		&category=${category}
		&pageSize=10
		&apiKey=b6bbde9962c04a399eba8cf8535ae9aa`;

  getNews();
};

const getNewsBySearch = () => {
  page = 1; // 9. 새로운거 search마다 1로 리셋
  search = $searchInput.value.trim();
  url = `https://newsapi.org/v2/top-headlines?
  &q=${search}
  &pageSize=10
  &apiKey=b6bbde9962c04a399eba8cf8535ae9aa`;

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

const renderPagination = () => {
  // 1.1~5까지를 보여준다
  // 2.6~10을 보여준다 => last, first 가필요
  // 3.만약에 first가 6 이상이면 prev 버튼을 단다
  // 4.만약에 last가 마지막이 아니라면 next버튼을 단다
  // 5.마지막이 5개이하이면 last=totalpage이다
  // 6.페이지가 5개 이하라면 first = 1이다
  let paginationHTML = ``;
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;

  // 마지막 그룹이 5개 이하이면
  if (last > totalPage) {
    last = totalPage;
  }

  // 첫그룹이 5이하이면
  let first = last - 4 <= 0 ? 1 : last - 4;
  console.log(`pageGroup: ${pageGroup}, last: ${last}, first: ${first}`);

  if (first >= 6) {
    paginationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="pageClick(${page - 1})">
                        <a class="page-link" href='#js-bottom'>&lt;</a>
                      </li>`;
  }

  for (let i = first; i <= last; i++) {
    paginationHTML += `
		<li class='page-item ${i == page ? 'active' : ''}'>
			<a class="page-link" href="#" onclick="pageClick(${i})">${i}</a>
		</li>`;
  }

  if (last < totalPage) {
    paginationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
                        <a  class="page-link" href='#'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="pageClick(${totalPage})">
                        <a class="page-link" href='#'>&gt;&gt;</a>
                       </li>`;
  }

  $pagination.innerHTML = paginationHTML;
};

const pageClick = pageNum => {
  page = pageNum;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  getNews();
};
