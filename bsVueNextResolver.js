/**
 *  Temporarily exported from https://raw.githubusercontent.com/VividLemon/unplugin-vue-components/main/src/core/resolvers/bootstrap-vue.ts
 *  until pr merge to main repo
 */

const COMPONENT_ALIASES = {
    BBtn: 'BButton',
    BBtnClose: 'BButtonClose',
    BBtnGroup: 'BButtonGroup',
    BBtnToolbar: 'BButtonToolbar',
    BCheck: 'BFormCheckbox',
    BCheckbox: 'BFormCheckbox',
    BCheckboxGroup: 'BFormCheckboxGroup',
    BCheckGroup: 'BFormCheckboxGroup',
    BDatalist: 'BFormDatalist',
    BDd: 'BDropdown',
    BDdDivider: 'BDropdownDivider',
    BDdForm: 'BDropdownForm',
    BDdGroup: 'BDropdownGroup',
    BDdHeader: 'BDropdownHeader',
    BDdItem: 'BDropdownItem',
    BDdItemButton: 'BDropdownItemButton',
    BDdItemBtn: 'BDropdownItemButton',
    BDdText: 'BDropdownText',
    BDropdownItemBtn: 'BDropdownItemButton',
    BFile: 'BFormFile',
    BDatepicker: 'BFormDatepicker',
    BInput: 'BFormInput',
    BNavDd: 'BNavItemDropdown',
    BNavDropdown: 'BNavItemDropdown',
    BNavItemDd: 'BNavItemDropdown',
    BNavToggle: 'BNavbarToggle',
    BRadio: 'BFormRadio',
    BRadioGroup: 'BFormRadioGroup',
    BRating: 'BFormRating',
    BSelect: 'BFormSelect',
    BSelectOption: 'BFormSelectOption',
    BSelectOptionGroup: 'BFormSelectOptionGroup',
    BSpinbutton: 'BFormSpinbutton',
    BTag: 'BFormTag',
    BTags: 'BFormTags',
    BTextarea: 'BFormTextarea',
    BTimepicker: 'BFormTimepicker'
}

/**
 * Resolver for BootstrapVue
 *
 * @link https://github.com/bootstrap-vue/bootstrap-vue
 */
export const BootstrapVueResolver = (_options = {}) => {
    const options = { directives: true, ..._options }
    const resolvers = [{
        type: 'component',
        resolve: (name) => {
            if (name.match(/^B[A-Z]/)) {
                return {
                    name: COMPONENT_ALIASES[name] || name,
                    from: 'bootstrap-vue'
                }
            }
        }
    }]

    if (options.directives) {
        resolvers.push({
            type: 'directive',
            resolve: (name) => {
                if (name.match(/^B[A-Z]/)) {
                    return {
                        name: `V${name}`,
                        from: 'bootstrap-vue'
                    }
                }
            }
        })
    }

    return resolvers
}

/**
 * Resolver for BootstrapVueNext
 *
 * @link https://github.com/bootstrap-vue/bootstrap-vue-next
 */
export const BootstrapVueNextResolver = (_options = {}) => {
    const options = { directives: true, ..._options }
    const resolvers = [{
        type: 'component',
        resolve: (name) => {
            if (name.match(/^B[A-Z]/)) { return { name, from: 'bootstrap-vue-next' } }
        }
    }]

    if (options.directives) {
        resolvers.push({
            type: 'directive',
            resolve: (name) => {
                if (name.match(/^B[A-Z]/)) { return { name: `V${name}`, from: 'bootstrap-vue-next' } }
            }
        })
    }

    return resolvers
}

/**
 * Resolver for legacy BootstrapVue3 apps
 *
 * @deprecated use BootstrapVueNextResolver with https://github.com/bootstrap-vue/bootstrap-vue-next
 * @link https://www.npmjs.com/package/bootstrap-vue-3
 */
export const BootstrapVue3Resolver = (_options = {}) => {
    const options = { directives: true, ..._options }
    const resolvers = [{
        type: 'component',
        resolve: (name) => {
            if (name.match(/^B[A-Z]/)) { return { name, from: 'bootstrap-vue-3' } }
        }
    }]

    if (options.directives) {
        resolvers.push({
            type: 'directive',
            resolve: (name) => {
                if (name.match(/^B[A-Z]/)) { return { name: `V${name}`, from: 'bootstrap-vue-3' } }
            }
        })
    }

    return resolvers
}