export default {
  control: {
    backgroundColor: '#fff',

    fontSize: 14,
    fontWeight: 'normal'
  },

  highlighter: {
    overflow: 'hidden'
  },

  input: {
    margin: 0
  },

  '&singleLine': {
    control: {
      display: 'inline-block',

      width: 130
    },

    highlighter: {
      padding: 1,
      border: '2px inset transparent'
    },

    input: {
      padding: 1,

      border: '2px inset'
    }
  },

  '&multiLine': {
    // control: {
    //   fontFamily: 'monospace',
    //   border: '1px solid silver'
    // },

    highlighter: {
      padding: 9
    },

    input: {
      padding: 9,
      minHeight: 63,
      outline: 0,
      border: 0
    }
  },

  suggestions: {
    bottom: '0px',
    left: 0,
    zIndex: 1,
    list: {
      boxShadow: '4px 4px 6px rgba(0,0,0,.4)',
      background: '#d9e1e8',
      borderRadius: '0 0 4px 4px',
      color: '#282c37',
      fontSize: '14px',
      padding: '6px'
    },

    item: {
      padding: '10px',
      cursor: 'pointer',
      borderRadius: '4px',
      '&focused': {
        backgroundColor: '#b9c8d5'
      }
    }
  }
};
