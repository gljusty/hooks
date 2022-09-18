import LeaderLine, { Options } from "leader-line-new"
import React, { useEffect, useState } from "react"

const useLeaderLine = (
  c?: Options
): [
  LeaderLine[],
  () => { (): void; generate(c?: Options): void },
  React.Dispatch<React.SetStateAction<LeaderLine.Options | undefined>>
] => {
  const [config, updateConfig] = useState<Options | undefined>()
  const [lines, updateLines] = useState<LeaderLine[]>([])

  const leaderLineGenerator = () => {
    const generator = () => {}
    generator.generate = (_?: Options) => {
      try {
        const line = new LeaderLine(_ || config!)
        updateLines(prev => [...prev, line])
      } catch {
        //do nothing
      }
    }
    return generator
  }

  useEffect(() => {
    c ? updateConfig(c) : console.log("!c")
  }, [c])

  return [lines, leaderLineGenerator, updateConfig]
}

export default useLeaderLine
