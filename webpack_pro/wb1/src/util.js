// import $ from 'expose-loader?$!jquery'

// expose-loader 暴露全局的loader 属于内联loader
// pre 前面执行的loader  normal 普通的loader  内联loader  后置 postloader
// console.log(window.$)
// console.log($)


import logo from './logo.png';
let image = new Image()
image.src = logo;
document.body.appendChild(image)