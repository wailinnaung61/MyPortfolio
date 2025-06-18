---
title: "Concurrent Programming in Go with Goroutines"
date: "2025-06-17"
category: ["Technology"]
cover: "/images/blog/blog-image-2.jpg"
thumb: "/images/blog/sm/blog-image-2.jpg"
---

Go’s concurrency model uses **goroutines**: lightweight threads managed by the Go runtime. According to Go’s examples, _“A goroutine is a lightweight thread of execution.”_ You simply prefix a function call with `go` to run it concurrently:

```go
package main

import (
    "fmt"
    "time"
)

func printNums(prefix string) {
    for i := 0; i < 3; i++ {
        fmt.Println(prefix, i)
    }
}

func main() {
    printNums("direct")
    go printNums("goroutine")  // runs concurrently
    go func(msg string) {
        fmt.Println(msg)
    }("async")

    time.Sleep(time.Second)  // wait for goroutines
    fmt.Println("done")
}
```

In this code, `go printNums("goroutine")` starts `printNums` in a new goroutine, which runs concurrently with the main function. The main goroutine then continues and eventually waits for one second to let others finish. When run, the outputs from the goroutine may interleave with the main output, demonstrating concurrency.

##### Key Points

- **Goroutine Syntax:** Use `go functionCall()` to start a goroutine.
- **No `Thread` Keywords:** Goroutines are multiplexed onto OS threads automatically.
- **Synchronization:** For communication or ordering, use channels (Go’s concurrency primitives).
- **Very Lightweight:** Creating thousands of goroutines is feasible, as each uses little memory.

For more on Go routines and channels, see the [Go by Example Goroutines](https://gobyexample.com/goroutines) tutorial. The example demonstrates that using `go` runs the function asynchronously. This simple concurrency model makes Go great for network servers, pipelines, and any task that benefits from easy parallelism.

**References:** Go’s official tutorials show using `go f(s)` to launch concurrent functions, confirming that the new goroutine runs alongside the original.
