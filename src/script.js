import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

THREE.ColorManagement.enabled = false

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')
const iceblue = textureLoader.load('/textures/matcaps/iceblue.png')
const gold = textureLoader.load('/textures/matcaps/gold.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    `/fotns/helvetiker_regular.typeface.json`,
    (font) => {
        const textGeometry = new TextGeometry(
            'Taito’s Portfolio\nComing Soon!',
            {
                font: font,
                size: 0.75,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
    //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
    //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
    // )
    textGeometry.center()

    // text
    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: gold })
    const text = new THREE.Mesh(textGeometry,textMaterial)
    scene.add(text)


    // torus
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })

    // box
    const cubeGeometry = new THREE.BoxGeometry( 0.6, 0.6, 0.6 ); 
    const cubeMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })

    // sphere
    const sphereGeometry = new THREE.SphereGeometry( 0.4, 0.4, 0.4 ); 
    const sphereMaterial = new THREE.MeshMatcapMaterial( { matcap: matcapTexture3 } )

    // torusknot
    // const TorusKnotGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 )
    // const TorusKnotMaterial = new THREE.MeshMatcapMaterial( { matcap: matcapTexture6 } )

        for(let i = 0; i < 600; i++)
        {
            let array = []
            
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            const cube = new THREE.Mesh( cubeGeometry, cubeMaterial)

            const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial )

            // const torusKnot = new THREE.Mesh( TorusKnotGeometry, TorusKnotMaterial )

            array.push(donut,cube,sphere)

            array.map((element) => {
                element.position.x = (Math.random() - 0.5) * 20
                element.position.y = (Math.random() - 0.5) * 20
                element.position.z = (Math.random() - 0.5) * 20

                element.rotation.x = Math.random() * Math.PI
                element.rotation.y = Math.random() * Math.PI
             
                const scale = Math.random()
                element.scale.x = scale
                element.scale.y = scale
                element.scale.z = scale

                scene.add(element)
            })
            
        }

    }

)


/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.x = 0.2
camera.position.y = 0.4
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Debug
const gui = new dat.GUI()
gui.add(camera.position,'x').min(-10).max(10).step(0.1)
gui.add(camera.position,'y').min(-10).max(10).step(0.1)
gui.add(camera.position,'z').min(-10).max(10).step(0.1)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()