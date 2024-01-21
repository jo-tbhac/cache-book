const appColor = {
  primary: {
    main: '#329ea8',
    light: '#5bb1b9',
    dark: '#236e75'
  }
} as const

export const colors = {
  app: {
    primary: appColor.primary
  },
  button: {
    primary: appColor.primary.main,
    secondary: '#f8f8f8'
  },
  font: {
    main: '#555',
    sub: '#777',
    error: '#c7254e',
    placeholder: '#ababab',
    contrast: '#fff',
    info: '#337ab7'
  },
  background: {
    main: '#fff',
    sub: '#f4f4f4'
  },
  border: {
    main: '#e0e0e0',
    light: '#f0f0f0',
    dark: '#999'
  }
} as const
