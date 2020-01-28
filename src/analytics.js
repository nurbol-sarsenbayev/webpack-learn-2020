import * as $ from 'jquery'

function createAnalytics() {
    let count = 0
    let isDestroyed = false
    const increaseCount = () => count++

    $(document).on('click', increaseCount)

    return {
        destroy: () => {
            isDestroyed = true
            $(document).off('click', increaseCount)
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