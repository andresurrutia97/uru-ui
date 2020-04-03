<p align="center">
  <a href="">
    <img width="300" src="./src/Assets/logoUi.png">
  </a>
</p>

<h1 align="center">Uru-UI</h1>

<div align="center"> 
  
  Librería de componentes UI para React

  [![NPM](https://img.shields.io/npm/v/uru-ui.svg)](https://www.npmjs.com/package/uru-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

</div>

## Install

Uru-UI está disponible como un [npm package](https://www.npmjs.com/package/uru-ui).

```bash
npm install --save uru-ui
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, InputNumber } from "uru-ui";

function App() {
  return (
     <>
      <Button color="primary">Click Me</Button>
      <InputNumber/>
    <>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## License

MIT © [andresurrutia97](https://github.com/andresurrutia97)
