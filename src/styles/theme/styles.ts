export const styles = {
  borderRadius: {
    small: 2,
    medium: 4,
    large: 20
  },
  boxShadow: {
    normal: {
      shadowOffset: {
        width: 1,
        height: 2
      },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 2
    }
  },
  fontSize: {
    xSmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    xLarge: 20,
    xxLarge: 24
  },
  fontWeight: {
    normal: '400',
    bold: '500'
  },
  opacity: {
    disabled: 0.4,
    pressed: 0.6
  },
  margin: {
    xxSmall: 4,
    xSmall: 8,
    small: 12,
    medium: 16,
    large: 24,
    xLarge: 32,
    xxLarge: 40
  },
  padding: {
    xxSmall: 4,
    xSmall: 8,
    small: 12,
    medium: 16,
    large: 24,
    xLarge: 32,
    xxLarge: 40
  }
} as const
