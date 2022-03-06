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
    extend: {
      zIndex: {
        '-10': '-10'
      },
      textColor: ['visited']
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')
  ],

  future: {
    removeDeprecatedGapUtilities: true
  }
}
