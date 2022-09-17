import { useEffect, useState } from "react"

const useThrottle = (
  d?: number
): [(f: any) => void, React.Dispatch<React.SetStateAction<number>>] => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [defaultDelay, setDelay] = useState<number>(1000)

  const throttleFunc = (f: any): undefined | void => {
    if (timer !== null) {
      return
    }
    setTimer(
      setTimeout(() => {
        f()
        setTimer(null)
      }, d || defaultDelay)
    )
  }

  useEffect(() => {
    setDelay(d!)
  }, [d])

  return [throttleFunc, setDelay]
}

export default useThrottle
