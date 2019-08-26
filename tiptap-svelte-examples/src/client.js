import * as sapper from '@sapper/app'
import svgSpriteLoader from './helpers/svg-sprite-loader'
import './assets/sass/main.scss'

const __svg__ = { path: './assets/images/icons/*.svg', name: 'assets/images/[hash].sprite.svg' }
svgSpriteLoader(__svg__.filename)

sapper.start({
	target: document.querySelector('#sapper'),
})
