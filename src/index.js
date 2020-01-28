import Post from './Post'
import './styles/main.css'
import json from './assets/json';

const post = new Post('The webpack post')
console.log(post.toString())
console.log('JSON', json)