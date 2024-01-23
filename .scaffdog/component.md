---
name: 'component'
root: './src/components'
output: '*'
ignore: []
questions:
  name: 'Please enter a component name.'
---

# `{{ inputs.name | pascal }}/types.ts`

```markdown
export interface {{ inputs.name | pascal }}PresenterProps {}

```

# `{{ inputs.name | pascal }}/presenter.tsx`

```markdown
import { FC, useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { useTheme } from '@/styles/hooks'

import { {{ inputs.name | pascal }}PresenterProps } from './types'

export const {{ inputs.name | pascal }}Presenter: FC<{{ inputs.name | pascal }}PresenterProps> = () => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text>{{ inputs.name | pascal }}</Text>
    </View>
  )
}

const useStyles = (): typeof styles => {
  const theme = useTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        backgroundColor: theme.colors.background.main,
        flex: 1,
        width: '100%'
      }
    })
  }, [theme])

  return styles
}

```

# `{{ inputs.name | pascal }}/index.tsx`

```markdown
import { FC } from 'react'

import { {{ inputs.name | pascal }}Presenter } from './presenter'

export const {{ inputs.name | pascal }}: FC = () => {
  return <{{ inputs.name | pascal }}Presenter />
}

```
