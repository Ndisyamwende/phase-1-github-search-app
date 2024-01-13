document.getElementById('github-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('search').value;
    redirectToUserProfile(username);
  });
  
  function searchGitHubUsers(username) {
    fetch(`https://api.github.com/search/users?q=${username}`)
      .then(response => response.json())
      .then(data => {
        if (data.items.length > 0) {
          const user = data.items[0];
          redirectToUserProfile(user.login);
        } else {
          console.log('User not found');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
  function redirectToUserProfile(username) {
    window.location.href = `https://github.com/${username}`;
  }
  
  function getUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        displayRepoResults(data);
      })
      .catch(error => console.error('Error:', error));
  }
  
  function displayUserResults(users) {
    const userResultsDiv = document.getElementById('userResults');
    userResultsDiv.innerHTML = '';
  
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
      userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50">
        <p><strong>${user.login}</strong></p>
        <a href="${user.html_url}" target="_blank">Profile</a>
      `;
      userDiv.addEventListener('click', function () {
        getUserRepos(user.login);
      });
      userResultsDiv.appendChild(userDiv);
    });
  }
  
  function displayRepoResults(repos) {
    const repoResultsDiv = document.getElementById('repoResults');
    repoResultsDiv.innerHTML = '';
  
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.classList.add('repo');
      repoDiv.innerHTML = `
        <p><strong>${repo.name}</strong></p>
        <p>${repo.description || 'No description available'}</p>
        <a href="${repo.html_url}" target="_blank">Repository Link</a>
      `;
      repoResultsDiv.appendChild(repoDiv);
    });
  }
  