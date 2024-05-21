export interface DailyRecordsPresenterProps {
  navigateFormPage: () => void
  componentKey: string
  actionSheetVisible: boolean
  openActionSheet: () => void
  closeActionSheet: () => void
  handleImportSubscriptions: () => void
}
