import { useEffect, useState } from "react"

const useThrottle = (d?: number) => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const [defaultDelay, setDelay] = useState<number>(1000)

  const throttleFunc = (
    f: () => void,
    delay?: number
  ): undefined | [() => void, () => void] => {
    if (timer !== null) {
      console.log("eventfired")
      return
    }
    setTimer(
      setTimeout(() => {
        f()
        setTimer(null)
      }, delay || defaultDelay)
    )
  }
  const updateDelay = (d: number) => {
    return setDelay(d)
  }

  useEffect(() => {
    updateDelay(d!)
  }, [d])
  return [throttleFunc, updateDelay]
}

export default useThrottle
