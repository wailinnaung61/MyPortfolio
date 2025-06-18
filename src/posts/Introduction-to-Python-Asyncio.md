---
title: "Introduction to Python Asyncio"
date: "2025-06-18"
category: ["Technology"]
cover: "/images/blog/blog-image-12.jpg"
thumbnail: "/images/blog/sm/blog-image-12.jpg"
---

Python’s `asyncio` library enables writing **asynchronous** (concurrent) code using `async`/`await`. It’s ideal for I/O-bound tasks (network calls, file I/O) and can handle many tasks efficiently. The official docs describe it as “a library to write concurrent code using the async/await syntax”. This means you define `async` functions (coroutines) and use `await` to pause and resume them.

##### Asyncio Example

```python
import asyncio

async def say(text, delay):
    await asyncio.sleep(delay)
    print(text)

async def main():
    task1 = asyncio.create_task(say("Hello", 1))
    task2 = asyncio.create_task(say("World", 2))
    await task1
    await task2

asyncio.run(main())
```

In this code, `say` is an async function that sleeps then prints. Using `asyncio.create_task`, `say("Hello")` and `say("World")` run concurrently. The `asyncio.run(main())` starts the event loop and executes `main()`. This runs “Hello” after 1s and “World” after 2s, in parallel.

##### Key Points

- **`async def`**: Defines a coroutine. Use `await` inside to yield control.
- **`asyncio.run()`**: Entrypoint to run async code (creates event loop and runs until complete).
- **Tasks:** Use `asyncio.create_task()` or `asyncio.gather()` to run multiple coroutines concurrently.
- **No blocking:** Other tasks run while one is `await`ing. (In our example, total runtime \~2s, not 3s.)

The asyncio docs provide more examples (such as printing “hello” then “world” with delays). By using asyncio, you can efficiently manage concurrency without threads. For deep dives, see [Python’s official asyncio guide](https://docs.python.org/3/library/asyncio.html).

**References:** Official Python docs demonstrate async examples like:

```
async def main():
    print('hello')
    await asyncio.sleep(1)
    print('world')
asyncio.run(main())
```

which prints “hello” then “world”.
