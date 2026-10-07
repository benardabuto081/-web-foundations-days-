let allUsers = [];

const loadUsersBtn = document.getElementById('load-users');
const filterInput = document.getElementById('filter-input');
const statusEl = document.getElementById('status');
const usersListEl = document.getElementById('users-list');

// Function to render any given array of users
function renderUsers(users) {
    usersListEl.innerHTML = '';

    if (users.length === 0) {
        statusEl.textContent = 'No users match your filter.';
        return;
    } else {
        statusEl.textContent = `Showing ${users.length} user(s).`;
    }

    users.forEach(user => {
        const li = document.createElement('li');

        const nameEl = document.createElement('p');
        nameEl.textContent = `Name: ${user.name}`;

        const emailEl = document.createElement('p');
        emailEl.textContent = `Email: ${user.email}`;

        const cityEl = document.createElement('p');
        cityEl.textContent = `City: ${user.address.city}`;

        const companyEl = document.createElement('p');
        companyEl.textContent = `Company: ${user.company.name}`;

        li.appendChild(nameEl);
        li.appendChild(emailEl);
        li.appendChild(cityEl);
        li.appendChild(companyEl);

        usersListEl.appendChild(li);
    });
}

// Async function to fetch users with loading states, ok check, and try/catch/finally
async function loadUsers() {
    loadUsersBtn.disabled = true;
    statusEl.textContent = 'Loading users...';
    usersListEl.innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        allUsers = await response.json();
        renderUsers(allUsers);
    } catch (error) {
        console.error('Failed to load users:', error);
        statusEl.textContent = 'Failed to load users. Please try again later.';
    } finally {
        loadUsersBtn.disabled = false;
    }
}

// Event listener for loading data
loadUsersBtn.addEventListener('click', loadUsers);

// Event listener for filtering input without making a new network request
filterInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );

    renderUsers(filteredUsers);
});
