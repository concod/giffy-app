export const scrolledToBottom = containerRef => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    return Math.ceil(scrollTop + clientHeight) >= scrollHeight
}