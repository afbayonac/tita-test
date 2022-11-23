class EventBus {
  constructor () {
    this.eventObject = {}
  }

  publish (eventName, ...args) {
    const subscriberList = this.eventObject[eventName]

    if (!subscriberList) return console.warn(eventName + 'not found!')
    for (const subscriber of subscriberList) {
      subscriber(...args)
    }
  }

  subscribe (eventName, callback) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = []
    }
    this.eventObject[eventName].push(callback)
  }
}

export default new EventBus()
