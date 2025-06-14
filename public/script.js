// Login
document.getElementById('loginBtn')?.addEventListener('click', async () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem('username', username);
    window.location.href = 'chat.html';
  } else {
    alert(data.message || 'Login failed');
  }
});

// Signup
document.getElementById('signupBtn')?.addEventListener('click', async () => {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.success) {
    alert('Signup successful. Please login.');
    window.location.href = 'index.html';
  } else {
    alert(data.message || 'Signup failed');
  }
});
