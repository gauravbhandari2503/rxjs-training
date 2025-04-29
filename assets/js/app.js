const { fromEvent, of, from } = rxjs;
const { debounceTime, map, switchMap, catchError } = rxjs.operators;

const searchInput = document.getElementById('search');
const resultsList = document.getElementById('results');

// Function to fetch users
function fetchUsers(query) {
  if (!query) return of([]);
  return fetch(`https://jsonplaceholder.typicode.com/users?name_like=${query}`)
    .then(res => res.json())
    .catch(() => []);
}

fromEvent(searchInput, 'input').pipe(
  map(event => event.target.value.trim()),
  debounceTime(300),
  // Swtich map: Every time a new value comes in, cancel the previous operation and start a new one.
  switchMap(query => 
    // Creates an Observable from an Array
    from(fetchUsers(query)).pipe(
      catchError(() => of([]))
    )
  )
).subscribe({
    next: users => {
      resultsList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        resultsList.appendChild(li);
      });
    },
    error: err => {
      console.error('Error fetching users:', err);
    },
    complete: () => {
      console.log('User fetching completed');
    }
  });
