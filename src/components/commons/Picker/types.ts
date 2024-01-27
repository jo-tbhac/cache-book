export interface PickerProps {
  items: Array<{ label: string; value: number }>
  expanded: boolean
  selectedValue: number
  handleChangeValue: (newValue: number) => void
}
