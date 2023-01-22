export default (option, tdClasses, tdFactory) => {
    const parseInput = tdClasses.Dates.prototype.parseInput
    tdClasses.Dates.prototype.parseInput = function (value) {
        if (typeof option.getVueModelValue === 'function') {
            const vModelValue = option.getVueModelValue()
            try {
                const value = new tdClasses.DateTime(vModelValue)
                return value
            } catch (error) {
                console.error(error)
            }
        }
        parseInput.bind(this)(value)
    }

    const updateInput = tdClasses.Dates.prototype.updateInput
    tdClasses.Dates.prototype.updateInput = function (target) {
        if (typeof option.setVueModelValue === 'function') {
            option.setVueModelValue(target)
        }
        updateInput.bind(this)(target)
    }
  }
