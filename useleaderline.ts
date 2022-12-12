import LeaderLine, { Options } from 'leader-line-new'
import React, { useEffect, useState } from 'react'

const useLeaderLine = (
    c?: Options
): [
    LeaderLine[],
    () => { (): void; generate(_?: Options): void },
    (_: Options) => void
] => {
    const [config, updateConfig] = useState<Options>({})
    const [lines, updateLines] = useState<LeaderLine[]>([])

    const leaderLineGenerator = () => {
        const generator = () => {}
        generator.generate = (_?: Options) => {
            try {
                const line = new LeaderLine(Object.assign(config, _!) || config)
                updateLines((prev) => [...prev, line])
            } catch (e) {
                console.log(e)
            }
        }
        return generator
    }

    const mergeConfig = (_: Options) => {
        updateConfig(Object.assign(config, _))
    }

    useEffect(() => {
        c ? mergeConfig(c) : console.log('!c')
    }, [])

    return [lines, leaderLineGenerator, mergeConfig]
}

export default useLeaderLine

/* Example Usage

 const [lines, generator, mergeConfig] = useLeaderLine({
        color: `rgba(0,0,0,0.5)`,
        path: `grid`,
        startSocket: `bottom`,
        startPlug: `behind`,
        endSocket: `top`,
        endPlug: `arrow2`,
        hide: true,
        startSocketGravity: 0,
        endSocketGravity: 0,
    })
    
const el = document.getElementById('_g')!,
        el2 = document.getElementById('_i')!,
        g = generator()
        
        g.generate()      //generates with pre-existing config
        g.generate({     
            start: el2,
            end: el,
            color: `black`})  //merges new settings with existing config
*/
