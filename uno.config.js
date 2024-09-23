
import {defineConfig, presetAttributify, transformerDirectives, transformerVariantGroup, presetUno} from 'unocss'

import {presetApplet, presetRemRpx, transformerApplet, transformerAttributify} from 'unocss-applet'


const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false
const presets = []
const transformers = []
if (isApplet) {
    presets.push(presetApplet())
    presets.push(presetRemRpx())
    transformers.push(transformerAttributify({ignoreAttributes: ['block']}))
    transformers.push(transformerApplet())
} else {
    presets.push(presetApplet())
    // presets.push(presetAttributify())
    presets.push(presetAttributify({
        prefix: 'uno-',
        prefixedOnly:true
    }))
    presets.push(presetRemRpx({mode: 'rpx2rem'}))
}

export default defineConfig({
    shortcuts: {
        'flex-center': 'flex items-center justify-center',
    },
    theme: {
        colors: {
            'page': '#F6F6F6'
        },
        spacing: {
            'base': '31rpx'
        },
        borderRadius: {
            'base': '19rpx'
        }
    },
    presets: presets,
    transformers: [transformerDirectives(), transformerVariantGroup(), ...transformers],
    rules: [
        [
            'p-safe',
            {
                padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
            },
        ],
        ['pt-safe', {'padding-top': 'env(safe-area-inset-top)'}],
        ['pb-safe', {'padding-bottom': 'env(safe-area-inset-bottom)'}],
    ],
})
