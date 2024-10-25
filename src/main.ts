import { Configurator } from './configurator'

import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
    const configurator = await Configurator.load('/Styx With Strap.glb', document.getElementById('configurator')!)

    const lensColorInputElements = document.querySelectorAll('[name="color"]')
    const frameColorInputElements = document.querySelectorAll('[name="frame-color"]')

    lensColorInputElements.forEach((element) => {
        element.addEventListener('change', (event) => setLensColor((event.target as HTMLInputElement).value))
    })

    frameColorInputElements.forEach((element) => {
        element.addEventListener('change', (event) => setFrameColor((event.target as HTMLInputElement).value))
    })

    const setLensColor = (color: string) => {
        configurator.lens.setColor(color)
    }

    const setFrameColor = (color: string) => {
        configurator.frame.setColor(color)
    }
})
