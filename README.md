> Admin panel for any backend (React version) ;

# Installation
```shell
npm install -g create-vite

npx create-vite project-name

cd project-name

npm install
npm install anyback-react@latest

npm run dev

```

# Getting started
```javascript

import AnyBack from 'anyback-react';

ReactDOM.createRoot(
  document.querySelector('#root') // or other
)
.render(
  <AnyBack.AdminPanel
    options={{
        // ...your options
    }}
  />
)
```

# And you have an admin panel associated with your backend
- [Full example is here](https://github.com/dencelman1/anyback-react/wiki/options)

# Sources:
- [options](https://github.com/dencelman1/anyback-react/wiki/options)
- [Other documentation](https://github.com/dencelman1/anyback-react/wiki)
