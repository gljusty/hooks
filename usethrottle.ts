import { useEffect, useState } from "react"

const useThrottle = (
  d?: number
): [(f: any) => void, React.Dispatch<React.SetStateAction<number>>] => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [delay, setDelay] = useState<number>(1000)

  const throttleFunc = (f: any): undefined | void => {
    if (timer) {
      return
    }
    setTimer(
      setTimeout(() => {
        f()
        setTimer(null)
      }, delay)
    )
  }

  useEffect(() => {
    setDelay(d!)
  }, [d])

  return [throttleFunc, setDelay]
}

export default useThrottle
