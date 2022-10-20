let news = [];
const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com//v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  let header = new Headers({
    'x-api-key': 'NHhmhsswltAdCYsRqKQaOZX_5XgKzCsxreKYRce6-Oo',
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json(); // 역시 서버에서 데이터를 뽑아야 하기때문에 await이 필요함.

  news = data.articles;
  console.log(news);
};
getLatestNews();
