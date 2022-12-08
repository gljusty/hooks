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
