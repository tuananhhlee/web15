function findMoney()
  .then(function(money){
    // findMoney trả về .. money
    // truyền money vào findCard để chuộc thẻ sinh viên
    return findCard(money)
      
  })
  .then(function(card, money){
    // có thẻ thì đi thư viện tìm sách
    return findBooks(money, card) // findBooks cần tiền và sách từ các Promise trên
      
  })
  .then(function(card, money, books){
    // lựa sách 18+ đọc thôi
    return readEpicBooks(books.filter(function(book){
      return !! (book.categoryName === '18+');
    }));
  })
  .catch(console.error.bind(console));