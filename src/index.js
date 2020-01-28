import Post from './Post'
import './styles/main'
import json from './assets/json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from './assets/webpack-logo.png'

const post = new Post('The webpack post')
console.log(post.toString())
console.log('JSON', json)
console.log('XML', xml)
console.log('CSV', csv)
console.log('WebpackLogo', WebpackLogo);
