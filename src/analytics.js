function createAnalytics() {
    let count = 0
    let isDestroyed = false
    const increaseCount = () => count++

    document.addEventListener('click', increaseCount)

    return {
        destroy: () => {
            isDestroyed = true
            document.removeEventListener('click', increaseCount)
        },
        getClicks: () => {
            if (isDestroyed) {
                return "Analytics is destroyed"
            }
            return count
        }
    }
}

window.analytics = createAnalytics();