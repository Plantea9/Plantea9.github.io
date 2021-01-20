const tailwindui = require('@tailwindcss/ui')

module.exports = {
  purge: false, // Purging is taken care of in postcss.config.js
  theme: {
    customForms: theme => ({
      error: {
        'input, textarea, multiselect, checkbox, radio, select': {
          '&:focus': {
            boxShadow: '0 0 0 3px rgb(254 164 164 / 45%)',
            borderColor: theme('colors.red.600')
          },
          borderColor: theme('colors.red.600'),
          color: theme('colors.red.600')
        }
      }
    }),
    extend: {}
  },
  variants: {},
  plugins: [
    tailwindui,
    require('@tailwindcss/custom-forms')
  ],

  future: {
    removeDeprecatedGapUtilities: true
  }
}
