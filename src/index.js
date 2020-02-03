import * as $ from 'jquery'
import Post from '@models/Post'
import '@/styles/main.css'
import json from './assets/json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from './assets/webpack-logo.png'
import './styles/main-less.less'
import './styles/main-sass.scss'
import './babel-test'

const post = new Post('The webpack post')
console.log(post.toString())
console.log('JSON', json)
console.log('XML', xml)
console.log('CSV', csv)
console.log('WebpackLogo', WebpackLogo);
$('pre').html(post.toString())

import './typescript-test'
import './react-test'
import './react-ts-test'

setTimeout(() => {
    
    import(/* webpackChunkName: "lodash" */ 'lodash').then(() => {
        console.log('loadash is loaded')
    })
}, 2000)
