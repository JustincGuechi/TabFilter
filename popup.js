document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({}, function (tabs) {
      var tabsList = document.getElementById('tabsList');
      var searchInput = document.getElementById('searchInput');
  
      tabs.forEach(function (tab) {
        var tabItem = document.createElement('li');
        var tabLink = document.createElement('a');
        var tabFavIcon = document.createElement('img');
        var closeIcon = document.createElement('img');
  
        tabLink.href = '#';
  
        chrome.tabs.get(tab.id, function (tabInfo) {
          tabFavIcon.src = tabInfo.favIconUrl;
        });
  
        tabLink.appendChild(tabFavIcon);
  
        var space = document.createElement('span');
        space.innerHTML = '&nbsp;';
        tabLink.appendChild(space);
  
        tabLink.appendChild(document.createTextNode(tab.title));
  
        closeIcon.src = 'icons/trash-icon.png';
        closeIcon.classList.add('close-icon');
  
        closeIcon.addEventListener('click', function (event) {
          event.stopPropagation();
          chrome.tabs.remove(tab.id);
          tabItem.remove();
        });
  
        tabLink.appendChild(closeIcon);
  
        tabLink.addEventListener('click', function () {
          chrome.tabs.update(tab.id, { active: true });
          window.close();
        });
  
        tabItem.appendChild(tabLink);
        tabsList.appendChild(tabItem);
      });
  
      searchInput.addEventListener('input', function () {
        var filter = searchInput.value.toLowerCase();
  
        tabsList.childNodes.forEach(function (tabItem) {
          var tabLink = tabItem.querySelector('a');
          var tabTitle = tabLink.textContent.toLowerCase();
  
          if (tabTitle.includes(filter)) {
            tabItem.style.display = '';
          } else {
            tabItem.style.display = 'none';
          }
        });
      });
    });
  });
  